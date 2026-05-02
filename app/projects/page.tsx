import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-end justify-between gap-6 mb-7 py-1 px-2 flex-wrap">
        <div className="flex flex-col gap-[14px]">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-mute font-mono">
            <span className="w-[6px] h-[6px] rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
            Projects · 2023 — 2026
          </div>
          <h1 className="text-[clamp(38px,4.4vw,56px)] font-semibold tracking-[-0.035em] leading-none m-0">
            Things I've <span className="grad-text">built & shipped.</span>
          </h1>
          <p className="text-fg-dim text-[15px] leading-[1.55] max-w-[560px] m-0">
            A collection of full-stack apps, AI products, and systems work — from production SaaS to
            award-winning hackathon builds.
          </p>
        </div>
        <div className="flex gap-6 flex-wrap">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.12em] text-fg-mute font-mono">Projects</span>
            <span className="text-[22px] font-semibold tracking-[-0.02em] grad-text">06</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.12em] text-fg-mute font-mono">Stacks</span>
            <span className="text-[22px] font-semibold tracking-[-0.02em] grad-text">MERN · Flask · Python</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.12em] text-fg-mute font-mono">Awards</span>
            <span className="text-[22px] font-semibold tracking-[-0.02em] grad-text">01 🏆</span>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {/* Shifu AI */}
        <ProjectCard
          size="medium"
          badge="⚡ Featured"
          badgeColor="violet"
          meta="2025 — Present · Hyperreality Company"
          title="Shifu AI"
          desc="AI productivity assistant with 20+ integrations — automates workflows, manages context, and connects the tools your team already uses."
          bullets={[
            "Real-time workflows",
            "AI engine with context management",
            "Automation system",
            "Integrations: Gmail, Slack, Notion, HubSpot…",
          ]}
          tags={[
            { label: "React", color: "#61dafb" },
            { label: "Flask", color: "#fff" },
            { label: "MongoDB", color: "#47a248" },
            { label: "Redis", color: "#dc382d" },
          ]}
          demoLink="https://shifu.ai"
          art={
            <svg viewBox="0 0 700 300" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
              <defs>
                <linearGradient id="fa1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1a1d35" />
                  <stop offset="100%" stopColor="#0d0f1c" />
                </linearGradient>
                <linearGradient id="fa-pg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6aa6ff" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
                <linearGradient id="fa-glow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6aa6ff" stopOpacity="0" />
                  <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#6aa6ff" stopOpacity="0" />
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
                  <rect x="376" y="148" width="32" height="22" rx="6" fill="url(#fa-pg)" />
                </g>
              </g>
              <rect x="0" y="160" width="700" height="2" fill="url(#fa-glow)" opacity="0.7">
                <animate attributeName="y" values="60;240;60" dur="6s" repeatCount="indefinite" />
              </rect>
            </svg>
          }
        />

        {/* WaterWay+ */}
        <ProjectCard
          size="medium"
          badge="🏆 Hackathon Winner"
          badgeColor="gold"
          meta="Project · 2024"
          title="WaterWay+"
          desc="AI + maps for river protection. Visualizes pollution patterns and helps communities take action with environmental data."
          tags={[{ label: "React Native", color: "#61dafb" }, { label: "Firebase", color: "#ffca28" }, { label: "Maps", color: "#4285f4" }]}
          demoLink="#"
          repoLink="#"
          art={
            <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
              <defs>
                <linearGradient id="ww1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0e3a5f" />
                  <stop offset="100%" stopColor="#1e6091" />
                </linearGradient>
                <linearGradient id="ww-wave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(106,166,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(106,166,255,0)" />
                </linearGradient>
              </defs>
              <rect width="400" height="200" fill="url(#ww1)" />
              <path d="M0 110 Q 100 90 200 110 T 400 110 L400 200 L0 200 Z" fill="url(#ww-wave)" />
              <path
                d="M0 130 Q 100 110 200 130 T 400 130 L400 200 L0 200 Z"
                fill="rgba(106,166,255,0.18)"
              />
              <path
                d="M0 150 Q 100 135 200 150 T 400 150 L400 200 L0 200 Z"
                fill="rgba(106,166,255,0.10)"
              />
              <g transform="translate(200 70)">
                <path
                  d="M 0 -28 Q 22 0 22 18 Q 22 38 0 38 Q -22 38 -22 18 Q -22 0 0 -28 Z"
                  fill="white"
                  opacity="0.95"
                />
                <path
                  d="M -8 14 Q -8 24 0 24"
                  stroke="#1e6091"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          }
        />

        {/* SeaSOS */}
        <ProjectCard
          size="medium"
          badge="🌊 ODS 14"
          badgeColor="violet"
          meta="Feb. 2024 - May. 2024"
          title="SeaSOS"
          desc="Proyecto Full Stack enfocado en el cuidado de la vida marina y una solución tecnológica al ODS 14."
          bullets={[
            "Full Stack: Python Flask, React y MongoDB",
            "Análisis de datos con Pandas & Matplotlib",
            "Visualización geográfica con Leaflet",
          ]}
          tags={[
            { label: "React.js", color: "#61dafb" },
            { label: "Python", color: "#3776ab" },
            { label: "Flask", color: "#fff" },
            { label: "MongoDB", color: "#47a248" },
            { label: "Pandas", color: "#150458" },
          ]}
          demoLink="#"
          repoLink="#"
          art={
            <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
              <defs>
                <linearGradient id="ss1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1a1147" />
                  <stop offset="100%" stopColor="#3b1f6b" />
                </linearGradient>
                <radialGradient id="ss-pulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="400" height="200" fill="url(#ss1)" />
              <g stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none">
                <circle cx="200" cy="105" r="40" />
                <circle cx="200" cy="105" r="70" />
                <circle cx="200" cy="105" r="100" />
                <line x1="60" y1="105" x2="340" y2="105" />
                <line x1="200" y1="10" x2="200" y2="200" />
              </g>
              <circle cx="200" cy="105" r="55" fill="url(#ss-pulse)">
                <animate attributeName="r" values="20;90;20" dur="3s" repeatCount="indefinite" />
                <animate
                  attributeName="opacity"
                  values="0.8;0;0.8"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <g transform="translate(200 105)">
                <circle r="10" fill="#a78bfa" />
                <circle r="14" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.7" />
              </g>
            </svg>
          }
        />

        {/* Sistema Bancario */}
        <ProjectCard
          size="small"
          badge="🏦 Banking"
          badgeColor="blue"
          meta="Jun. 2023 - Jul. 2023"
          title="Sistema Bancario"
          desc="Plataforma bancaria simulada con transferencias, depósitos, créditos y conversión de divisas en tiempo real."
          bullets={[
            "Integración con API ExchangeRates",
            "Stack MERN (MongoDB, Express, React, Node)",
            "Gestión de divisas y transacciones",
          ]}
          tags={[
            { label: "React.js", color: "#61dafb" },
            { label: "Node.js", color: "#339933" },
            { label: "MongoDB", color: "#47a248" },
            { label: "Firebase", color: "#ffca28" },
            { label: "Java", color: "#007396" },
          ]}
          demoLink="#"
          repoLink="#"
          art={
            <svg viewBox="0 0 400 212" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
              <defs>
                <linearGradient id="bk1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0a1f3a" />
                  <stop offset="100%" stopColor="#173d6b" />
                </linearGradient>
                <linearGradient id="card-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6aa6ff" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              <rect width="400" height="212" fill="url(#bk1)" />
              <g transform="translate(200 106) rotate(-10)">
                <rect
                  x="-110"
                  y="-65"
                  width="220"
                  height="130"
                  rx="14"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.18)"
                />
                <rect
                  x="-110"
                  y="-65"
                  width="220"
                  height="130"
                  rx="14"
                  fill="url(#card-grad)"
                  opacity="0.25"
                />
                <rect x="-90" y="-40" width="34" height="26" rx="4" fill="#fbbf24" opacity="0.8" />
                <rect x="-90" y="10" width="120" height="6" rx="2" fill="rgba(255,255,255,0.6)" />
                <rect x="-90" y="22" width="80" height="5" rx="2" fill="rgba(255,255,255,0.35)" />
                <text
                  x="60"
                  y="50"
                  textAnchor="end"
                  fill="rgba(255,255,255,0.7)"
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                >
                  VISA
                </text>
              </g>
            </svg>
          }
        />

        {/* Gestor de Hoteles */}
        <ProjectCard
          size="small"
          badge="🗺️ Booking"
          badgeColor="green"
          meta="Feb. 2023 - Abr. 2023"
          title="Gestor de Hoteles"
          desc="Sistema de gestión de reservas de hoteles con disponibilidad dinámica y mapas interactivos."
          bullets={[
            "Implementación de Leaflet & React-Leaflet",
            "Gestión dinámica de reservas y hoteles",
            "Hosteado en Firebase y Vercel",
          ]}
          tags={[
            { label: "React.js", color: "#61dafb" },
            { label: "MongoDB", color: "#47a248" },
            { label: "Leaflet", color: "#199900" },
            { label: "Firebase", color: "#ffca28" },
          ]}
          demoLink="#"
          repoLink="#"
          art={
            <svg viewBox="0 0 400 212" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
              <defs>
                <linearGradient id="ht1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0a2e1f" />
                  <stop offset="100%" stopColor="#15543a" />
                </linearGradient>
                <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="400" height="212" fill="url(#ht1)" />
              <rect width="400" height="212" fill="url(#map-grid)" />
              <g>
                <circle cx="120" cy="80" r="22" fill="rgba(74,222,128,0.18)" />
                <circle cx="120" cy="80" r="6" fill="#4ade80" />
              </g>
              <g>
                <circle cx="240" cy="130" r="18" fill="rgba(74,222,128,0.18)" />
                <circle cx="240" cy="130" r="5" fill="#4ade80" />
              </g>
              <g>
                <circle cx="310" cy="70" r="14" fill="rgba(74,222,128,0.18)" />
                <circle cx="310" cy="70" r="4" fill="#4ade80" />
              </g>
              <path
                d="M120 80 Q 180 100 240 130"
                stroke="rgba(74,222,128,0.4)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 3"
              />
              <path
                d="M240 130 Q 280 100 310 70"
                stroke="rgba(74,222,128,0.4)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 3"
              />
            </svg>
          }
        />

        {/* Solidarisk */}
        <ProjectCard
          size="small"
          badge="🤝 Social Impact"
          badgeColor="violet"
          meta="Oct. 2023"
          title="Solidarisk"
          desc="Gestor de recursos (víveres, seguridad, donativos) diseñado para operar de manera dinámica e intuitiva."
          bullets={[
            "Stack MERN completo",
            "Gestión de recursos y donativos",
            "Diseño UX intuitivo y dinámico",
          ]}
          tags={[
            { label: "React.js", color: "#61dafb" },
            { label: "Node.js", color: "#339933" },
            { label: "MongoDB", color: "#47a248" },
            { label: "Firebase", color: "#ffca28" },
            { label: "JWT", color: "#000" },
          ]}
          demoLink="#"
          repoLink="#"
          art={
            <svg viewBox="0 0 400 212" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
              <defs>
                <linearGradient id="sk1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2a1147" />
                  <stop offset="100%" stopColor="#4b1f6b" />
                </linearGradient>
              </defs>
              <rect width="400" height="212" fill="url(#sk1)" />
              <g stroke="rgba(167,139,250,0.4)" strokeWidth="1.2" fill="none">
                <line x1="200" y1="106" x2="100" y2="60" />
                <line x1="200" y1="106" x2="100" y2="160" />
                <line x1="200" y1="106" x2="300" y2="60" />
                <line x1="200" y1="106" x2="300" y2="160" />
                <line x1="100" y1="60" x2="300" y2="60" />
                <line x1="100" y1="160" x2="300" y2="160" />
              </g>
              <g fill="#a78bfa">
                <circle cx="200" cy="106" r="14" />
                <circle cx="100" cy="60" r="8" />
                <circle cx="100" cy="160" r="8" />
                <circle cx="300" cy="60" r="8" />
                <circle cx="300" cy="160" r="8" />
              </g>
              <g fill="rgba(167,139,250,0.18)">
                <circle cx="200" cy="106" r="22" />
                <circle cx="100" cy="60" r="14" />
                <circle cx="100" cy="160" r="14" />
                <circle cx="300" cy="60" r="14" />
                <circle cx="300" cy="160" r="14" />
              </g>
            </svg>
          }
        />
      </main>

      <Footer
        leftText="© 2026 — Angel Sanabria"
        midText="06 projects · all hand-built"
        rightText="Have a project? Get in touch →"
      />
    </div>
  );
}
