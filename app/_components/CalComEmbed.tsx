"use client";

import { useEffect } from "react";

type CalFn = {
  (...args: unknown[]): void;
  q?: unknown[][];
  loaded?: boolean;
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

interface Props {
  calLink: string; // e.g. "rosae-renovation/devis"
}

export function CalComEmbed({ calLink }: Props) {
  useEffect(() => {
    if (!calLink || typeof window === "undefined") return;
    if (window.Cal?.loaded) return;

    // Cal.com embed loader
    const calFn: CalFn = function (...args: unknown[]) {
      (calFn.q = calFn.q || []).push(args);
      if (!calFn.loaded) {
        calFn.loaded = true;
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://app.cal.com/embed/embed.js";
        document.head.appendChild(script);
      }
    };
    calFn.q = [];
    window.Cal = calFn;

    window.Cal("init", { origin: "https://cal.com" });
    window.Cal("ui", {
      styles: { branding: { brandColor: "#8A7963" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, [calLink]);

  if (!calLink) {
    return null;
  }

  return (
    <a
      href={`https://cal.com/${calLink}`}
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block text-[11px] uppercase tracking-[0.18em] transition-colors duration-300"
      style={{
        color: "var(--text-1)",
        borderBottom: "1px solid currentColor",
        paddingBottom: "2px",
      }}
    >
      Choisir un créneau →
    </a>
  );
}
