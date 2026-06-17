"use client";

import { useEffect, useRef } from "react";

interface Props {
  url: string;
}

export function CalendlyEmbed({ url }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!url) return;

    // Load Calendly widget script
    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, [url]);

  if (!url) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded border py-16 px-6 text-center"
        style={{
          borderColor: "var(--line)",
          backgroundColor: "var(--surface)",
          minHeight: "300px",
        }}
      >
        <p
          className="text-[11px] uppercase tracking-[0.13em] mb-3"
          style={{ color: "var(--accent)" }}
        >
          Calendrier non configuré
        </p>
        <p className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
          Configurez{" "}
          <code className="text-[12px]">NEXT_PUBLIC_CALENDLY_URL</code> dans les
          variables d&apos;environnement pour activer la prise de rendez-vous en
          ligne.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <a
            href="tel:+33100000000"
            className="flex-1 text-center border px-4 py-3 text-[11px] uppercase tracking-[0.13em] transition-all duration-300 hover:bg-[var(--text-1)] hover:text-[var(--bg)] hover:border-[var(--text-1)]"
            style={{ borderColor: "var(--line)", color: "var(--text-1)" }}
          >
            Appeler
          </a>
          <a
            href="mailto:rosaerenovation@gmail.com"
            className="flex-1 text-center border px-4 py-3 text-[11px] uppercase tracking-[0.13em] transition-all duration-300 hover:bg-[var(--text-1)] hover:text-[var(--bg)] hover:border-[var(--text-1)]"
            style={{ borderColor: "var(--line)", color: "var(--text-1)" }}
          >
            Écrire
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ minHeight: "650px" }}>
      {/* Calendly inline widget */}
      <div
        className="calendly-inline-widget"
        data-url={`${url}?hide_gdpr_banner=1&primary_color=8A7963`}
        style={{
          minWidth: "280px",
          height: "700px",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}
