"use client";

import { useEffect, useRef } from "react";

function useCanvas(fixed = false) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const target = fixed ? document.documentElement : canvas.parentElement!;
    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = fixed ? window.innerWidth : target.clientWidth;
      const height = fixed ? window.innerHeight : target.clientHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.getContext("2d")?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(fixed ? document.body : target);
    return () => observer.disconnect();
  }, [fixed]);

  return ref;
}

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------------- snow */

export function Snow() {
  const ref = useCanvas();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const count = reducedMotion() ? 25 : 90;
    const w = () => canvas.clientWidth;
    const h = () => canvas.clientHeight;
    const flakes = Array.from({ length: count }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      r: 0.8 + Math.random() * 2.2,
      speed: 0.25 + Math.random() * 0.8,
      drift: Math.random() * Math.PI * 2,
    }));
    let raf = 0;

    const loop = () => {
      const color = getComputedStyle(canvas).getPropertyValue("--snow").trim() || "rgba(255,255,255,0.8)";
      ctx.clearRect(0, 0, w(), h());
      ctx.fillStyle = color;
      for (const flake of flakes) {
        flake.y += flake.speed;
        flake.drift += 0.01;
        flake.x += Math.sin(flake.drift) * 0.35;
        if (flake.y > h() + 4) {
          flake.y = -4;
          flake.x = Math.random() * w();
        }
        ctx.globalAlpha = 0.35 + flake.r / 4;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [ref]);

  return <canvas ref={ref} className="fx-canvas" aria-hidden="true" />;
}

/* ---------------------------------------------------------------- sparkles */

const SPARKLE_COLORS = ["#fde047", "#f9a8d4", "#93c5fd", "#c4b5fd", "#6ee7b7"];

function star(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y);
  ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill();
}

export function SparkleCursor() {
  const ref = useCanvas();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    const host = canvas?.parentElement;
    if (!canvas || !ctx || !host) return;
    type P = { x: number; y: number; vx: number; vy: number; life: number; r: number; color: string };
    const particles: P[] = [];
    let raf = 0;
    let last = 0;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.life -= 0.022;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        star(ctx, p.x, p.y, p.r * p.life + 1);
      }
      ctx.globalAlpha = 1;
      raf = particles.length ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - last < 24 || reducedMotion()) return;
      last = now;
      const rect = host.getBoundingClientRect();
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: event.clientX - rect.left + (Math.random() - 0.5) * 8,
          y: event.clientY - rect.top + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -Math.random() * 0.6,
          life: 1,
          r: 3 + Math.random() * 4,
          color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        });
      }
      if (particles.length > 120) particles.splice(0, particles.length - 120);
      if (!raf) raf = requestAnimationFrame(loop);
    };

    host.addEventListener("pointermove", onMove);
    return () => {
      host.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  return <canvas ref={ref} className="fx-canvas fx-canvas--top" aria-hidden="true" />;
}

/* ---------------------------------------------------------------- confetti */

const CONFETTI_COLORS = ["#6aa6ff", "#a78bfa", "#f472b6", "#facc15", "#34d399", "#fb923c"];

export function Confetti() {
  const ref = useCanvas(true);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    type P = { x: number; y: number; vx: number; vy: number; rot: number; vr: number; w: number; h: number; color: string; life: number };
    const pieces: P[] = [];
    let raf = 0;

    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        p.vy += 0.18;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.006;
        if (p.life <= 0 || p.y > window.innerHeight + 20) {
          pieces.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.min(1, p.life * 2);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      raf = pieces.length ? requestAnimationFrame(loop) : 0;
    };

    const burst = (x: number, y: number) => {
      const amount = reducedMotion() ? 30 : 140;
      for (let i = 0; i < amount; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
        const speed = 6 + Math.random() * 9;
        pieces.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          w: 6 + Math.random() * 6,
          h: 3 + Math.random() * 4,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          life: 1,
        });
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onCelebrate = (event: Event) => {
      const origin = (event as CustomEvent<{ x: number; y: number } | undefined>).detail;
      burst(origin?.x ?? window.innerWidth / 2, origin?.y ?? window.innerHeight * 0.7);
    };
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.('a[href^="mailto:"]');
      if (link) burst(event.clientX, event.clientY);
    };

    window.addEventListener("wb-celebrate", onCelebrate);
    window.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("wb-celebrate", onCelebrate);
      window.removeEventListener("click", onClick, true);
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  return <canvas ref={ref} className="fx-confetti" aria-hidden="true" />;
}
