import BentoCard from "./BentoCard";

export default function Hero() {
  return (
    <BentoCard span={2} className="flex flex-col min-h-[380px]">
      <div className="mb-[22px] inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-fg-mute font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-accent shadow-[0_0_10px_var(--color-blue-accent)]" />
        Portfolio · 2026
      </div>
      <h1 className="text-[clamp(40px,4.6vw,60px)] font-semibold leading-[1.0] tracking-[-0.035em] mb-4">
        Hi, I'm <span className="grad-text">Angel Sanabria.</span>
      </h1>
      <p className="text-[19px] text-fg-dim mb-[18px] font-normal">
        <strong className="text-fg font-semibold">VMware Engineer Jr.</strong> & <strong className="text-fg font-semibold">Full Stack Developer</strong>
      </p>
      <p className="text-[15.5px] text-fg-dim leading-[1.6] max-w-[540px] mb-6 text-pretty">
        Building cloud-native infrastructure & scalable modern applications 🚀 I work across the
        stack — from vSphere & Kubernetes clusters to React frontends and AI-powered platforms.
      </p>
      <div className="mt-auto flex gap-[22px] flex-wrap pt-[18px] border-t border-[var(--line)]">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.12em] text-fg-mute font-mono">Location</span>
          <span className="text-[14px] text-fg font-medium">Guatemala</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.12em] text-fg-mute font-mono">Open to</span>
          <span className="text-[14px] text-fg font-medium">Remote</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.12em] text-fg-mute font-mono">Focus</span>
          <span className="text-[14px] text-fg font-medium">Cloud · Web · DX</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.12em] text-fg-mute font-mono">Status</span>
          <span className="text-[14px] text-fg font-medium">Available now</span>
        </div>
      </div>
    </BentoCard>
  );
}
