const GITHUB_API = "https://api.github.com";
const GITHUB_API_VERSION = "2026-03-10";
const CACHE_SECONDS = 60 * 30;
const EXCLUDED_OWNER = "gq ideas";
const EXCLUDED_OWNER_KEY = normalizeOwner(EXCLUDED_OWNER);

const CURATED_REPOS = [
  "asanabria-2021067/waterway-backend",
  "asanabria-2021067/proyecto-ingenieria-software",
  "asanabria-2021067/seasos-front",
  "asanabria-2021067/api-rest-python",
  "asanabria-2021067/proyecto2-db",
  "asanabria-2021067/frontend-quimica",
  "asanabria-2021067/chemiq-backend",
  "asanabria-2021067/Smart-Agriculture-FRONTEND-Node.js-OpenAI-Google-Sheets",
  "asanabria-2021067/Smart-Agriculture-Backend",
  "PabloVS044/TripWise",
  "asanabria-2021067/carpool-app-front",
  "asanabria-2021067/carpool-backend-poo",
];

const DENYLIST_REPOS = [
  "asanabria-2021067/laravel-eloquent-lab",
  "asanabria-2021067/blog-react",
  "asanabria-2021067/blog-personal-react",
  "asanabria-2021067/backend-blog",
];

interface ProjectOverride {
  displayName: string;
  badgeEn?: string;
  badgeEs?: string;
  badgeColor?: "gold" | "violet" | "blue" | "green";
  productionUrl?: string;
  categoryEn: string;
  categoryEs: string;
  descriptionEn: string;
  descriptionEs: string;
  bulletsEn: string[];
  bulletsEs: string[];
  roleEn?: string;
  roleEs?: string;
  tags?: string[];
  private?: boolean;
}

