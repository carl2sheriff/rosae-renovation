import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partenaires — Rosae Rénovation",
  description:
    "Rosae collabore avec des architectes d'intérieur, des artisans spécialisés et des experts conseil pour garantir une rénovation d'exception.",
};

const ARCHITECTES = [
  { nom: "Atelier Paluel Marmont", sigle: "APM" },
  { nom: "Séverine de Lanversin", sigle: null },
  { nom: "Stéphanie Délégué", sigle: null },
  { nom: "Caroline des Cars", sigle: null },
];

const PARTENAIRES = [
  {
    categorie: "Corps de métiers spécialisés",
    texte:
      "Pour les ouvrages techniques ou sur-mesure, nous faisons appel à des artisans sélectionnés selon des critères stricts de qualité et de fiabilité.",
    profils: [
      "Menuisiers ébénistes — boiseries, bibliothèques, dressings",
      "Marbriers — salles de bain, sols, cheminées",
      "Peintres en décor — patines, trompe-l'œil, enduits à la chaux",
      "Électriciens domotique — KNX, Legrand, Somfy",
    ],
  },
  {
    categorie: "Expertise conseil",
    texte:
      "Certains projets nécessitent un regard extérieur sur la structure, le patrimoine ou l'acoustique. Nous orientons vers les experts adaptés.",
    profils: [
      "Bureau d'études structure",
      "Acousticiens",
      "Experts en bâtiments anciens et haussmanniens",
    ],
  },
];

export default function PartenairesPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}
    >
      <SiteNav activePath="/partenaires" />

      <main id="main-content">
        {/* ── Header ──────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-6 md:pt-24 md:pb-16">
          <div className="border-b pb-8" style={{ borderColor: "var(--line)" }}>
            <p
              className="text-[11px] uppercase tracking-[0.13em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              Réseau
            </p>
            <h1
              className="font-serif italic"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.15 }}
            >
              Nos partenaires
            </h1>
            <p
              className="mt-5 text-sm leading-[1.9] max-w-xl"
              style={{ color: "var(--text-2)" }}
            >
              La rénovation d'un intérieur exigeant ne se fait jamais seul.
              Rosae s'appuie sur un réseau de confiance — constitué au fil des
              chantiers — pour garantir la cohérence et la qualité de chaque
              intervention.
            </p>
          </div>
        </section>

        {/* ── Architectes d'intérieur ─────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6">
          <div
            className="grid gap-8 border-b pb-16 md:grid-cols-[1fr_1.4fr]"
            style={{ borderColor: "var(--line)" }}
          >
            <div>
              <h2
                className="font-serif italic"
                style={{ fontSize: "clamp(16px, 1.8vw, 22px)", lineHeight: 1.3 }}
              >
                Architectes d&apos;intérieur
              </h2>
              <p
                className="mt-4 text-sm leading-[1.9]"
                style={{ color: "var(--text-2)" }}
              >
                Nous collaborons avec des architectes d&apos;intérieur qui nous confient
                l&apos;exécution technique de leurs projets. Leur vision, notre rigueur
                d&apos;exécution — sans jamais empiéter sur leur relation client.
              </p>
            </div>
            <ul className="flex flex-col gap-4 self-start mt-1">
              {ARCHITECTES.map(({ nom, sigle }) => (
                <li key={nom} className="flex items-baseline gap-3 text-sm">
                  <span
                    className="mt-[6px] h-[1px] w-4 shrink-0 inline-block"
                    style={{ backgroundColor: "var(--accent)" }}
                    aria-hidden="true"
                  />
                  <span style={{ color: "var(--text-1)" }}>
                    {nom}
                    {sigle && (
                      <span
                        className="ml-2 text-[11px] uppercase tracking-[0.1em]"
                        style={{ color: "var(--accent)" }}
                      >
                        {sigle}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Partenaires ─────────────────────────── */}
        {PARTENAIRES.map(({ categorie, texte, profils }) => (
          <section
            key={categorie}
            className="mx-auto max-w-6xl px-5 pb-16 sm:px-6"
          >
            <div
              className="grid gap-8 border-b pb-16 md:grid-cols-[1fr_1.4fr]"
              style={{ borderColor: "var(--line)" }}
            >
              <div>
                <h2
                  className="font-serif italic"
                  style={{
                    fontSize: "clamp(16px, 1.8vw, 22px)",
                    lineHeight: 1.3,
                  }}
                >
                  {categorie}
                </h2>
                <p
                  className="mt-4 text-sm leading-[1.9]"
                  style={{ color: "var(--text-2)" }}
                >
                  {texte}
                </p>
              </div>
              <ul className="flex flex-col gap-3 self-start mt-1">
                {profils.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <span
                      className="mt-[6px] h-[1px] w-4 shrink-0 inline-block"
                      style={{ backgroundColor: "var(--accent)" }}
                      aria-hidden="true"
                    />
                    <span style={{ color: "var(--text-2)" }}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* ── CTA ─────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36">
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >
            <div>
              <p className="font-serif italic text-[17px] sm:text-[19px]">
                Une collaboration à envisager ?
              </p>
              <p className="mt-2 text-sm" style={{ color: "var(--text-2)" }}>
                Architectes, décorateurs, maîtres d&apos;œuvre — nous sommes à l&apos;écoute.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-block text-[11px] uppercase tracking-[0.18em] border px-6 py-3 transition-all duration-300 hover:bg-[var(--text-1)] hover:text-[var(--bg)] shrink-0"
              style={{ borderColor: "var(--text-1)", color: "var(--text-1)" }}
            >
              Nous contacter
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
