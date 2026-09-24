import type { Theme } from "../PreferencesProvider";

export type ExtensionId = "daylight-theme" | "aurora-theme" | "zen-mode" | "pixel-pet" | "local-clock";

export interface ExtensionInfo {
  id: ExtensionId;
  name: string;
  icon: string;
  accent: string;
  category: "theme" | "feature";
  theme?: Theme;
  descriptionEn: string;
  descriptionEs: string;
  contributesEn: string;
  contributesEs: string;
}

export const EXTENSIONS: ExtensionInfo[] = [
  {
    id: "daylight-theme",
    name: "Daylight Theme",
    icon: "☀",
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
    icon: "✦",
    accent: "#34d3a6",
    category: "theme",
    theme: "aurora",
    descriptionEn: "Deep teal dark theme inspired by northern lights.",
    descriptionEs: "Tema oscuro verde azulado inspirado en las auroras.",
    contributesEn: "Adds a theme switcher to the status bar.",
    contributesEs: "Agrega un selector de tema en la barra de estado.",
  },
  {
    id: "zen-mode",
    name: "Zen Mode",
    icon: "◎",
    accent: "#a78bfa",
    category: "feature",
    descriptionEn: "Hide every panel and read the portfolio distraction-free.",
    descriptionEs: "Oculta todos los paneles para leer el portafolio sin distracciones.",
    contributesEn: "Adds a Zen button to the status bar and the command “View: Toggle Zen Mode” (Esc exits).",
    contributesEs: "Agrega un botón Zen a la barra de estado y el comando “Ver: Modo Zen” (Esc para salir).",
  },
  {
    id: "pixel-pet",
    name: "Pixel Pet",
    icon: "◕",
    accent: "#fb7185",
    category: "feature",
    descriptionEn: "A tiny pixel companion that wanders around your editor.",
    descriptionEs: "Una pequeña mascota pixelada que pasea por tu editor.",
    contributesEn: "Click the pet to say hi.",
    contributesEs: "Haz clic en la mascota para saludarla.",
  },
  {
    id: "local-clock",
    name: "Local Clock",
    icon: "◷",
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