const PROJECT_OVERRIDES: Record<string, ProjectOverride> = {
  "asanabria-2021067/waterway-backend": {
    displayName: "WaterWay+",
    badgeEn: "Hackathon Winner",
    badgeEs: "Ganador de hackathon",
    badgeColor: "gold",
    categoryEn: "Environmental platform",
    categoryEs: "Plataforma ambiental",
    descriptionEn:
      "Backend for WaterWay+, a platform focused on river protection, environmental reporting, and community action.",
    descriptionEs:
      "Backend de WaterWay+, una plataforma enfocada en proteccion de rios, reportes ambientales y accion comunitaria.",
    bulletsEn: ["Hackathon-winning project", "REST API layer for environmental data", "Public repository"],
    bulletsEs: ["Proyecto ganador de hackathon", "Capa API REST para datos ambientales", "Repositorio publico"],
    tags: ["REST API", "Environment", "Hackathon"],
  },
  "asanabria-2021067/proyecto-ingenieria-software": {
    displayName: "UVGenius (en desarrollo)",
    badgeEn: "Docker + GSAP",
    badgeEs: "Docker + GSAP",
    badgeColor: "green",
    productionUrl: "http://158.23.57.118/",
    categoryEn: "Full-stack university collaboration platform",
    categoryEs: "Plataforma universitaria full stack",
    descriptionEn:
      "Monorepo platform for UVG that centralizes extracurricular and research projects, connecting students, associations, and academic institutes in one system.",
    descriptionEs:
      "Plataforma monorepo para UVG que centraliza proyectos extracurriculares y de investigacion, conectando estudiantes, asociaciones e institutos academicos en un solo sistema.",
    bulletsEn: [
      "Next.js frontend, NestJS API, Prisma, PostgreSQL, Redis",
      "Docker Compose for frontend, backend, database, cache, and reverse proxy",
      "REST APIs, WebSockets, auth, admin dashboard, reviews, notifications",
      "GSAP used for interface motion and polished transitions",
    ],
    bulletsEs: [
      "Frontend Next.js, API NestJS, Prisma, PostgreSQL y Redis",
      "Docker Compose para frontend, backend, base de datos, cache y reverse proxy",
      "APIs REST, WebSockets, auth, dashboard admin, revisiones y notificaciones",
      "GSAP para animaciones de interfaz y transiciones pulidas",
    ],
    tags: ["Next.js", "NestJS", "Docker", "REST API", "GSAP"],
  },
  "asanabria-2021067/seasos-front": {
    displayName: "SeaSOS Frontend",
    categoryEn: "Marine conservation frontend",
    categoryEs: "Frontend de conservacion marina",
    descriptionEn:
      "Frontend for SeaSOS, a full-stack application focused on marine life care and SDG 14.",
    descriptionEs:
      "Frontend de SeaSOS, una aplicacion full stack enfocada en el cuidado de la vida marina y el ODS 14.",
    bulletsEn: ["React interface", "Marine conservation workflows", "Paired with Python API"],
    bulletsEs: ["Interfaz en React", "Flujos para conservacion marina", "Conectado con API en Python"],
    tags: ["Frontend", "React", "SDG 14"],
  },
  "asanabria-2021067/api-rest-python": {
    displayName: "SeaSOS Backend",
    categoryEn: "Marine conservation API",
    categoryEs: "API de conservacion marina",
    descriptionEn:
      "Python REST API for SeaSOS, serving the backend logic for a marine conservation platform.",
    descriptionEs:
      "API REST en Python para SeaSOS, encargada de la logica backend de la plataforma de conservacion marina.",
    bulletsEn: ["Python backend", "Production deployment available", "Supports the SeaSOS frontend"],
    bulletsEs: ["Backend en Python", "Deployment de produccion disponible", "Soporta el frontend de SeaSOS"],
    tags: ["Backend", "Python", "API"],
  },
  "asanabria-2021067/proyecto2-db": {
    displayName: "LibroManga Inventory",
    badgeEn: "Dockerized SPA",
    badgeEs: "SPA dockerizada",
    badgeColor: "green",
    productionUrl: "https://hilarious-sundae-6374bd.netlify.app/",
    categoryEn: "Full-stack inventory app",
    categoryEs: "App full stack de inventario",
    descriptionEn:
      "Full-stack web application to manage inventory and sales for a bookstore and manga shop.",
    descriptionEs:
      "Aplicacion web full stack para gestionar inventario y ventas de una tienda de libros y mangas.",
    bulletsEn: ["Inventory and sales management", "Vue SPA deployed on Netlify", "Docker included in the project"],
    bulletsEs: ["Gestion de inventario y ventas", "SPA en Vue desplegada en Netlify", "Docker incluido en el proyecto"],
    tags: ["Vue", "Docker", "Inventory", "Sales"],
  },
  "asanabria-2021067/frontend-quimica": {
    displayName: "Chemical Engineering Portal Frontend",
    badgeEn: "Pilot pending",
    badgeEs: "Piloto pendiente",
    badgeColor: "violet",
    productionUrl: "https://portal-chemiq.netlify.app/",
    categoryEn: "Student association portal",
    categoryEs: "Portal de asociacion estudiantil",
    descriptionEn:
      "Frontend for the Chemical Engineering Student Association portal. I worked as Technical Lead, defining tasks, choosing technologies, coordinating stakeholders, and preparing the pilot test.",
    descriptionEs:
      "Frontend del portal para la Asociacion de Estudiantes de Ingenieria Quimica. Fui lider tecnico: defini tareas, tecnologias, comunicacion con interesados y la preparacion de la prueba piloto.",
    bulletsEn: ["Public repository", "Docker included in the frontend repo", "Technical Lead role", "Pilot test pending"],
    bulletsEs: ["Repositorio público", "Docker incluido en el repo frontend", "Rol de lider tecnico", "Prueba piloto pendiente"],
    roleEn: "Technical Lead",
    roleEs: "Lider tecnico",
    tags: ["Frontend", "Docker", "SPA", "Leadership"],
    private: false,
  },
  "asanabria-2021067/chemiq-backend": {
    displayName: "Chemical Engineering Portal Backend",
    badgeEn: "Dockerized API",
    badgeEs: "API dockerizada",
    badgeColor: "blue",
    categoryEn: "Student association API",
    categoryEs: "API de asociacion estudiantil",
    descriptionEn:
      "Backend for the Chemical Engineering Student Association portal using Node.js, MongoDB, and Express.",
    descriptionEs:
      "Backend del portal de la Asociacion de Estudiantes de Ingenieria Quimica usando Node.js, MongoDB y Express.",
    bulletsEn: ["Public repository", "Node.js, MongoDB, Express", "Docker included in the backend repo", "Production backend configured"],
    bulletsEs: ["Repositorio público", "Node.js, MongoDB y Express", "Docker incluido en el repo backend", "Backend en produccion configurado"],
    roleEn: "Technical Lead",
    roleEs: "Lider tecnico",
    tags: ["Backend", "Node.js", "MongoDB", "Docker", "REST API"],
    private: false,
  },
  "asanabria-2021067/Smart-Agriculture-FRONTEND-Node.js-OpenAI-Google-Sheets": {
    displayName: "Smart Agriculture Frontend",
    categoryEn: "IoT smart farming interface",
    categoryEs: "Interfaz IoT para agricultura",
    descriptionEn:
      "Graphic interface for an IoT plant-care system. The experience was built like a Tamagotchi with games, plant status, and controls for a robotic arm that watered pots based on humidity sensors.",
    descriptionEs:
      "Interfaz grafica para un sistema IoT de cuidado de plantas. La experiencia funcionaba como un Tamagotchi con juegos, estado de plantas y controles para un brazo que regaba macetas segun sensores de humedad.",
    bulletsEn: ["Private repository", "Tamagotchi-style UI", "Google Sheets sensor data"],
    bulletsEs: ["Repositorio privado", "UI estilo Tamagotchi", "Datos de sensores desde Google Sheets"],
    tags: ["Frontend", "IoT", "OpenAI"],
  },
  "asanabria-2021067/Smart-Agriculture-Backend": {
    displayName: "Smart Agriculture Backend",
    categoryEn: "AI-powered smart farming API",
    categoryEs: "API de agricultura inteligente",
    descriptionEn:
      "Node.js backend for an AI-powered smart farming system with real-time data analysis and sensor communication.",
    descriptionEs:
      "Backend en Node.js para un sistema de agricultura inteligente con analisis de datos en tiempo real y comunicacion con sensores.",
    bulletsEn: ["Private repository", "WebSockets and sensor data", "AI-powered plant-care backend"],
    bulletsEs: ["Repositorio privado", "WebSockets y datos de sensores", "Backend con IA para cuidado de plantas"],
    tags: ["Backend", "Node.js", "IoT"],
  },
  "PabloVS044/TripWise": {
    displayName: "TripWise",
    categoryEn: "AI travel reservations",
    categoryEs: "Reservas de viajes con IA",
    descriptionEn:
      "Travel reservation app with AI-generated itineraries for planning richer trip experiences.",
    descriptionEs:
      "App para reservas de viajes con itinerarios generados por IA para planificar experiencias completas.",
    bulletsEn: ["Public repository", "AI itinerary planning", "Travel booking experience"],
    bulletsEs: ["Repositorio publico", "Planificacion de itinerarios con IA", "Experiencia de reservas de viaje"],
    tags: ["AI", "Travel", "Kotlin"],
  },
  "asanabria-2021067/carpool-app-front": {
    displayName: "Carpool App Frontend",
    categoryEn: "POO carpool frontend",
    categoryEs: "Frontend POO de carpool",
    descriptionEn:
      "Frontend for a carpool application built for an object-oriented programming project.",
    descriptionEs:
      "Frontend de una aplicacion de carpool creada para un proyecto de programacion orientada a objetos.",
    bulletsEn: ["Private repository", "Carpool interface", "Paired with Node.js backend"],
    bulletsEs: ["Repositorio privado", "Interfaz de carpool", "Conectado con backend en Node.js"],
    tags: ["Frontend", "POO", "Carpool"],
  },
  "asanabria-2021067/carpool-backend-poo": {
    displayName: "Carpool Backend POO",
    categoryEn: "POO carpool backend",
    categoryEs: "Backend POO de carpool",
    descriptionEn:
      "Node.js and MongoDB backend for a carpool application built with object-oriented programming principles.",
    descriptionEs:
      "Backend con Node.js y MongoDB para una aplicacion de carpool usando principios de programacion orientada a objetos.",
    bulletsEn: ["Public repository", "Node.js and MongoDB", "Object-oriented backend structure"],
    bulletsEs: ["Repositorio publico", "Node.js y MongoDB", "Estructura backend orientada a objetos"],
    tags: ["Backend", "Node.js", "MongoDB"],
  },
};

