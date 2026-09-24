const GRAPHQL_URL = "https://api.github.com/graphql";
const CACHE_SECONDS = 60 * 60;
const EXCLUDED_OWNERS = ["gq-ideas"];

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionRepo {
  name: string;
  url: string;
  commits: number;
}

export interface ContributionsPayload {
  status: "ok" | "missing-token" | "error";
  login?: string;
  year: number;
  years: number[];
  total: number;
  privateCount: number;
  commits: number;
  pullRequests: number;
  issues: number;
  reviews: number;
  currentStreak: number;
  longestStreak: number;
  bestDay: ContributionDay | null;
  weeks: ContributionDay[][];
  repos: ContributionRepo[];
  message?: string;
}

const LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `
query ($from: DateTime!, $to: DateTime!) {
  viewer {
    login
    contributionsCollection(from: $from, to: $to) {
      contributionYears
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalPullRequestReviewContributions
      restrictedContributionsCount
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
      commitContributionsByRepository(maxRepositories: 25) {
        contributions { totalCount }
        repository { nameWithOwner url isPrivate owner { login } }
      }
    }
  }
}`;

interface GraphQLResponse {
  data?: {
    viewer: {
      login: string;
      contributionsCollection: {
        contributionYears: number[];
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        totalIssueContributions: number;
        totalPullRequestReviewContributions: number;
        restrictedContributionsCount: number;
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[];
        };
        commitContributionsByRepository: {
          contributions: { totalCount: number };
          repository: { nameWithOwner: string; url: string; isPrivate: boolean; owner: { login: string } };
        }[];
      };
    };
  };
  errors?: { message: string }[];
}

function emptyPayload(year: number, status: ContributionsPayload["status"], message?: string): ContributionsPayload {
  return {
    status,
    year,
    years: [year],
    total: 0,
    privateCount: 0,
    commits: 0,
    pullRequests: 0,
    issues: 0,
    reviews: 0,
    currentStreak: 0,
    longestStreak: 0,
    bestDay: null,
    weeks: [],
    repos: [],
    message,
  };
}

function streaks(days: ContributionDay[], today: string) {
  let longest = 0;
  let run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }

  const past = days.filter((day) => day.date <= today);
  let current = 0;
  // today may still be empty — the streak is alive until the day ends
  for (let i = past.length - 1; i >= 0; i--) {
    if (past[i].count > 0) current += 1;
    else if (i === past.length - 1) continue;
    else break;
  }
  return { longest, current };
}

export async function getContributions(requestedYear?: number): Promise<ContributionsPayload> {
  const now = new Date();
  const year = requestedYear && requestedYear > 2007 && requestedYear <= now.getUTCFullYear() ? requestedYear : now.getUTCFullYear();
  const token = process.env.GITHUB_TOKEN?.trim() || process.env.GITHUB_PAT?.trim();
  if (!token) return emptyPayload(year, "missing-token", "Missing GITHUB_TOKEN.");

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY,
      variables: { from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` },
    }),
    next: { revalidate: CACHE_SECONDS },
  });

  if (!response.ok) return emptyPayload(year, "error", `GitHub GraphQL failed with ${response.status}`);

  const json = (await response.json()) as GraphQLResponse;
  const viewer = json.data?.viewer;
  if (!viewer) return emptyPayload(year, "error", json.errors?.[0]?.message ?? "Empty GraphQL response");

  const collection = viewer.contributionsCollection;
  const weeks = collection.contributionCalendar.weeks.map((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVELS[day.contributionLevel] ?? 0,
    }))
  );
  const days = weeks.flat();
  const today = now.toISOString().slice(0, 10);
  const { current, longest } = streaks(days, today);
  const bestDay = days.reduce<ContributionDay | null>((best, day) => (!best || day.count > best.count ? day : best), null);

  const repos = collection.commitContributionsByRepository
    .filter(
      (item) =>
        !item.repository.isPrivate &&
        !EXCLUDED_OWNERS.includes(item.repository.owner.login.toLowerCase())
    )
    .slice(0, 6)
    .map((item) => ({
      name: item.repository.nameWithOwner,
      url: item.repository.url,
      commits: item.contributions.totalCount,
    }));

  return {
    status: "ok",
    login: viewer.login,
    year,
    years: [...collection.contributionYears].sort((a, b) => b - a),
    total: collection.contributionCalendar.totalContributions,
    privateCount: collection.restrictedContributionsCount,
    commits: collection.totalCommitContributions,
    pullRequests: collection.totalPullRequestContributions,
    issues: collection.totalIssueContributions,
    reviews: collection.totalPullRequestReviewContributions,
    currentStreak: year === now.getUTCFullYear() ? current : 0,
    longestStreak: longest,
    bestDay: bestDay && bestDay.count > 0 ? bestDay : null,
    weeks,
    repos,
  };
}
