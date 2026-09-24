"use client";

/* eslint-disable @next/next/no-img-element -- local assets rendered in a document viewer */
import { useCallback, useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { usePreferences } from "../PreferencesProvider";
import { ExternalIcon } from "./icons";
import { FileIcon } from "./FileIcon";
import { t } from "@/lib/workspace";

const WORKER_SRC = "/pdfjs/pdf.worker.min.mjs";
const ZOOM_STEPS = [0.5, 0.67, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2, 2.5, 3];

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  if (pdfjs.GlobalWorkerOptions.workerSrc !== WORKER_SRC) pdfjs.GlobalWorkerOptions.workerSrc = WORKER_SRC;
  return pdfjs;
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" />
    </svg>
  );
}

function PdfPage({ doc, number, scale }: { doc: PDFDocumentProxy; number: number; scale: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    let task: RenderTask | null = null;
    let cancelled = false;

    doc.getPage(number).then((page) => {
      if (cancelled || !canvasRef.current) return;
      const viewport = page.getViewport({ scale });
      const ratio = window.devicePixelRatio || 1;
      const canvas = canvasRef.current;
      canvas.width = Math.floor(viewport.width * ratio);
      canvas.height = Math.floor(viewport.height * ratio);
      setSize({ width: viewport.width, height: viewport.height });
      task = page.render({
        canvasContext: canvas.getContext("2d")!,
        viewport,
        transform: ratio !== 1 ? [ratio, 0, 0, ratio, 0, 0] : undefined,
      });
      task.promise.catch(() => {
        /* cancelled by a newer render */
      });
    });

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, number, scale]);

  return (
    <div className="pdf-page" data-page={number} style={size ?? undefined}>
      <canvas ref={canvasRef} style={size ?? undefined} />
    </div>
  );
}

export default function PdfViewer({ href, name }: { href: string; name: string }) {
  const { locale } = usePreferences();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState(false);
  const [scale, setScale] = useState<number | null>(null);
  const [fitScale, setFitScale] = useState(1);
  const [page, setPage] = useState(1);

  // load the document
  useEffect(() => {
    let alive = true;
    let loaded: PDFDocumentProxy | null = null;
    loadPdfjs()
      .then((pdfjs) => pdfjs.getDocument(encodeURI(href)).promise)
      .then(async (pdf) => {
        loaded = pdf;
        if (!alive) return;
        const first = await pdf.getPage(1);
        const width = scrollRef.current?.clientWidth ?? 800;
        const base = first.getViewport({ scale: 1 }).width;
        const fit = Math.min(Math.max((width - 64) / base, 0.4), 2);
        setFitScale(fit);
        setScale(fit);
        setDoc(pdf);
      })
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
      loaded?.destroy();
    };
  }, [href]);

  const onScroll = useCallback(() => {
    const root = scrollRef.current;
    if (!root) return;
    const pages = root.querySelectorAll<HTMLElement>(".pdf-page");
    const middle = root.scrollTop + root.clientHeight / 3;
    let current = 1;
    pages.forEach((el) => {
      if (el.offsetTop <= middle) current = Number(el.dataset.page);
    });
    setPage(current);
  }, []);

  const zoom = (direction: 1 | -1) => {
    const now = scale ?? 1;
    const next =
      direction > 0 ? ZOOM_STEPS.find((step) => step > now + 0.01) : [...ZOOM_STEPS].reverse().find((step) => step < now - 0.01);
    if (next) setScale(next);
  };

  const goTo = (target: number) => {
    const el = scrollRef.current?.querySelector<HTMLElement>(`.pdf-page[data-page="${target}"]`);
    if (el) scrollRef.current?.scrollTo({ top: el.offsetTop - 16, behavior: "smooth" });
  };

  return (
    <div className="doc-viewer">
      <div className="doc-toolbar">
        <div className="doc-title">
          <FileIcon ext="pdf" />
          <span title={name}>{name}</span>
        </div>
        {doc && (
          <div className="doc-controls">
            <button type="button" onClick={() => goTo(Math.max(page - 1, 1))} disabled={page <= 1} aria-label={t(locale, "Previous page", "Página anterior")}>
              ‹
            </button>
            <span className="doc-page">
              {page} / {doc.numPages}
            </span>
            <button type="button" onClick={() => goTo(Math.min(page + 1, doc.numPages))} disabled={page >= doc.numPages} aria-label={t(locale, "Next page", "Página siguiente")}>
              ›
            </button>
            <span className="doc-sep" />
            <button type="button" onClick={() => zoom(-1)} aria-label="Zoom out">
              −
            </button>
            <button type="button" className="doc-zoom" onClick={() => setScale(fitScale)} title={t(locale, "Fit to width", "Ajustar al ancho")}>
              {Math.round((scale ?? 1) * 100)}%
            </button>
            <button type="button" onClick={() => zoom(1)} aria-label="Zoom in">
              +
            </button>
          </div>
        )}
        <div className="doc-actions">
          <a href={href} download={name} title={t(locale, "Download", "Descargar")} aria-label={t(locale, "Download", "Descargar")}>
            <DownloadIcon />
          </a>
          <a href={href} target="_blank" rel="noopener noreferrer" title={t(locale, "Open in new tab", "Abrir en otra pestaña")} aria-label={t(locale, "Open in new tab", "Abrir en otra pestaña")}>
            <ExternalIcon size={14} />
          </a>
        </div>
      </div>

      <div className="doc-canvas" ref={scrollRef} onScroll={onScroll}>
        {!doc && !error && <div className="doc-loading">{t(locale, "Loading PDF…", "Cargando PDF…")}</div>}
        {error && (
          <div className="doc-loading">
            <p>{t(locale, "This PDF can't be previewed here.", "Este PDF no se puede previsualizar aquí.")}</p>
            <a className="wb-primary-btn" href={href} target="_blank" rel="noopener noreferrer">
              {t(locale, "Open PDF", "Abrir PDF")}
            </a>
          </div>
        )}
        {doc && scale && Array.from({ length: doc.numPages }, (_, i) => <PdfPage key={i + 1} doc={doc} number={i + 1} scale={scale} />)}
      </div>
    </div>
  );
}

export function ImageViewer({ href, name }: { href: string; name: string }) {
  const [dims, setDims] = useState<string>("");
  return (
    <div className="doc-viewer">
      <div className="doc-toolbar">
        <div className="doc-title">
          <FileIcon ext="jpeg" />
          <span>{name}</span>
        </div>
        <span className="doc-page">{dims}</span>
        <div className="doc-actions">
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Open in new tab">
            <ExternalIcon size={14} />
          </a>
        </div>
      </div>
      <div className="doc-canvas doc-canvas--image">
        <img
          src={href}
          alt={name}
          onLoad={(event) => setDims(`${event.currentTarget.naturalWidth} × ${event.currentTarget.naturalHeight}`)}
        />
      </div>
    </div>
  );
}
