"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { usePreferences } from "../PreferencesProvider";
import { useWorkbench } from "./WorkbenchProvider";
import { CloseIcon } from "./icons";
import { FileIcon } from "./FileIcon";
import { t } from "@/lib/workspace";
import PixelPets from "./PixelPet";
import PdfViewer, { ImageViewer } from "./PdfViewer";
import Minimap from "./Minimap";
import { Snow, SparkleCursor } from "./Effects";

function Tabs() {
  const { tabs, activeTab, activateTab, closeTab } = useWorkbench();
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeTab?.id, tabs.length]);

  if (tabs.length === 0) return <div className="wb-tabs wb-tabs--empty" />;

  return (
    <div className="wb-tabs" role="tablist">
      {tabs.map((tab) => {
        const active = tab.id === activeTab?.id;
        return (
          <div
            key={tab.id}
            ref={active ? activeRef : undefined}
            role="tab"
            aria-selected={active}
            className={clsx("wb-tab", active && "is-active")}
            onAuxClick={(event) => event.button === 1 && closeTab(tab.id)}
            title={tab.kind === "route" ? `app/${tab.name}` : tab.href}
          >
            <button type="button" className="wb-tab-main" onClick={() => activateTab(tab)}>
              <FileIcon ext={tab.ext} />
              <span>{tab.name}</span>
            </button>
            <button type="button" className="wb-tab-close" onClick={() => closeTab(tab.id)} aria-label={`Close ${tab.name}`}>
              <CloseIcon size={13} />
            </button>
          </div>
        );
      })}
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
  const { highlightQuery, highlightLine, activeTab } = useWorkbench();
  const editorEmpty = activeTab?.kind !== "route";
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
  const { activeTab, zoom, isInstalled } = useWorkbench();
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useSearchHighlight(contentRef);
  const showingPage = activeTab?.kind === "route";
  const minimap = isInstalled("minimap") && showingPage;

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
      <div className={clsx("wb-editor-body", minimap && "has-minimap")}>
        {/* the page stays mounted while a document tab is on top, so its state survives */}
        <div ref={scrollRef} className={clsx("wb-content", !showingPage && "is-hidden")}>
          <div ref={contentRef} data-editor-content style={{ zoom }}>
            {children}
          </div>
        </div>
        {activeTab?.kind === "pdf" && <PdfViewer key={activeTab.id} href={activeTab.href} name={activeTab.name} />}
        {activeTab?.kind === "image" && <ImageViewer key={activeTab.id} href={activeTab.href} name={activeTab.name} />}
        {!activeTab && <Watermark />}
        {minimap && <Minimap scrollRef={scrollRef} contentRef={contentRef} />}
        {isInstalled("let-it-snow") && <Snow />}
        {isInstalled("sparkle-cursor") && <SparkleCursor />}
        {isInstalled("pixel-pet") && <PixelPets />}
      </div>
    </section>
  );
}
