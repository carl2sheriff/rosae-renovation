import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rénovation appartement Paris 7e — Rosae Rénovation",
  description:
    "Entreprise générale de rénovation dans le 7e arrondissement de Paris. Appartements haussmanniens, immeubles de standing, rénovation complète ou partielle. Devis sous 5 jours.",
  openGraph: {
    title: "Rénovation appartement Paris 7e — Rosae",
    description:
      "Rénovation complète et partielle d'appartements dans le 7e arrondissement. Rosae — entreprise générale du bâtiment.",
  },
};

const POINTS = [
  {
    titre: "Appartements haussmanniens",
    corps:
      "Le 7e compte parmi les arrondissements les plus exigeants de Paris. Les appartements y sont souvent grands, ornementés, avec des contraintes de copropriété strictes. Nous en connaissons les logiques et les interlocuteurs.",
  },
  {
    titre: "Coordination intégrale",
    corps:
      "Plomberie, électricité, menuiserie, parquets, peinture — un seul interlocuteur coordonne l'ensemble du chantier de A à Z. Vous n'avez pas à gérer les corps de métier.",
  },
  {
    titre: "Délais maîtrisés",
    corps:
      "Chaque chantier dans le 7e démarre avec un rétroplanning précis. Nous planifions les livraisons, les accès immeuble et les passages techniques avant le premier jour.",
  },
  {
    titre: "Respect des voisins et de l'immeuble",
    corps:
      "Protection des parties communes, horaires de travaux respectés, évacuation rigoureuse des gravats. Nos équipes travaillent dans des immeubles de standing — elles en ont la culture.",
  },
];

export default function RenovationParis7Page() {
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
              Paris 7e arrondissement
            </p>
            <h1
              className="font-serif italic"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.15 }}
            >
              Rénovation d&apos;appartement<br />dans le 7e arrondissement
            </h1>
            <p
              className="mt-5 text-sm leading-[1.9] max-w-xl"
              style={{ color: "var(--text-2)" }}
            >
              Rosae intervient dans le 7e arrondissement pour des rénovations complètes
              et partielles. Appartements haussmanniens, immeubles classés, espaces de standing —
              nous adaptons notre approche aux contraintes et à l&apos;exigence du quartier.
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
                Un projet dans le 7e ?
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
