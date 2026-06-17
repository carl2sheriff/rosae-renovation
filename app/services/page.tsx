import { getPayload } from "payload";
import configPromise from "@payload-config";
import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services — Rosae Rénovation",
  description:
    "Rénovation complète, coordination des corps de métier et qualité des finitions. Découvrez les services Rosae.",
};

const FALLBACK_SERVICES = [
  {
    num: "01",
    title: "Rénovation complète",
    desc: "Prise en charge globale des travaux, avec une organisation structurée et une exécution maîtrisée à chaque phase du chantier.",
  },
  {
    num: "02",
    title: "Coordination des corps de métier",
    desc: "Pilotage des différents intervenants, planification précise et suivi constant de l'avancement du chantier.",
  },
  {
    num: "03",
    title: "Qualité des finitions",
    desc: "Attention portée aux détails et aux ouvrages, avec un contrôle rigoureux jusqu'à la livraison.",
  },
];

async function getServices() {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: "services",
      sort: "order",
      limit: 20,
    });
    return docs.map((s) => ({
      num: s.num ?? "",
      title: s.title,
      desc: s.description,
    }));
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();
  const list = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}>
      <SiteNav activePath="/services" />

      <main>
        {/* ── Header ──────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-6 md:pt-24 md:pb-16">
          <div
            className="border-b pb-8"
            style={{ borderColor: "var(--line)" }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.13em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              Services
            </p>
            <h1
              className="font-serif italic"
              style={{
                fontSize: "clamp(28px, 4vw, 52px)",
                lineHeight: 1.15,
              }}
            >
              Une exécution précise,<br className="hidden sm:block" /> de A à Z.
            </h1>
          </div>
        </section>

        {/* ── Services list ────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 md:pb-24">
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {list.map((s) => (
              <div
                key={s.num + s.title}
                className="grid py-8 gap-4 md:grid-cols-[72px_1fr_2fr] md:gap-8"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <span className="text-[11px]" style={{ color: "var(--accent)" }}>
                  {s.num}
                </span>
                <h2 className="font-serif italic text-[17px] sm:text-[19px]">{s.title}</h2>
                <p className="text-sm leading-[1.9]" style={{ color: "var(--text-2)" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Intro paragraph ────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 md:pb-24">
          <div
            className="border-l pl-6 max-w-[600px]"
            style={{ borderColor: "var(--accent)" }}
          >
            <p className="font-serif italic text-[17px] sm:text-[19px] leading-relaxed" style={{ color: "var(--text-1)" }}>
              Chaque chantier est unique. Nous adaptons notre organisation à la
              complexité du projet, aux contraintes du site et aux attentes du
              maître d&apos;ouvrage.
            </p>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <section
          className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36"
        >
          <div
            className="border-t pt-12"
            style={{ borderColor: "var(--line)" }}
          >
            <p className="text-sm mb-6" style={{ color: "var(--text-2)" }}>
              Vous avez un projet en tête ?
            </p>
            <a
              href="/contact"
              className="inline-block text-[11px] uppercase tracking-[0.18em] border px-6 py-3 transition-all duration-300 hover:bg-[var(--text-1)] hover:text-[var(--bg)]"
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
