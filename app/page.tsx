"use client";

import Hero from "@/components/Hero";
import ProfileCard from "@/components/ProfileCard";
import TechStack from "@/components/TechStack";
import FeaturedProject from "@/components/FeaturedProject";
import Experience from "@/components/Experience";
import ProjectPreview from "@/components/ProjectPreview";
import CertificationsPreview from "@/components/CertificationsPreview";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { usePreferences } from "@/components/PreferencesProvider";

export default function Home() {
  const { locale } = usePreferences();

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
      
      {/* WaterWay+ Project Preview */}
      <ProjectPreview
        title="WaterWay+"
        meta={locale === "en" ? "Project - 2024" : "Proyecto - 2024"}
        desc={
          locale === "en"
            ? "Platform for river protection using maps and environmental data. Visualizes pollution patterns and helps communities coordinate conservation efforts."
            : "Plataforma para protección de ríos usando mapas y datos ambientales. Visualiza patrones de contaminación y ayuda a comunidades a actuar."
        }
        tags={["Maps", "React Leaflet", "Environmental API"]}
        badge={locale === "en" ? "Hackathon Winner" : "Ganador hackathon"}
        repoLink="https://github.com/asanabria-2021067/waterway-backend"
        demoLink="https://water-way.netlify.app/"
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

      {/* LibroManga Inventory Project Preview */}
      <ProjectPreview
        title="LibroManga Inventory"
        meta={locale === "en" ? "SPA - 2024" : "SPA - 2024"}
        desc={
          locale === "en"
            ? "Full-stack inventory and sales manager designed for a bookstore and manga shop. Built with Vue and Dockerized for clean deployment."
            : "Gestor full stack de inventario y ventas diseñado para una tienda de libros y mangas. Construido con Vue y dockerizado para su fácil despliegue."
        }
        tags={["Vue", "Docker", "PostgreSQL"]}
        badge={locale === "en" ? "Dockerized SPA" : "SPA Dockerizada"}
        badgeStyle={{
          color: "#10b981",
          background: "rgba(16,185,129,0.12)",
          borderColor: "rgba(16,185,129,0.30)",
        }}
        bullets={
          locale === "en"
            ? ["Full-stack inventory & sales management", "Vue SPA frontend deployed on Netlify", "Docker setup included in repository"]
            : ["Gestión full stack de inventario y ventas", "Frontend SPA de Vue desplegada en Netlify", "Docker incluido en el repositorio"]
        }
        repoLink="https://github.com/asanabria-2021067/proyecto2-db"
        demoLink="https://hilarious-sundae-6374bd.netlify.app/"
        art={
          <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" className="block w-full h-full">
            <defs>
              <linearGradient id="lm1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1a1147" />
                <stop offset="100%" stopColor="#2e1065" />
              </linearGradient>
            </defs>
            <rect width="400" height="225" fill="url(#lm1)" />
            
            {/* Draw simulation of bookshelf */}
            <g stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none">
              {/* Shelves */}
              <line x1="40" y1="80" x2="360" y2="80" />
              <line x1="40" y1="150" x2="360" y2="150" />
              
              {/* Verticals */}
              <line x1="40" y1="20" x2="40" y2="200" />
              <line x1="360" y1="20" x2="360" y2="200" />
            </g>

            {/* Books on top shelf */}
            <g fill="#a78bfa" opacity="0.85">
              <rect x="60" y="30" width="18" height="48" rx="2" />
              <rect x="80" y="35" width="16" height="43" rx="2" fill="#61dafb" />
              <rect x="98" y="28" width="20" height="50" rx="2" fill="#3ecf8e" />
              
              {/* Leaning books */}
              <g transform="translate(130 50) rotate(15)">
                <rect x="0" y="-20" width="18" height="48" rx="2" fill="#f59e0b" />
              </g>
            </g>

            {/* Books on bottom shelf */}
            <g fill="#10b981" opacity="0.85">
              <rect x="60" y="100" width="22" height="48" rx="2" fill="#ec4899" />
              <rect x="84" y="105" width="18" height="43" rx="2" />
              <rect x="104" y="96" width="20" height="52" rx="2" fill="#61dafb" />
              <rect x="126" y="102" width="16" height="46" rx="2" fill="#f59e0b" />
            </g>

            {/* Database cylinders representing inventory sales on the right */}
            <g transform="translate(260 80)" fill="rgba(7,8,13,0.5)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
              {/* Base cylinders */}
              <path d="M 0 0 C 0 -10 60 -10 60 0 L 60 40 C 60 50 0 50 0 40 Z" />
              <ellipse cx="30" cy="0" rx="30" ry="10" fill="#336791" stroke="rgba(255,255,255,0.2)" />
              
              <path d="M 15 50 C 15 42 75 42 75 50 L 75 90 C 75 98 15 98 15 90 Z" />
              <ellipse cx="45" cy="50" rx="30" ry="10" fill="#10b981" stroke="rgba(255,255,255,0.2)" />
            </g>
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
