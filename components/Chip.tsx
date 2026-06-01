import { clsx } from "clsx";

interface ChipProps {
  label: string;
  dotColor?: string;
  icon?: string;
  className?: string;
}

export default function Chip({ label, dotColor, icon, className }: ChipProps) {
  return (
    <span className={clsx(
      "inline-flex items-center gap-[8px] px-[12px] py-[6px] text-[12.5px] text-fg-dim bg-white/4 border border-[var(--line)] rounded-[8px] font-mono transition-all duration-200 hover:text-fg hover:border-[var(--line-2)] hover:bg-white/7 hover:scale-[1.02] active:scale-[0.98]",
      className
    )}>
      {icon ? (
        <img
          src={icon}
          alt={label}
          className="w-4 h-4 object-contain shrink-0 transition-all brightness-[0.85] group-hover:brightness-100"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : dotColor ? (
        <span
          className="w-[6px] h-[6px] rounded-full shrink-0"
          style={{ background: dotColor, border: dotColor === "#fff" ? "1px solid #888" : "none" }}
        />
      ) : null}
      {label}
    </span>
  );
}