interface GithubUser {
  login: string;
}

interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  pushed_at: string | null;
  updated_at: string;
  archived: boolean;
  private: boolean;
  disabled?: boolean;
  owner: {
    login: string;
    type?: string;
  };
}

interface GithubOrganization {
  login: string;
  name: string | null;
}

interface GithubDeployment {
  id: number;
  payload?: unknown;
}

interface GithubDeploymentStatus {
  state: string;
  environment_url?: string | null;
  target_url?: string | null;
}

export interface PortfolioProject {
  id: number;
  name: string;
  displayName: string;
  fullName: string;
  badgeEn?: string;
  badgeEs?: string;
  badgeColor?: "gold" | "violet" | "blue" | "green";
  owner?: string;
  description: string;
  descriptionEn: string;
  descriptionEs: string;
  categoryEn: string;
  categoryEs: string;
  bulletsEn: string[];
  bulletsEs: string[];
  roleEn?: string;
  roleEs?: string;
  repoUrl?: string;
  productionUrl?: string;
  private: boolean;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  pushedAt: string | null;
  updatedAt: string;
  commitCount: number;
}

export interface GithubProjectsPayload {
  status: "ok" | "missing-token";
  generatedAt: string;
  username?: string;
  totalRepos: number;
  totalAfterFilter: number;
  excludedOwner: string;
  projects: PortfolioProject[];
  message?: string;
}

class GithubApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly path: string
  ) {
    super(message);
    this.name = "GithubApiError";
  }
}

function getToken() {
  return process.env.GITHUB_TOKEN?.trim() || process.env.GITHUB_PAT?.trim();
}

function normalizeOwner(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function isExcludedOwner(owner: string) {
  return normalizeOwner(owner) === EXCLUDED_OWNER_KEY;
}

function ownerKey(owner: string) {
  return owner.toLowerCase();
}

function repoKey(fullName: string) {
  return fullName.toLowerCase();
}

function headers(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
  };
}

async function githubResponse(path: string, token: string) {
  return fetch(`${GITHUB_API}${path}`, {
    headers: headers(token),
    next: { revalidate: CACHE_SECONDS },
  });
}

async function githubJson<T>(path: string, token: string) {
  const response = await githubResponse(path, token);

  if (!response.ok) {
    throw new GithubApiError(`GitHub request failed with ${response.status}`, response.status, path);
  }

  return {
    data: (await response.json()) as T,
    headers: response.headers,
  };
}

function getLastPage(linkHeader: string | null) {
  if (!linkHeader) return null;
  const last = linkHeader.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/);
  return last ? Number(last[1]) : null;
}

async function fetchAllPages<T>(path: string, token: string) {
  const items: T[] = [];
  let page = 1;

  while (true) {
    const separator = path.includes("?") ? "&" : "?";
    const { data, headers: responseHeaders } = await githubJson<T[]>(
      `${path}${separator}page=${page}`,
      token
    );

    items.push(...data);

    const lastPage = getLastPage(responseHeaders.get("link"));
    if (lastPage ? page >= lastPage : data.length < 100) {
      break;
    }

    page += 1;
  }

  return items;
}

function getCommitCountFromLink(linkHeader: string | null, currentPageLength: number) {
  const lastPage = getLastPage(linkHeader);
  if (lastPage) return lastPage;
  return currentPageLength;
}

async function getCommitCount(repo: GithubRepo, username: string, token: string) {
  const owner = encodeURIComponent(repo.owner.login);
  const repoName = encodeURIComponent(repo.name);
  const author = encodeURIComponent(username);
  const response = await githubResponse(
    `/repos/${owner}/${repoName}/commits?author=${author}&per_page=1`,
    token
  );

  if (response.status === 409 || response.status === 404) return 0;
  if (!response.ok) return 0;

  const commits = (await response.json()) as unknown[];
  return getCommitCountFromLink(response.headers.get("link"), commits.length);
}

