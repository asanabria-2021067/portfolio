"use client";

import { useRef, useState } from "react";
import { usePreferences } from "../PreferencesProvider";
import { useWorkbench } from "./WorkbenchProvider";
import { VIEW_META } from "./ActivityBar";
import { CloseIcon } from "./icons";
import ExplorerView from "./views/ExplorerView";
import SearchView from "./views/SearchView";
import SourceControlView from "./views/SourceControlView";
import ExtensionsView from "./views/ExtensionsView";
import AccountView from "./views/AccountView";
import SettingsView from "./views/SettingsView";

const VIEWS = {
  explorer: ExplorerView,
  search: SearchView,
  scm: SourceControlView,
  extensions: ExtensionsView,
  account: AccountView,
  settings: SettingsView,
};

export default function SideBar() {
  const { activeView, sidebarWidth, setSidebarWidth, isMobile, closeSidebar } = useWorkbench();
  const { locale } = usePreferences();
  const dragging = useRef(false);
  // views mount the first time they are opened, then stay mounted so their state survives switching
  const [visited, setVisited] = useState<Set<string>>(() => new Set([activeView]));
  if (!visited.has(activeView)) setVisited(new Set(visited).add(activeView));
  const meta = VIEW_META[activeView];

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    const startX = event.clientX;
    const startWidth = sidebarWidth;
    event.currentTarget.setPointerCapture(event.pointerId);
    document.body.classList.add("wb-resizing");

    const onMove = (move: PointerEvent) => {
      if (dragging.current) setSidebarWidth(startWidth + move.clientX - startX);
    };
    const onUp = () => {
      dragging.current = false;
      document.body.classList.remove("wb-resizing");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <>
      {isMobile && <div className="wb-drawer-backdrop" onClick={closeSidebar} />}
      <aside className="wb-sidebar" style={isMobile ? undefined : { width: sidebarWidth }} aria-label={meta.en}>
        <div className="wb-sidebar-header">
          <span>{locale === "en" ? meta.en : meta.es}</span>
          {isMobile && (
            <button type="button" className="wb-icon-btn" onClick={closeSidebar} aria-label="Close">
              <CloseIcon size={16} />
            </button>
          )}
        </div>
        <div className="wb-sidebar-body">
          {Object.entries(VIEWS).map(([id, View]) =>
            visited.has(id) ? (
              <div key={id} hidden={id !== activeView} className="wb-view">
                <View />
              </div>
            ) : null
          )}
        </div>
        {!isMobile && (
          <div
            className="wb-sash"
            role="separator"
            aria-orientation="vertical"
            onPointerDown={onPointerDown}
            onDoubleClick={() => setSidebarWidth(264)}
          />
        )}
      </aside>
    </>
  );
}
