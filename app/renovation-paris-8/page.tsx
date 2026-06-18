import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rénovation appartement Paris 8e — Rosae Rénovation",
  description:
    "Rénovation d'appartements et de bureaux dans le 8e arrondissement de Paris. Haussmannien, Triangle d'Or, Champs-Élysées. Entreprise générale Rosae — devis sous 5 jours.",
  openGraph: {
    title: "Rénovation appartement Paris 8e — Rosae",
    description:
      "Rénovation complète et partielle dans le 8e arrondissement. Rosae — entreprise générale du bâtiment.",
  },
};

const POINTS = [
  {
    titre: "Triangle d'Or et secteur Monceau",
    corps:
      "Des appartements souvent très grands, avec des niveaux de finition attendus parmi les plus élevés de la capitale. Nos équipes ont l'habitude de travailler sur ces adresses.",
  },
  {
    titre: "Bureaux et espaces mixtes",
    corps:
      "Le 8e est aussi un arrondissement de bureaux et de résidences secondaires. Nous traitons aussi bien les rénovations résidentielles que les aménagements de bureaux et d'espaces professionnels.",
  },
  {
    titre: "Interlocuteur unique",
    corps:
      "Tous les corps de métier coordonnés par Rosae. Un seul point de contact pour l'ensemble du chantier, du devis à la livraison.",
  },
  {
    titre: "Confidentialité",
    corps:
      "Nous intervenons avec discrétion dans des adresses où la confidentialité est souvent une priorité. Nos équipes sont formées à ces exigences.",
  },
];

export default function RenovationParis8Page() {
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
              Paris 8e arrondissement
            </p>
            <h1
              className="font-serif italic"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.15 }}
            >
              Rénovation d&apos;appartement<br />dans le 8e arrondissement
            </h1>
            <p
              className="mt-5 text-sm leading-[1.9] max-w-xl"
              style={{ color: "var(--text-2)" }}
            >
              Rosae réalise des rénovations dans le 8e arrondissement — du Triangle d&apos;Or
              au quartier Monceau. Appartements haussmanniens, résidences de prestige,
              espaces professionnels.
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
                Un projet dans le 8e ?
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
