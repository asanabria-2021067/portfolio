"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePreferences, type Theme } from "../PreferencesProvider";
import { EXTENSIONS, THEME_NAMES, celebrate, type ExtensionId } from "./extensions";
import {
  ALL_FILES,
  CV_PATH,
  EMAIL,
  GITHUB_PROFILE,
  LINKEDIN_URL,
  ROUTE_FILES,
  fileForRoute,
  type WorkspaceFile,
} from "@/lib/workspace";

export type ViewId = "explorer" | "search" | "scm" | "extensions" | "account" | "settings";
export type PaletteMode = "files" | "commands";
export type PetSpecies = "blob" | "cat" | "ghost" | "chick";

export interface EditorTab {
  id: string;
  kind: "route" | "pdf" | "image";
  name: string;
  href: string;
  ext: string;
}

function extOf(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

export function makeTab(href: string, name?: string): EditorTab | null {
  const route = fileForRoute(href);
  if (route) return { id: href, kind: "route", name: route.name, href, ext: route.ext };
  const fileName = name ?? decodeURIComponent(href.split("/").pop() ?? href);
  const ext = extOf(href);
  if (ext === "pdf") return { id: href, kind: "pdf", name: fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`, href, ext };
  if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) return { id: href, kind: "image", name: fileName, href, ext };
  return null;
}

export interface Command {
  id: string;
  labelEn: string;
  labelEs: string;
  category?: string;
  keybinding?: string;
  run: () => void;
}

interface TerminalRequest {
  id: number;
  command: string;
}

interface WorkbenchContextValue {
  hydrated: boolean;
  isMobile: boolean;
  activeView: ViewId;
  sidebarOpen: boolean;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  showView: (view: ViewId) => void;
  toggleView: (view: ViewId) => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  tabs: EditorTab[];
  activeTab: EditorTab | null;
  editorEmpty: boolean;
  openFile: (file: WorkspaceFile | string) => void;
  openDocument: (href: string, name?: string) => void;
  activateTab: (tab: EditorTab) => void;
  closeTab: (id: string) => void;
  closeAllTabs: () => void;

  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  terminalRequest: TerminalRequest | null;
  runInTerminal: (command: string) => void;

  palette: { open: boolean; mode: PaletteMode; seed: number };
  openPalette: (mode: PaletteMode) => void;
  closePalette: () => void;

  installed: ExtensionId[];
  isInstalled: (id: ExtensionId) => boolean;
  install: (id: ExtensionId) => void;
  uninstall: (id: ExtensionId) => void;
  availableThemes: Theme[];
  cycleTheme: () => void;

  zen: boolean;
  setZen: (zen: boolean) => void;

  zoom: number;
  setZoom: (zoom: number) => void;

  pets: PetSpecies[];
  setPets: (pets: PetSpecies[]) => void;

  highlightQuery: string;
  highlightLine: string;
  setHighlight: (query: string, line?: string) => void;

  commands: Command[];
  resetWorkspace: () => void;
}

const WorkbenchContext = createContext<WorkbenchContextValue | null>(null);

const KEYS = {
  extensions: "wb-extensions",
  sidebarWidth: "wb-sidebar-width",
  tabs: "wb-tabs-v2",
  pets: "wb-pets",
  zoom: "wb-zoom",
};

function readJson<T>(storage: Storage | undefined, key: string, fallback: T): T {
  try {
    const raw = storage?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(storage: Storage | undefined, key: string, value: unknown) {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — state stays in memory */
  }
}

export function WorkbenchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme, toggleLocale } = usePreferences();

  const [hydrated, setHydrated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeView, setActiveView] = useState<ViewId>("explorer");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidthState] = useState(264);
  const [tabs, setTabs] = useState<EditorTab[]>([]);
  const [activeId, setActiveId] = useState<string | null>(() => (fileForRoute(pathname) ? pathname : null));
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalRequest, setTerminalRequest] = useState<TerminalRequest | null>(null);
  const [palette, setPalette] = useState<{ open: boolean; mode: PaletteMode; seed: number }>({
    open: false,
    mode: "files",
    seed: 0,
  });
  const [installed, setInstalled] = useState<ExtensionId[]>([]);
  const [zen, setZen] = useState(false);
  const [zoom, setZoomState] = useState(1);
  const [pets, setPetsState] = useState<PetSpecies[]>(["blob"]);
  const [highlight, setHighlightState] = useState({ query: "", line: "" });
  const setHighlight = useCallback((query: string, line = "") => setHighlightState({ query, line }), []);
  const requestId = useRef(0);

  // ---- hydrate persisted state ------------------------------------------------
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const syncMobile = () => setIsMobile(mobile.matches);
    syncMobile();
    mobile.addEventListener("change", syncMobile);

    /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration from browser storage */
    if (mobile.matches) setSidebarOpen(false);
    const valid = new Set(EXTENSIONS.map((ext) => ext.id));
    setInstalled(readJson<ExtensionId[]>(window.localStorage, KEYS.extensions, []).filter((id) => valid.has(id)));
    setSidebarWidthState(readJson(window.localStorage, KEYS.sidebarWidth, 264));
    setZoomState(readJson(window.localStorage, KEYS.zoom, 1));
    setTabs(
      readJson<EditorTab[]>(window.sessionStorage, KEYS.tabs, [])
        .map((tab) => (tab && typeof tab.href === "string" ? makeTab(tab.href, tab.name) : null))
        .filter((tab): tab is EditorTab => Boolean(tab))
    );
    const storedPets = readJson<PetSpecies[]>(window.localStorage, KEYS.pets, ["blob"]).filter((p) =>
      ["blob", "cat", "ghost", "chick"].includes(p)
    );
    setPetsState(storedPets.length ? storedPets.slice(0, 4) : ["blob"]);
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */

    return () => mobile.removeEventListener("change", syncMobile);
  }, []);

  // every navigation makes sure the page has a tab
  useEffect(() => {
    const tab = makeTab(pathname);
    if (!hydrated || !tab) return;
    /* eslint-disable-next-line react-hooks/set-state-in-effect -- tab list follows the router */
    setTabs((current) => (current.some((t) => t.id === tab.id) ? current : [...current, tab]));
    setActiveId(tab.id);
  }, [pathname, hydrated]);

  useEffect(() => {
    if (hydrated) writeJson(window.sessionStorage, KEYS.tabs, tabs);
  }, [tabs, hydrated]);

  useEffect(() => {
    if (hydrated) writeJson(window.localStorage, KEYS.extensions, installed);
  }, [installed, hydrated]);

  // a theme only stays active while its extension is installed
  const availableThemes = useMemo<Theme[]>(
    () => ["dark", ...EXTENSIONS.filter((ext) => ext.theme && installed.includes(ext.id)).map((ext) => ext.theme!)],
    [installed]
  );

  useEffect(() => {
    if (hydrated && !availableThemes.includes(theme)) setTheme("dark");
  }, [hydrated, availableThemes, theme, setTheme]);

  // search highlights belong to the search view: leaving it clears them
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- derived reset when the view changes
    if (activeView !== "search") setHighlightState((h) => (h.query ? { query: "", line: "" } : h));
  }, [activeView]);

  // ---- actions ----------------------------------------------------------------
  const showView = useCallback((view: ViewId) => {
    setActiveView(view);
    setSidebarOpen(true);
    setZen(false);
  }, []);

  const toggleView = useCallback(
    (view: ViewId) => {
      if (sidebarOpen && activeView === view) setSidebarOpen(false);
      else showView(view);
    },
    [sidebarOpen, activeView, showView]
  );

  const toggleSidebar = useCallback(() => setSidebarOpen((open) => !open), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const runInTerminal = useCallback((command: string) => {
    requestId.current += 1;
    setTerminalOpen(true);
    setTerminalRequest({ id: requestId.current, command });
  }, []);

  const addTab = useCallback((tab: EditorTab) => {
    setTabs((current) => (current.some((t) => t.id === tab.id) ? current : [...current, tab]));
  }, []);

  const activateTab = useCallback(
    (tab: EditorTab) => {
      setActiveId(tab.id);
      if (tab.kind === "route" && tab.href !== pathname) router.push(tab.href);
    },
    [pathname, router]
  );

  const openDocument = useCallback(
    (href: string, name?: string) => {
      const tab = makeTab(href, name);
      if (!tab) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }
      if (isMobile) setSidebarOpen(false);
      addTab(tab);
      activateTab(tab);
    },
    [addTab, activateTab, isMobile]
  );

  const openFile = useCallback(
    (target: WorkspaceFile | string) => {
      const file =
        typeof target === "string" ? ALL_FILES.find((f) => f.href === target) ?? fileForRoute(target) : target;
      if (!file) {
        if (typeof target === "string") openDocument(target);
        return;
      }

      switch (file.kind) {
        case "route":
        case "pdf":
        case "image":
          openDocument(file.href!, file.name);
          break;
        case "source":
          window.open(file.href, "_blank", "noopener,noreferrer");
          break;
        case "terminal":
          if (isMobile) setSidebarOpen(false);
          runInTerminal(`cat ${file.name}`);
          break;
      }
    },
    [openDocument, runInTerminal, isMobile]
  );

  const closeTab = useCallback(
    (id: string) => {
      const index = tabs.findIndex((tab) => tab.id === id);
      if (index === -1) return;
      const next = tabs.filter((tab) => tab.id !== id);
      setTabs(next);
      if (activeId === id) {
        const neighbour = next[index] ?? next[index - 1];
        if (neighbour) activateTab(neighbour);
        else setActiveId(null);
      }
    },
    [tabs, activeId, activateTab]
  );

  const closeAllTabs = useCallback(() => {
    setTabs([]);
    setActiveId(null);
  }, []);

  const setPets = useCallback((next: PetSpecies[]) => {
    const clean = next.slice(0, 4);
    setPetsState(clean);
    writeJson(window.localStorage, KEYS.pets, clean);
  }, []);

  const openPalette = useCallback(
    (mode: PaletteMode) => setPalette((p) => ({ open: true, mode, seed: p.seed + 1 })),
    []
  );
  const closePalette = useCallback(() => setPalette((p) => ({ ...p, open: false })), []);

  const install = useCallback(
    (id: ExtensionId) => {
      setInstalled((current) => (current.includes(id) ? current : [...current, id]));
      const ext = EXTENSIONS.find((e) => e.id === id);
      if (ext?.theme) setTheme(ext.theme);
      // let the confetti extension react (including to its own install)
      window.setTimeout(() => celebrate(), 60);
    },
    [setTheme]
  );

  const uninstall = useCallback(
    (id: ExtensionId) => {
      setInstalled((current) => current.filter((item) => item !== id));
      if (id === "zen-mode") setZen(false);
    },
    []
  );

  const isInstalled = useCallback((id: ExtensionId) => installed.includes(id), [installed]);

  const cycleTheme = useCallback(() => {
    const index = availableThemes.indexOf(theme);
    setTheme(availableThemes[(index + 1) % availableThemes.length]);
  }, [availableThemes, theme, setTheme]);

  const setSidebarWidth = useCallback((width: number) => {
    const clamped = Math.min(Math.max(width, 200), 520);
    setSidebarWidthState(clamped);
    writeJson(window.localStorage, KEYS.sidebarWidth, clamped);
  }, []);

  const setZoom = useCallback((value: number) => {
    const clamped = Math.min(Math.max(Math.round(value * 10) / 10, 0.8), 1.3);
    setZoomState(clamped);
    writeJson(window.localStorage, KEYS.zoom, clamped);
  }, []);

  const resetWorkspace = useCallback(() => {
    try {
      Object.values(KEYS).forEach((key) => {
        window.localStorage.removeItem(key);
        window.sessionStorage.removeItem(key);
      });
    } catch {
      /* ignore */
    }
    setInstalled([]);
    setZoomState(1);
    setSidebarWidthState(264);
    setTheme("dark");
    setZen(false);
  }, [setTheme]);

  // ---- command registry (palette, menus, terminal) -------------------------------
  const commands = useMemo<Command[]>(() => {
    const list: Command[] = [
      ...ROUTE_FILES.map((file) => ({
        id: `go.${file.name}`,
        category: "Go",
        labelEn: `Go to ${file.name}`,
        labelEs: `Ir a ${file.name}`,
        run: () => openFile(file),
      })),
      { id: "workbench.files", category: "File", labelEn: "Go to File…", labelEs: "Ir a archivo…", keybinding: "Ctrl+P", run: () => openPalette("files") },
      { id: "workbench.explorer", category: "View", labelEn: "Show Explorer", labelEs: "Mostrar explorador", keybinding: "Ctrl+Shift+E", run: () => showView("explorer") },
      { id: "workbench.search", category: "View", labelEn: "Search in Portfolio", labelEs: "Buscar en el portafolio", keybinding: "Ctrl+Shift+F", run: () => showView("search") },
      { id: "workbench.scm", category: "View", labelEn: "Show Source Control", labelEs: "Mostrar control de código", keybinding: "Ctrl+Shift+G", run: () => showView("scm") },
      { id: "workbench.extensions", category: "View", labelEn: "Show Extensions", labelEs: "Mostrar extensiones", keybinding: "Ctrl+Shift+X", run: () => showView("extensions") },
      { id: "workbench.account", category: "View", labelEn: "Show Account", labelEs: "Mostrar cuenta", run: () => showView("account") },
      { id: "workbench.settings", category: "Preferences", labelEn: "Open Settings", labelEs: "Abrir configuración", keybinding: "Ctrl+,", run: () => showView("settings") },
      { id: "workbench.sidebar", category: "View", labelEn: "Toggle Primary Side Bar", labelEs: "Mostrar/ocultar barra lateral", keybinding: "Ctrl+B", run: toggleSidebar },
      { id: "workbench.terminal", category: "Terminal", labelEn: "Toggle Terminal", labelEs: "Mostrar/ocultar terminal", keybinding: "Ctrl+`", run: () => setTerminalOpen((open) => !open) },
      { id: "workbench.closeAll", category: "File", labelEn: "Close All Editors", labelEs: "Cerrar todos los editores", run: closeAllTabs },
      { id: "prefs.language", category: "Preferences", labelEn: "Change Language to Español", labelEs: "Cambiar idioma a English", run: toggleLocale },
      { id: "cv.view", category: "Angel", labelEn: "View CV", labelEs: "Ver CV", run: () => openDocument(CV_PATH, "CV.pdf") },
      { id: "cv.download", category: "Angel", labelEn: "Download CV", labelEs: "Descargar CV", run: () => { const a = document.createElement("a"); a.href = CV_PATH; a.download = "Angel-Sanabria-CV.pdf"; a.click(); } },
      { id: "contact.email", category: "Angel", labelEn: "Send me an Email", labelEs: "Enviarme un correo", run: () => { window.location.href = `mailto:${EMAIL}`; } },
      { id: "contact.github", category: "Angel", labelEn: "Open GitHub Profile", labelEs: "Abrir perfil de GitHub", run: () => window.open(GITHUB_PROFILE, "_blank", "noopener") },
      { id: "contact.linkedin", category: "Angel", labelEn: "Open LinkedIn", labelEs: "Abrir LinkedIn", run: () => window.open(LINKEDIN_URL, "_blank", "noopener") },
      { id: "workbench.zoomIn", category: "View", labelEn: "Zoom In", labelEs: "Acercar", run: () => setZoom(zoom + 0.1) },
      { id: "workbench.zoomOut", category: "View", labelEn: "Zoom Out", labelEs: "Alejar", run: () => setZoom(zoom - 0.1) },
      { id: "workbench.reset", category: "Preferences", labelEn: "Reset Workspace", labelEs: "Restablecer espacio de trabajo", run: resetWorkspace },
    ];

    for (const ext of EXTENSIONS) {
      const has = installed.includes(ext.id);
      list.push({
        id: `ext.${ext.id}`,
        category: "Extensions",
        labelEn: `${has ? "Uninstall" : "Install"} ${ext.name}`,
        labelEs: `${has ? "Desinstalar" : "Instalar"} ${ext.name}`,
        run: () => (has ? uninstall(ext.id) : install(ext.id)),
      });
    }

    for (const option of availableThemes) {
      list.push({
        id: `theme.${option}`,
        category: "Color Theme",
        labelEn: THEME_NAMES[option],
        labelEs: THEME_NAMES[option],
        run: () => setTheme(option),
      });
    }

    if (installed.includes("zen-mode")) {
      list.push({ id: "workbench.zen", category: "View", labelEn: "Toggle Zen Mode", labelEs: "Modo Zen", run: () => setZen((value) => !value) });
    }

    return list;
  }, [openFile, openDocument, openPalette, showView, toggleSidebar, closeAllTabs, toggleLocale, setZoom, zoom, resetWorkspace, installed, availableThemes, install, uninstall, setTheme]);

  // ---- keyboard shortcuts --------------------------------------------------------
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const mod = event.ctrlKey || event.metaKey;
      const key = event.key.toLowerCase();

      if (event.key === "Escape") {
        if (palette.open) closePalette();
        else if (zen) setZen(false);
        return;
      }
      if (event.key === "F1" || (mod && event.shiftKey && key === "p")) {
        event.preventDefault();
        openPalette("commands");
        return;
      }
      if (!mod) return;

      if (event.shiftKey) {
        const views: Record<string, ViewId> = { e: "explorer", f: "search", g: "scm", x: "extensions" };
        if (views[key]) {
          event.preventDefault();
          showView(views[key]);
        }
        return;
      }

      if (key === "p") {
        event.preventDefault();
        openPalette("files");
      } else if (key === "b") {
        event.preventDefault();
        toggleSidebar();
      } else if (event.key === "`" || event.code === "Backquote") {
        event.preventDefault();
        setTerminalOpen((open) => !open);
      } else if (key === ",") {
        event.preventDefault();
        showView("settings");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [palette.open, zen, closePalette, openPalette, showView, toggleSidebar]);

  const value: WorkbenchContextValue = {
    hydrated,
    isMobile,
    activeView,
    sidebarOpen,
    sidebarWidth,
    setSidebarWidth,
    showView,
    toggleView,
    toggleSidebar,
    closeSidebar,
    tabs,
    activeTab: tabs.find((tab) => tab.id === activeId) ?? (activeId ? makeTab(activeId) : null),
    editorEmpty: activeId === null,
    openFile,
    openDocument,
    activateTab,
    closeTab,
    closeAllTabs,
    terminalOpen,
    setTerminalOpen,
    terminalRequest,
    runInTerminal,
    palette,
    openPalette,
    closePalette,
    installed,
    isInstalled,
    install,
    uninstall,
    availableThemes,
    cycleTheme,
    zen,
    setZen,
    zoom,
    setZoom,
    pets,
    setPets,
    highlightQuery: highlight.query,
    highlightLine: highlight.line,
    setHighlight,
    commands,
    resetWorkspace,
  };

  return <WorkbenchContext.Provider value={value}>{children}</WorkbenchContext.Provider>;
}

export function useWorkbench() {
  const value = useContext(WorkbenchContext);
  if (!value) throw new Error("useWorkbench must be used inside WorkbenchProvider");
  return value;
}
