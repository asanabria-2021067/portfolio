type IconProps = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const FilesIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M14 3H7.5A1.5 1.5 0 0 0 6 4.5v12A1.5 1.5 0 0 0 7.5 18h9a1.5 1.5 0 0 0 1.5-1.5V7z" />
    <path d="M14 3v4h4" />
    <path d="M3 7.5v12A1.5 1.5 0 0 0 4.5 21H14" />
  </svg>
);

export const SearchIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5" />
  </svg>
);

export const BranchIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="6" cy="5" r="2.2" />
    <circle cx="6" cy="19" r="2.2" />
    <circle cx="18" cy="7" r="2.2" />
    <path d="M6 7.2v9.6" />
    <path d="M18 9.2c0 5-8 3.6-11.3 7.8" />
  </svg>
);

export const ExtensionsIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="10" width="5.5" height="5.5" rx="0.6" />
    <rect x="8.5" y="15.5" width="5.5" height="5.5" rx="0.6" />
    <rect x="3" y="15.5" width="5.5" height="5.5" rx="0.6" />
    <rect x="8.5" y="10" width="5.5" height="5.5" rx="0.6" />
    <rect x="14.5" y="3" width="6" height="6" rx="0.6" transform="rotate(12 17.5 6)" />
  </svg>
);

export const AccountIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3.2" />
    <path d="M6.2 18.4c1.3-2.2 3.4-3.4 5.8-3.4s4.5 1.2 5.8 3.4" />
  </svg>
);

export const GearIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </svg>
);

export const CloseIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ChevronIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const TerminalIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="m7 9 3 3-3 3M12.5 15H17" />
  </svg>
);

export const SidebarIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M9 4v16" />
  </svg>
);

export const PanelIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 14h18" />
  </svg>
);

export const SyncIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M20 11a8 8 0 0 0-14.3-4.3L4 9" />
    <path d="M4 4v5h5" />
    <path d="M4 13a8 8 0 0 0 14.3 4.3L20 15" />
    <path d="M20 20v-5h-5" />
  </svg>
);

export const ErrorIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m9 9 6 6M15 9l-6 6" />
  </svg>
);

export const WarningIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3.5 2.5 20h19z" />
    <path d="M12 10v4.5M12 17.2v.3" />
  </svg>
);

export const CheckIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const RefreshIcon = SyncIcon;

export const CollapseIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8.5 12h7" />
  </svg>
);

export const ExternalIcon = ({ size = 12, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);

export const FolderIcon = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size * 0.86} viewBox="0 0 16 14" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M1.5 1C.67 1 0 1.67 0 2.5v9C0 12.33.67 13 1.5 13h13c.83 0 1.5-.67 1.5-1.5v-7C16 3.67 15.33 3 14.5 3H8L6.5 1h-5Z" />
  </svg>
);

export const MenuIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CaseIcon = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <text x="2" y="17" fontSize="13" fontFamily="var(--font-mono)" fill="currentColor">
      Aa
    </text>
  </svg>
);
