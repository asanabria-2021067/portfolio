"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePreferences, type Theme } from "../PreferencesProvider";
import { useWorkbench } from "./WorkbenchProvider";
import { EXTENSIONS, type ExtensionId } from "./extensions";
import { CloseIcon, TerminalIcon } from "./icons";
import {
  ALL_FILES,
  EMAIL,
  GITHUB_PROFILE,
  LINKEDIN_URL,
  WORKSPACE_TREE,
  type WorkspaceFolder,
  type WorkspaceNode,
} from "@/lib/workspace";

type Line = { kind: "cmd" | "out" | "err" | "ok"; content: React.ReactNode };

const PROMPT = "angel@portfolio:~/portfolio$";
const COMMANDS = ["help", "ls", "cat", "open", "whoami", "contact", "cv", "theme", "lang", "ext", "git", "date", "echo", "history", "clear", "exit"];

const PACKAGE_JSON = `{
  "name": "angel-sanabria",
  "role": "VMware Engineer Jr. & Full Stack Developer",
  "location": "Guatemala (GMT-6)",
  "education": "Computer Science — Universidad del Valle de Guatemala",
  "dependencies": {
    "languages": ["TypeScript", "JavaScript", "Python", "Go", "Java"],
    "frameworks": ["Next.js", "React", "NestJS", "Django", "Node.js", "Flask", "Tailwind CSS"],
    "databases": ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Neo4j"],
    "infra": ["VMware", "Docker", "Kubernetes", "Azure", "AWS", "GitHub Actions"]
  },
  "scripts": {
    "hire": "mailto:${EMAIL}"
  }
}`;

function readme(locale: "en" | "es") {
  return locale === "en"
    ? `# Angel Sanabria

VMware Engineer Jr. & Full Stack Developer from Guatemala.
I work on VMware Cloud Foundation infrastructure (Supervisor, VKS, NSX)
and build full-stack web apps with Next.js, NestJS and friends.
Computer Science student at Universidad del Valle de Guatemala (UVG).

Run \`contact\` to reach me or \`cv\` to see my resume.`
    : `# Angel Sanabria

VMware Engineer Jr. y desarrollador full stack de Guatemala.
Trabajo con infraestructura VMware Cloud Foundation (Supervisor, VKS, NSX)
y construyo aplicaciones web full stack con Next.js, NestJS y más.
Estudiante de Ciencias de la Computación en la Universidad del Valle de Guatemala (UVG).

Ejecuta \`contact\` para escribirme o \`cv\` para ver mi CV.`;
}

function findFolder(path: string): WorkspaceFolder | null {
  const root = WORKSPACE_TREE[0] as WorkspaceFolder;
  const parts = path.split("/").filter((part) => part && part !== "." && part !== "portfolio");
  let current: WorkspaceFolder = root;
  for (const part of parts) {
    const next = current.children.find((node): node is WorkspaceFolder => node.type === "folder" && node.name === part);
    if (!next) return null;
    current = next;
  }
  return current;
}

