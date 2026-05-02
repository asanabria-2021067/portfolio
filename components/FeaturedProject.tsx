import BentoCard from "./BentoCard";
import Chip from "./Chip";

export default function FeaturedProject({
  demoLink = "https://shifu.ai",
  repoLink,
}: {
  demoLink?: string;
  repoLink?: string;
}) {
  return (
    <BentoCard span={2} className="flex flex-col">
      <div className="flex items-center justify-between mb-[18px] gap-[10px]">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-fg-mute font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-accent shadow-[0_0_10px_var(--color-blue-accent)]" />
          Featured Project
        </div>
        <span className="text-fg-mute text-[12px] font-mono">2025 — present</span>
      </div>
      <div className="relative rounded-[var(--radius-sm)] overflow-hidden border border-[var(--line)] bg-[linear-gradient(135deg,#1a1d2e,#0e1020)] mb-[22px] aspect-[16/7]">
        <svg viewBox="0 0 700 300" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
          <defs>
            <linearGradient id="fa1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1a1d35" />
              <stop offset="100%" stopColor="#0d0f1c" />
            </linearGradient>
            <linearGradient id="fa-glow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6aa6ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6aa6ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="pg1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6aa6ff" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <rect width="700" height="300" fill="url(#fa1)" />
          <g transform="translate(50 36)">
            <rect
              width="600"
              height="228"
              rx="14"
              fill="rgba(11,13,21,0.95)"
              stroke="rgba(255,255,255,0.10)"
            />
            <circle cx="18" cy="18" r="4" fill="#ff5f56" />
            <circle cx="32" cy="18" r="4" fill="#ffbd2e" />
            <circle cx="46" cy="18" r="4" fill="#27c93f" />
            <line x1="0" y1="36" x2="600" y2="36" stroke="rgba(255,255,255,0.06)" />
            <rect x="0" y="36" width="140" height="192" fill="rgba(255,255,255,0.025)" />
            <text
              x="20"
              y="62"
              fill="rgba(255,255,255,0.5)"
              fontFamily="var(--font-mono)"
              fontSize="9"
            >
              SHIFU AI
            </text>
            <g fill="rgba(255,255,255,0.14)">
              <rect x="14" y="80" width="112" height="22" rx="4" fill="rgba(106,166,255,0.18)" />
              <rect x="14" y="108" width="100" height="6" rx="2" />
              <rect x="14" y="120" width="80" height="6" rx="2" />
              <rect x="14" y="120" width="80" height="6" rx="2" />
              <rect x="14" y="142" width="90" height="6" rx="2" />
              <rect x="14" y="154" width="70" height="6" rx="2" />
              <rect x="14" y="176" width="100" height="6" rx="2" />
            </g>
            <g transform="translate(160 50)">
              <rect
                width="420"
                height="40"
                rx="10"
                fill="rgba(106,166,255,0.10)"
                stroke="rgba(106,166,255,0.20)"
              />
              <circle cx="20" cy="20" r="8" fill="#6aa6ff" />
              <rect x="36" y="14" width="180" height="5" rx="2" fill="rgba(255,255,255,0.7)" />
              <rect x="36" y="24" width="240" height="5" rx="2" fill="rgba(255,255,255,0.4)" />
              <rect
                y="56"
                width="380"
                height="40"
                rx="10"
                fill="rgba(167,139,250,0.10)"
                stroke="rgba(167,139,250,0.22)"
              />
              <circle cx="20" cy="76" r="8" fill="#a78bfa" />
              <rect x="36" y="70" width="220" height="5" rx="2" fill="rgba(255,255,255,0.7)" />
              <rect x="36" y="80" width="160" height="5" rx="2" fill="rgba(255,255,255,0.4)" />
              <rect
                y="142"
                width="420"
                height="36"
                rx="10"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.10)"
              />
              <rect x="14" y="155" width="180" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
              <rect x="376" y="148" width="32" height="22" rx="6" fill="url(#pg1)" />
            </g>
          </g>
          <rect x="0" y="160" width="700" height="2" fill="url(#fa-glow)" opacity="0.7">
            <animate attributeName="y" values="60;240;60" dur="6s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
      <div className="flex items-center gap-2.5 text-[12px] text-fg-mute mb-2.5 font-mono flex-wrap">
        <span>Hyperreality Company</span>
        <span className="opacity-40">/</span>
        <span>Lead Developer</span>
        <span className="opacity-40">/</span>
        <span>Productivity SaaS</span>
      </div>
      <h2 className="text-[26px] font-semibold tracking-[-0.02em] leading-[1.15] mb-3">
        <span className="grad-text">Shifu AI</span> — productivity assistant that automates your
        workflows.
      </h2>
      <p className="text-fg-dim text-[14px] leading-[1.6] mb-3.5 text-pretty">
        AI-powered productivity assistant designed to integrate and automate workflows across 20+
        platforms. Built end-to-end as the lead developer, designing the full system architecture
        and integration layer.
      </p>
      <ul className="list-none p-0 mb-[22px] grid grid-cols-1 md:grid-cols-2 gap-[8px_18px]">
        <li className="flex items-start gap-2 text-[13px] text-fg-dim leading-[1.45] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-[2px] before:bg-[var(--grad)] before:mt-1.5 before:shrink-0">Real-time chat system</li>
        <li className="flex items-start gap-2 text-[13px] text-fg-dim leading-[1.45] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-[2px] before:bg-[var(--grad)] before:mt-1.5 before:shrink-0">Visual workflow builder</li>
        <li className="flex items-start gap-2 text-[13px] text-fg-dim leading-[1.45] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-[2px] before:bg-[var(--grad)] before:mt-1.5 before:shrink-0">AI engine with context management</li>
        <li className="flex items-start gap-2 text-[13px] text-fg-dim leading-[1.45] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-[2px] before:bg-[var(--grad)] before:mt-1.5 before:shrink-0">20+ integrations (Gmail, Slack, Notion, HubSpot…)</li>
      </ul>
      
      <div className="flex flex-col gap-5 mt-auto">
        <div className="flex flex-wrap gap-1.5">
          <Chip label="React" dotColor="#61dafb" />
          <Chip label="Flask" dotColor="#000" />
          <Chip label="MongoDB" dotColor="#47a248" />
          <Chip label="Redis" dotColor="#dc382d" />
        </div>

        <div className="flex items-center justify-end border-t border-[var(--line)] pt-5 gap-3">
          {demoLink && (
            <a href={demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[8px] text-fg-dim text-[11px] font-mono py-[9px] px-5 bg-white/4 border border-[var(--line)] rounded-full transition-all duration-200 hover:text-white hover:bg-grad hover:border-transparent group">
              Launch App
              <svg width="12" height="12" viewBox="0 0 16 16" className="transition-transform duration-250 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                <path
                  d="M3 13 L13 3 M6 3 H13 V10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
          {repoLink && (
            <a href={repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[8px] text-fg-dim text-[11px] font-mono py-[9px] px-5 bg-white/4 border border-[var(--line)] rounded-full transition-all duration-200 hover:text-white hover:bg-white/10 hover:border-white/20 group">
              Source Code
              <svg width="12" height="12" viewBox="0 0 16 16" className="opacity-70 group-hover:opacity-100">
                <path
                  d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.1 0-.71-.24-1.17-.51-1.41 1.67-.18 3.43-.82 3.43-3.72 0-.82-.29-1.49-.77-2.02.08-.19.33-.96-.07-1.99 0 0-.63-.2-2.07.77A7.114 7.114 0 0 0 8 4.74c-.68 0-1.36.09-2 .27-1.44-.97-2.07-.77-2.07-.77-.4 1.03-.15 1.8-.07 1.99-.48.53-.78 1.2-.78 2.02 0 2.89 1.75 3.54 3.42 3.72-.21.19-.4.52-.47.99-.42.19-1.48.51-2.13-.61 0 0-.39-.71-.13-1.07 0 0-.46-.01-.32.28 0 0 .31.14.52.68 0 0 .28.85 1.63.58.01.62.01 1.11.01 1.27 0 .21-.16.47-.56.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"
                  fill="currentColor"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
