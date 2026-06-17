import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio — Rosae Rénovation",
  description:
    "Rosae est une entreprise générale de rénovation d'intérieurs fondée à Paris. Nous intervenons aux côtés d'architectes et pour des clients privés sur des projets d'appartements, maisons et bureaux en Île-de-France.",
};

export default function StudioPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}>
      <SiteNav activePath="/studio" />

      <main>
        {/* ── Hero ─────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pt-16 pb-0 sm:px-6 md:pt-24">
          <div className="border-b pb-8" style={{ borderColor: "var(--line)" }}>
            <p
              className="text-[11px] uppercase tracking-[0.13em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              Studio
            </p>
            <h1
              className="font-serif italic max-w-2xl"
              style={{ fontSize: "clamp(28px, 4vw, 56px)", lineHeight: 1.15 }}
            >
              Une exécution précise au service de chaque projet.
            </h1>
          </div>
        </section>

        {/* ── Intro image ──────────────────────────── */}
        <div
          className="mx-auto max-w-6xl px-5 sm:px-6 mt-0"
          style={{ height: "clamp(240px, 45vh, 520px)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85"
            alt="Atelier de rénovation"
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
        </div>

        {/* ── Corps ────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
          <div className="grid gap-16 md:grid-cols-[1fr_1fr] md:gap-24">
            {/* Left — texte */}
            <div>
              <p
                className="font-serif italic leading-[1.85] mb-8"
                style={{ fontSize: "clamp(15px, 1.5vw, 19px)", color: "var(--text-1)" }}
              >
                Rosae est une entreprise générale du bâtiment spécialisée dans
                la rénovation d&apos;intérieurs haut de gamme. Nous intervenons
                à Paris et en Île-de-France, aux côtés d&apos;architectes et
                directement pour des clients privés.
              </p>
              <p
                className="text-sm leading-[1.95] mb-6"
                style={{ color: "var(--text-2)" }}
              >
                Notre rôle est de transformer des espaces avec rigueur : prendre
                en charge l&apos;intégralité des corps de métier, coordonner les
                intervenants, respecter les délais et livrer un chantier sans
                compromis sur la qualité des finitions.
              </p>
              <p
                className="text-sm leading-[1.95]"
                style={{ color: "var(--text-2)" }}
              >
                Chaque projet est suivi personnellement par Stéphane Beilin,
                fondateur de Rosae — du premier rendez-vous jusqu&apos;à la
                livraison des clés.
              </p>
            </div>

            {/* Right — fondateur */}
            <div>
              <div
                className="border-l-[1.5px] pl-6 mb-8"
                style={{ borderColor: "var(--accent)" }}
              >
                <p
                  className="font-serif italic leading-[1.85]"
                  style={{ fontSize: "clamp(14px, 1.3vw, 17px)", color: "var(--text-2)" }}
                >
                  Un projet réussi commence bien avant le premier coup de marteau.
                  Nous prenons le temps d&apos;écouter, de comprendre
                  l&apos;intention, d&apos;éclaircir chaque choix avant
                  qu&apos;il ne devienne une décision. Cette rigueur en amont,
                  c&apos;est ce qui permet d&apos;arriver à la livraison sans
                  aucune surprise — pour le client comme pour ses architectes.
                </p>
                <footer className="mt-5">
                  <p
                    className="text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: "var(--accent)" }}
                  >
                    — Stéphane Beilin{" "}
                    <span style={{ color: "var(--text-2)" }}>/ Fondateur · Rosae</span>
                  </p>
                </footer>
              </div>

              {/* Valeurs */}
              <div className="grid gap-6 mt-10">
                {[
                  { titre: "Rigueur d'exécution", desc: "Chaque détail est traité avec la même attention, de la structure aux finitions." },
                  { titre: "Transparence totale", desc: "Nos clients ont une visibilité complète sur l'avancement, les coûts et les délais." },
                  { titre: "Interlocuteur unique", desc: "Un seul point de contact tout au long du chantier, du devis à la livraison." },
                ].map((v) => (
                  <div
                    key={v.titre}
                    className="border-t pt-5"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <h3
                      className="font-serif italic text-[15px] mb-2"
                      style={{ color: "var(--text-1)" }}
                    >
                      {v.titre}
                    </h3>
                    <p className="text-sm leading-[1.85]" style={{ color: "var(--text-2)" }}>
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <section
          className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36"
        >
          <div
            className="border-t pt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            style={{ borderColor: "var(--line)" }}
          >
            <div>
              <p className="font-serif italic text-[17px] sm:text-[19px]">
                Discutons de votre projet.
              </p>
              <p className="mt-2 text-sm" style={{ color: "var(--text-2)" }}>
                Premier échange sans engagement.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-block text-[11px] uppercase tracking-[0.18em] border px-6 py-3 transition-all duration-300 hover:bg-[var(--text-1)] hover:text-[var(--bg)] shrink-0"
              style={{ borderColor: "var(--text-1)", color: "var(--text-1)" }}
            >
              Prendre contact
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
