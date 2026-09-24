import type { Theme } from "../PreferencesProvider";

export type ExtensionId =
  | "daylight-theme"
  | "aurora-theme"
  | "rose-theme"
  | "zen-mode"
  | "pixel-pet"
  | "local-clock"
  | "let-it-snow"
  | "sparkle-cursor"
  | "minimap"
  | "reading-time"
  | "confetti";

export interface ExtensionInfo {
  id: ExtensionId;
  name: string;
  /** Iconify icon id, e.g. "fluent-emoji-flat:sun-with-face" (served by api.iconify.design) */
  icon: string;
  accent: string;
  category: "theme" | "feature";
  theme?: Theme;
  descriptionEn: string;
  descriptionEs: string;
  contributesEn: string;
  contributesEs: string;
}

export const THEME_NAMES: Record<Theme, string> = {
  dark: "Angel Dark",
  light: "Daylight",
  aurora: "Aurora",
  rose: "Dusk Rose",
};

export function iconUrl(icon: string, color?: string) {
  const [prefix, name] = icon.split(":");
  const query = color ? `?color=${encodeURIComponent(color)}` : "";
  return `https://api.iconify.design/${prefix}/${name}.svg${query}`;
}

export const EXTENSIONS: ExtensionInfo[] = [
  {
    id: "pixel-pet",
    name: "Pixel Pets",
    icon: "fluent-emoji-flat:cat-face",
    accent: "#fb7185",
    category: "feature",
    descriptionEn: "Tiny pixel companions that wander around your editor.",
    descriptionEs: "Pequeñas mascotas pixeladas que pasean por tu editor.",
    contributesEn: "Pick up to 4 pets (blob, cat, ghost, chick). Click one to say hi. Terminal: pet add cat",
    contributesEs: "Elige hasta 4 mascotas (blob, gato, fantasma, pollito). Haz clic en una para saludarla. Terminal: pet add cat",
  },
  {
    id: "daylight-theme",
    name: "Daylight Theme",
    icon: "fluent-emoji-flat:sun-with-face",
    accent: "#f5b942",
    category: "theme",
    theme: "light",
    descriptionEn: "A clean light color theme for daytime reading.",
    descriptionEs: "Un tema claro y limpio para leer de día.",
    contributesEn: "Adds a theme switcher to the status bar.",
    contributesEs: "Agrega un selector de tema en la barra de estado.",
  },
  {
    id: "aurora-theme",
    name: "Aurora Theme",
    icon: "fluent-emoji-flat:milky-way",
    accent: "#34d3a6",
    category: "theme",
    theme: "aurora",
    descriptionEn: "Deep teal dark theme inspired by northern lights.",
    descriptionEs: "Tema oscuro verde azulado inspirado en las auroras.",
    contributesEn: "Adds a theme switcher to the status bar.",
    contributesEs: "Agrega un selector de tema en la barra de estado.",
  },
  {
    id: "rose-theme",
    name: "Dusk Rose Theme",
    icon: "fluent-emoji-flat:rose",
    accent: "#f472b6",
    category: "theme",
    theme: "rose",
    descriptionEn: "Warm plum and rose tones, like a sunset over Antigua.",
    descriptionEs: "Tonos ciruela y rosa, como un atardecer en Antigua.",
    contributesEn: "Adds a theme switcher to the status bar.",
    contributesEs: "Agrega un selector de tema en la barra de estado.",
  },
  {
    id: "zen-mode",
    name: "Zen Mode",
    icon: "fluent-emoji-flat:person-in-lotus-position",
    accent: "#a78bfa",
    category: "feature",
    descriptionEn: "Hide every panel and read the portfolio distraction-free.",
    descriptionEs: "Oculta todos los paneles para leer el portafolio sin distracciones.",
    contributesEn: "Adds a Zen button to the status bar and the command “View: Toggle Zen Mode” (Esc exits).",
    contributesEs: "Agrega un botón Zen a la barra de estado y el comando “Ver: Modo Zen” (Esc para salir).",
  },
  {
    id: "minimap",
    name: "Minimap",
    icon: "fluent-emoji-flat:world-map",
    accent: "#60a5fa",
    category: "feature",
    descriptionEn: "A code-style overview of the page on the right edge of the editor.",
    descriptionEs: "Una vista general de la página, estilo código, en el borde derecho del editor.",
    contributesEn: "Click or drag the minimap to jump around the page.",
    contributesEs: "Haz clic o arrastra el minimapa para moverte por la página.",
  },
  {
    id: "sparkle-cursor",
    name: "Sparkle Cursor",
    icon: "fluent-emoji-flat:sparkles",
    accent: "#facc15",
    category: "feature",
    descriptionEn: "Leaves a trail of sparkles behind your mouse in the editor.",
    descriptionEs: "Deja un rastro de destellos detrás del mouse en el editor.",
    contributesEn: "Pure decoration, zero productivity. ✨",
    contributesEs: "Pura decoración, cero productividad. ✨",
  },
  {
    id: "let-it-snow",
    name: "Let It Snow",
    icon: "fluent-emoji-flat:snowflake",
    accent: "#93c5fd",
    category: "feature",
    descriptionEn: "Gentle snowfall over the editor. Perfect for December.",
    descriptionEs: "Una nevada suave sobre el editor. Ideal para diciembre.",
    contributesEn: "Snow falls behind your cursor, it never blocks clicks.",
    contributesEs: "La nieve cae detrás del cursor, nunca bloquea los clics.",
  },
  {
    id: "confetti",
    name: "Confetti",
    icon: "fluent-emoji-flat:party-popper",
    accent: "#f97316",
    category: "feature",
    descriptionEn: "Celebrates when you install an extension, email Angel or run `hire` in the terminal.",
    descriptionEs: "Celebra cuando instalas una extensión, le escribes a Angel o ejecutas `hire` en la terminal.",
    contributesEn: "🎉 on every good decision.",
    contributesEs: "🎉 en cada buena decisión.",
  },
  {
    id: "reading-time",
    name: "Reading Time",
    icon: "fluent-emoji-flat:open-book",
    accent: "#34d399",
    category: "feature",
    descriptionEn: "Shows word count and reading time of the open page.",
    descriptionEs: "Muestra el número de palabras y el tiempo de lectura de la página abierta.",
    contributesEn: "Adds a status bar item.",
    contributesEs: "Agrega un elemento a la barra de estado.",
  },
  {
    id: "local-clock",
    name: "Local Clock",
    icon: "fluent-emoji-flat:alarm-clock",
    accent: "#6aa6ff",
    category: "feature",
    descriptionEn: "Shows Angel's local time (Guatemala, GMT−6) so you know when he'll reply.",
    descriptionEs: "Muestra la hora local de Angel (Guatemala, GMT−6) para saber cuándo responde.",
    contributesEn: "Adds a clock to the status bar.",
    contributesEs: "Agrega un reloj a la barra de estado.",
  },
];

export function extensionById(id: string) {
  return EXTENSIONS.find((ext) => ext.id === id);
}

/** Fire the confetti extension (no-op when it isn't installed). */
export function celebrate(origin?: { x: number; y: number }) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("wb-celebrate", { detail: origin }));
}
