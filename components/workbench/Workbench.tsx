"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { usePreferences } from "../PreferencesProvider";
import { WorkbenchProvider, useWorkbench } from "./WorkbenchProvider";
import TitleBar from "./TitleBar";
import ActivityBar, { MobileBar } from "./ActivityBar";
import SideBar from "./SideBar";
import EditorArea from "./EditorArea";
import StatusBar from "./StatusBar";
import CommandPalette from "./CommandPalette";
import TerminalPanel from "./TerminalPanel";
import { Confetti } from "./Effects";

function Frame({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, terminalOpen, zen, setZen, isMobile, isInstalled } = useWorkbench();
  const { locale } = usePreferences();
  const [terminalMounted, setTerminalMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- keep the terminal (and its history) alive after first open
    if (terminalOpen) setTerminalMounted(true);
  }, [terminalOpen]);

  return (
    <div className={clsx("wb", zen && "is-zen", isMobile && "is-mobile")}>
      <TitleBar />
      <div className="wb-body">
        <ActivityBar />
        <div className={clsx("wb-sidebar-slot", sidebarOpen && "is-open")}>
          <SideBar />
        </div>
        <div className="wb-main">
          <EditorArea>{children}</EditorArea>
          {terminalMounted && (
            <div className={clsx("wb-panel-slot", terminalOpen && "is-open")}>
              <TerminalPanel />
            </div>
          )}
        </div>
      </div>
      <StatusBar />
      <MobileBar />
      <CommandPalette />
      {zen && (
        <button type="button" className="wb-zen-exit" onClick={() => setZen(false)}>
          {locale === "en" ? "Exit Zen Mode (Esc)" : "Salir del modo Zen (Esc)"}
        </button>
      )}
      {isInstalled("confetti") && <Confetti />}
    </div>
  );
}

export default function Workbench({ children }: { children: React.ReactNode }) {
  return (
    <WorkbenchProvider>
      <Frame>{children}</Frame>
    </WorkbenchProvider>
  );
}
