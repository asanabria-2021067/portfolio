"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import CertificationCard from "@/components/CertificationCard";
import BentoCard from "@/components/BentoCard";
import { usePreferences } from "@/components/PreferencesProvider";
import PdfModal from "@/components/PdfModal";

const LOGOS = {
  FM: "https://frontendmasters.com/static-assets/core/m-transparent.webp",
  BROADCOM: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Broadcom_logo_%282016-present%29.svg",
  VMWARE: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Vmware.svg",
  INTECAP: "https://upload.wikimedia.org/wikipedia/commons/0/09/Logotipo_de_el_INTECAP.png",
  PLATZI: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/platzi.png",
  CISCO: "https://www.vectorlogo.zone/logos/cisco/cisco-icon.svg",
  ANTHROPIC: "https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/anthropic/icon.svg",
};

export default function CertificationsPage() {
  const { locale } = usePreferences();
  const [activePdf, setActivePdf] = useState<{ link: string; name: string } | null>(null);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.getAttribute("href")?.toLowerCase().endsWith(".pdf")) {
        const href = anchor.getAttribute("href");
        const card = anchor.closest(".flex-col");
        const titleElement = card?.querySelector("h3");
        const title = titleElement?.textContent || (locale === "en" ? "Certificate" : "Certificación");
        
        if (href) {
          e.preventDefault();
          setActivePdf({ link: href, name: title });
        }
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [locale]);

  return (
    <div className="flex flex-col gap-[28px]">
      <header className="flex flex-col gap-[14px] mb-4 py-1 px-2">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-mute font-mono">
          <span className="w-[6px] h-[6px] rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
          {locale === "en" ? "Certifications · Professional Growth" : "Certificaciones · Crecimiento Profesional"}
        </div>
        <h1 className="text-[clamp(38px,4.4vw,56px)] font-semibold tracking-[-0.035em] leading-none m-0">
          {locale === "en" ? (
            <>Skills & <span className="grad-text">Certifications.</span></>
          ) : (
            <>Habilidades y <span className="grad-text">Certificaciones.</span></>
          )}
        </h1>
        <p className="text-fg-dim text-[15px] leading-[1.55] max-w-[560px] m-0">
          {locale === "en" 
            ? "A track record of my technical expertise in VMware infrastructure, network engineering, and full-stack development."
            : "Una trayectoria de mi experiencia técnica en infraestructura VMware, ingeniería de redes y desarrollo full-stack."}
        </p>
      </header>

      <main className="flex flex-col gap-[36px]">
        {/* Infrastructure Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-[20px] font-semibold text-fg">
              {locale === "en" ? "Infrastructure & Virtualization" : "Infraestructura y Virtualización"}
            </h2>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            <CertificationCard
              badge="VCF"
              name="VMware Cloud Foundation Introduction"
              org="Broadcom"
              date="2025"
              logo={LOGOS.VMWARE}
              desc={locale === "en" 
                ? "Cloud Infrastructure, VMware Cloud Foundation, vSphere, vSAN, and SDDC."
                : "Infraestructura cloud, VMware Cloud Foundation, vSphere, vSAN y SDDC."}
              link="/assets/certificaciones/VCFI9.pdf"
            />
            <CertificationCard
              badge="VCF"
              name="VMware Cloud Foundation: Build, Manage & Secure"
              org="Broadcom"
              date="2025"
              logo={LOGOS.VMWARE}
              desc={locale === "en" 
                ? "Enterprise hybrid cloud deployment, management, security policy configuration, and virtual resource provisioning."
                : "Despliegue de nube híbrida empresarial, gestión, configuración de políticas de seguridad y aprovisionamiento de recursos virtuales."}
              link="/assets/certificaciones/Vmware Cloud Foundation Build Manage and Secure.pdf"
            />
            <CertificationCard
              badge="TNZ"
              name="vSphere with Tanzu: Deploy & Manage"
              org="Broadcom"
              date="2025"
              logo={LOGOS.VMWARE}
              desc={locale === "en"
                ? "Vmware Tanzu, Kubernetes, Supervisor Cluster, and Container Orchestration."
                : "Vmware Tanzu, Kubernetes, Supervisor Cluster y orquestación de contenedores."}
              link="/assets/certificaciones/Vmware Vsphere with Tanzu.pdf"
            />
            <CertificationCard
              badge="VMW"
              name="VMware vSphere: Install & Configure"
              org="Broadcom"
              date="2025"
              logo={LOGOS.VMWARE}
              desc={locale === "en"
                ? "Virtualization, vCenter, and Data Center Management."
                : "Virtualización, vCenter y gestión de centro de datos."}
              link="/assets/certificaciones/VMware Vsphere Install.pdf"
            />
          </div>
        </section>

        {/* Development Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-[20px] font-semibold text-fg">
              {locale === "en" ? "Frontend & Full Stack Development" : "Desarrollo Frontend y Full Stack"}
            </h2>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            <CertificationCard
              badge="ANT"
              name={locale === "en" ? "Claude Code Practitioner" : "Especialista en Claude Code"}
              org="Anthropic"
              date="2026"
              logo={LOGOS.ANTHROPIC}
              desc={locale === "en"
                ? "Credential for software automation, advanced CLI prompt-engineering, and agentic coding workflows using Claude Code."
                : "Credencial para automatización de software, ingeniería de prompts avanzada para CLI y flujos de trabajo agéntica con Claude Code."}
              link="/assets/certificaciones/certificate claude code.pdf"
            />
            <CertificationCard
              badge="FM"
              name="Enterprise TypeScript"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc={locale === "en"
                ? "Architecting, testing, and scaling large TypeScript systems for enterprise production."
                : "Arquitectura, pruebas y escalado de grandes sistemas TypeScript para producción empresarial."}
              link="/assets/certificaciones/enterprise-typescript-dark.pdf"
            />
            <CertificationCard
              badge="FM"
              name="Full Stack TypeScript, Node & GraphQL"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc={locale === "en"
                ? "Building enterprise full-stack applications with Node.js, GraphQL, and TypeScript."
                : "Desarrollo de aplicaciones empresariales full-stack con Node.js, GraphQL y TypeScript."}
              link="/assets/certificaciones/fullstack-typescript-dark.pdf"
            />
            <CertificationCard
              badge="FM"
              name="Complete Intro to Containers"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc={locale === "en"
                ? "Comprehensive introduction to Docker, podman, and container architectures."
                : "Introducción completa a Docker, podman y arquitecturas de contenedores."}
              link="/assets/certificaciones/complete-intro-containers-dark.pdf"
            />
            <CertificationCard
              badge="FM"
              name="Complete Go"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc={locale === "en"
                ? "Full course on Google Go language fundamentals, concurrency, and web services."
                : "Curso completo sobre fundamentos del lenguaje Google Go, concurrencia y servicios web."}
              link="/assets/certificaciones/complete-go-dark.pdf"
            />
            <CertificationCard
              badge="FM"
              name="Vue Fundamentals"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc={locale === "en"
                ? "Vue.js core principles, component hierarchy, reactivity, and state management."
                : "Principios fundamentales de Vue.js, jerarquía de componentes, reactividad y gestión de estado."}
              link="/assets/certificaciones/vue-fundamentals-dark.pdf"
            />
            <CertificationCard
              badge="FM"
              name="Intro to Vue 3 Workshop"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc={locale === "en"
                ? "Workshop covering composition API, reactivity, routing, and deployment in Vue 3."
                : "Taller que cubre la Composition API, reactividad, enrutamiento y despliegue en Vue 3."}
              link="/assets/certificaciones/Complete Intro to Vue 3 Workshop (FEM).pdf"
            />
            <CertificationCard
              badge="FM"
              name="TypeScript Monorepos"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc={locale === "en"
                ? "Architecting large-scale TypeScript applications using monorepo patterns."
                : "Arquitectura de aplicaciones TypeScript a gran escala utilizando patrones de monorepo."}
              link="/assets/certificaciones/monorepos-v2.pdf"
            />
            <CertificationCard
              badge="FM"
              name="Intermediate TypeScript, v2"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc={locale === "en"
                ? "Advanced TypeScript features and patterns for scalable applications."
                : "Características y patrones avanzados de TypeScript para aplicaciones escalables."}
              link="/assets/certificaciones/intermediate-typescript-v2.pdf"
            />
            <CertificationCard
              badge="FM"
              name="TypeScript 5 Fundamentals, v4"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc={locale === "en"
                ? "Deep dive into the core concepts of TypeScript 5 and its ecosystem."
                : "Profundización en los conceptos fundamentales de TypeScript 5 y su ecosistema."}
              link="/assets/certificaciones/typescript-v4.pdf"
            />
            <CertificationCard
              badge="INT"
              name="Diseño de Interfaces con React JS"
              org="INTECAP"
              date="2023"
              logo={LOGOS.INTECAP}
              desc={locale === "en"
                ? "Frontend development with React.js, Hooks, and modern CSS frameworks."
                : "Desarrollo frontend con React.js, Hooks y frameworks de CSS modernos."}
              link="/assets/certificaciones/Diseño de interfaces Intecap.pdf"
            />
            <CertificationCard
              badge="PZ"
              name={locale === "en" ? "Git & GitHub Professional" : "Profesional de Git y GitHub"}
              org="Platzi"
              date="2023"
              logo={LOGOS.PLATZI}
              desc={locale === "en"
                ? "Advanced version control, branching strategies, and collaboration workflows."
                : "Control de versiones avanzado, estrategias de ramificación y flujos de trabajo colaborativos."}
              link="/assets/certificaciones/diploma-git-github.pdf"
            />
            <CertificationCard
              badge="PZ"
              name={locale === "en" ? "Ultimate HTML & CSS Course" : "Curso Definitivo de HTML y CSS"}
              org="Platzi"
              date="2023"
              logo={LOGOS.PLATZI}
              desc={locale === "en"
                ? "Semantic HTML, modern CSS architecture, and responsive design."
                : "HTML semántico, arquitectura de CSS moderna y diseño responsivo."}
              link="/assets/certificaciones/diploma-html-css-2020.pdf"
            />
            <CertificationCard
              badge="PZ"
              name={locale === "en" ? "Frontend Developer Practical Course" : "Práctico de Frontend Developer"}
              org="Platzi"
              date="2023"
              logo={LOGOS.PLATZI}
              desc={locale === "en"
                ? "Application of frontend development principles in real-world projects."
                : "Aplicación de principios de desarrollo frontend en proyectos del mundo real."}
              link="/assets/certificaciones/diploma-frontend-developer-practico.pdf"
            />
            <CertificationCard
              badge="PZ"
              name={locale === "en" ? "Python Foundations" : "Fundamentos de Python"}
              org="Platzi"
              date="2022"
              logo={LOGOS.PLATZI}
              desc={locale === "en"
                ? "Core concepts, data structures, and syntax of Python programming."
                : "Conceptos fundamentales, estructuras de datos y sintaxis de la programación en Python."}
              link="/assets/certificaciones/diploma-python-fundamentos.pdf"
            />
          </div>
        </section>

        {/* Networking & Security */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-[20px] font-semibold text-fg">
              {locale === "en" ? "Networking & Security" : "Redes y Seguridad"}
            </h2>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            <CertificationCard
              badge="CS"
              name={locale === "en" ? "Cybersecurity Essentials" : "Fundamentos de Ciberseguridad"}
              org="Cisco"
              date="2022"
              logo={LOGOS.CISCO}
              desc={locale === "en"
                ? "Foundational knowledge of cybersecurity threats and protection strategies."
                : "Conocimiento fundamental de amenazas de ciberseguridad y estrategias de protección."}
            />
            <CertificationCard
              badge="CCNA"
              name={locale === "en" ? "CCNA: Introduction to Networks" : "CCNA: Introducción a Redes"}
              org="Cisco"
              date="2021"
              logo={LOGOS.CISCO}
              desc={locale === "en"
                ? "Networking fundamentals, IP connectivity, and foundational IP services."
                : "Fundamentos de redes, conectividad IP y servicios IP fundamentales."}
              link="/assets/certificaciones/AngelSanabria-CCNA1 IN4BM-certificate-2.pdf"
            />
          </div>
        </section>

        {/* Currently Pursuing */}
        <BentoCard className="flex flex-col">
          <div className="flex items-center justify-between mb-[18px] gap-[10px]">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-mute font-mono">
              <span className="w-[6px] h-[6px] rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
              {locale === "en" ? "Currently Pursuing" : "En Curso"}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 mt-[10px]">
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-[14px] font-medium text-fg">
                  {locale === "en" ? "CKA (Certified Kubernetes Administrator)" : "CKA (Administrador de Kubernetes Certificado)"}
                </span>
                <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-grad rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[14px] font-medium text-fg">
                  {locale === "en" ? "AWS Solutions Architect Associate" : "AWS Solutions Architect Associate (Arquitecto de Soluciones Asociado)"}
                </span>
                <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-grad rounded-full" style={{ width: "40%" }} />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-[14px] font-medium text-fg">
                  {locale === "en" ? "Advanced React Patterns & Performance" : "Patrones avanzados de React y rendimiento"}
                </span>
                <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-grad rounded-full" style={{ width: "80%" }} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[14px] font-medium text-fg">
                  {locale === "en" ? "System Design for Scalable Apps" : "Diseño de sistemas para aplicaciones escalables"}
                </span>
                <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-grad rounded-full" style={{ width: "30%" }} />
                </div>
              </div>
            </div>
          </div>
        </BentoCard>
      </main>

      <Footer
        leftText="© 2026 — Angel Sanabria"
        midText={locale === "en" ? "Constant learning · Continuous improvement" : "Aprendizaje constante · Mejora continua"}
        rightText={locale === "en" ? "Updated May 2026" : "Actualizado Mayo 2026"}
      />

      <PdfModal
        isOpen={!!activePdf}
        link={activePdf?.link ?? ""}
        name={activePdf?.name ?? ""}
        onClose={() => setActivePdf(null)}
      />
    </div>
  );
}
