export default function ContactLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] mt-1">
      <a href="mailto:contact@angelsanabria.dev" className="flex items-center gap-3 py-3 px-[14px] text-fg-dim bg-white/[0.025] border border-[var(--line)] rounded-bento-sm transition-all duration-200 hover:text-fg hover:border-[var(--line-2)] hover:bg-white/[0.05] hover:-translate-y-[2px]">
        <span className="w-8 h-8 flex items-center justify-center bg-grad-soft rounded-lg shrink-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "#6aa6ff" }}
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        </span>
        <div className="flex flex-col gap-[2px] min-w-0">
          <span className="text-[10px] text-fg-mute uppercase tracking-[0.12em] font-mono">Email</span>
          <span className="text-[12.5px] text-fg font-medium overflow-hidden text-ellipsis whitespace-nowrap">contact@angelsanabria.dev</span>
        </div>
      </a>
      <a href="https://github.com/angelsanabria" target="_blank" className="flex items-center gap-3 py-3 px-[14px] text-fg-dim bg-white/[0.025] border border-[var(--line)] rounded-bento-sm transition-all duration-200 hover:text-fg hover:border-[var(--line-2)] hover:bg-white/[0.05] hover:-translate-y-[2px]">
        <span className="w-8 h-8 flex items-center justify-center bg-grad-soft rounded-lg shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#a78bfa" }}>
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.57.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
          </svg>
        </span>
        <div className="flex flex-col gap-[2px] min-w-0">
          <span className="text-[10px] text-fg-mute uppercase tracking-[0.12em] font-mono">GitHub</span>
          <span className="text-[12.5px] text-fg font-medium overflow-hidden text-ellipsis whitespace-nowrap">@angelsanabria</span>
        </div>
      </a>
      <a href="https://linkedin.com/in/angelsanabria" target="_blank" className="flex items-center gap-3 py-3 px-[14px] text-fg-dim bg-white/[0.025] border border-[var(--line)] rounded-bento-sm transition-all duration-200 hover:text-fg hover:border-[var(--line-2)] hover:bg-white/[0.05] hover:-translate-y-[2px]">
        <span className="w-8 h-8 flex items-center justify-center bg-grad-soft rounded-lg shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#6aa6ff" }}>
            <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 17.34H5.67V10h2.67v7.34zM7 8.81a1.55 1.55 0 110-3.1 1.55 1.55 0 010 3.1zM18.34 17.34h-2.67v-3.57c0-.85-.02-1.95-1.19-1.95-1.19 0-1.37.93-1.37 1.89v3.63h-2.67V10h2.56v1h.04c.36-.68 1.23-1.39 2.53-1.39 2.71 0 3.21 1.78 3.21 4.1v3.63z" />
          </svg>
        </span>
        <div className="flex flex-col gap-[2px] min-w-0">
          <span className="text-[10px] text-fg-mute uppercase tracking-[0.12em] font-mono">LinkedIn</span>
          <span className="text-[12.5px] text-fg font-medium overflow-hidden text-ellipsis whitespace-nowrap">/in/angelsanabria</span>
        </div>
      </a>
    </div>
  );
}
