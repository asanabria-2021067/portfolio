"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { usePreferences } from "./PreferencesProvider";

export default function BottomNav() {
  const pathname = usePathname();
  const { locale } = usePreferences();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainItems = [
    {
      labelEn: "Home",
      labelEs: "Inicio",
      href: "/",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      labelEn: "Projects",
      labelEs: "Proyectos",
      href: "/projects",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      labelEn: "Stack",
      labelEs: "Tecnologías",
      href: "/stack",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
  ];

  const moreItems = [
    {
      labelEn: "Certifications",
      labelEs: "Certificaciones",
      href: "/certifications",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="7" y1="8" x2="17" y2="8" />
          <line x1="7" y1="12" x2="17" y2="12" />
          <line x1="7" y1="16" x2="13" y2="16" />
        </svg>
      ),
    },
    {
      labelEn: "Contact",
      labelEs: "Contacto",
      href: "/contact",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  const isMoreActive = moreItems.some((item) => pathname === item.href);

  return (
    <nav className="bottom-nav-bar md:hidden" aria-label="Mobile navigation">
      {/* Click outside backdrop */}
      {isMoreOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/10 backdrop-blur-[2px]" 
          onClick={() => setIsMoreOpen(false)}
        />
      )}

      {/* Popover / Dropdown Menu */}
      {isMoreOpen && (
        <div className="bottom-nav-popover relative z-[101]">
          {moreItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMoreOpen(false)}
                className={clsx(
                  "bottom-nav-popover-item",
                  active && "bottom-nav-popover-item--active"
                )}
              >
                <span className="bottom-nav-icon">{item.icon}</span>
                <span>{locale === "en" ? item.labelEn : item.labelEs}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Bottom Navigation Container */}
      <div className="bottom-nav-container relative z-[101]">
        {mainItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx("bottom-nav-item", active && "bottom-nav-item--active")}
            >
              <span className="bottom-nav-icon">{item.icon}</span>
              <span className="bottom-nav-text">{locale === "en" ? item.labelEn : item.labelEs}</span>
            </Link>
          );
        })}

        {/* More Button Toggle */}
        <button
          onClick={() => setIsMoreOpen(!isMoreOpen)}
          className={clsx(
            "bottom-nav-item focus:outline-none cursor-pointer border-none bg-transparent",
            (isMoreOpen || isMoreActive) && "bottom-nav-item--active"
          )}
        >
          <span className="bottom-nav-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
              <circle cx="5" cy="12" r="1.5" />
            </svg>
          </span>
          <span className="bottom-nav-text">{locale === "en" ? "More" : "Más"}</span>
        </button>
      </div>
    </nav>
  );
}