function normalizeUrl(value?: string | null) {
  if (!value) return undefined;
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function getPayloadUrl(payload: unknown) {
  if (!payload || typeof payload !== "object") return undefined;
  const value = (payload as { web_url?: unknown; url?: unknown }).web_url ?? (payload as { url?: unknown }).url;
  return typeof value === "string" ? normalizeUrl(value) : undefined;
}

async function getProductionUrl(repo: GithubRepo, token: string) {
  const homepage = normalizeUrl(repo.homepage);
  if (homepage) return homepage;

  const owner = encodeURIComponent(repo.owner.login);
  const repoName = encodeURIComponent(repo.name);
  const deploymentsPath = `/repos/${owner}/${repoName}/deployments?environment=production&per_page=5`;
  const deploymentsResponse = await githubResponse(deploymentsPath, token);

  if (!deploymentsResponse.ok) return undefined;

  const deployments = (await deploymentsResponse.json()) as GithubDeployment[];

  for (const deployment of deployments) {
    const statusesPath = `/repos/${owner}/${repoName}/deployments/${deployment.id}/statuses?per_page=5`;
    const statusesResponse = await githubResponse(statusesPath, token);

    if (!statusesResponse.ok) continue;

    const statuses = (await statusesResponse.json()) as GithubDeploymentStatus[];
    const successfulStatus = statuses.find((status) => status.state === "success");
    const statusUrl =
      normalizeUrl(successfulStatus?.environment_url) ?? normalizeUrl(successfulStatus?.target_url);

    if (statusUrl) return statusUrl;

    const payloadUrl = getPayloadUrl(deployment.payload);
    if (payloadUrl) return payloadUrl;
  }

  return undefined;
}

async function getExcludedOwnerLogins(repos: GithubRepo[], token: string) {
  const organizationOwners = Array.from(
    new Set(
      repos
        .filter((repo) => repo.owner.type === "Organization" || isExcludedOwner(repo.owner.login))
        .map((repo) => repo.owner.login)
    )
  );

  const matches = await mapLimit(organizationOwners, 4, async (login) => {
    if (isExcludedOwner(login)) return ownerKey(login);

    const response = await githubResponse(`/orgs/${encodeURIComponent(login)}`, token);
    if (!response.ok) return undefined;

    const organization = (await response.json()) as GithubOrganization;
    return isExcludedOwner(organization.login) || isExcludedOwner(organization.name ?? "")
      ? ownerKey(login)
      : undefined;
  });

  return new Set(matches.filter((login): login is string => Boolean(login)));
}

async function getRepo(fullName: string, token: string) {
  const response = await githubResponse(`/repos/${fullName}`, token);
  if (!response.ok) return undefined;
  return (await response.json()) as GithubRepo;
}

async function getCuratedRepos(repos: GithubRepo[], token: string) {
  const repoMap = new Map(repos.map((repo) => [repoKey(repo.full_name), repo]));
  const missing = CURATED_REPOS.filter((fullName) => !repoMap.has(repoKey(fullName)));
  const fetchedRepos = await mapLimit(missing, 4, (fullName) => getRepo(fullName, token));

  fetchedRepos.forEach((repo) => {
    if (repo) repoMap.set(repoKey(repo.full_name), repo);
  });

  return CURATED_REPOS.map((fullName) => repoMap.get(repoKey(fullName))).filter(
    (repo): repo is GithubRepo => Boolean(repo)
  );
}

async function mapLimit<T, U>(
  items: T[],
  limit: number,
  mapper: (item: T) => Promise<U>
) {
  const results: U[] = [];

  for (let index = 0; index < items.length; index += limit) {
    const batch = items.slice(index, index + limit);
    results.push(...(await Promise.all(batch.map(mapper))));
  }

  return results;
}

function toProject(repo: GithubRepo, commitCount: number, productionUrl?: string): PortfolioProject {
  const override = PROJECT_OVERRIDES[repo.full_name];
  const resolvedProductionUrl = override?.productionUrl ?? productionUrl;
  const isPrivate = override?.private !== undefined ? override.private : repo.private;
  const fallbackDescription = repo.description || "Repository pulled from GitHub activity.";
  const fallbackBullets = [
    `${commitCount} commits by me`,
    `Last push: ${repo.pushed_at ?? repo.updated_at}`,
    isPrivate ? "Private repository" : "Public repository",
  ];

  return {
    id: repo.id,
    name: repo.name,
    displayName: override?.displayName ?? repo.name,
    fullName: repo.full_name,
    badgeEn: override?.badgeEn,
    badgeEs: override?.badgeEs,
    badgeColor: override?.badgeColor,
    description: override?.descriptionEn ?? fallbackDescription,
    descriptionEn: override?.descriptionEn ?? fallbackDescription,
    descriptionEs: override?.descriptionEs ?? fallbackDescription,
    categoryEn: override?.categoryEn ?? (repo.language ? `${repo.language} repository` : "Repository"),
    categoryEs: override?.categoryEs ?? (repo.language ? `Repositorio ${repo.language}` : "Repositorio"),
    bulletsEn: override?.bulletsEn ?? fallbackBullets,
    bulletsEs: override?.bulletsEs ?? fallbackBullets,
    roleEn: override?.roleEn,
    roleEs: override?.roleEs,
    repoUrl: isPrivate ? undefined : repo.html_url,
    productionUrl: resolvedProductionUrl,
    private: isPrivate,
    language: repo.language,
    topics: Array.from(new Set([...(override?.tags ?? []), ...(repo.topics ?? [])])),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    pushedAt: repo.pushed_at,
    updatedAt: repo.updated_at,
    commitCount,
  };
}

export async function getGithubPortfolioProjects(limit = 9): Promise<GithubProjectsPayload> {
  const token = getToken();
  const generatedAt = new Date().toISOString();

  if (!token) {
    return {
      status: "missing-token",
      generatedAt,
      totalRepos: 0,
      totalAfterFilter: 0,
      excludedOwner: EXCLUDED_OWNER,
      projects: [],
      message: "Missing GITHUB_TOKEN in .env.local.",
    };
  }

  const { data: user } = await githubJson<GithubUser>("/user", token);
  const username = process.env.GITHUB_USERNAME?.trim() || user.login;
  const repos = await fetchAllPages<GithubRepo>(
    "/user/repos?affiliation=owner,collaborator,organization_member&visibility=all&sort=updated&per_page=100",
    token
  );
  const curatedRepos = await getCuratedRepos(repos, token);
  const excludedOwnerLogins = await getExcludedOwnerLogins(repos, token);
  const denylist = new Set(DENYLIST_REPOS.map(repoKey));

  const eligibleRepos = curatedRepos.filter(
    (repo) =>
      !repo.archived &&
      !repo.disabled &&
      !denylist.has(repoKey(repo.full_name)) &&
      !excludedOwnerLogins.has(ownerKey(repo.owner.login))
  );

  const rankedRepos = await mapLimit(eligibleRepos, 6, async (repo) => ({
    repo,
    commitCount: await getCommitCount(repo, username, token),
  }));

  const priority = new Map(CURATED_REPOS.map((fullName, index) => [repoKey(fullName), index]));
  const selectedRepos = rankedRepos
    .sort((a, b) => (priority.get(repoKey(a.repo.full_name)) ?? 999) - (priority.get(repoKey(b.repo.full_name)) ?? 999))
    .slice(0, limit);

  const projects = await mapLimit(selectedRepos, 4, async ({ repo, commitCount }) => {
    const productionUrl = await getProductionUrl(repo, token);
    return toProject(repo, commitCount, productionUrl);
  });

  return {
    status: "ok",
    generatedAt,
    username,
    totalRepos: repos.length,
    totalAfterFilter: eligibleRepos.length,
    excludedOwner: EXCLUDED_OWNER,
    projects,
  };
}
