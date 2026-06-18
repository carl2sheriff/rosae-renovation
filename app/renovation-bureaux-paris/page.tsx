import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rénovation et aménagement bureaux Paris — Rosae Rénovation",
  description:
    "Rénovation et aménagement de bureaux à Paris. Open space, bureaux privés, espaces de réception. Entreprise générale Rosae — intervention hors des heures de bureau possible.",
  openGraph: {
    title: "Rénovation bureaux Paris — Rosae",
    description:
      "Rénovation et aménagement d'espaces de bureaux à Paris. Rosae — entreprise générale du bâtiment.",
  },
};

const POINTS = [
  {
    titre: "Open space et bureaux cloisonnés",
    corps:
      "Reconfiguration des espaces, création de cloisons sèches, cabines acoustiques, salles de réunion — nous adaptons les volumes à l'organisation et à la culture de votre entreprise.",
  },
  {
    titre: "Travaux hors heures de bureau",
    corps:
      "Pour minimiser l'impact sur votre activité, nous pouvons intervenir en soirée ou le week-end. Planning adapté à votre contrainte opérationnelle.",
  },
  {
    titre: "Tous les lots techniques",
    corps:
      "Électricité courants forts et faibles, réseau informatique, plomberie, CVC, incendie — nous coordonnons les prestataires techniques en un seul chantier.",
  },
  {
    titre: "Espaces de réception et showrooms",
    corps:
      "Hall d'entrée, salle de réunion de direction, espaces clients — des zones qui demandent un niveau de finition comparable au résidentiel haut de gamme. C'est notre cœur de métier.",
  },
];

export default function RenovationBureauxPage() {
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
              Bureaux — Paris
            </p>
            <h1
              className="font-serif italic"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.15 }}
            >
              Rénovation et aménagement<br />de bureaux à Paris
            </h1>
            <p
              className="mt-5 text-sm leading-[1.9] max-w-xl"
              style={{ color: "var(--text-2)" }}
            >
              Rosae rénove et aménage des espaces de travail à Paris et en Île-de-France.
              Open space, bureaux privés, salles de réunion, espaces de réception —
              des projets menés avec la même rigueur que nos chantiers résidentiels.
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
                Un projet bureaux à Paris ?
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
