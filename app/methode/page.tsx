import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre méthode — Rosae Rénovation",
  description:
    "Comment Rosae conduit un chantier de rénovation : de la première visite jusqu'à la livraison. Une méthode rigoureuse, un interlocuteur unique.",
};

const ETAPES = [
  {
    num: "01",
    titre: "Premier échange",
    desc: "Un rendez-vous téléphonique ou sur site pour comprendre votre projet, vos attentes et le périmètre d'intervention envisagé. Gratuit et sans engagement.",
  },
  {
    num: "02",
    titre: "Visite et diagnostic",
    desc: "Visite du bien avec Stéphane Beilin pour évaluer l'état existant, identifier les contraintes techniques et clarifier les intentions avant le chiffrage.",
  },
  {
    num: "03",
    titre: "Devis détaillé",
    desc: "Un devis poste par poste, transparent sur les choix techniques et les matériaux. Aucun coût caché : tout est explicité avant validation.",
  },
  {
    num: "04",
    titre: "Planification du chantier",
    desc: "Établissement du planning avec dates de démarrage, jalons intermédiaires et date de livraison. Coordination de l'ensemble des corps de métier en amont.",
  },
  {
    num: "05",
    titre: "Exécution et suivi",
    desc: "Pilotage quotidien du chantier par notre équipe. Points d'avancement réguliers avec le client. Réactivité immédiate en cas d'imprévu.",
  },
  {
    num: "06",
    titre: "Livraison et réception",
    desc: "Visite de réception avec le client, levée des réserves le cas échéant. Remise des clés avec dossier de fin de chantier complet.",
  },
];

export default function MethodePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}>
      <SiteNav activePath="/methode" />

      <main>
        {/* ── Header ───────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-6 md:pt-24 md:pb-16">
          <div className="border-b pb-8" style={{ borderColor: "var(--line)" }}>
            <p
              className="text-[11px] uppercase tracking-[0.13em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              Méthode
            </p>
            <h1
              className="font-serif italic max-w-2xl"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.15 }}
            >
              Du premier échange à la remise des clés.
            </h1>
            <p
              className="mt-5 text-sm leading-[1.9] max-w-lg"
              style={{ color: "var(--text-2)" }}
            >
              Un processus structuré, pensé pour que chaque phase du projet
              avance avec clarté — sans zone d&apos;ombre ni mauvaise surprise.
            </p>
          </div>
        </section>

        {/* ── Étapes ───────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 md:pb-28">
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {ETAPES.map((e, i) => (
              <div
                key={e.num}
                className="grid gap-4 py-8 md:grid-cols-[64px_1fr_2fr] md:gap-10 md:py-10"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <span
                  className="text-[11px] pt-1"
                  style={{ color: "var(--accent)" }}
                >
                  {e.num}
                </span>
                <h2
                  className="font-serif italic"
                  style={{ fontSize: "clamp(15px, 1.5vw, 19px)", color: "var(--text-1)" }}
                >
                  {e.titre}
                </h2>
                <p
                  className="text-sm leading-[1.9]"
                  style={{ color: "var(--text-2)" }}
                >
                  {e.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Encart rassurant ─────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 md:pb-24">
          <div
            className="border-l-[1.5px] pl-6 max-w-xl"
            style={{ borderColor: "var(--accent)" }}
          >
            <p
              className="font-serif italic leading-[1.85]"
              style={{ fontSize: "clamp(14px, 1.3vw, 17px)", color: "var(--text-2)" }}
            >
              Nous n&apos;acceptons qu&apos;un nombre limité de chantiers en
              simultané. Cette contrainte volontaire est ce qui nous permet
              d&apos;être pleinement présents sur chaque projet.
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
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36">
          <div
            className="border-t pt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            style={{ borderColor: "var(--line)" }}
          >
            <div>
              <p className="font-serif italic text-[17px] sm:text-[19px]">
                Prêt à démarrer votre projet ?
              </p>
              <p className="mt-2 text-sm" style={{ color: "var(--text-2)" }}>
                Première visite de diagnostic sans engagement.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-block text-[11px] uppercase tracking-[0.18em] border px-6 py-3 transition-all duration-300 hover:bg-[var(--text-1)] hover:text-[var(--bg)] shrink-0"
              style={{ borderColor: "var(--text-1)", color: "var(--text-1)" }}
            >
              Prendre rendez-vous
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
