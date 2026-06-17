import { getPayload } from "payload";
import configPromise from "@payload-config";
import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Media, Realisation } from "@/payload-types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Réalisations — Rosae Rénovation",
  description:
    "Appartements, maisons, bureaux : découvrez les réalisations de Rosae, entreprise générale de rénovation d'intérieurs à Paris.",
};

const FALLBACK_PROJECTS = [
  {
    slug: "appartement-paris-7",
    title: "Appartement — Paris 7e",
    subtitle: "Rénovation complète",
    size: "120 m²",
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    featured: true,
  },
  {
    slug: "maison-neuilly",
    title: "Maison — Neuilly-sur-Seine",
    subtitle: "Rénovation intérieure",
    size: "180 m²",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    featured: true,
  },
  {
    slug: "bureaux-paris-8",
    title: "Bureaux — Paris 8e",
    subtitle: "Aménagement & rénovation",
    size: "",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },
  {
    slug: "appartement-neuilly",
    title: "Appartement — Neuilly",
    subtitle: "Rénovation complète",
    size: "95 m²",
    imageUrl:
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },
  {
    slug: "villa-saint-cloud",
    title: "Villa — Saint-Cloud",
    subtitle: "Extension & rénovation",
    size: "240 m²",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },
  {
    slug: "appartement-paris-16",
    title: "Appartement — Paris 16e",
    subtitle: "Rénovation partielle",
    size: "75 m²",
    imageUrl:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=85",
    featured: false,
  },
];

function mediaUrl(m: number | Media | null | undefined): string {
  if (!m || typeof m === "number") return "";
  return m.sizes?.card?.url ?? m.url ?? "";
}

async function getProjects() {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: "realisations",
      where: { published: { equals: true } },
      sort: "order",
      limit: 50,
      depth: 1,
    });
    return (docs as unknown as Realisation[]).map((r) => {
      const parts = (r.subtitle ?? "").split("·").map((s) => s.trim());
      return {
        slug: r.slug ?? "",
        title: r.title,
        subtitle: parts[0] ?? "",
        size: parts[1] ?? "",
        imageUrl: mediaUrl(r.cover_image as Media | number),
        featured: r.featured ?? false,
      };
    });
  } catch {
    return [];
  }
}

export default async function RealisationsPage() {
  const projects = await getProjects();
  const list = projects.length > 0 ? projects : FALLBACK_PROJECTS;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}>
      <SiteNav activePath="/realisations" />

      <main>
        {/* ── Header ──────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-6 md:pt-24 md:pb-16">
          <div className="border-b pb-8" style={{ borderColor: "var(--line)" }}>
            <p
              className="text-[11px] uppercase tracking-[0.13em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              Réalisations
            </p>
            <h1
              className="font-serif italic"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.15 }}
            >
              Nos projets
            </h1>
          </div>
        </section>

        {/* ── Grid ────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36">
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
            {list.map((p, i) => (
              <a
                key={p.slug || p.title}
                href={`/realisations/${p.slug}`}
                className="group block"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  gridColumn: p.featured ? "1 / -1" : undefined,
                }}
              >
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      p.imageUrl ||
                      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
                    }
                    alt={p.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : undefined}
                    className={`img-scale w-full object-cover ${
                      p.featured
                        ? "h-[300px] sm:h-[420px] md:h-[520px]"
                        : "h-[240px] sm:h-[260px] md:h-[280px]"
                    }`}
                    style={{ objectPosition: "center 35%" }}
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <h2
                    className={`font-serif italic ${
                      p.featured ? "text-[16px] sm:text-[18px]" : "text-[14px] sm:text-[15px]"
                    }`}
                  >
                    {p.title}
                  </h2>
                  {p.size && (
                    <span className="text-[11px] ml-2 shrink-0" style={{ color: "var(--accent)" }}>
                      {p.size}
                    </span>
                  )}
                </div>
                {p.subtitle && (
                  <p
                    className="mt-1 text-[11px] uppercase tracking-[0.08em]"
                    style={{ color: "var(--text-2)" }}
                  >
                    {p.subtitle}
                  </p>
                )}
              </a>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
