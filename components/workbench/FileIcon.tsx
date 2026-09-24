/* eslint-disable @next/next/no-img-element -- tiny remote icons from the Iconify API */
import { iconUrl } from "./extensions";

const FILE_ICONS: Record<string, string> = {
  tsx: "vscode-icons:file-type-reactts",
  ts: "vscode-icons:file-type-typescript",
  json: "vscode-icons:file-type-npm",
  md: "vscode-icons:file-type-markdown",
  env: "vscode-icons:file-type-dotenv",
  pdf: "vscode-icons:file-type-pdf2",
  jpeg: "vscode-icons:file-type-image",
  jpg: "vscode-icons:file-type-image",
  png: "vscode-icons:file-type-image",
};

const FOLDER_ICONS: Record<string, string> = {
  app: "folder-type-app",
  components: "folder-type-component",
  public: "folder-type-public",
  lib: "folder-type-library",
  assets: "folder-type-asset",
  certificaciones: "folder-type-docs",
};

export function FileIcon({ ext, size = 16 }: { ext: string; size?: number }) {
  const icon = FILE_ICONS[ext] ?? "vscode-icons:default-file";
  return <img src={iconUrl(icon)} alt="" width={size} height={size} className="wb-file-icon" loading="lazy" draggable={false} />;
}

export function FolderIcon({ name, open, size = 16 }: { name: string; open: boolean; size?: number }) {
  const base = FOLDER_ICONS[name] ?? "default-folder";
  const icon = `vscode-icons:${base}${open ? "-opened" : ""}`;
  return <img src={iconUrl(icon)} alt="" width={size} height={size} className="wb-file-icon" loading="lazy" draggable={false} />;
}
