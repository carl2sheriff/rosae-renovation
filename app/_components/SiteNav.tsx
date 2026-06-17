"use client";

import { useState } from "react";

const navLinks: [string, string][] = [
  ["Studio", "/studio"],
  ["Méthode", "/methode"],
  ["Réalisations", "/realisations"],
  ["Contact", "/contact"],
];

export function SiteNav({ activePath = "/" }: { activePath?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        borderBottom: "1px solid var(--line)",
        background: "color-mix(in srgb, var(--bg) 88%, transparent)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-[18px] sm:px-6">
        <a
          href="/"
          className="font-serif italic tracking-[0.05em] text-[15px]"
          style={{ color: "var(--text-1)" }}
        >
          ROSAE
        </a>

        <nav className="hidden gap-8 md:flex" aria-label="Navigation principale">
          {navLinks.map(([label, href]) => {
            const active = activePath === href || (href !== "/" && activePath.startsWith(href.split("#")[0] || ""));
            return (
              <a
                key={label}
                href={href}
                className="text-[11px] uppercase tracking-[0.13em] transition-colors duration-300"
                style={{ color: active ? "var(--text-1)" : "var(--text-2)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = active ? "var(--text-1)" : "var(--text-2)")}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 -mr-1 items-center"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className="block h-px w-6 transition-all duration-300 origin-center"
            style={{
              backgroundColor: "var(--text-1)",
              transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-px w-6 transition-all duration-300"
            style={{
              backgroundColor: "var(--text-1)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-px w-6 transition-all duration-300 origin-center"
            style={{
              backgroundColor: "var(--text-1)",
              transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden border-t"
          style={{
            borderColor: "var(--line)",
            background: "color-mix(in srgb, var(--bg) 97%, transparent)",
          }}
        >
          <nav
            className="mx-auto max-w-6xl flex flex-col px-5 py-8 gap-7"
            aria-label="Navigation mobile"
          >
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-[13px] uppercase tracking-[0.13em]"
                style={{ color: "var(--text-1)" }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
