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
          <img
            src="/assets/images/waterway.png"
            alt="WaterWay+"
            className="w-full h-full object-cover"
          />
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
          <img
            src="/assets/images/libromanga.png"
            alt="LibroManga Inventory"
            className="w-full h-full object-cover"
          />
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
