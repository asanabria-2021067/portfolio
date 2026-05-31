import Footer from "@/components/Footer";
import CertificationCard from "@/components/CertificationCard";
import BentoCard from "@/components/BentoCard";

const LOGOS = {
  FM: "https://frontendmasters.com/static-assets/core/m-transparent.webp",
  BROADCOM: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Broadcom_logo_%282016-present%29.svg",
  VMWARE: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Vmware.svg",
  INTECAP: "https://upload.wikimedia.org/wikipedia/commons/0/09/Logotipo_de_el_INTECAP.png",
  PLATZI: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/platzi.png",
  CISCO: "https://www.vectorlogo.zone/logos/cisco/cisco-icon.svg"
};

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

      <main className="flex flex-col gap-12">
        {/* Infrastructure Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-[20px] font-semibold text-fg">Infrastructure & Virtualization</h2>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            <CertificationCard
              badge="VCF"
              name="VMware Cloud Foundation Introduction"
              org="Broadcom"
              date="2025"
              logo={LOGOS.VMWARE}
              desc="Cloud Infrastructure, VMware Cloud Foundation, vSphere, vSAN, and SDDC."
              link="/assets/certificaciones/VCFI9.pdf"
            />
            <CertificationCard
              badge="TNZ"
              name="vSphere with Tanzu: Deploy & Manage"
              org="Broadcom"
              date="2025"
              logo={LOGOS.VMWARE}
              desc="Vmware Tanzu, Kubernetes, Supervisor Cluster, and Container Orchestration."
              link="/assets/certificaciones/Vmware Vsphere with Tanzu.pdf"
            />
            <CertificationCard
              badge="VMW"
              name="VMware vSphere: Install & Configure"
              org="Broadcom"
              date="2025"
              logo={LOGOS.VMWARE}
              desc="Virtualization, vCenter, and Data Center Management."
              link="/assets/certificaciones/VMware Vsphere Install.pdf"
            />
          </div>
        </section>

        {/* Development Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-[20px] font-semibold text-fg">Frontend & Full Stack Development</h2>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            <CertificationCard
              badge="FM"
              name="Enterprise TypeScript"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc="Architecting, testing, and scaling large TypeScript systems for enterprise production."
              link="/assets/certificaciones/enterprise-typescript-dark.pdf"
            />
            <CertificationCard
              badge="FM"
              name="Full Stack TypeScript, Node & GraphQL"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc="Building enterprise full-stack applications with Node.js, GraphQL, and TypeScript."
              link="/assets/certificaciones/fullstack-typescript-dark.pdf"
            />
            <CertificationCard
              badge="FM"
              name="Complete Intro to Containers"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc="Comprehensive introduction to Docker, podman, and container architectures."
              link="/assets/certificaciones/complete-intro-containers-dark.pdf"
            />
            <CertificationCard
              badge="FM"
              name="Complete Go"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc="Full course on Google Go language fundamentals, concurrency, and web services."
              link="/assets/certificaciones/complete-go-dark.pdf"
            />
            <CertificationCard
              badge="FM"
              name="Vue Fundamentals"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc="Vue.js core principles, component hierarchy, reactivity, and state management."
              link="/assets/certificaciones/vue-fundamentals-dark.pdf"
            />
            <CertificationCard
              badge="FM"
              name="Intro to Vue 3 Workshop"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc="Workshop covering composition API, reactivity, routing, and deployment in Vue 3."
              link="/assets/certificaciones/Complete Intro to Vue 3 Workshop (FEM).pdf"
            />
            <CertificationCard
              badge="FM"
              name="TypeScript Monorepos"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc="Architecting large-scale TypeScript applications using monorepo patterns."
              link="/assets/certificaciones/monorepos-v2.pdf"
            />
            <CertificationCard
              badge="FM"
              name="Intermediate TypeScript, v2"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc="Advanced TypeScript features and patterns for scalable applications."
              link="/assets/certificaciones/intermediate-typescript-v2.pdf"
            />
            <CertificationCard
              badge="FM"
              name="TypeScript 5 Fundamentals, v4"
              org="Frontend Masters"
              date="2026"
              logo={LOGOS.FM}
              desc="Deep dive into the core concepts of TypeScript 5 and its ecosystem."
              link="/assets/certificaciones/typescript-v4.pdf"
            />
            <CertificationCard
              badge="INT"
              name="Diseño de Interfaces con React JS"
              org="INTECAP"
              date="2023"
              logo={LOGOS.INTECAP}
              desc="Frontend development with React.js, Hooks, and modern CSS frameworks."
              link="/assets/certificaciones/Diseño de interfaces Intecap.pdf"
            />
            <CertificationCard
              badge="PZ"
              name="Profesional de Git y GitHub"
              org="Platzi"
              date="2023"
              logo={LOGOS.PLATZI}
              desc="Advanced version control, branching strategies, and collaboration workflows."
            />
            <CertificationCard
              badge="PZ"
              name="Curso Definitivo de HTML y CSS"
              org="Platzi"
              date="2023"
              logo={LOGOS.PLATZI}
              desc="Semantic HTML, modern CSS architecture, and responsive design."
            />
            <CertificationCard
              badge="PZ"
              name="Práctico de Frontend Developer"
              org="Platzi"
              date="2023"
              logo={LOGOS.PLATZI}
              desc="Application of frontend development principles in real-world projects."
            />
            <CertificationCard
              badge="PZ"
              name="Fundamentos de Python"
              org="Platzi"
              date="2022"
              logo={LOGOS.PLATZI}
              desc="Core concepts, data structures, and syntax of Python programming."
            />
          </div>
        </section>

        {/* Networking & Security */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-[20px] font-semibold text-fg">Networking & Security</h2>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            <CertificationCard
              badge="CS"
              name="Cybersecurity Essentials"
              org="Cisco"
              date="2022"
              logo={LOGOS.CISCO}
              desc="Foundational knowledge of cybersecurity threats and protection strategies."
            />
            <CertificationCard
              badge="CCNA"
              name="CCNA: Introduction to Networks"
              org="Cisco"
              date="2021"
              logo={LOGOS.CISCO}
              desc="Networking fundamentals, IP connectivity, and foundational IP services."
            />
          </div>
        </section>

        {/* Currently Pursuing */}
        <BentoCard className="flex flex-col">
          <div className="flex items-center justify-between mb-[18px] gap-[10px]">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-fg-mute font-mono">
              <span className="w-[6px] h-[6px] rounded-full bg-blue-accent shadow-[0_0_10px_var(--blue)]" />
              Currently Pursuing
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 mt-[10px]">
            <div className="flex-1 flex flex-col gap-5">
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
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-[14px] font-medium text-fg">Advanced React Patterns & Performance</span>
                <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-grad rounded-full" style={{ width: "80%" }} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[14px] font-medium text-fg">System Design for Scalable Apps</span>
                <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-grad rounded-full" style={{ width: "30%" }} />
                </div>
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
