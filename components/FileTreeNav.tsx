"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useState, useEffect } from "react";
import { usePreferences } from "./PreferencesProvider";

type TreeNode = TreeFolder | TreeFile;

interface TreeFolder {
  type: "folder";
  name: string;
  open?: boolean;
  children: TreeNode[];
}

interface TreeFile {
  type: "file";
  name: string;
  ext: string;
  href?: string;
  external?: boolean;
}

const TREE: TreeNode[] = [
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
          { type: "file", name: "page.tsx", ext: "tsx", href: "/" },
          { type: "file", name: "projects.tsx", ext: "tsx", href: "/projects" },
          { type: "file", name: "stack.tsx", ext: "tsx", href: "/stack" },
          { type: "file", name: "certifications.tsx", ext: "tsx", href: "/certifications" },
          { type: "file", name: "contact.tsx", ext: "tsx", href: "/contact" },
        ],
      },
      {
        type: "folder",
        name: "components",
        open: false,
        children: [
          { type: "file", name: "Hero.tsx", ext: "tsx" },
          { type: "file", name: "TechStack.tsx", ext: "tsx" },
          { type: "file", name: "ProjectCard.tsx", ext: "tsx" },
          { type: "file", name: "GithubProjectsGrid.tsx", ext: "tsx" },
          { type: "file", name: "ContactLinks.tsx", ext: "tsx" },
        ],
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
              { type: "file", name: "CV.pdf", ext: "pdf", href: "/assets/CV.pdf", external: true },
              {
                type: "folder",
                name: "certificaciones",
                open: true,
                children: [
                  { type: "file", name: "VCFI9.pdf", ext: "pdf", href: "/assets/certificaciones/VCFI9.pdf", external: true },
                  { type: "file", name: "VMware Vsphere Install.pdf", ext: "pdf", href: "/assets/certificaciones/VMware Vsphere Install.pdf", external: true },
                  { type: "file", name: "Vmware Vsphere with Tanzu.pdf", ext: "pdf", href: "/assets/certificaciones/Vmware Vsphere with Tanzu.pdf", external: true },
                  { type: "file", name: "monorepos-v2.pdf", ext: "pdf", href: "/assets/certificaciones/monorepos-v2.pdf", external: true },
                  { type: "file", name: "intermediate-typescript-v2.pdf", ext: "pdf", href: "/assets/certificaciones/intermediate-typescript-v2.pdf", external: true },
                  { type: "file", name: "typescript-v4.pdf", ext: "pdf", href: "/assets/certificaciones/typescript-v4.pdf", external: true },
                  { type: "file", name: "Diseño de interfaces Intecap.pdf", ext: "pdf", href: "/assets/certificaciones/Diseño de interfaces Intecap.pdf", external: true },
                  { type: "file", name: "complete-intro-containers-dark.pdf", ext: "pdf", href: "/assets/certificaciones/complete-intro-containers-dark.pdf", external: true },
                  { type: "file", name: "enterprise-typescript-dark.pdf", ext: "pdf", href: "/assets/certificaciones/enterprise-typescript-dark.pdf", external: true },
                  { type: "file", name: "fullstack-typescript-dark.pdf", ext: "pdf", href: "/assets/certificaciones/fullstack-typescript-dark.pdf", external: true },
                  { type: "file", name: "complete-go-dark.pdf", ext: "pdf", href: "/assets/certificaciones/complete-go-dark.pdf", external: true },
                  { type: "file", name: "vue-fundamentals-dark.pdf", ext: "pdf", href: "/assets/certificaciones/vue-fundamentals-dark.pdf", external: true },
                  { type: "file", name: "Complete Intro to Vue 3 Workshop (FEM).pdf", ext: "pdf", href: "/assets/certificaciones/Complete Intro to Vue 3 Workshop (FEM).pdf", external: true },
                ],
              },
              { type: "file", name: "pic.jpeg", ext: "jpeg" },
            ],
          },
        ],
      },
      {
        type: "folder",
        name: "lib",
        open: false,
        children: [{ type: "file", name: "github.ts", ext: "ts" }],
      },
      { type: "file", name: "package.json", ext: "json" },
      { type: "file", name: ".env.local", ext: "env" },
      { type: "file", name: "README.md", ext: "md" },
    ],
  },
];

const FILE_BADGES: Record<string, { label: string; color: string }> = {
  tsx: { label: "TSX", color: "#6aa6ff" },
  ts: { label: "TS", color: "#818cf8" },
  json: { label: "JSN", color: "#fbbf24" },
  md: { label: "MD", color: "#9ca3af" },
  env: { label: "ENV", color: "#facc15" },
  pdf: { label: "PDF", color: "#f87171" },
  jpeg: { label: "IMG", color: "#4ade80" },
};

function isActivePath(pathname: string, href?: string) {
  if (!href || href.startsWith("/assets")) return false;
  return href === "/" ? pathname === "/" : pathname === href;
}

function FolderIcon() {
  return (
    <svg width="14" height="12" viewBox="0 0 16 14" fill="currentColor" aria-hidden="true">
      <path d="M1.5 1C.67 1 0 1.67 0 2.5v9C0 12.33.67 13 1.5 13h13c.83 0 1.5-.67 1.5-1.5v-7C16 3.67 15.33 3 14.5 3H8L6.5 1h-5Z" />
    </svg>
  );
}

function TreeBranch({
  nodes,
  depth,
  pathname,
}: {
  nodes: TreeNode[];
  depth: number;
  pathname: string;
}) {
  return (
    <>
      {nodes.map((node) =>
        node.type === "folder" ? (
          <TreeFolderNode key={`${depth}-${node.name}`} node={node} depth={depth} pathname={pathname} />
        ) : (
          <TreeFileNode key={`${depth}-${node.name}`} node={node} depth={depth} pathname={pathname} />
        )
      )}
    </>
  );
}

