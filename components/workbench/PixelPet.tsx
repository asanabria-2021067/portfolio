"use client";

import { useEffect, useRef, useState } from "react";
import { usePreferences } from "../PreferencesProvider";

// 12×10 sprite: an original little blob creature. "#" body, "o" eye, "." empty, "p" cheek
const FRAMES = [
  [
    "....####....",
    "..########..",
    ".##########.",
    ".##o####o##.",
    "############",
    "#p########p#",
    "############",
    ".##########.",
    ".##.####.##.",
    ".#........#.",
  ],
  [
    "............",
    "....####....",
    "..########..",
    ".##o####o##.",
    "############",
    "#p########p#",
    "############",
    ".##########.",
    "..##.##.##..",
    "..#......#..",
  ],
];

const PX = 3;
const WIDTH = 12 * PX;

function Sprite({ frame }: { frame: number }) {
  return (
    <svg width={WIDTH} height={10 * PX} viewBox={`0 0 ${12 * PX} ${10 * PX}`} shapeRendering="crispEdges" aria-hidden="true">
      {FRAMES[frame].flatMap((row, y) =>
        [...row].map((char, x) =>
          char === "." ? null : (
            <rect
              key={`${x}-${y}`}
              x={x * PX}
              y={y * PX}
              width={PX}
              height={PX}
              fill={char === "o" ? "#1b1030" : char === "p" ? "#ff9fb5" : "var(--pet-color, #fb7185)"}
            />
          )
        )
      )}
    </svg>
  );
}

export default function PixelPet() {
  const { locale } = usePreferences();
  const ref = useRef<HTMLButtonElement>(null);
  const [frame, setFrame] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);
  const state = useRef({ x: 40, dir: 1, pause: 0 });

  useEffect(() => {
    let last = performance.now();
    let raf = 0;
    let tick = 0;

    const loop = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const el = ref.current;
      const parent = el?.parentElement;
      if (el && parent) {
        const s = state.current;
        const max = parent.clientWidth - WIDTH - 24;
        if (s.pause > 0) s.pause -= dt;
        else {
          s.x += s.dir * dt * 0.035;
          if (s.x > max || s.x < 8) {
            s.dir *= -1;
            s.x = Math.min(Math.max(s.x, 8), max);
          }
          if (Math.random() < 0.002) s.pause = 1500 + Math.random() * 2500;
          tick += dt;
          if (tick > 220) {
            tick = 0;
            setFrame((f) => 1 - f);
          }
        }
        el.style.transform = `translateX(${s.x}px)`;
        el.style.setProperty("--pet-dir", String(s.dir));
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!bubble) return;
    const timer = window.setTimeout(() => setBubble(null), 1800);
    return () => window.clearTimeout(timer);
  }, [bubble]);

  const greetings =
    locale === "en"
      ? ["hi! 👋", "hire Angel!", "♥", "try Ctrl+P", "nice code :)"]
      : ["¡hola! 👋", "¡contrata a Angel!", "♥", "prueba Ctrl+P", "lindo código :)"];

  return (
    <button
      ref={ref}
      type="button"
      className="wb-pet"
      onClick={() => {
        state.current.pause = 1800;
        setBubble(greetings[Math.floor(Math.random() * greetings.length)]);
      }}
      aria-label="Pixel pet"
    >
      {bubble && <span className="wb-pet-bubble">{bubble}</span>}
      <span className="wb-pet-sprite">
        <Sprite frame={frame} />
      </span>
    </button>
  );
}
