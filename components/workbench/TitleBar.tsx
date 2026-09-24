"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { usePreferences } from "../PreferencesProvider";
import { useWorkbench } from "./WorkbenchProvider";
import { PanelIcon, SearchIcon, SidebarIcon } from "./icons";

type MenuEntry = string | "---";

const MENUS: { en: string; es: string; items: MenuEntry[] }[] = [
  { en: "File", es: "Archivo", items: ["workbench.files", "---", "cv.view", "cv.download", "---", "workbench.closeAll"] },
  {
    en: "View",
    es: "Ver",
    items: [
      "workbench.commands",
      "---",
      "workbench.explorer",
      "workbench.search",
      "workbench.scm",
      "workbench.extensions",
      "---",
      "workbench.sidebar",
      "workbench.terminal",
      "workbench.zen",
      "---",
      "workbench.zoomIn",
      "workbench.zoomOut",
    ],
  },
  { en: "Go", es: "Ir", items: ["go.page.tsx", "go.projects.tsx", "go.stack.tsx", "go.certifications.tsx", "go.activity.tsx", "go.contact.tsx"] },
  { en: "Terminal", es: "Terminal", items: ["workbench.terminal"] },
  { en: "Help", es: "Ayuda", items: ["contact.email", "contact.github", "contact.linkedin", "---", "workbench.settings", "workbench.reset"] },
];

function MenuBar() {
  const { commands, openPalette } = useWorkbench();
  const { locale } = usePreferences();
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open === null) return;
    const onDown = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(null);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(null);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const byId = new Map(commands.map((command) => [command.id, command]));
  byId.set("workbench.commands", {
    id: "workbench.commands",
    labelEn: "Command Palette…",
    labelEs: "Paleta de comandos…",
    keybinding: "Ctrl+Shift+P",
    run: () => openPalette("commands"),
  });

  return (
    <div className="wb-menubar" ref={ref} role="menubar">
      {MENUS.map((menu, index) => {
        const entries = menu.items.filter((item) => item === "---" || byId.has(item));
        return (
          <div key={menu.en} className="wb-menu">
            <button
              type="button"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={open === index}
              className={clsx("wb-menu-trigger", open === index && "is-open")}
              onClick={() => setOpen(open === index ? null : index)}
              onMouseEnter={() => open !== null && setOpen(index)}
            >
              {locale === "en" ? menu.en : menu.es}
            </button>
            {open === index && (
              <div className="wb-menu-dropdown" role="menu">
                {entries.map((item, i) =>
                  item === "---" ? (
                    i > 0 && i < entries.length - 1 && entries[i - 1] !== "---" ? <div key={`sep-${i}`} className="wb-menu-sep" /> : null
                  ) : (
                    <button
                      key={item}
                      type="button"
                      role="menuitem"
                      className="wb-menu-item"
                      onClick={() => {
                        setOpen(null);
                        byId.get(item)!.run();
                      }}
                    >
                      <span>{locale === "en" ? byId.get(item)!.labelEn : byId.get(item)!.labelEs}</span>
                      {byId.get(item)!.keybinding && <kbd>{byId.get(item)!.keybinding}</kbd>}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function TitleBar() {
  const { openPalette, toggleSidebar, sidebarOpen, terminalOpen, setTerminalOpen } = useWorkbench();
  const { locale } = usePreferences();

  return (
    <header className="wb-titlebar">
      <div className="wb-title-left">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="" className="wb-logo" />
        <MenuBar />
        <span className="wb-title-name">angel-sanabria</span>
      </div>

      <button type="button" className="wb-command-center" onClick={() => openPalette("files")}>
        <SearchIcon size={14} />
        <span className="wb-cc-label">angel-sanabria — portfolio</span>
        <kbd className="wb-cc-kbd">Ctrl P</kbd>
      </button>

      <div className="wb-title-right">
        <button
          type="button"
          className={clsx("wb-title-btn", sidebarOpen && "is-on")}
          onClick={toggleSidebar}
          title={locale === "en" ? "Toggle Primary Side Bar (Ctrl+B)" : "Barra lateral (Ctrl+B)"}
          aria-label={locale === "en" ? "Toggle side bar" : "Mostrar/ocultar barra lateral"}
        >
          <SidebarIcon />
        </button>
        <button
          type="button"
          className={clsx("wb-title-btn", terminalOpen && "is-on")}
          onClick={() => setTerminalOpen(!terminalOpen)}
          title={locale === "en" ? "Toggle Terminal (Ctrl+`)" : "Terminal (Ctrl+`)"}
          aria-label={locale === "en" ? "Toggle terminal" : "Mostrar/ocultar terminal"}
        >
          <PanelIcon />
        </button>
      </div>
    </header>
  );
}
