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
      "Frontend built in React using React Leaflet for interactive maps, custom markers, and heatmaps of marine species in danger of extinction.",
    descriptionEs:
      "Frontend en React usando React Leaflet con mapas interactivos, marcadores personalizados y mapas de calor de especies marinas en peligro de extinción.",
    bulletsEn: ["React interface for marine tracking", "Interactive maps with React Leaflet", "Heatmap visualization of species distribution"],
    bulletsEs: ["Interfaz en React para el rastreo marino", "Mapas interactivos con React Leaflet", "Visualización de mapa de calor de distribución de especies"],
    tags: ["React", "React Leaflet", "Frontend", "SDG 14"],
  },
  "asanabria-2021067/api-rest-python": {
    displayName: "SeaSOS Backend",
    categoryEn: "Marine conservation API",
    categoryEs: "API de conservacion marina",
    descriptionEn:
      "Python REST API built with Flask to serve data and backend processes for the SeaSOS platform.",
    descriptionEs:
      "API REST en Python construida con Flask para servir datos y procesos backend para la plataforma SeaSOS.",
    bulletsEn: ["Flask REST API", "Endpoints for species tracking", "Backend logic"],
    bulletsEs: ["API REST con Flask", "Endpoints para rastreo de especies", "Lógica del backend"],
    tags: ["Flask", "Python", "API", "Backend"],
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
    tags: ["Vue", "Docker", "PostgreSQL", "Frontend"],
  },
  "asanabria-2021067/frontend-quimica": {
    displayName: "Chemical Engineering Portal Frontend",
    badgeEn: "Technical Lead",
    badgeEs: "Líder Técnico",
    badgeColor: "gold",
    productionUrl: "https://portal-chemiq.netlify.app/",
    categoryEn: "Student association portal",
    categoryEs: "Portal de asociacion estudiantil",
    descriptionEn:
      "Portal frontend for the Chemical Engineering Student Association. I coordinated this project as Technical Lead, managing tasks, stack, and stakeholders.",
    descriptionEs:
      "Frontend del portal para la Asociación de Estudiantes de Ingeniería Química. Coordiné el proyecto como Líder Técnico, gestionando tareas, stack e interesados.",
    bulletsEn: ["React frontend application", "Coordinated project as Technical Lead", "Defined tasks, stack, and stakeholder alignment"],
    bulletsEs: ["Aplicación frontend en React", "Coordinación del proyecto como Líder Técnico", "Definición de tareas, stack y alineación de interesados"],
    roleEn: "Technical Lead",
    roleEs: "Lider tecnico",
    tags: ["React", "Docker", "Frontend", "Leadership"],
    private: false,
  },
  "asanabria-2021067/chemiq-backend": {
    displayName: "Chemical Engineering Portal Backend",
    badgeEn: "Technical Lead",
    badgeEs: "Líder Técnico",
    badgeColor: "gold",
    categoryEn: "Student association API",
    categoryEs: "API de asociacion estudiantil",
    descriptionEn:
      "Node.js backend for the Chemical Engineering Student Association portal using Express and MongoDB. Coordinated as Technical Lead.",
    descriptionEs:
      "Backend en Node.js para el portal de la Asociación de Estudiantes de Ingeniería Química usando Express y MongoDB. Coordinado como Líder Técnico.",
    bulletsEn: ["Node.js backend API", "MongoDB database integration", "Coordinated backend architecture as Technical Lead"],
    bulletsEs: ["API backend en Node.js", "Integración de base de datos MongoDB", "Coordinación de arquitectura de backend como Líder Técnico"],
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
      "Graphic interface for an IoT plant-care system styled like a Tamagotchi. Includes plant stats and control for a robotic watering arm.",
    descriptionEs:
      "Interfaz gráfica para un sistema IoT de cuidado de plantas al estilo Tamagotchi. Incluye estadísticas de plantas y control para un brazo robótico de riego.",
    bulletsEn: ["Tamagotchi-style plant care UI", "Google Sheets sensor data integration", "Robotic arm watering control interface"],
    bulletsEs: ["UI estilo Tamagotchi para cuidado de plantas", "Integración de datos de sensores con Google Sheets", "Interfaz de control de riego para brazo robótico"],
    tags: ["React", "IoT", "OpenAI", "Frontend"],
  },
  "asanabria-2021067/Smart-Agriculture-Backend": {
    displayName: "Smart Agriculture Backend",
    categoryEn: "AI-powered smart farming API",
    categoryEs: "API de agricultura inteligente",
    descriptionEn:
      "Node.js backend for an IoT smart farming system, processing real-time sensor data and robotic arm controls.",
    descriptionEs:
      "Backend en Node.js para un sistema de agricultura inteligente IoT, que procesa datos de sensores en tiempo real y controles del brazo robótico.",
    bulletsEn: ["Node.js backend API", "Real-time sensor integration", "Robotic arm irrigation control"],
    bulletsEs: ["API backend en Node.js", "Integración de sensores en tiempo real", "Control de riego para brazo robótico"],
    tags: ["Node.js", "IoT", "Backend", "WebSockets"],
  },
  "PabloVS044/TripWise": {
    displayName: "TripWise",
    categoryEn: "AI Travel Planner",
    categoryEs: "Planificador de viajes con IA",
    descriptionEn:
      "Travel reservation app with AI-generated itineraries for planning richer trip experiences.",
    descriptionEs:
      "App para reservas de viajes con itinerarios generados por IA para planificar experiencias completas.",
    bulletsEn: ["AI-powered travel itinerary planning", "Mobile booking experience", "Kotlin & Android stack"],
    bulletsEs: ["Planificación de itinerarios de viaje con IA", "Experiencia de reservas móvil", "Stack Kotlin y Android"],
    tags: ["Kotlin", "Android", "AI", "Mobile"],
  },
  "asanabria-2021067/carpool-app-front": {
    displayName: "Carpool App Frontend",
    categoryEn: "Student Carpool Portal",
    categoryEs: "Portal de Carpool Estudiantil",
    descriptionEn:
      "Carpool application frontend created for Universidad del Valle de Guatemala to optimize traffic and reduce drop-off zone congestion.",
    descriptionEs:
      "Frontend de aplicación de carpool creado para la Universidad del Valle de Guatemala para optimizar el tráfico y reducir la congestión en las zonas de drop-off.",
    bulletsEn: ["React interface for carpooling", "Designed to address university drop-off congestion", "Paired with Node.js backend"],
    bulletsEs: ["Interfaz en React para compartir auto", "Diseñado para mitigar congestión en drop-off universitario", "Conectado con backend en Node.js"],
    tags: ["React", "Frontend", "Carpool", "UVG"],
  },
  "asanabria-2021067/carpool-backend-poo": {
    displayName: "Carpool App Backend",
    categoryEn: "OOP Carpool API",
    categoryEs: "API de Carpool POO",
    descriptionEn:
      "Carpool backend API built using Object-Oriented Programming (OOP) principles in Node.js, Express, and MongoDB.",
    descriptionEs:
      "Backend de carpool construido utilizando principios de Programación Orientada a Objetos (POO) con Node.js, Express y MongoDB.",
    bulletsEn: ["OOP backend design patterns", "Express.js REST endpoints", "MongoDB database"],
    bulletsEs: ["Patrones de diseño de backend POO", "Endpoints REST en Express.js", "Almacenamiento de datos en MongoDB"],
    tags: ["Backend", "Node.js", "Express", "MongoDB", "OOP", "Backend"],
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
    isPrivate ? "Private repository" : "Public repository",
    `Last push: ${repo.pushed_at ?? repo.updated_at}`,
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
