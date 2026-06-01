import Image from "next/image";
import BentoCard from "./BentoCard";

interface CertificationCardProps {
  name: string;
  org: string;
  badge: string;
  date: string;
  desc?: string;
  link?: string;
  logo?: string;
  onViewPdf?: (link: string, name: string) => void;
}

export default function CertificationCard({
  name,
  org,
  badge,
  date,
  desc,
  link,
  logo,
  onViewPdf,
}: CertificationCardProps) {
  return (
    <BentoCard className="flex flex-col">
      <div className="flex gap-4 items-start mb-4">
        <div className="w-[54px] h-[54px] flex items-center justify-center rounded-[14px] shrink-0 overflow-hidden bg-white/5 border border-white/10 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.3)]">
          {logo ? (
            <Image src={logo} alt={org} width={54} height={54} className="w-full h-full object-contain p-2" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[14px] font-extrabold text-white bg-grad font-mono">
              {badge}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="text-[10px] uppercase tracking-[0.1em] text-fg-mute font-mono">{date}</span>
          <h3 className="text-[17px] font-semibold text-fg leading-[1.25]">{name}</h3>
          <span className="text-[13px] text-blue-accent font-medium">{org}</span>
        </div>
      </div>
      {desc && <p className="text-[13px] text-fg-dim leading-[1.5] mb-4">{desc}</p>}
      {link && (
        <a 
          href={link} 
          onClick={(e) => {
            if (onViewPdf) {
              e.preventDefault();
              onViewPdf(link, name);
            }
          }}
          target="_blank" 
          className="inline-flex items-center gap-[6px] text-[11px] font-mono text-fg-mute no-underline transition-all duration-200 hover:text-fg mt-auto cursor-pointer"
        >
          View Certificate
          <svg width="12" height="12" viewBox="0 0 16 16">
            <path
              d="M3 13 L13 3 M6 3 H13 V10"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
    </BentoCard>
  );
}
