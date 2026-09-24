"use client";

import { useEffect, useRef } from "react";

type Line = { x: number; y: number; w: number; h: number; kind: "text" | "heading" | "media" };

const WIDTH = 84;

export default function Minimap({
  scrollRef,
  contentRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lines = useRef<Line[]>([]);
  const metrics = useRef({ docHeight: 1, docWidth: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const scroller = scrollRef.current;
    const content = contentRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !scroller || !content || !ctx) return;

    const scale = () => Math.min(canvas.clientHeight / metrics.current.docHeight, 0.22);

    const draw = () => {
      const ratio = window.devicePixelRatio || 1;
      const height = canvas.clientHeight;
      if (canvas.width !== WIDTH * ratio || canvas.height !== Math.floor(height * ratio)) {
        canvas.width = WIDTH * ratio;
        canvas.height = Math.floor(height * ratio);
      }
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, WIDTH, height);
      const s = scale();
      const sx = (WIDTH - 12) / metrics.current.docWidth;
      const style = getComputedStyle(canvas);
      const text = style.getPropertyValue("--mm-text").trim();
      const heading = style.getPropertyValue("--mm-heading").trim();
      const media = style.getPropertyValue("--mm-media").trim();

      for (const line of lines.current) {
        ctx.fillStyle = line.kind === "heading" ? heading : line.kind === "media" ? media : text;
        const h = line.kind === "media" ? Math.max(line.h * s, 2) : Math.max(Math.min(line.h * s * 0.55, 3), 1);
        ctx.fillRect(6 + line.x * sx, line.y * s, Math.max(line.w * sx, 1), h);
      }

      // viewport slider
      ctx.fillStyle = style.getPropertyValue("--mm-slider").trim();
      ctx.fillRect(0, scroller.scrollTop * s, WIDTH, Math.max(scroller.clientHeight * s, 12));
    };

    const measure = () => {
      // measure everything in the scroller's coordinate space (screen pixels, zoom included)
      const box = scroller.getBoundingClientRect();
      const base = { left: box.left, top: box.top - scroller.scrollTop };
      metrics.current = { docHeight: Math.max(scroller.scrollHeight, 1), docWidth: Math.max(scroller.clientWidth, 1) };
      const next: Line[] = [];
      const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      for (let node = walker.nextNode(); node && next.length < 4000; node = walker.nextNode()) {
        if (!node.textContent?.trim()) continue;
        const parent = node.parentElement;
        if (!parent || parent.closest("svg, script, style")) continue;
        const isHeading = Boolean(parent.closest("h1, h2, h3"));
        range.selectNodeContents(node);
        for (const rect of range.getClientRects()) {
          if (rect.width < 1) continue;
          next.push({ x: rect.left - base.left, y: rect.top - base.top, w: rect.width, h: rect.height, kind: isHeading ? "heading" : "text" });
        }
      }
      content.querySelectorAll("img, canvas").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 24 && rect.height > 24) next.push({ x: rect.left - base.left, y: rect.top - base.top, w: rect.width, h: rect.height, kind: "media" });
      });
      lines.current = next;
      draw();
    };

    let timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(measure, 250);
    };

    measure();
    const mutations = new MutationObserver(schedule);
    mutations.observe(content, { childList: true, subtree: true, characterData: true });
    const resize = new ResizeObserver(schedule);
    resize.observe(scroller);
    resize.observe(content);
    scroller.addEventListener("scroll", draw, { passive: true });

    let dragging = false;
    const jump = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const y = (event.clientY - rect.top) / scale();
      scroller.scrollTo({ top: y - scroller.clientHeight / 2, behavior: dragging ? "auto" : "smooth" });
    };
    const down = (event: PointerEvent) => {
      dragging = false;
      canvas.setPointerCapture(event.pointerId);
      jump(event);
      dragging = true;
    };
    const move = (event: PointerEvent) => dragging && canvas.hasPointerCapture(event.pointerId) && jump(event);
    const up = () => {
      dragging = false;
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);

    return () => {
      window.clearTimeout(timer);
      mutations.disconnect();
      resize.disconnect();
      scroller.removeEventListener("scroll", draw);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
    };
  }, [scrollRef, contentRef]);

  return <canvas ref={canvasRef} className="wb-minimap" aria-hidden="true" />;
}
