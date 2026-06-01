"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePreferences } from "./PreferencesProvider";

interface PdfModalProps {
  isOpen: boolean;
  link: string;
  name: string;
  onClose: () => void;
}

export default function PdfModal({ isOpen, link, name, onClose }: PdfModalProps) {
  const { locale } = usePreferences();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#07080d]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-5xl h-[85vh] flex flex-col bg-[#0b0d15]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
              <div className="flex flex-col min-w-0 pr-4">
                <span className="text-[10px] uppercase tracking-[0.12em] text-fg-mute font-mono">
                  {locale === "en" ? "Credential Viewer" : "Visualizador de Credencial"}
                </span>
                <h2 className="text-[16px] md:text-[18px] font-semibold text-fg truncate">
                  {name}
                </h2>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] font-mono text-fg-dim px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  {locale === "en" ? "Open Fullscreen" : "Pantalla Completa"}
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
                
                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-fg-dim hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Content */}
            <div className="flex-1 bg-[#07080d]/40 p-4">
              <iframe
                src={`${link}#toolbar=0`}
                className="w-full h-full border-0 rounded-lg bg-[#07080d]/60 shadow-inner"
                title={name}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
