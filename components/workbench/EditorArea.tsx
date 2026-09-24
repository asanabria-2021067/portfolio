"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { usePreferences } from "../PreferencesProvider";
import { useWorkbench } from "./WorkbenchProvider";
import { FileBadge } from "./views/ExplorerView";
import { ChevronIcon, CloseIcon } from "./icons";
import { fileForRoute, t } from "@/lib/workspace";
import PixelPet from "./PixelPet";

function Tabs() {
  const pathname = usePathname();
  const { tabs, openFile, closeTab, editorEmpty } = useWorkbench();
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [pathname, tabs.length]);

  if (tabs.length === 0) return <div className="wb-tabs wb-tabs--empty" />;

  return (
    <div className="wb-tabs" role="tablist">
      {tabs.map((href) => {
        const file = fileForRoute(href);
        if (!file) return null;
        const active = href === pathname && !editorEmpty;
        return (
          <div
            key={href}
            ref={active ? activeRef : undefined}
            role="tab"
            aria-selected={active}
            className={clsx("wb-tab", active && "is-active")}
            onAuxClick={(event) => event.button === 1 && closeTab(href)}
          >
            <button type="button" className="wb-tab-main" onClick={() => openFile(file)}>
              <FileBadge ext={file.ext} />
              <span>{file.name}</span>
            </button>
            <button type="button" className="wb-tab-close" onClick={() => closeTab(href)} aria-label={`Close ${file.name}`}>
              <CloseIcon size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Breadcrumbs() {
  const pathname = usePathname();
  const file = fileForRoute(pathname);
  if (!file) return null;
  const parts = file.path.split("/");
  return (
    <div className="wb-breadcrumbs" aria-label="Breadcrumb">
      {parts.map((part, index) => (
        <span key={part} className="wb-crumb">
          {index === parts.length - 1 ? <FileBadge ext={file.ext} /> : null}
          <span>{part}</span>
          {index < parts.length - 1 && <ChevronIcon size={11} />}
        </span>
      ))}
    </div>
  );
}

function Watermark() {
  const { locale } = usePreferences();
  const { openPalette, setTerminalOpen, showView, openFile } = useWorkbench();

  const items: [string, string, string, () => void][] = [
    [t(locale, "Show All Commands", "Mostrar todos los comandos"), "Ctrl + Shift + P", "", () => openPalette("commands")],
    [t(locale, "Go to File", "Ir a archivo"), "Ctrl + P", "", () => openPalette("files")],
    [t(locale, "Open Home", "Abrir inicio"), "", "", () => openFile("/")],
    [t(locale, "Search in Portfolio", "Buscar en el portafolio"), "Ctrl + Shift + F", "", () => showView("search")],
    [t(locale, "Toggle Terminal", "Mostrar terminal"), "Ctrl + `", "", () => setTerminalOpen(true)],
  ];

  return (
    <div className="wb-watermark">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="" className="wb-watermark-logo" />
      <div className="wb-watermark-list">
        {items.map(([label, keys, , run]) => (
          <button key={label} type="button" onClick={run}>
            <span>{label}</span>
            {keys && (
              <span className="wb-keys">
                {keys.split(" + ").map((key, i) => (
                  <span key={key}>
                    {i > 0 && " + "}
                    <kbd>{key}</kbd>
                  </span>
                ))}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Highlights search matches inside the editor using the CSS Custom Highlight API. */
function useSearchHighlight(container: React.RefObject<HTMLDivElement | null>) {
  const pathname = usePathname();
  const { highlightQuery, highlightLine, editorEmpty } = useWorkbench();
  const { locale } = usePreferences();

  useEffect(() => {
    const registry = typeof CSS !== "undefined" && "highlights" in CSS ? CSS.highlights : null;
    if (!registry) return;
    registry.delete("wb-search");
    registry.delete("wb-search-current");
    const query = highlightQuery.trim().toLowerCase();
    if (!query || editorEmpty) return;

    let scrolledAny = false;
    let scrolledToTarget = false;
    const paint = () => {
      const root = container.current;
      if (!root) return;
      const ranges: Range[] = [];
      let current: Range | undefined;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = (node.textContent ?? "").toLowerCase();
        const isTargetLine = !current && highlightLine && (node.textContent ?? "").replace(/\s+/g, " ").trim() === highlightLine;
        let index = text.indexOf(query);
        while (index !== -1) {
          const range = new Range();
          range.setStart(node, index);
          range.setEnd(node, index + query.length);
          ranges.push(range);
          if (isTargetLine && !current) current = range;
          index = text.indexOf(query, index + query.length);
        }
      }
      registry.set("wb-search", new Highlight(...ranges));
      const target = current ?? ranges[0];
      if (target) {
        registry.set("wb-search-current", new Highlight(target));
        // the clicked line may render later than the first match, so allow one more jump to it
        if ((current && !scrolledToTarget) || !scrolledAny) {
          scrolledAny = true;
          scrolledToTarget = Boolean(current);
          target.startContainer.parentElement?.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }
    };

    // pages animate in and some load data client-side, so paint a few times
    const timers = [250, 900, 2000, 4000].map((delay) => window.setTimeout(paint, delay));
    return () => {
      timers.forEach(window.clearTimeout);
      registry.delete("wb-search");
      registry.delete("wb-search-current");
    };
  }, [highlightQuery, highlightLine, pathname, locale, editorEmpty, container]);
}

export default function EditorArea({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { editorEmpty, zoom, isInstalled } = useWorkbench();
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useSearchHighlight(contentRef);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <section className="wb-editor">
      <style
        // Custom Highlight API pseudo-elements, kept out of the CSS pipeline which can't parse them
        dangerouslySetInnerHTML={{
          __html:
            "::highlight(wb-search){background-color:var(--wb-highlight)}::highlight(wb-search-current){background-color:var(--wb-highlight-current)}",
        }}
      />
      <Tabs />
      {!editorEmpty && <Breadcrumbs />}
      <div className="wb-editor-body">
        <div ref={scrollRef} className={clsx("wb-content", editorEmpty && "is-hidden")}>
          <div ref={contentRef} data-editor-content style={{ zoom }}>
            {children}
          </div>
        </div>
        {editorEmpty && <Watermark />}
        {isInstalled("pixel-pet") && <PixelPet />}
      </div>
    </section>
  );
}
