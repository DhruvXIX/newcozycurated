import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import logoImg from "./img/cozy2.svg";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cozy Curated",
  description:
    "Cozy Curated helps you design a life you love with curated inspiration, tools, and guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300">
              <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <div className="flex items-center group cursor-pointer">
                  <div className="relative h-20 w-32 transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={logoImg}
                      alt="Cozy Curated"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <div className="flex gap-6 text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
                  <Link href="/" className="transition hover:text-[var(--accent)]">
                    Home
                  </Link>
                  <Link href="/contact" className="transition hover:text-[var(--accent)]">
                    Contact
                  </Link>
                  <Link href="/profile" className="transition hover:text-[var(--accent)]">
                    Profile
                  </Link>
                </div>
              </nav>
            </header>
            <main className="flex-1 pb-12">{children}</main>
            <footer className="fixed bottom-0 z-40 w-full border-t border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md">
              <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-2.5 text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]/80">
                <span>© {new Date().getFullYear()} Cozy Curated</span>
                <span className="opacity-60">Crafted with intention</span>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
