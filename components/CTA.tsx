import BentoCard from "./BentoCard";
import ContactLinks from "./ContactLinks";

export default function CTA() {
  return (
    <BentoCard span={2} className="relative flex flex-col">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(167,139,250,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(106,166,255,0.06)_1px,transparent_1px)] bg-[length:32px_32px] [mask-image:radial-gradient(ellipse_at_80%_20%,#000,transparent_70%)]" />
      <div className="relative flex flex-col gap-5 h-full">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-fg-mute font-mono">
          <span className="w-[6px] h-[6px] rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
          Get in touch
        </div>
        <h2 className="text-[clamp(28px,3vw,40px)] font-semibold leading-[1.05] tracking-[-0.025em] mt-2">
          Let's build something <span className="grad-text">🚀</span>
        </h2>
        <p className="text-fg-dim text-[14.5px] leading-[1.6] max-w-[480px] m-0">
          Open to new opportunities and exciting projects — full-time, contract, or short
          collaborations. I usually reply within a working day.
        </p>

        <ContactLinks />

        <div className="flex items-center gap-3 mt-auto pt-[14px] flex-wrap">
          <a href="mailto:as1945228@gmail.com" className="inline-flex items-center gap-[10px] py-[13px] px-5 bg-grad text-white border-none rounded-xl text-[14px] font-semibold no-underline shadow-[0_12px_30px_-8px_rgba(106,166,255,0.4),0_1px_0_rgba(255,255,255,0.2)_inset] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_16px_36px_-8px_rgba(167,139,250,0.5),0_1px_0_rgba(255,255,255,0.3)_inset]">
            <span>Start a conversation</span>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M3 8 H13 M9 4 L13 8 L9 12"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="/assets/CV.pdf" download className="text-fg text-[13px] font-medium py-[13px] px-[18px] rounded-xl border border-[var(--line-2)] bg-white/[0.03] no-underline transition-all duration-200 font-mono inline-flex items-center gap-2 hover:bg-white/[0.07]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </a>
        </div>
      </div>
    </BentoCard>
  );
}
