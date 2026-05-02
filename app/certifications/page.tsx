import Link from "next/link";
import Footer from "@/components/Footer";
import CertificationCard from "@/components/CertificationCard";
import BentoCard from "@/components/BentoCard";

export default function CertificationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-[14px] mb-7 py-1 px-2">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-mute font-mono">
          <span className="w-[6px] h-[6px] rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
          Certifications · Professional Growth
        </div>
        <h1 className="text-[clamp(38px,4.4vw,56px)] font-semibold tracking-[-0.035em] leading-none m-0">
          Skills & <span className="grad-text">Certifications.</span>
        </h1>
        <p className="text-fg-dim text-[15px] leading-[1.55] max-w-[560px] m-0">
          A track record of my technical expertise in VMware infrastructure, network engineering,
          and full-stack development.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {/* VMware Section */}
        <CertificationCard
          badge="VMW"
          name="VMware vSphere V8"
          org="VMware"
          date="2024"
          desc="Comprehensive knowledge of installation, configuration, and management of VMware vSphere 8."
        />
        <CertificationCard
          badge="TNZ"
          name="VMware vSphere with Tanzu"
          org="VMware"
          date="2024"
          desc="Expertise in deploying and managing Kubernetes clusters on vSphere with VMware Tanzu."
        />
        <CertificationCard
          badge="VCF"
          name="VMware Cloud Foundation"
          org="VMware"
          date="2025"
          desc="Deep dive into full-stack hybrid cloud infrastructure and automated lifecycle management."
        />

        {/* Cisco Section */}
        <CertificationCard
          badge="CCNA"
          name="Cisco CCNA"
          org="Cisco"
          date="2023"
          desc="Networking fundamentals, IP connectivity, IP services, and security fundamentals."
        />

        {/* Development Section */}
        <CertificationCard
          badge="F-M"
          name="Professional Frontend"
          org="Frontend Masters"
          date="2024"
          desc="Advanced React patterns, CSS architecture, and performance optimization."
        />
        <CertificationCard
          badge="PZ"
          name="Full Stack Development"
          org="Platzi"
          date="2023"
          desc="Intensive training in Node.js, Express, and modern JavaScript ecosystem."
        />

        {/* Currently Pursuing */}
        <BentoCard span={2} className="flex flex-col">
          <div className="flex items-center justify-between mb-[18px] gap-[10px]">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-mute font-mono">
              <span className="w-[6px] h-[6px] rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
              Currently Pursuing
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-[10px]">
            <div className="flex flex-col gap-2">
              <span className="text-[14px] font-medium text-fg">CKA (Certified Kubernetes Administrator)</span>
              <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-grad rounded-full" style={{ width: "65%" }} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[14px] font-medium text-fg">AWS Solutions Architect Associate</span>
              <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-grad rounded-full" style={{ width: "40%" }} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[14px] font-medium text-fg">Advanced Vue.js Mastery</span>
              <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-grad rounded-full" style={{ width: "20%" }} />
              </div>
            </div>
          </div>
        </BentoCard>
      </main>

      <Footer
        leftText="© 2026 — Angel Sanabria"
        midText="Constant learning · Continuous improvement"
        rightText="Updated May 2026"
      />
    </div>
  );
}
