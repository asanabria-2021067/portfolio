"use client";

import { useState, useRef } from "react";
import Footer from "@/components/Footer";
import BentoCard from "@/components/BentoCard";
import { usePreferences } from "@/components/PreferencesProvider";
import gsap from "gsap";

export default function ContactPage() {
  const { locale } = usePreferences();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg(locale === "en" ? "Please fill in all fields." : "Por favor, llene todos los campos.");
      setStatus("error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg(locale === "en" ? "Please enter a valid email address." : "Por favor, ingrese un correo válido.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    // Simulate sending with GSAP animations
    gsap.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        setTimeout(() => {
          setStatus("sent");
          // Animate success screen in
          gsap.fromTo(
            successRef.current,
            { opacity: 0, scale: 0.9, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
          );
        }, 1200);
      },
    });
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <div className="flex flex-col gap-8">
      <main className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-[18px]">
        <BentoCard className="relative flex flex-col min-h-[500px]">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(167,139,250,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(106,166,255,0.06)_1px,transparent_1px)] bg-[length:32px_32px] [mask-image:radial-gradient(ellipse_at_80%_20%,#000,transparent_70%)]" />
          
          <div className="relative flex flex-col gap-[18px] h-full z-10 w-full">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-mute font-mono">
              <span className="w-[6px] h-[6px] rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
              {locale === "en" ? "Get in touch" : "Contacto"}
            </div>
            <h1 className="text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.035em] leading-[1.1] m-0 mb-1">
              {locale === "en" ? "Let's build something" : "Construyamos algo"} <span className="grad-text">🚀</span>
            </h1>
            <p className="text-fg-dim text-[14.5px] leading-[1.55] max-w-[480px] m-0 mb-4">
              {locale === "en"
                ? "Send me a message directly through this form or download my CV to learn more. I usually reply within a working day."
                : "Envíame un mensaje directamente a través de este formulario o descarga mi CV. Normalmente respondo en un día laboral."}
            </p>

            {status !== "sent" ? (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-[14px] w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.12em] text-fg-mute font-mono font-medium">
                      {locale === "en" ? "Your Name" : "Tu Nombre"}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === "sending"}
                      placeholder={locale === "en" ? "John Doe" : "Juan Pérez"}
                      className="w-full px-4 py-3 bg-white/[0.02] border border-[var(--line)] rounded-xl text-[13.5px] text-fg placeholder:text-fg-mute transition-all duration-200 focus:outline-none focus:border-[var(--line-2)] focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(106,166,255,0.08)]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.12em] text-fg-mute font-mono font-medium">
                      {locale === "en" ? "Email Address" : "Correo Electrónico"}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "sending"}
                      placeholder="johndoe@example.com"
                      className="w-full px-4 py-3 bg-white/[0.02] border border-[var(--line)] rounded-xl text-[13.5px] text-fg placeholder:text-fg-mute transition-all duration-200 focus:outline-none focus:border-[var(--line-2)] focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(106,166,255,0.08)]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-[0.12em] text-fg-mute font-mono font-medium">
                    {locale === "en" ? "Message" : "Mensaje"}
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={status === "sending"}
                    placeholder={locale === "en" ? "Tell me about your project..." : "Cuéntame sobre tu proyecto..."}
                    className="w-full px-4 py-3 bg-white/[0.02] border border-[var(--line)] rounded-xl text-[13.5px] text-fg placeholder:text-fg-mute transition-all duration-200 focus:outline-none focus:border-[var(--line-2)] focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(106,166,255,0.08)] resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="text-[12.5px] text-red-400 font-medium px-1">
                    {errorMsg}
                  </div>
                )}

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-[10px] py-[13px] px-6 bg-grad text-white border-none rounded-xl text-[13.5px] font-semibold cursor-pointer shadow-[0_12px_30px_-8px_rgba(106,166,255,0.4),0_1px_0_rgba(255,255,255,0.2)_inset] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_16px_36px_-8px_rgba(167,139,250,0.5),0_1px_0_rgba(255,255,255,0.3)_inset] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {status === "sending" ? (
                      <>
                        <span>{locale === "en" ? "Sending..." : "Enviando..."}</span>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>{locale === "en" ? "Send Message" : "Enviar Mensaje"}</span>
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="2.2" y1="8" x2="13.8" y2="8" />
                          <polyline points="9.2 3.4 13.8 8 9.2 12.6" />
                        </svg>
                      </>
                    )}
                  </button>

                  <a href="/assets/certificaciones/CV.pdf" download className="text-fg text-[12.5px] font-medium py-[13px] px-[18px] rounded-xl border border-[var(--line-2)] bg-white/[0.03] no-underline transition-all duration-200 font-mono inline-flex items-center gap-2 hover:bg-white/[0.07]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {locale === "en" ? "Download CV" : "Descargar CV"}
                  </a>
                </div>
              </form>
            ) : (
              <div ref={successRef} className="flex flex-col items-center justify-center text-center py-10 w-full">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mb-6 shadow-[0_0_20px_rgba(74,222,128,0.15)]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="text-[24px] font-semibold text-fg tracking-[-0.02em] mb-3">
                  {locale === "en" ? "Message Sent!" : "¡Mensaje Enviado!"}
                </h2>
                <p className="text-fg-dim text-[14.5px] leading-[1.6] max-w-[380px] mb-8">
                  {locale === "en"
                    ? `Thank you for reaching out, ${name}. Your message has been received, and I'll get back to you shortly.`
                    : `Gracias por escribir, ${name}. Tu mensaje ha sido recibido y te responderé lo antes posible.`}
                </p>
                <button
                  onClick={handleReset}
                  className="py-3 px-5 text-fg text-[12.5px] font-mono font-medium rounded-xl border border-[var(--line-2)] bg-white/[0.03] cursor-pointer transition-all duration-200 hover:bg-white/[0.07]"
                >
                  {locale === "en" ? "Send Another Message" : "Enviar Otro Mensaje"}
                </button>
              </div>
            )}
          </div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center justify-between mb-[18px] gap-[10px]">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-mute font-mono">
              <span className="w-[6px] h-[6px] rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
              {locale === "en" ? "Channels" : "Canales"}
            </div>
            <span className="text-fg-mute text-[12px] font-mono">3</span>
          </div>
          <div className="flex flex-col gap-[10px]">
            <a href="mailto:as1945228@gmail.com" className="flex items-center gap-3 py-3 px-[14px] text-fg-dim bg-white/[0.025] border border-[var(--line)] rounded-bento-sm transition-all duration-200 hover:text-fg hover:border-[var(--line-2)] hover:bg-white/[0.05] hover:-translate-y-[2px]">
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
                <span className="text-[12.5px] text-fg font-medium overflow-hidden text-ellipsis whitespace-nowrap font-mono">as1945228@gmail.com</span>
              </div>
            </a>
            <a href="https://github.com/asanabria-2021067" target="_blank" className="flex items-center gap-3 py-3 px-[14px] text-fg-dim bg-white/[0.025] border border-[var(--line)] rounded-bento-sm transition-all duration-200 hover:text-fg hover:border-[var(--line-2)] hover:bg-white/[0.05] hover:-translate-y-[2px]">
              <span className="w-8 h-8 flex items-center justify-center bg-grad-soft rounded-lg shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#a78bfa" }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.57.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </span>
              <div className="flex flex-col gap-[2px] min-w-0">
                <span className="text-[10px] text-fg-mute uppercase tracking-[0.12em] font-mono">GitHub</span>
                <span className="text-[12.5px] text-fg font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                  {locale === "en" ? "GitHub profile" : "Perfil de GitHub"}
                </span>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/angel-sanabria-desarrollador/" target="_blank" className="flex items-center gap-3 py-3 px-[14px] text-fg-dim bg-white/[0.025] border border-[var(--line)] rounded-bento-sm transition-all duration-200 hover:text-fg hover:border-[var(--line-2)] hover:bg-white/[0.05] hover:-translate-y-[2px]">
              <span className="w-8 h-8 flex items-center justify-center bg-grad-soft rounded-lg shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#6aa6ff" }}>
                  <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 17.34H5.67V10h2.67v7.34zM7 8.81a1.55 1.55 0 110-3.1 1.55 1.55 0 010 3.1zM18.34 17.34h-2.67v-3.57c0-.85-.02-1.95-1.19-1.95-1.19 0-1.37.93-1.37 1.89v3.63h-2.67V10h2.56v1h.04c.36-.68 1.23-1.39 2.53-1.39 2.71 0 3.21 1.78 3.21 4.1v3.63z" />
                </svg>
              </span>
              <div className="flex flex-col gap-[2px] min-w-0">
                <span className="text-[10px] text-fg-mute uppercase tracking-[0.12em] font-mono">LinkedIn</span>
                <span className="text-[12.5px] text-fg font-medium overflow-hidden text-ellipsis whitespace-nowrap">Angel Sanabria</span>
              </div>
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
