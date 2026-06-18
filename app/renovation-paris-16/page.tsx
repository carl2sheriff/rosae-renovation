import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rénovation appartement Paris 16e — Rosae Rénovation",
  description:
    "Rénovation d'appartements dans le 16e arrondissement de Paris. Passy, Auteuil, Trocadéro, Victor Hugo. Entreprise générale Rosae — devis sous 5 jours.",
  openGraph: {
    title: "Rénovation appartement Paris 16e — Rosae",
    description:
      "Rénovation complète et partielle dans le 16e arrondissement. Rosae — entreprise générale du bâtiment.",
  },
};

const POINTS = [
  {
    titre: "Passy, Auteuil, Trocadéro",
    corps:
      "Le 16e regroupe certains des plus beaux immeubles de Paris — Art déco, haussmannien tardif, architecture des années 30. Chaque immeuble a ses particularités. Nous les connaissons.",
  },
  {
    titre: "Grandes surfaces, grandes exigences",
    corps:
      "Les appartements du 16e sont souvent spacieux, avec des pièces à fort volume. Nos équipes sont calibrées pour des chantiers de 100 à 300 m² sans relâchement de la qualité d'exécution.",
  },
  {
    titre: "Suivi de chantier rigoureux",
    corps:
      "Comptes-rendus hebdomadaires, photos de suivi, alerte immédiate en cas d'aléa. Vous êtes informé à chaque étape sans avoir à le demander.",
  },
  {
    titre: "Travaux avec architecte ou en autonome",
    corps:
      "Nous intervenons aussi bien aux côtés d'un architecte d'intérieur que directement pour des clients qui préfèrent une relation directe avec leur entreprise générale.",
  },
];

export default function RenovationParis16Page() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}
    >
      <SiteNav />

      <main id="main-content">
        <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-6 md:pt-24 md:pb-16">
          <div className="border-b pb-8" style={{ borderColor: "var(--line)" }}>
            <p
              className="text-[11px] uppercase tracking-[0.13em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              Paris 16e arrondissement
            </p>
            <h1
              className="font-serif italic"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.15 }}
            >
              Rénovation d&apos;appartement<br />dans le 16e arrondissement
            </h1>
            <p
              className="mt-5 text-sm leading-[1.9] max-w-xl"
              style={{ color: "var(--text-2)" }}
            >
              Rosae intervient dans le 16e arrondissement pour des rénovations exigeantes —
              Passy, Auteuil, Trocadéro, Victor Hugo. Des chantiers où la qualité
              d&apos;exécution ne souffre aucun compromis.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36">
          <div className="grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {POINTS.map(({ titre, corps }) => (
              <div key={titre} className="border-t pt-6" style={{ borderColor: "var(--line)" }}>
                <h2
                  className="text-[11px] uppercase tracking-[0.14em] mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  {titre}
                </h2>
                <p className="text-sm leading-[1.9]" style={{ color: "var(--text-2)" }}>
                  {corps}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36">
          <div
            className="border-t pt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            style={{ borderColor: "var(--line)" }}
          >
            <div>
              <p className="font-serif italic text-[17px] sm:text-[19px]">
                Un projet dans le 16e ?
              </p>
              <p className="mt-2 text-sm" style={{ color: "var(--text-2)" }}>
                Devis détaillé remis sous 5 jours après visite.
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
