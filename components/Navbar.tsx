"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex items-center gap-6 py-3.5 px-5.5 mb-7 border border-[var(--line)] rounded-full bg-white/[0.03] backdrop-blur-[16px] mt-4">
      <div className="flex items-center gap-[10px] text-[14px] font-semibold">
        <span className="w-6 h-6 rounded-[7px] bg-grad flex items-center justify-center text-white text-[12px] font-bold shadow-[0_4px_12px_rgba(106,166,255,0.3)]">A</span>
        <span>angel.dev</span>
      </div>
      <nav className="hidden sm:flex gap-6 ml-[18px]">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "text-[13px] py-1 transition-colors duration-200 no-underline",
              pathname === link.href ? "text-fg" : "text-fg-mute hover:text-fg"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-3">
        <span className="inline-flex items-center gap-2 text-[12px] text-fg-dim py-1.5 px-3 border border-[var(--line)] rounded-full bg-white/[0.03] font-mono whitespace-nowrap">
          <span className="pulse"></span>
          <span className="hidden xs:inline">Available for opportunities</span>
          <span className="xs:hidden">Available</span>
        </span>
      </div>
    </header>
  );
}
