"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import BentoCard from "@/components/BentoCard";
import { usePreferences } from "@/components/PreferencesProvider";

export default function ContactPage() {
  const { locale } = usePreferences();
  const [copied, setCopied] = useState(false);

  const emailAddress = "as1945228@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      <main className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
        {/* Intro Card */}
        <BentoCard className="relative flex flex-col justify-between min-h-[260px] md:col-span-2 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(167,139,250,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(106,166,255,0.04)_1px,transparent_1px)] bg-[length:32px_32px] [mask-image:radial-gradient(ellipse_at_80%_20%,#000,transparent_75%)]" />
          
          <div className="relative flex flex-col gap-4 z-10 w-full">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-mute font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-green-accent animate-pulse shadow-[0_0_10px_var(--color-green-accent)]" />
              {locale === "en" ? "Let's Connect" : "Conectemos"}
            </div>
            <h1 className="text-[clamp(28px,3.5vw,42px)] font-semibold tracking-[-0.03em] leading-[1.15] m-0">
              {locale === "en" ? "Let's build something" : "Construyamos algo"}{" "}
              <span className="grad-text">{locale === "en" ? "together" : "juntos"}</span> 🚀
            </h1>
            <p className="text-fg-dim text-[14px] sm:text-[14.5px] leading-[1.6] max-w-[540px] m-0">
              {locale === "en"
                ? "I am always looking for interesting projects, creative collaborations, and new opportunities. Reach out via email or find me on my professional platforms below."
                : "Siempre estoy en busca de proyectos interesantes, colaboraciones creativas y nuevas oportunidades. Ponte en contacto por correo o búscame en mis plataformas profesionales."}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 text-fg-mute text-[12px] font-mono border-t border-[var(--line)] pt-4 z-10">
            <span>Guatemala / GMT-6</span>
            <span className="opacity-30">•</span>
            <span>{locale === "en" ? "Available for projects" : "Disponible para proyectos"}</span>
          </div>
        </BentoCard>

        {/* CV Card */}
        <BentoCard className="flex flex-col justify-between min-h-[260px] md:col-span-1">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-mute font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-accent shadow-[0_0_10px_var(--color-blue-accent)]" />
              {locale === "en" ? "Resume" : "Currículum"}
            </div>
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] m-0">
              {locale === "en" ? "Angel's Profile" : "Perfil de Angel"}
            </h2>
            <p className="text-fg-dim text-[13px] leading-[1.5] m-0">
              {locale === "en"
                ? "Review my technical skills, professional experience, and academic background in detail."
                : "Revisa mis habilidades técnicas, experiencia profesional y formación académica en detalle."}
            </p>
          </div>

          <div className="mt-6">
            <a 
              href="/assets/CV.pdf" 
              download 
              className="w-full inline-flex items-center justify-center gap-2 text-white text-[13px] font-medium py-3 px-4 bg-grad border-none rounded-xl no-underline transition-all duration-200 hover:shadow-[0_12px_24px_-8px_rgba(106,166,255,0.45)] hover:scale-[1.01] active:scale-[0.99]"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {locale === "en" ? "Download PDF CV" : "Descargar CV en PDF"}
            </a>
          </div>
        </BentoCard>

        {/* Email Card */}
        <BentoCard className="flex flex-col justify-between min-h-[190px]">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="w-8 h-8 flex items-center justify-center bg-blue-accent/10 border border-blue-accent/25 rounded-lg text-blue-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <span className="text-[10px] text-fg-mute uppercase tracking-[0.12em] font-mono">Email</span>
            </div>
            <h3 className="text-[16px] font-semibold text-fg mb-1">as1945228@gmail.com</h3>
            <p className="text-fg-mute text-[12px] m-0">
              {locale === "en" ? "Primary contact channel." : "Canal principal de contacto."}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              onClick={handleCopyEmail}
              className="py-2.5 px-3 rounded-lg border border-[var(--line-2)] bg-white/[0.03] text-fg text-[11px] font-mono font-medium cursor-pointer transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.96]"
            >
              {copied ? (locale === "en" ? "Copied!" : "¡Copiado!") : (locale === "en" ? "Copy" : "Copiar")}
            </button>
            <a
              href={`mailto:${emailAddress}`}
              className="py-2.5 px-3 rounded-lg border border-transparent bg-white/5 text-center no-underline text-fg text-[11px] font-mono font-medium transition-all duration-200 hover:bg-white/10 hover:border-white/10 active:scale-[0.96]"
            >
              {locale === "en" ? "Write email" : "Escribir"}
            </a>
          </div>
        </BentoCard>

        {/* GitHub Card */}
        <BentoCard className="flex flex-col justify-between min-h-[190px]">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="w-8 h-8 flex items-center justify-center bg-violet-500/10 border border-violet-500/25 rounded-lg text-violet-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.57.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </span>
              <span className="text-[10px] text-fg-mute uppercase tracking-[0.12em] font-mono">GitHub</span>
            </div>
            <h3 className="text-[16px] font-semibold text-fg mb-1">asanabria-2021067</h3>
            <p className="text-fg-mute text-[12px] m-0">
              {locale === "en" ? "Repositories & active code." : "Repositorios y código activo."}
            </p>
          </div>

          <div className="mt-5">
            <a
              href="https://github.com/asanabria-2021067"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-[var(--line-2)] bg-white/[0.03] text-fg text-[11px] font-mono font-medium no-underline transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.96]"
            >
              {locale === "en" ? "Visit Profile ➔" : "Visitar Perfil ➔"}
            </a>
          </div>
        </BentoCard>

        {/* LinkedIn Card */}
        <BentoCard className="flex flex-col justify-between min-h-[190px]">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="w-8 h-8 flex items-center justify-center bg-blue-500/10 border border-blue-500/25 rounded-lg text-blue-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 17.34H5.67V10h2.67v7.34zM7 8.81a1.55 1.55 0 110-3.1 1.55 1.55 0 010 3.1zM18.34 17.34h-2.67v-3.57c0-.85-.02-1.95-1.19-1.95-1.19 0-1.37.93-1.37 1.89v3.63h-2.67V10h2.56v1h.04c.36-.68 1.23-1.39 2.53-1.39 2.71 0 3.21 1.78 3.21 4.1v3.63z" />
                </svg>
              </span>
              <span className="text-[10px] text-fg-mute uppercase tracking-[0.12em] font-mono">LinkedIn</span>
            </div>
            <h3 className="text-[16px] font-semibold text-fg mb-1">Angel Sanabria</h3>
            <p className="text-fg-mute text-[12px] m-0">
              {locale === "en" ? "Professional networking." : "Red profesional y contacto."}
            </p>
          </div>

          <div className="mt-5">
            <a
              href="https://www.linkedin.com/in/angel-sanabria-desarrollador/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-[var(--line-2)] bg-white/[0.03] text-fg text-[11px] font-mono font-medium no-underline transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.96]"
            >
              {locale === "en" ? "Visit Profile ➔" : "Visitar Perfil ➔"}
            </a>
          </div>
        </BentoCard>
      </main>

      <Footer
        leftText="(c) 2026 - Angel Sanabria"
        midText="Guatemala - GMT-6"
        rightText={locale === "en" ? "Replies within 1 working day" : "Respondo en 1 día laboral"}
      />
    </div>
  );
}
