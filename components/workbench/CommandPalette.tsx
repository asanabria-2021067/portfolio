"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import { usePreferences } from "../PreferencesProvider";
import { useWorkbench } from "./WorkbenchProvider";
import { FileBadge } from "./views/ExplorerView";
import { normalize } from "./searchIndex";
import { ALL_FILES, t } from "@/lib/workspace";

interface Item {
  key: string;
  label: string;
  detail?: string;
  hint?: string;
  ext?: string;
  run: () => void;
}

function matches(text: string, query: string) {
  const haystack = normalize(text);
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

function Palette() {
  const { locale } = usePreferences();
  const { palette, closePalette, commands, openFile } = useWorkbench();
  const [value, setValue] = useState(palette.mode === "commands" ? ">" : "");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const commandMode = value.startsWith(">");
  const query = commandMode ? value.slice(1).trim() : value.trim();

  const items = useMemo<Item[]>(() => {
    if (commandMode) {
      return commands
        .map((command) => {
          const label = locale === "en" ? command.labelEn : command.labelEs;
          return {
            key: command.id,
            label: command.category ? `${command.category}: ${label}` : label,
            hint: command.keybinding,
            run: command.run,
          };
        })
        .filter((item) => matches(item.label, query));
    }
    return ALL_FILES.filter((file) => matches(file.path, query)).map((file) => ({
      key: file.path,
      label: file.name,
      detail: file.path.split("/").slice(0, -1).join("/"),
      ext: file.ext,
      run: () => openFile(file),
    }));
  }, [commandMode, commands, query, locale, openFile]);

  const safeSelected = Math.min(selected, Math.max(items.length - 1, 0));

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${safeSelected}"]`)?.scrollIntoView({ block: "nearest" });
  }, [safeSelected]);

  const execute = (item: Item | undefined) => {
    if (!item) return;
    closePalette();
    item.run();
  };

  return (
    <div className="wb-palette-backdrop" onMouseDown={closePalette}>
      <div className="wb-palette" role="dialog" aria-label="Command palette" onMouseDown={(event) => event.stopPropagation()}>
        <input
          ref={inputRef}
          className="wb-input wb-palette-input"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setSelected(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setSelected((safeSelected + 1) % Math.max(items.length, 1));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setSelected((safeSelected - 1 + items.length) % Math.max(items.length, 1));
            } else if (event.key === "Enter") {
              event.preventDefault();
              execute(items[safeSelected]);
            } else if (event.key === "Escape") {
              closePalette();
            }
          }}
          placeholder={
            commandMode
              ? t(locale, "Type a command", "Escribe un comando")
              : t(locale, "Search files by name (type > for commands)", "Busca archivos por nombre (escribe > para comandos)")
          }
          aria-label="Command palette input"
          spellCheck={false}
        />
        <div className="wb-palette-list" ref={listRef} role="listbox">
          {items.length === 0 && (
            <div className="wb-palette-empty">
              {commandMode ? t(locale, "No matching commands", "Ningún comando coincide") : t(locale, "No matching files", "Ningún archivo coincide")}
            </div>
          )}
          {items.map((item, index) => (
            <button
              key={item.key}
              type="button"
              role="option"
              aria-selected={index === safeSelected}
              data-index={index}
              className={clsx("wb-palette-item", index === safeSelected && "is-selected")}
              onMouseMove={() => index !== safeSelected && setSelected(index)}
              onClick={() => execute(item)}
            >
              {item.ext && <FileBadge ext={item.ext} />}
              <span className="wb-palette-label">{item.label}</span>
              {item.detail && <span className="wb-palette-detail">{item.detail}</span>}
              {item.hint && <kbd>{item.hint}</kbd>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CommandPalette() {
  const { palette } = useWorkbench();
  if (!palette.open) return null;
  // remount per opening so the input starts fresh with the right prefix
  return <Palette key={palette.seed} />;
}
