interface FooterProps {
  leftText?: string;
  midText?: string;
  rightText?: string;
}

export default function Footer({ 
  leftText = "© 2026 — Angel Sanabria",
  midText = "Designed & built from scratch",
  rightText = "Guatemala · GMT−6"
}: FooterProps) {
  return (
    <footer className="flex items-center gap-3 mt-[28px] px-[22px] py-[16px] text-[12px] text-fg-mute border border-[var(--line)] rounded-full bg-white/[0.02] font-mono flex-wrap">
      <span>{leftText}</span>
      <span className="opacity-40">/</span>
      <span>{midText}</span>
      <div className="flex-1" />
      <span>{rightText}</span>
    </footer>
  );
}
