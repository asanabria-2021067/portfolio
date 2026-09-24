"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { usePreferences } from "../../PreferencesProvider";
import { useWorkbench } from "../WorkbenchProvider";
import { CaseIcon, ChevronIcon, CloseIcon } from "../icons";
import { FileBadge } from "./ExplorerView";
import { loadIndex, liveLines, normalize, type IndexedLine } from "../searchIndex";
import { ALL_FILES, fileForRoute, t } from "@/lib/workspace";

type Mode = "text" | "files";

function Snippet({ text, query, matchCase }: { text: string; query: string; matchCase: boolean }) {
  const haystack = matchCase ? text : normalize(text);
  const needle = matchCase ? query : normalize(query);
  const index = haystack.indexOf(needle);
  if (index < 0) return <>{text}</>;
  const start = Math.max(0, index - 28);
  return (
    <>
      {start > 0 && "…"}
      {text.slice(start, index)}
      <mark className="wb-match">{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

export default function SearchView() {
  const { locale } = usePreferences();
  const { openFile, setHighlight, highlightQuery, activeView, sidebarOpen } = useWorkbench();
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode>("text");
  const [query, setQuery] = useState(highlightQuery);
  const [matchCase, setMatchCase] = useState(false);
  const [index, setIndex] = useState<IndexedLine[] | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let alive = true;
    loadIndex().then((lines) => alive && setIndex(lines));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (activeView === "search" && sidebarOpen) inputRef.current?.focus();
  }, [activeView, sidebarOpen]);

  const trimmed = query.trim();

  const textResults = useMemo(() => {
    if (mode !== "text" || trimmed.length < 2 || !index) return [];
    const current = fileForRoute(pathname);
    const lines = current ? [...liveLines(current.href!, current.name), ...index] : index;
    const needle = matchCase ? trimmed : normalize(trimmed);
    const groups = new Map<string, { href: string; file: string; lines: string[] }>();

    for (const line of lines) {
      const haystack = matchCase ? line.text : normalize(line.text);
      if (!haystack.includes(needle)) continue;
      const group = groups.get(line.href) ?? { href: line.href, file: line.file, lines: [] };
      if (!group.lines.includes(line.text) && group.lines.length < 40) group.lines.push(line.text);
      groups.set(line.href, group);
    }
    return [...groups.values()];
  }, [mode, trimmed, index, matchCase, pathname]);

  const fileResults = useMemo(() => {
    if (mode !== "files") return [];
    const needle = normalize(trimmed);
    return ALL_FILES.filter((file) => !needle || normalize(file.path).includes(needle));
  }, [mode, trimmed]);

  const total = textResults.reduce((sum, group) => sum + group.lines.length, 0);

  const openResult = (href: string, line?: string) => {
    setHighlight(trimmed, line);
    openFile(href);
  };

  const clear = () => {
    setQuery("");
    setHighlight("");
    inputRef.current?.focus();
  };

  return (
    <div className="wb-search">
      <div className="wb-search-modes" role="tablist">
        <button type="button" role="tab" aria-selected={mode === "text"} className={clsx(mode === "text" && "is-active")} onClick={() => setMode("text")}>
          {t(locale, "Text", "Texto")}
        </button>
        <button type="button" role="tab" aria-selected={mode === "files"} className={clsx(mode === "files" && "is-active")} onClick={() => setMode("files")}>
          {t(locale, "File name", "Nombre de archivo")}
        </button>
      </div>

      <div className="wb-input-wrap">
        <input
          ref={inputRef}
          className="wb-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && mode === "text" && textResults[0]) openResult(textResults[0].href);
            if (event.key === "Enter" && mode === "files" && fileResults[0]) openFile(fileResults[0]);
          }}
          placeholder={mode === "text" ? t(locale, "Search", "Buscar") : t(locale, "Search files by name", "Buscar archivos por nombre")}
          aria-label={t(locale, "Search", "Buscar")}
          spellCheck={false}
        />
        <div className="wb-input-actions">
        {query && (
          <button type="button" className="wb-input-btn" onClick={clear} aria-label={t(locale, "Clear", "Limpiar")}>
            <CloseIcon size={12} />
          </button>
        )}
        {mode === "text" && (
          <button
            type="button"
            className={clsx("wb-input-btn", matchCase && "is-on")}
            onClick={() => setMatchCase(!matchCase)}
            title={t(locale, "Match Case", "Coincidir mayúsculas")}
            aria-pressed={matchCase}
          >
            <CaseIcon />
          </button>
        )}
        </div>
      </div>

      {mode === "text" && (
        <>
          {trimmed.length >= 2 && (
            <p className="wb-search-summary">
              {!index
                ? t(locale, "Indexing pages…", "Indexando páginas…")
                : total === 0
                  ? t(locale, "No results found.", "No se encontraron resultados.")
                  : t(locale, `${total} results in ${textResults.length} files`, `${total} resultados en ${textResults.length} archivos`)}
            </p>
          )}
          {trimmed.length < 2 && (
            <p className="wb-empty-note">
              {t(locale, "Search any word across the whole portfolio: try “VMware”, “React” or “hackathon”.", "Busca cualquier palabra en todo el portafolio: prueba “VMware”, “React” o “hackathon”.")}
            </p>
          )}
          <div className="wb-results">
            {textResults.map((group) => {
              const isCollapsed = collapsed.has(group.href);
              return (
                <div key={group.href}>
                  <button
                    type="button"
                    className="ft-row ft-row--folder wb-result-file"
                    onClick={() =>
                      setCollapsed((current) => {
                        const next = new Set(current);
                        if (next.has(group.href)) next.delete(group.href);
                        else next.add(group.href);
                        return next;
                      })
                    }
                  >
                    <ChevronIcon size={12} className={clsx("ft-chevron", !isCollapsed && "ft-open")} />
                    <FileBadge ext="tsx" />
                    <span className="ft-name ft-name--folder">{group.file}</span>
                    <span className="wb-count">{group.lines.length}</span>
                  </button>
                  {!isCollapsed &&
                    group.lines.map((line) => (
                      <button key={line} type="button" className="wb-result-line" onClick={() => openResult(group.href, line)} title={line}>
                        <Snippet text={line} query={trimmed} matchCase={matchCase} />
                      </button>
                    ))}
                </div>
              );
            })}
          </div>
        </>
      )}

      {mode === "files" && (
        <div className="wb-results">
          {fileResults.length === 0 && <p className="wb-empty-note">{t(locale, "No matching files.", "Ningún archivo coincide.")}</p>}
          {fileResults.map((file) => (
            <button key={file.path} type="button" className="ft-row ft-row--file ft-clickable wb-file-result" onClick={() => openFile(file)}>
              <FileBadge ext={file.ext} />
              <span className="ft-name">
                <Snippet text={file.name} query={trimmed} matchCase={false} />
              </span>
              <span className="wb-open-editor-path">{file.path.split("/").slice(1, -1).join("/")}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
