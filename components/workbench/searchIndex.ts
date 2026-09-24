import { ROUTE_FILES } from "@/lib/workspace";

export interface IndexedLine {
  href: string;
  file: string;
  text: string;
}

const CONTENT_SELECTOR = "[data-editor-content]";
let cache: Promise<IndexedLine[]> | null = null;

function collectLines(root: Element | Document, href: string, file: string): IndexedLine[] {
  const doc = root.ownerDocument ?? (root as Document);
  root.querySelectorAll?.("script, style, noscript, svg, template").forEach((node) => node.remove());
  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const seen = new Set<string>();
  const lines: IndexedLine[] = [];

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (parent?.closest("script, style, noscript, svg, template")) continue;
    const text = (node.textContent ?? "").replace(/\s+/g, " ").trim();
    if (text.length < 3 || !/[\p{L}\p{N}]/u.test(text) || seen.has(text)) continue;
    seen.add(text);
    lines.push({ href, file, text });
  }
  return lines;
}

async function indexRoute(href: string, file: string): Promise<IndexedLine[]> {
  try {
    const response = await fetch(href, { headers: { Accept: "text/html" } });
    if (!response.ok) return [];
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const root = doc.querySelector(CONTENT_SELECTOR) ?? doc.body;
    return collectLines(root, href, file);
  } catch {
    return [];
  }
}

interface ProjectLike {
  displayName: string;
  descriptionEn: string;
  descriptionEs: string;
  categoryEn: string;
  categoryEs: string;
  bulletsEn: string[];
  bulletsEs: string[];
  tags?: string[];
  topics?: string[];
  language?: string | null;
}

async function indexProjects(): Promise<IndexedLine[]> {
  try {
    const response = await fetch("/api/github/projects?limit=12");
    if (!response.ok) return [];
    const payload = (await response.json()) as { projects?: ProjectLike[] };
    return (payload.projects ?? []).flatMap((project) =>
      [
        project.displayName,
        `${project.displayName} — ${project.categoryEn}`,
        `${project.displayName} — ${project.categoryEs}`,
        project.descriptionEn,
        project.descriptionEs,
        ...project.bulletsEn,
        ...project.bulletsEs,
        [project.language, ...(project.topics ?? [])].filter(Boolean).join(" · "),
      ]
        .filter((text): text is string => Boolean(text && text.trim().length > 2))
        .map((text) => ({ href: "/projects", file: "projects.tsx", text }))
    );
  } catch {
    return [];
  }
}

/** Builds (once) a text index of every page by reading its server-rendered HTML. */
export function loadIndex(): Promise<IndexedLine[]> {
  if (!cache) {
    cache = Promise.all([
      ...ROUTE_FILES.map((file) => indexRoute(file.href!, file.name)),
      indexProjects(),
    ]).then((groups) => groups.flat());
  }
  return cache;
}

/** Text of the page currently on screen (already in the active language). */
export function liveLines(href: string, file: string): IndexedLine[] {
  const root = document.querySelector(CONTENT_SELECTOR);
  if (!root) return [];
  return collectLines(root.cloneNode(true) as Element, href, file);
}

export function normalize(value: string) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}
