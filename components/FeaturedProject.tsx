import BentoCard from "./BentoCard";
import Chip from "./Chip";

export default function FeaturedProject() {
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
      <ul className="list-none p-0 mb-[18px] grid grid-cols-1 md:grid-cols-2 gap-[8px_18px]">
        <li className="flex items-start gap-2 text-[13px] text-fg-dim leading-[1.45] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-[2px] before:bg-[var(--grad)] before:mt-1.5 before:shrink-0">Real-time chat system</li>
        <li className="flex items-start gap-2 text-[13px] text-fg-dim leading-[1.45] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-[2px] before:bg-[var(--grad)] before:mt-1.5 before:shrink-0">Visual workflow builder</li>
        <li className="flex items-start gap-2 text-[13px] text-fg-dim leading-[1.45] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-[2px] before:bg-[var(--grad)] before:mt-1.5 before:shrink-0">AI engine with context management</li>
        <li className="flex items-start gap-2 text-[13px] text-fg-dim leading-[1.45] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-[2px] before:bg-[var(--grad)] before:mt-1.5 before:shrink-0">20+ integrations (Gmail, Slack, Notion, HubSpot…)</li>
      </ul>
      <div className="flex flex-wrap gap-1.5 mb-[18px]">
        <Chip label="React" dotColor="#61dafb" />
        <Chip label="Flask" dotColor="#000" />
        <Chip label="MongoDB" dotColor="#47a248" />
        <Chip label="Redis" dotColor="#dc382d" />
      </div>
    </BentoCard>
  );
}
