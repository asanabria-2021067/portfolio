import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import FileTreeNav from "@/components/FileTreeNav";
import { PreferencesProvider } from "@/components/PreferencesProvider";
import BottomNav from "@/components/BottomNav";

const interTight = Inter_Tight({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Angel Sanabria — VMware Engineer & Full Stack Developer",
  description: "Portfolio of Angel Sanabria, VMware Engineer and Full Stack Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <PreferencesProvider>
          <div className="ambient" />
          <div className="shell">
            <Navbar />
            <div className="ide-layout">
              <aside className="ft-sidebar">
                <FileTreeNav />
              </aside>
              <div className="ide-main">
                <PageTransition>{children}</PageTransition>
              </div>
            </div>
          </div>
          <BottomNav />
        </PreferencesProvider>
      </body>
    </html>
  );
}
