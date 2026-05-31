import { getGithubPortfolioProjects } from "@/lib/github";

const CACHE_HEADER = {
  "Cache-Control": "s-maxage=1800, stale-while-revalidate=86400",
};

function getLimit(request: Request) {
  const rawLimit = new URL(request.url).searchParams.get("limit");
  const limit = rawLimit ? Number(rawLimit) : 12;

  if (!Number.isFinite(limit)) return 12;
  return Math.min(Math.max(Math.trunc(limit), 1), 12);
}

export async function GET(request: Request) {
  try {
    const payload = await getGithubPortfolioProjects(getLimit(request));
    return Response.json(payload, { headers: CACHE_HEADER });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown GitHub API error.";

    return Response.json(
      {
        status: "error",
        generatedAt: new Date().toISOString(),
        totalRepos: 0,
        totalAfterFilter: 0,
        excludedOwner: "gq ideas",
        projects: [],
        message,
      },
      { status: 502, headers: CACHE_HEADER }
    );
  }
}
