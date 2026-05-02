import { clsx } from "clsx";

interface ChipProps {
  label: string;
  dotColor?: string;
  className?: string;
}

export default function Chip({ label, dotColor, className }: ChipProps) {
  return (
    <span className={clsx(
      "inline-flex items-center gap-[6px] px-[10px] py-[5px] text-[12px] text-fg-dim bg-white/4 border border-[var(--line)] rounded-[8px] font-mono transition-all duration-200 hover:text-fg hover:border-[var(--line-2)] hover:bg-white/7",
      className
    )}>
      {dotColor && (
        <span
          className="w-[6px] h-[6px] rounded-full shrink-0"
          style={{ background: dotColor, border: dotColor === "#fff" ? "1px solid #888" : "none" }}
        />
      )}
      {label}
    </span>
  );
}
