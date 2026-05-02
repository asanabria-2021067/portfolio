import Hero from "@/components/Hero";
import ProfileCard from "@/components/ProfileCard";
import TechStack from "@/components/TechStack";
import FeaturedProject from "@/components/FeaturedProject";
import Experience from "@/components/Experience";
import ProjectPreview from "@/components/ProjectPreview";
import CertificationsPreview from "@/components/CertificationsPreview";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
      {/* ROW 1 */}
      <Hero />
      <ProfileCard />

      {/* ROW 2 */}
      <TechStack />
      <FeaturedProject />

      {/* ROW 3 */}
      <Experience />
      <ProjectPreview
        title="WaterWay+"
        meta="Project · 2024"
        desc="AI-powered platform for river protection using maps and environmental data. Visualizes pollution patterns and helps communities take action."
        tags={["Maps", "AI", "Env. Data"]}
        badge="🏆 Hackathon Winner"
        art={
          <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
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
            <rect width="400" height="225" fill="url(#ww1)" />
            <path d="M0 130 Q 100 110 200 130 T 400 130 L400 225 L0 225 Z" fill="url(#ww-wave)" />
            <path
              d="M0 150 Q 100 130 200 150 T 400 150 L400 225 L0 225 Z"
              fill="rgba(106,166,255,0.18)"
            />
            <path
              d="M0 170 Q 100 155 200 170 T 400 170 L400 225 L0 225 Z"
              fill="rgba(106,166,255,0.10)"
            />
            <g transform="translate(200 80)">
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
      <ProjectPreview
        title="SeaSOS"
        meta="Feb. 2024 - May. 2024"
        desc="Proyecto Full Stack enfocado en el cuidado de la vida marina y una solución tecnológica al ODS 14."
        tags={["React", "Python", "Flask"]}
        badge="🌊 ODS 14"
        badgeStyle={{
          color: "#a78bfa",
          background: "rgba(167,139,250,0.12)",
          borderColor: "rgba(167,139,250,0.30)",
        }}
        bullets={["Stack: Python Flask, React, MongoDB", "Pandas & Matplotlib data viz"]}
        art={
          <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
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
            <rect width="400" height="225" fill="url(#ss1)" />
            <g stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none">
              <circle cx="200" cy="125" r="40" />
              <circle cx="200" cy="125" r="70" />
              <circle cx="200" cy="125" r="100" />
              <line x1="60" y1="125" x2="340" y2="125" />
              <line x1="200" y1="20" x2="200" y2="220" />
            </g>
            <circle cx="200" cy="125" r="55" fill="url(#ss-pulse)">
              <animate attributeName="r" values="20;90;20" dur="3s" repeatCount="indefinite" />
              <animate
                attributeName="opacity"
                values="0.8;0;0.8"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <g transform="translate(200 125)">
              <circle r="10" fill="#a78bfa" />
              <circle r="14" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.7" />
            </g>
            <text
              x="200"
              y="200"
              textAnchor="middle"
              fill="rgba(255,255,255,0.4)"
              fontFamily="var(--font-mono)"
              fontSize="9"
            >
              MARINE SIGNAL
            </text>
          </svg>
        }
      />

      {/* ROW 4 */}
      <CertificationsPreview />
      <CTA />

      <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-7">
        <Footer />
      </div>
    </main>
  );
}
