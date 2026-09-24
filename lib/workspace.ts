/**
 * Virtual workspace shown in the IDE-style workbench.
 * The tree mirrors the real repo, but each file knows how it opens:
 * - route:   a page of the portfolio, opens as an editor tab
 * - pdf:     opens in the PDF viewer tab
 * - image:   opens in the image viewer tab
 * - source:  opens the real file on GitHub
 * - terminal: prints its contents in the integrated terminal (`cat`)
 */

export const REPO_URL = "https://github.com/asanabria-2021067/portfolio";
export const GITHUB_PROFILE = "https://github.com/asanabria-2021067";
export const LINKEDIN_URL = "https://www.linkedin.com/in/angel-sanabria-desarrollador/";
export const EMAIL = "as1945228@gmail.com";
export const CV_PATH = "/assets/CV.pdf";

export type FileKind = "route" | "pdf" | "image" | "source" | "terminal";

export interface WorkspaceFile {
  type: "file";
  name: string;
  ext: string;
  kind?: FileKind;
  href?: string;
}

export interface WorkspaceFolder {
  type: "folder";
  name: string;
  open?: boolean;
  children: WorkspaceNode[];
}

export type WorkspaceNode = WorkspaceFile | WorkspaceFolder;

export interface FlatFile extends WorkspaceFile {
  path: string;
}

const CERTS = [
  "AngelSanabria-CCNA1 IN4BM-certificate-2.pdf",
  "certificate claude code.pdf",
  "Complete Intro to Vue 3 Workshop (FEM).pdf",
  "complete-go-dark.pdf",
  "complete-intro-containers-dark.pdf",
  "diploma-frontend-developer-practico.pdf",
  "diploma-git-github.pdf",
  "diploma-html-css-2020.pdf",
  "diploma-python-fundamentos.pdf",
  "Diseño de interfaces Intecap.pdf",
  "enterprise-typescript-dark.pdf",
  "fullstack-typescript-dark.pdf",
  "intermediate-typescript-v2.pdf",
  "monorepos-v2.pdf",
  "typescript-v4.pdf",
  "VCFI9.pdf",
  "Vmware Cloud Foundation Build Manage and Secure.pdf",
  "VMware Vsphere Install.pdf",
  "Vmware Vsphere with Tanzu.pdf",
  "vue-fundamentals-dark.pdf",
];

const source = (path: string): string => `${REPO_URL}/blob/main/${path}`;

export const WORKSPACE_TREE: WorkspaceNode[] = [
  {
    type: "folder",
    name: "portfolio",
    open: true,
    children: [
      {
        type: "folder",
        name: "app",
        open: true,
        children: [
          { type: "file", name: "page.tsx", ext: "tsx", kind: "route", href: "/" },
          { type: "file", name: "projects.tsx", ext: "tsx", kind: "route", href: "/projects" },
          { type: "file", name: "stack.tsx", ext: "tsx", kind: "route", href: "/stack" },
          { type: "file", name: "certifications.tsx", ext: "tsx", kind: "route", href: "/certifications" },
          { type: "file", name: "activity.tsx", ext: "tsx", kind: "route", href: "/activity" },
          { type: "file", name: "contact.tsx", ext: "tsx", kind: "route", href: "/contact" },
        ],
      },
      {
        type: "folder",
        name: "components",
        open: false,
        children: ["Hero.tsx", "TechStack.tsx", "ProjectCard.tsx", "GithubProjectsGrid.tsx", "ContactLinks.tsx"].map(
          (name) => ({ type: "file", name, ext: "tsx", kind: "source", href: source(`components/${name}`) })
        ),
      },
      {
        type: "folder",
        name: "public",
        open: true,
        children: [
          {
            type: "folder",
            name: "assets",
            open: true,
            children: [
              { type: "file", name: "CV.pdf", ext: "pdf", kind: "pdf", href: CV_PATH },
              {
                type: "folder",
                name: "certificaciones",
                open: false,
                children: CERTS.map((name) => ({
                  type: "file",
                  name,
                  ext: "pdf",
                  kind: "pdf",
                  href: `/assets/certificaciones/${name}`,
                })),
              },
              { type: "file", name: "pic.jpeg", ext: "jpeg", kind: "image", href: "/assets/pic.jpeg" },
            ],
          },
        ],
      },
      {
        type: "folder",
        name: "lib",
        open: false,
        children: [{ type: "file", name: "github.ts", ext: "ts", kind: "source", href: source("lib/github.ts") }],
      },
      { type: "file", name: "package.json", ext: "json", kind: "terminal" },
      { type: "file", name: ".env.local", ext: "env", kind: "terminal" },
      { type: "file", name: "README.md", ext: "md", kind: "terminal" },
    ],
  },
];

export const FILE_BADGES: Record<string, { label: string; color: string }> = {
  tsx: { label: "TSX", color: "#6aa6ff" },
  ts: { label: "TS", color: "#818cf8" },
  json: { label: "{ }", color: "#fbbf24" },
  md: { label: "MD", color: "#9ca3af" },
  env: { label: "ENV", color: "#facc15" },
  pdf: { label: "PDF", color: "#f87171" },
  jpeg: { label: "IMG", color: "#4ade80" },
};

export const LANGUAGE_LABEL: Record<string, string> = {
  tsx: "TypeScript JSX",
  ts: "TypeScript",
  json: "JSON",
  md: "Markdown",
  env: "Properties",
  pdf: "PDF",
  jpeg: "Image",
  jpg: "Image",
  png: "Image",
};

function flatten(nodes: WorkspaceNode[], parent: string, out: FlatFile[]) {
  for (const node of nodes) {
    const path = parent ? `${parent}/${node.name}` : node.name;
    if (node.type === "folder") flatten(node.children, path, out);
    else out.push({ ...node, path });
  }
  return out;
}

export const ALL_FILES: FlatFile[] = flatten(WORKSPACE_TREE, "", []);

export const ROUTE_FILES: FlatFile[] = ALL_FILES.filter((file) => file.kind === "route");

export function fileForRoute(pathname: string): FlatFile | undefined {
  return ROUTE_FILES.find((file) => file.href === pathname);
}

export function t(locale: "en" | "es", en: string, es: string) {
  return locale === "en" ? en : es;
}
