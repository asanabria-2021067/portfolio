import Image from "next/image";
import BentoCard from "./BentoCard";

const certifications = [
  { name: "TypeScript Monorepos", org: "Frontend Masters", badge: "FM", logo: "https://frontendmasters.com/static-assets/core/m-transparent.webp" },
  { name: "VMware Cloud Foundation", org: "Broadcom", badge: "VCF", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Vmware.svg" },
  { name: "CCNA: Introduction to Networks", org: "Cisco", badge: "CCNA", logo: "https://www.vectorlogo.zone/logos/cisco/cisco-icon.svg" },
  { name: "Interfaces con React JS", org: "INTECAP", badge: "INT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/Logotipo_de_el_INTECAP.png" },
];

export default function CertificationsPreview() {
  return (
    <BentoCard>
      <div className="flex items-center justify-between mb-[18px] gap-[10px]">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-fg-mute font-mono">
          <span className="w-[6px] h-[6px] rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
          Certifications
        </div>
        <span className="text-fg-mute text-[12px] font-mono">19</span>
      </div>
      <div className="flex flex-col gap-[10px]">
        {certifications.map((cert, index) => (
          <div key={index} className="flex items-center gap-3 p-[11px_12px] bg-white/[0.025] border border-[var(--line)] rounded-bento-sm transition-all duration-200 hover:bg-white/[0.05] hover:border-[var(--line-2)]">
            <div className="w-[38px] h-[38px] flex items-center justify-center rounded-[10px] shrink-0 overflow-hidden bg-white/5 border border-white/10">
              {cert.logo ? (
                <Image
                  src={cert.logo}
                  alt={cert.org}
                  width={38}
                  height={38}
                  className="w-full h-full object-contain p-1.5"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-white bg-grad font-mono">
                  {cert.badge}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-[2px] min-w-0 flex-1">
              <span className="text-[13px] text-fg font-medium leading-[1.3] truncate">{cert.name}</span>
              <span className="text-[10.5px] text-fg-mute font-mono">{cert.org}</span>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
