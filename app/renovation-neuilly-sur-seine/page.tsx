import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rénovation maison et appartement Neuilly-sur-Seine — Rosae Rénovation",
  description:
    "Entreprise générale de rénovation à Neuilly-sur-Seine. Maisons individuelles, appartements, rénovation complète ou partielle. Rosae intervient en première couronne — devis sous 5 jours.",
  openGraph: {
    title: "Rénovation Neuilly-sur-Seine — Rosae",
    description:
      "Rénovation complète et partielle à Neuilly-sur-Seine. Rosae — entreprise générale du bâtiment.",
  },
};

const POINTS = [
  {
    titre: "Maisons individuelles",
    corps:
      "Neuilly concentre de belles maisons de ville et pavillons qui demandent une rénovation soignée. Nous intervenons aussi bien sur les espaces de vie que sur les structures et les lots techniques.",
  },
  {
    titre: "Grands appartements",
    corps:
      "Les immeubles neuillards comptent des appartements de standing, souvent avec terrasses et parkings. Nos chantiers dans cette commune ont l'habitude des contraintes de copropriété.",
  },
  {
    titre: "Première couronne, tarifs Paris",
    corps:
      "Neuilly fait partie de notre zone d'intervention principale, au même titre que Paris intramuros. Pas de majoration kilométrique, pas de délai supplémentaire.",
  },
  {
    titre: "Réactivité et disponibilité",
    corps:
      "Stéphane est joignable en direct pendant les phases actives. Si un problème émerge sur chantier, vous en êtes informé avant la fin de la journée.",
  },
];

export default function RenovationNeuillyPage() {
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
              Neuilly-sur-Seine
            </p>
            <h1
              className="font-serif italic"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.15 }}
            >
              Rénovation à<br />Neuilly-sur-Seine
            </h1>
            <p
              className="mt-5 text-sm leading-[1.9] max-w-xl"
              style={{ color: "var(--text-2)" }}
            >
              Rosae intervient à Neuilly-sur-Seine pour des rénovations complètes et partielles —
              maisons individuelles, appartements, espaces mixtes. Première couronne de Paris,
              dans notre périmètre d&apos;intervention habituel.
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
                Un projet à Neuilly ?
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