function TreeFolderNode({
  node,
  depth,
  pathname,
}: {
  node: TreeFolder;
  depth: number;
  pathname: string;
}) {
  const [open, setOpen] = useState(node.open !== false);

  return (
    <div>
      <button
        type="button"
        className="ft-row ft-row--folder"
        style={{ paddingLeft: depth * 16 + 10 }}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={clsx("ft-chevron", open && "ft-open")} aria-hidden="true">
          &gt;
        </span>
        <span className="ft-icon ft-folder-icon">
          <FolderIcon />
        </span>
        <span className="ft-name ft-name--folder">{node.name}</span>
      </button>
      <div className={clsx("ft-children", open && "ft-open")}>
        <TreeBranch nodes={node.children} depth={depth + 1} pathname={pathname} />
      </div>
    </div>
  );
}

function TreeFileNode({
  node,
  depth,
  pathname,
}: {
  node: TreeFile;
  depth: number;
  pathname: string;
}) {
  const badge = FILE_BADGES[node.ext] ?? { label: node.ext.toUpperCase(), color: "#9ca3af" };
  const active = isActivePath(pathname, node.href);
  const className = clsx("ft-row ft-row--file", active && "ft-active", node.href && "ft-clickable");
  const content = (
    <>
      <span className="ft-sym" style={{ color: badge.color }}>
        {badge.label}
      </span>
      <span className={clsx("ft-name", active && "ft-name--active")}>{node.name}</span>
      <span className="ft-hover-dot" />
    </>
  );

  if (node.href) {
    if (node.external) {
      return (
        <a
          className={className}
          style={{ paddingLeft: depth * 16 + 10 }}
          href={node.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }

    return (
      <Link className={className} style={{ paddingLeft: depth * 16 + 10 }} href={node.href}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className} style={{ paddingLeft: depth * 16 + 10 }}>
      {content}
    </div>
  );
}

export default function FileTreeNav() {
  const pathname = usePathname();
  const { locale } = usePreferences();
  const [showGuide, setShowGuide] = useState(false);
  const [layoutState, setLayoutState] = useState<"normal" | "collapsed" | "minimized" | "expanded">("normal");

  useEffect(() => {
    const guideHidden = localStorage.getItem("portfolio-nav-guide") === "hidden";
    if (!guideHidden) {
      setShowGuide(true);
    }
  }, []);

  const dismissGuide = () => {
    setShowGuide(false);
    localStorage.setItem("portfolio-nav-guide", "hidden");
  };

  if (layoutState === "collapsed") {
    return (
      <div 
        onClick={() => setLayoutState("normal")}
        className="ft-panel !w-[54px] min-h-[360px] flex flex-col items-center py-4 cursor-pointer hover:bg-white/[0.02] border border-[var(--line)] rounded-[var(--radius)] transition-all duration-300 select-none group"
        title={locale === "en" ? "Expand Explorer" : "Expandir Explorador"}
      >
        <div className="flex flex-col gap-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-accent opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-fg-mute group-hover:text-fg transition-colors">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          <span className="font-mono text-[9px] text-fg-mute group-hover:text-fg transition-colors uppercase tracking-[0.2em] [writing-mode:vertical-lr] select-none">
            {locale === "en" ? "EXPLORER" : "EXPLORADOR"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <nav 
      className={clsx(
        "ft-panel transition-all duration-300",
        layoutState === "minimized" && "!min-h-0",
        layoutState === "expanded" && "!min-h-[calc(100vh-80px)]"
      )}
      aria-label="Portfolio file tree"
    >
      <div className="ft-header">
        <div className="ft-dots" aria-hidden="true">
          <button 
            type="button"
            onClick={() => setLayoutState("collapsed")} 
            className="ft-dot ft-dot-red" 
            title={locale === "en" ? "Collapse" : "Colapsar"}
          />
          <button 
            type="button"
            onClick={() => setLayoutState(layoutState === "minimized" ? "normal" : "minimized")} 
            className="ft-dot ft-dot-yellow" 
            title={locale === "en" ? "Minimize" : "Minimizar"}
          />
          <button 
            type="button"
            onClick={() => setLayoutState(layoutState === "expanded" ? "normal" : "expanded")} 
            className="ft-dot ft-dot-green" 
            title={locale === "en" ? "Expand" : "Expandir"}
          />
        </div>
        <span className="ft-label">explorer</span>
      </div>
      {layoutState !== "minimized" && (
        <div className="ft-body">
          {showGuide && (
            <div className="mx-3.5 mb-3 p-3 bg-[rgba(106,166,255,0.08)] border border-[rgba(106,166,255,0.18)] rounded-lg relative flex flex-col gap-1.5 z-10">
              <span className="text-[10px] font-mono text-blue-accent font-bold uppercase tracking-wider">
                {locale === "en" ? "💡 Navigation Tip" : "💡 Consejo de Navegación"}
              </span>
              <p className="text-[11.5px] text-fg-dim leading-normal m-0 pr-4">
                {locale === "en" 
                  ? "Click on the .tsx files (page, projects, stack, certifications, contact) below to explore the different pages of my portfolio!" 
                  : "¡Haz clic en los archivos .tsx (page, projects, stack, certifications, contact) de abajo para explorar las diferentes páginas de mi portafolio!"}
              </p>
              <button 
                onClick={dismissGuide}
                className="absolute top-2.5 right-2.5 text-fg-mute hover:text-fg text-[11px] font-mono cursor-pointer border-none bg-transparent p-0 leading-none"
              >
                ✕
              </button>
            </div>
          )}
          <TreeBranch nodes={TREE} depth={0} pathname={pathname} />
        </div>
      )}
    </nav>
  );
}
