import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import { NewsletterForm } from "@/app/_components/NewsletterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Carnet — Rosae Rénovation",
  description:
    "Réflexions sur la rénovation, les matériaux, les chantiers et les savoir-faire. Le journal de Rosae.",
};

export default function JournalPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}
    >
      <SiteNav activePath="/journal" />

      <main id="main-content">
        {/* ── Header ──────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-6 md:pt-24 md:pb-16">
          <div className="border-b pb-8" style={{ borderColor: "var(--line)" }}>
            <p
              className="text-[11px] uppercase tracking-[0.13em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              Le Carnet
            </p>
            <h1
              className="font-serif italic"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.15 }}
            >
              Notes de chantier
            </h1>
            <p
              className="mt-5 text-sm leading-[1.9] max-w-xl"
              style={{ color: "var(--text-2)" }}
            >
              Réflexions sur la rénovation, les matériaux, les savoir-faire et
              les projets en cours. Un regard intérieur sur notre pratique.
            </p>
          </div>
        </section>

        {/* ── Articles à venir ─────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36">
          <div className="grid gap-px" style={{ background: "var(--line)" }}>
            {[
              {
                date: "Prochainement",
                titre: "Ce que révèle un plancher — sur la lecture d'un appartement haussmannien",
                extrait:
                  "Avant le premier coup de marteau, il y a toujours un moment d'écoute. Le plancher craque. Les murs répondent. Un appartement ancien parle à qui sait l'entendre.",
              },
              {
                date: "Prochainement",
                titre: "La chaux, les enduits, et l'art de ne pas trop bien faire",
                extrait:
                  "Il existe des finitions qui gagnent à ne pas être parfaites. L'enduit à la chaux est l'une d'elles. Comprendre pourquoi, c'est comprendre quelque chose d'essentiel sur la rénovation.",
              },
              {
                date: "Prochainement",
                titre: "Coordination de chantier : pourquoi le planning commence avant le premier artisan",
                extrait:
                  "Le vrai travail de coordination ne commence pas le premier jour de chantier. Il commence trois semaines avant, quand personne ne regarde encore.",
              },
            ].map(({ date, titre, extrait }) => (
              <article
                key={titre}
                className="px-0 py-8 md:py-10"
                style={{ background: "var(--bg)" }}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.13em] mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  {date}
                </p>
                <h2
                  className="font-serif italic mb-3"
                  style={{ fontSize: "clamp(16px, 1.8vw, 21px)", lineHeight: 1.35 }}
                >
                  {titre}
                </h2>
                <p
                  className="text-sm leading-[1.9] max-w-2xl"
                  style={{ color: "var(--text-2)" }}
                >
                  {extrait}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Newsletter ───────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36">
          <div
            className="border-t pt-14"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
              <div>
                <p
                  className="text-[11px] uppercase tracking-[0.13em] mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  Carnet Rosae
                </p>
                <h2
                  className="font-serif italic mb-4"
                  style={{ fontSize: "clamp(20px, 2.5vw, 30px)", lineHeight: 1.25 }}
                >
                  Recevoir le carnet.
                </h2>
                <p
                  className="text-sm leading-[1.9]"
                  style={{ color: "var(--text-2)" }}
                >
                  Un article par mois. Sans publicité, sans bruit.
                  Des notes sur les chantiers, les matières, les savoir-faire.
                </p>
              </div>
              <div className="flex items-end">
                <NewsletterForm source="journal" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