function findFile(arg: string) {
  const clean = arg.replace(/^\.\//, "").replace(/^portfolio\//, "");
  return ALL_FILES.find((file) => file.path === `portfolio/${clean}` || file.name === clean);
}

export default function TerminalPanel() {
  const { locale, setLocale, theme, setTheme } = usePreferences();
  const {
    terminalOpen,
    setTerminalOpen,
    terminalRequest,
    openFile,
    commands,
    installed,
    install,
    uninstall,
    availableThemes,
  } = useWorkbench();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const handled = useRef(0);

  const en = locale === "en";

  const run = useCallback(
    (raw: string) => {
      const commandLine = raw.trim();
      const out: Line[] = [{ kind: "cmd", content: commandLine }];
      const print = (content: React.ReactNode, kind: Line["kind"] = "out") => out.push({ kind, content });
      const [cmd, ...args] = commandLine.split(/\s+/);
      const arg = args.join(" ");

      if (commandLine) setHistory((h) => [...h.filter((item) => item !== commandLine), commandLine].slice(-50));

      switch (cmd) {
        case "":
          break;
        case "help":
          print(
            en
              ? `Available commands:
  ls [dir]            list files            cat <file>     print a file
  open <file>         open a file           whoami         who is Angel?
  contact             how to reach me       cv             open my resume
  theme [name]        list / set theme      lang <en|es>   change language
  ext [list|install|uninstall] <id>        manage extensions
  git status          repo status           date · echo · history · clear · exit`
              : `Comandos disponibles:
  ls [dir]            listar archivos       cat <archivo>  mostrar un archivo
  open <archivo>      abrir un archivo      whoami         ¿quién es Angel?
  contact             cómo contactarme      cv             abrir mi CV
  theme [nombre]      ver / cambiar tema    lang <en|es>   cambiar idioma
  ext [list|install|uninstall] <id>        gestionar extensiones
  git status          estado del repo       date · echo · history · clear · exit`
          );
          break;
        case "ls": {
          const folder = findFolder(arg || ".");
          if (!folder) print(`ls: ${arg}: ${en ? "No such directory" : "No existe el directorio"}`, "err");
          else
            print(
              <span className="wb-term-ls">
                {folder.children.map((node: WorkspaceNode) => (
                  <span key={node.name} className={node.type === "folder" ? "is-dir" : undefined}>
                    {node.name}
                    {node.type === "folder" ? "/" : ""}
                  </span>
                ))}
              </span>
            );
          break;
        }
        case "cat": {
          if (!arg) {
            print(en ? "usage: cat <file>" : "uso: cat <archivo>", "err");
            break;
          }
          const file = findFile(arg);
          if (!file) print(`cat: ${arg}: ${en ? "No such file" : "No existe el archivo"}`, "err");
          else if (file.name === "README.md") print(readme(locale));
          else if (file.name === "package.json") print(PACKAGE_JSON);
          else if (file.name === ".env.local")
            print(`cat: .env.local: ${en ? "Permission denied — nice try 😉" : "Permiso denegado — buen intento 😉"}`, "err");
          else {
            print(`${en ? "Opening" : "Abriendo"} ${file.name}…`, "ok");
            openFile(file);
          }
          break;
        }
        case "open":
        case "code": {
          const file = findFile(arg);
          if (!file) print(`${cmd}: ${arg || "?"}: ${en ? "No such file" : "No existe el archivo"}`, "err");
          else {
            print(`${en ? "Opening" : "Abriendo"} ${file.name}…`, "ok");
            openFile(file);
          }
          break;
        }
        case "whoami":
          print(
            en
              ? "angel — VMware Engineer Jr. & Full Stack Developer · Guatemala · open to opportunities"
              : "angel — VMware Engineer Jr. y desarrollador full stack · Guatemala · disponible para oportunidades"
          );
          break;
        case "contact":
        case "socials":
          print(
            <span className="wb-term-links">
              <span>
                email&nbsp;&nbsp;&nbsp;&nbsp;<a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </span>
              <span>
                github&nbsp;&nbsp;&nbsp;<a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">{GITHUB_PROFILE.replace("https://", "")}</a>
              </span>
              <span>
                linkedin <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">{LINKEDIN_URL.replace("https://www.", "")}</a>
              </span>
            </span>
          );
          break;
        case "cv":
          print(en ? "Opening CV.pdf…" : "Abriendo CV.pdf…", "ok");
          commands.find((command) => command.id === "cv.view")?.run();
          break;
        case "theme": {
          if (!arg) {
            print(`${en ? "Themes" : "Temas"}: ${availableThemes.map((name) => (name === theme ? `*${name}` : name)).join("  ")}`);
            if (availableThemes.length === 1)
              print(en ? "Tip: ext install daylight-theme · ext install aurora-theme" : "Tip: ext install daylight-theme · ext install aurora-theme");
          } else if (availableThemes.includes(arg as Theme)) {
            setTheme(arg as Theme);
            print(`${en ? "Theme set to" : "Tema cambiado a"} ${arg}`, "ok");
          } else print(`theme: ${arg}: ${en ? "not installed" : "no instalado"}`, "err");
          break;
        }
        case "lang":
          if (arg === "en" || arg === "es") {
            setLocale(arg);
            print(arg === "en" ? "Language set to English" : "Idioma cambiado a español", "ok");
          } else print(en ? "usage: lang <en|es>" : "uso: lang <en|es>", "err");
          break;
        case "ext": {
          const [action, id] = args;
          const ext = EXTENSIONS.find((item) => item.id === id);
          if (!action || action === "list") {
            EXTENSIONS.forEach((item) =>
              print(`${installed.includes(item.id) ? "✔" : " "} ${item.id.padEnd(16)} ${en ? item.descriptionEn : item.descriptionEs}`)
            );
          } else if ((action === "install" || action === "uninstall") && !ext) {
            print(`ext: ${id ?? "?"}: ${en ? "unknown extension (try: ext list)" : "extensión desconocida (prueba: ext list)"}`, "err");
          } else if (action === "install") {
            install(ext!.id as ExtensionId);
            print(`${en ? "Installed" : "Instalada"} ${ext!.name} ✔`, "ok");
          } else if (action === "uninstall") {
            uninstall(ext!.id as ExtensionId);
            print(`${en ? "Uninstalled" : "Desinstalada"} ${ext!.name}`, "ok");
          } else print(en ? "usage: ext [list|install|uninstall] <id>" : "uso: ext [list|install|uninstall] <id>", "err");
          break;
        }
        case "git":
          if (args[0] === "status")
            print(
              en
                ? "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean\n(but Angel is open to new opportunities)"
                : "En la rama main\nTu rama está actualizada con 'origin/main'.\n\nnada para hacer commit, el árbol de trabajo está limpio\n(pero Angel está disponible para nuevas oportunidades)"
            );
          else print(en ? "Try: git status" : "Prueba: git status");
          break;
        case "date":
          print(new Date().toLocaleString(en ? "en-US" : "es-GT", { timeZone: "America/Guatemala", dateStyle: "full", timeStyle: "short" }) + " (GT)");
          break;
        case "echo":
          print(arg);
          break;
        case "history":
          print(history.map((item, i) => `${String(i + 1).padStart(3)}  ${item}`).join("\n") || " ");
          break;
        case "sudo":
          print(en ? "sudo: permission denied — you'll need to hire me first 😄" : "sudo: permiso denegado — primero tendrás que contratarme 😄", "err");
          break;
        case "clear":
          setLines([]);
          return;
        case "exit":
          setTerminalOpen(false);
          return;
        default:
          print(`${cmd}: ${en ? "command not found. Type 'help'" : "comando no encontrado. Escribe 'help'"}`, "err");
      }
      setLines((current) => [...current, ...out]);
    },
    [en, locale, openFile, commands, availableThemes, theme, setTheme, setLocale, installed, install, uninstall, history, setTerminalOpen]
  );

  // commands sent from elsewhere (e.g. clicking README.md in the explorer)
  useEffect(() => {
    if (terminalRequest && terminalRequest.id !== handled.current) {
      handled.current = terminalRequest.id;
      run(terminalRequest.command);
    }
  }, [terminalRequest, run]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    if (terminalOpen) inputRef.current?.focus();
  }, [terminalOpen]);

  const complete = () => {
    const parts = input.split(" ");
    const last = parts[parts.length - 1];
    const pool = parts.length === 1 ? COMMANDS : [...ALL_FILES.map((file) => file.name), ...EXTENSIONS.map((ext) => ext.id), "app", "public", "components", "lib"];
    const match = pool.find((candidate) => candidate.startsWith(last) && candidate !== last);
    if (match) setInput([...parts.slice(0, -1), match].join(" "));
  };

  return (
    <section className="wb-panel" aria-label="Terminal">
      <div className="wb-panel-header">
        <span className="wb-panel-tab is-active">
          <TerminalIcon size={13} /> {en ? "Terminal" : "Terminal"}
        </span>
        <span className="wb-panel-shell">bash</span>
        <button type="button" className="wb-icon-btn" onClick={() => setTerminalOpen(false)} aria-label={en ? "Close terminal" : "Cerrar terminal"}>
          <CloseIcon size={14} />
        </button>
      </div>
      <div className="wb-term" ref={scrollRef} onClick={() => inputRef.current?.focus()}>
        {lines.length === 0 && (
          <p className="wb-term-line wb-term-muted">
            {en ? "Welcome! Type 'help' to see what you can do here." : "¡Bienvenido! Escribe 'help' para ver lo que puedes hacer."}
          </p>
        )}
        {lines.map((line, index) => (
          <div key={index} className={`wb-term-line wb-term-${line.kind}`}>
            {line.kind === "cmd" ? (
              <>
                <span className="wb-term-prompt">{PROMPT}</span> {line.content}
              </>
            ) : (
              line.content
            )}
          </div>
        ))}
        <div className="wb-term-line wb-term-input-row">
          <span className="wb-term-prompt">{PROMPT}</span>
          <input
            ref={inputRef}
            className="wb-term-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                run(input);
                setInput("");
                setCursor(-1);
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                const next = cursor === -1 ? history.length - 1 : Math.max(cursor - 1, 0);
                if (history[next] !== undefined) {
                  setCursor(next);
                  setInput(history[next]);
                }
              } else if (event.key === "ArrowDown") {
                event.preventDefault();
                const next = cursor + 1;
                if (cursor === -1) return;
                if (next >= history.length) {
                  setCursor(-1);
                  setInput("");
                } else {
                  setCursor(next);
                  setInput(history[next]);
                }
              } else if (event.key === "Tab") {
                event.preventDefault();
                complete();
              } else if (event.key === "l" && event.ctrlKey) {
                event.preventDefault();
                setLines([]);
              }
            }}
            aria-label="Terminal input"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>
      </div>
    </section>
  );
}
