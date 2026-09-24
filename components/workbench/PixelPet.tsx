"use client";

import { useEffect, useRef, useState } from "react";
import { usePreferences } from "../PreferencesProvider";
import { useWorkbench, type PetSpecies } from "./WorkbenchProvider";

/*
 * Original 12×10 pixel sprites, two walking frames each.
 * Palette keys: "#" body, "o" eye, "p" cheek/nose, "b" beak/feet, "." empty
 */
const SPRITES: Record<PetSpecies, { frames: string[][]; colors: Record<string, string> }> = {
  blob: {
    colors: { "#": "#fb7185", o: "#1b1030", p: "#ffc2d1" },
    frames: [
      ["....####....", "..########..", ".##########.", ".##o####o##.", "############", "#p########p#", "############", ".##########.", ".##.####.##.", ".#........#."],
      ["............", "....####....", "..########..", ".##o####o##.", "############", "#p########p#", "############", ".##########.", "..##.##.##..", "..#......#.."],
    ],
  },
  cat: {
    colors: { "#": "#f59e0b", o: "#1f1300", p: "#fda4af" },
    frames: [
      [".#........#.", ".##......##.", ".##########.", ".#o######o#.", ".####pp####.", ".##########.", "..########..", "..########..", "..#.#..#.#..", "..#......#.."],
      [".#........#.", ".##......##.", ".##########.", ".#o######o#.", ".####pp####.", ".##########.", "..########..", "..########..", "...#.##.#...", "...#....#..."],
    ],
  },
  ghost: {
    colors: { "#": "#e2e8f0", o: "#334155", p: "#fbcfe8" },
    frames: [
      ["...######...", "..########..", ".##########.", ".##o####o##.", ".##########.", ".#p######p#.", ".##########.", ".##########.", ".##.##.##.#.", ".#..#..#...."],
      ["...######...", "..########..", ".##########.", ".##o####o##.", ".##########.", ".#p######p#.", ".##########.", ".##########.", ".#.##.##.##.", "...#..#..#.."],
    ],
  },
  chick: {
    colors: { "#": "#facc15", o: "#1c1917", p: "#fb923c", b: "#f97316" },
    frames: [
      ["....###.....", "...#####....", "...##o##bb..", "...#####....", ".#########..", "##########..", ".#########..", "..#######...", "...b...b....", "..bb..bb...."],
      ["....###.....", "...#####....", "...##o##bb..", "...#####....", ".#########..", "##########..", ".#########..", "..#######...", "....b.b.....", "...bb.bb...."],
    ],
  },
};

export const PET_SPECIES: PetSpecies[] = ["blob", "cat", "ghost", "chick"];
export const PET_NAMES: Record<PetSpecies, { en: string; es: string }> = {
  blob: { en: "Blob", es: "Blob" },
  cat: { en: "Cat", es: "Gato" },
  ghost: { en: "Ghost", es: "Fantasma" },
  chick: { en: "Chick", es: "Pollito" },
};

const PX = 3;
const WIDTH = 12 * PX;

export function PetSprite({ species, frame = 0, px = PX }: { species: PetSpecies; frame?: number; px?: number }) {
  const sprite = SPRITES[species];
  return (
    <svg width={12 * px} height={10 * px} viewBox={`0 0 ${12 * px} ${10 * px}`} shapeRendering="crispEdges" aria-hidden="true">
      {sprite.frames[frame].flatMap((row, y) =>
        [...row].map((char, x) =>
          char === "." ? null : <rect key={`${x}-${y}`} x={x * px} y={y * px} width={px} height={px} fill={sprite.colors[char]} />
        )
      )}
    </svg>
  );
}

function Pet({ species, index }: { species: PetSpecies; index: number }) {
  const { locale } = usePreferences();
  const ref = useRef<HTMLButtonElement>(null);
  const [frame, setFrame] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);
  const [hop, setHop] = useState(false);
  const state = useRef({ x: 40 + index * 90, dir: index % 2 ? -1 : 1, pause: 0, speed: 0.028 + index * 0.006 });

  useEffect(() => {
    let last = performance.now();
    let raf = 0;
    let tick = 0;

    const loop = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const el = ref.current;
      const parent = el?.parentElement?.parentElement;
      if (el && parent) {
        const s = state.current;
        const max = parent.clientWidth - WIDTH - 24;
        if (s.pause > 0) s.pause -= dt;
        else {
          s.x += s.dir * dt * s.speed;
          if (s.x > max || s.x < 8) {
            s.dir *= -1;
            s.x = Math.min(Math.max(s.x, 8), max);
          }
          if (Math.random() < 0.002) s.pause = 1200 + Math.random() * 2500;
          if (Math.random() < 0.0015) {
            setHop(true);
            window.setTimeout(() => setHop(false), 450);
          }
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
      ? ["hi! 👋", "hire Angel!", "♥", "try Ctrl+P", "nice code :)", "VKS goes brrr", "pet me again"]
      : ["¡hola! 👋", "¡contrata a Angel!", "♥", "prueba Ctrl+P", "lindo código :)", "VKS a todo motor", "acaríciame otra vez"];

  return (
    <button
      ref={ref}
      type="button"
      className="wb-pet"
      onClick={() => {
        state.current.pause = 1800;
        setHop(true);
        window.setTimeout(() => setHop(false), 450);
        setBubble(greetings[Math.floor(Math.random() * greetings.length)]);
      }}
      aria-label={`${PET_NAMES[species].en} pet`}
    >
      {bubble && <span className="wb-pet-bubble">{bubble}</span>}
      <span className={`wb-pet-sprite${hop ? " is-hopping" : ""}${species === "ghost" ? " is-ghost" : ""}`}>
        <PetSprite species={species} frame={frame} />
      </span>
    </button>
  );
}

export default function PixelPets() {
  const { pets } = useWorkbench();
  return (
    <div className="wb-pets">
      {pets.map((species, index) => (
        <Pet key={`${species}-${index}`} species={species} index={index} />
      ))}
    </div>
  );
}
