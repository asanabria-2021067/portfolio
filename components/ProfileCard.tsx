import Image from "next/image";
import BentoCard from "./BentoCard";

export default function ProfileCard() {
  return (
    <BentoCard className="col-span-1 md:col-span-2 lg:col-span-4 !p-0 min-h-[380px]">
      <div className="relative w-full h-full rounded-[var(--radius)] overflow-hidden min-h-[380px]">
        <div className="bg-gradient-to-br from-[#1a2553] via-[#2a1a4a] to-[#0e1020] absolute inset-0" />
        <Image
          src="/assets/pic.jpeg"
          alt="Angel Sanabria"
          fill
          className="object-cover object-center absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_35%,rgba(167,139,250,0.35),transparent_70%)] pointer-events-none" />
        <div className="absolute top-[14px] left-[14px] font-mono text-[10px] text-white/70 bg-[#080a12]/55 backdrop-blur-[10px] px-2.5 py-1.25 border border-white/10 rounded-full">
          @angelsanabria
        </div>
        <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between px-3.5 py-3 rounded-[var(--radius-sm)] bg-[#080a12]/60 backdrop-blur-[12px] border border-white/10">
          <div>
            <div className="text-[14px] font-semibold text-white">Angel Sanabria</div>
            <div className="text-[11px] text-white/70 font-mono mt-[0.5]">Guatemala · GMT−6</div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#4ade80] px-2 py-1 bg-[#4ade80]/12 border border-[#4ade80]/25 rounded-full">
            <span className="pulse"></span>Online
          </span>
        </div>
      </div>
    </BentoCard>
  );
}
