"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { usePreferences } from "../../PreferencesProvider";
import { useWorkbench } from "../WorkbenchProvider";
import { ChevronIcon, CloseIcon, CollapseIcon, ExternalIcon, FolderIcon } from "../icons";
import {
  FILE_BADGES,
  WORKSPACE_TREE,
  fileForRoute,
  t,
  type WorkspaceFile,
  type WorkspaceFolder,
  type WorkspaceNode,
} from "@/lib/workspace";

export function FileBadge({ ext }: { ext: string }) {
  const badge = FILE_BADGES[ext] ?? { label: ext.toUpperCase(), color: "#9ca3af" };
  return (
    <span className="ft-sym" style={{ color: badge.color }}>
      {badge.label}
    </span>
  );
}

function Branch({ nodes, depth, collapseSignal }: { nodes: WorkspaceNode[]; depth: number; collapseSignal: number }) {
  return (
    <>
      {nodes.map((node) =>
        node.type === "folder" ? (
          <FolderRow key={node.name} node={node} depth={depth} collapseSignal={collapseSignal} />
        ) : (
          <FileRow key={node.name} node={node} depth={depth} />
        )
      )}
    </>
  );
}

function FolderRow({ node, depth, collapseSignal }: { node: WorkspaceFolder; depth: number; collapseSignal: number }) {
  const [open, setOpen] = useState(node.open !== false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- "collapse all" from the view header
    if (collapseSignal > 0 && depth > 0) setOpen(false);
  }, [collapseSignal, depth]);

  return (
    <div>
      <button
        type="button"
        className="ft-row ft-row--folder"
        style={{ paddingLeft: depth * 12 + 8 }}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <ChevronIcon size={12} className={clsx("ft-chevron", open && "ft-open")} />
        <span className="ft-icon ft-folder-icon">
          <FolderIcon />
        </span>
        <span className="ft-name ft-name--folder">{node.name}</span>
      </button>
      {open && (
        <div className="ft-children ft-open" style={{ ["--guide-left" as string]: `${depth * 12 + 14}px` }}>
          <Branch nodes={node.children} depth={depth + 1} collapseSignal={collapseSignal} />
        </div>
      )}
    </div>
  );
}

function FileRow({ node, depth }: { node: WorkspaceFile; depth: number }) {
  const pathname = usePathname();
  const { openFile, editorEmpty } = useWorkbench();
  const active = node.kind === "route" && node.href === pathname && !editorEmpty;

  return (
    <button
      type="button"
      className={clsx("ft-row ft-row--file ft-clickable", active && "ft-active")}
      style={{ paddingLeft: depth * 12 + 20 }}
      onClick={() => openFile(node)}
      title={node.kind === "source" ? "Open on GitHub" : node.name}
    >
      <FileBadge ext={node.ext} />
      <span className={clsx("ft-name", active && "ft-name--active")}>{node.name}</span>
      {node.kind === "source" && <ExternalIcon className="ft-ext-icon" />}
    </button>
  );
}

function Section({
  title,
  defaultOpen = true,
  actions,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="wb-section">
      <div className="wb-section-header">
        <button type="button" className="wb-section-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
          <ChevronIcon size={12} className={clsx("ft-chevron", open && "ft-open")} />
          <span>{title}</span>
        </button>
        {open && actions && <div className="wb-section-actions">{actions}</div>}
      </div>
      {open && children}
    </section>
  );
}

export { Section };

export default function ExplorerView() {
  const { locale } = usePreferences();
  const { tabs, openFile, closeTab, editorEmpty } = useWorkbench();
  const pathname = usePathname();
  const [collapseSignal, setCollapseSignal] = useState(0);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read dismissed flag once
      setShowGuide(localStorage.getItem("portfolio-nav-guide") !== "hidden");
    } catch {
      setShowGuide(true);
    }
  }, []);

  const dismissGuide = () => {
    setShowGuide(false);
    try {
      localStorage.setItem("portfolio-nav-guide", "hidden");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="ft-body">
      <Section title={t(locale, "Open Editors", "Editores abiertos")} defaultOpen={false}>
        <div className="wb-open-editors">
          {tabs.length === 0 && <p className="wb-empty-note">{t(locale, "No open editors", "No hay editores abiertos")}</p>}
          {tabs.map((href) => {
            const file = fileForRoute(href);
            if (!file) return null;
            const active = href === pathname && !editorEmpty;
            return (
              <div key={href} className={clsx("ft-row ft-row--file ft-clickable wb-open-editor", active && "ft-active")}>
                <button type="button" className="wb-open-editor-main" onClick={() => openFile(file)}>
                  <FileBadge ext={file.ext} />
                  <span className={clsx("ft-name", active && "ft-name--active")}>{file.name}</span>
                  <span className="wb-open-editor-path">app</span>
                </button>
                <button type="button" className="wb-icon-btn" onClick={() => closeTab(href)} aria-label={`Close ${file.name}`}>
                  <CloseIcon size={12} />
                </button>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        title="Portfolio"
        actions={
          <button
            type="button"
            className="wb-icon-btn"
            onClick={() => setCollapseSignal((n) => n + 1)}
            title={t(locale, "Collapse Folders", "Contraer carpetas")}
            aria-label={t(locale, "Collapse folders", "Contraer carpetas")}
          >
            <CollapseIcon size={14} />
          </button>
        }
      >
        {showGuide && (
          <div className="wb-tip">
            <span className="wb-tip-title">{t(locale, "💡 Navigation tip", "💡 Consejo de navegación")}</span>
            <p>
              {t(
                locale,
                "Open the .tsx files in app/ to browse the pages. Try Ctrl+P to jump to a file or Ctrl+` for the terminal.",
                "Abre los archivos .tsx de app/ para ver las páginas. Prueba Ctrl+P para saltar a un archivo o Ctrl+` para la terminal."
              )}
            </p>
            <button type="button" onClick={dismissGuide} aria-label="Dismiss">
              ✕
            </button>
          </div>
        )}
        <Branch nodes={(WORKSPACE_TREE[0] as WorkspaceFolder).children} depth={0} collapseSignal={collapseSignal} />
      </Section>
    </div>
  );
}
