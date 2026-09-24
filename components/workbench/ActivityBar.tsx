"use client";

import { clsx } from "clsx";
import { usePreferences } from "../PreferencesProvider";
import { useWorkbench, type ViewId } from "./WorkbenchProvider";
import { AccountIcon, BranchIcon, ExtensionsIcon, FilesIcon, GearIcon, SearchIcon } from "./icons";

export const VIEW_META: Record<ViewId, { en: string; es: string; keys?: string; Icon: typeof FilesIcon }> = {
  explorer: { en: "Explorer", es: "Explorador", keys: "Ctrl+Shift+E", Icon: FilesIcon },
  search: { en: "Search", es: "Buscar", keys: "Ctrl+Shift+F", Icon: SearchIcon },
  scm: { en: "Source Control", es: "Control de código", keys: "Ctrl+Shift+G", Icon: BranchIcon },
  extensions: { en: "Extensions", es: "Extensiones", keys: "Ctrl+Shift+X", Icon: ExtensionsIcon },
  account: { en: "Account", es: "Cuenta", Icon: AccountIcon },
  settings: { en: "Settings", es: "Configuración", keys: "Ctrl+,", Icon: GearIcon },
};

const TOP: ViewId[] = ["explorer", "search", "scm", "extensions"];
const BOTTOM: ViewId[] = ["account", "settings"];

function ActivityButton({ view, mobile }: { view: ViewId; mobile?: boolean }) {
  const { activeView, sidebarOpen, toggleView, installed } = useWorkbench();
  const { locale } = usePreferences();
  const meta = VIEW_META[view];
  const active = sidebarOpen && activeView === view;
  const label = locale === "en" ? meta.en : meta.es;

  return (
    <button
      type="button"
      className={clsx(mobile ? "wb-mobilebar-btn" : "wb-activity-btn", active && "is-active")}
      onClick={() => toggleView(view)}
      title={meta.keys ? `${label} (${meta.keys})` : label}
      aria-label={label}
      aria-pressed={active}
    >
      <meta.Icon size={mobile ? 22 : 24} />
      {view === "extensions" && installed.length > 0 && <span className="wb-badge">{installed.length}</span>}
      {mobile && <span className="wb-mobilebar-label">{label}</span>}
    </button>
  );
}

export default function ActivityBar() {
  return (
    <nav className="wb-activity" aria-label="Activity bar">
      <div className="wb-activity-group">
        {TOP.map((view) => (
          <ActivityButton key={view} view={view} />
        ))}
      </div>
      <div className="wb-activity-group">
        {BOTTOM.map((view) => (
          <ActivityButton key={view} view={view} />
        ))}
      </div>
    </nav>
  );
}

export function MobileBar() {
  return (
    <nav className="wb-mobilebar" aria-label="Mobile navigation">
      {[...TOP, "account" as ViewId].map((view) => (
        <ActivityButton key={view} view={view} mobile />
      ))}
    </nav>
  );
}
