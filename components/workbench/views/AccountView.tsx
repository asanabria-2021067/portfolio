"use client";

import Image from "next/image";
import { usePreferences } from "../../PreferencesProvider";
import { useWorkbench } from "../WorkbenchProvider";
import { ExternalIcon, GearIcon } from "../icons";
import { CV_PATH, EMAIL, GITHUB_PROFILE, LINKEDIN_URL, t } from "@/lib/workspace";

export default function AccountView() {
  const { locale } = usePreferences();
  const { commands, showView, isMobile } = useWorkbench();
  const viewCv = commands.find((command) => command.id === "cv.view");

  const links = [
    { label: "GitHub", value: "asanabria-2021067", href: GITHUB_PROFILE },
    { label: "LinkedIn", value: "angel-sanabria-desarrollador", href: LINKEDIN_URL },
    { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  ];

  return (
    <div className="wb-account">
      <div className="wb-account-card">
        <div className="wb-avatar">
          <Image src="/assets/pic.jpeg" alt="Angel Sanabria" fill sizes="64px" className="object-cover" />
        </div>
        <div className="wb-account-id">
          <strong>Angel Sanabria</strong>
          <span>VMware Engineer (VKS) · Full Stack Developer</span>
          <span className="wb-account-loc">Guatemala · GMT−6</span>
        </div>
      </div>

      <span className="status-pill wb-account-status">
        <span className="pulse" />
        {t(locale, "Open to opportunities", "Disponible para oportunidades")}
      </span>

      <p className="wb-account-bio">
        {t(
          locale,
          "Infrastructure engineer working with VMware Cloud Foundation (Supervisor, VKS, NSX) and full-stack developer. Computer Science student at UVG.",
          "Ingeniero de infraestructura con VMware Cloud Foundation (Supervisor, VKS, NSX) y desarrollador full stack. Estudiante de Ingeniería en Ciencias de la Computación en la UVG."
        )}
      </p>

      <ul className="wb-account-links">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target={link.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer">
              <span className="wb-account-link-label">{link.label}</span>
              <span className="wb-account-link-value">{link.value}</span>
              <ExternalIcon />
            </a>
          </li>
        ))}
      </ul>

      <div className="wb-account-actions">
        <button type="button" className="wb-primary-btn" onClick={() => viewCv?.run()}>
          {t(locale, "View CV", "Ver CV")}
        </button>
        <a className="wb-secondary-btn" href={CV_PATH} download="Angel-Sanabria-CV.pdf">
          {t(locale, "Download", "Descargar")}
        </a>
      </div>

      {isMobile && (
        <button type="button" className="wb-secondary-btn wb-account-settings" onClick={() => showView("settings")}>
          <GearIcon size={14} /> {t(locale, "Settings", "Configuración")}
        </button>
      )}
    </div>
  );
}
