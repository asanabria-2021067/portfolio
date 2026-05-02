import BentoCard from "./BentoCard";

const experiences = [
  {
    role: "Jr. VMware Engineer",
    company: "Grupo Quattro",
    period: "Now",
    bullets: [
      "vSphere & Kubernetes on VMware",
      "Supervisor Cluster & Tanzu",
      "Cloud-native infrastructure management",
    ],
  },
  {
    role: "Freelance Full Stack Developer",
    company: "Hyperreality Company",
    period: "Recent",
    bullets: [
      "Built Shifu AI end-to-end",
      "Designed full system architecture",
      "Integrated 20+ APIs and automation workflows",
    ],
  },
];

export default function Experience() {
  return (
    <BentoCard>
      <div className="flex items-center justify-between mb-[18px] gap-[10px]">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-fg-mute font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-accent shadow-[0_0_10px_var(--color-blue-accent)]" />
          Experience
        </div>
        <span className="text-fg-mute text-[12px] font-mono">2 roles</span>
      </div>
      <ul className="list-none p-0 m-0 flex flex-col gap-4">
        {experiences.map((exp, index) => (
          <li key={index} className="flex flex-col gap-1.5 pb-4 border-b border-[var(--line)] last:border-0 last:pb-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-fg text-[14px] font-semibold leading-[1.25]">{exp.role}</span>
              <span className="text-fg-mute text-[12px] font-mono">{exp.period}</span>
            </div>
            <span className="text-blue-accent text-[12.5px] font-medium">{exp.company}</span>
            <ul className="list-none p-0 m-0 mt-1.5 flex flex-col gap-1">
              {exp.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[12.5px] text-fg-dim leading-[1.45] before:content-[''] before:w-[3px] before:h-[3px] before:rounded-full before:bg-fg-mute before:mt-2 before:shrink-0">{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
