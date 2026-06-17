import { getPayload } from "payload";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Media, Realisation } from "@/payload-types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

/* ─── Fallback gallery data for demo ────────────────────── */
const DEMO_PROJECTS: Record<string, {
  title: string;
  subtitle: string;
  size: string;
  description: string;
  images: string[];
}> = {
  "appartement-paris-7": {
    title: "Appartement — Paris 7e",
    subtitle: "Rénovation complète",
    size: "120 m²",
    description:
      "Rénovation intégrale d'un appartement haussmannien — démolition des cloisons, reprise des réseaux, menuiseries sur mesure et finitions soignées. Livré en 14 semaines.",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1400&q=90",
    ],
  },
  "maison-neuilly": {
    title: "Maison — Neuilly-sur-Seine",
    subtitle: "Rénovation intérieure",
    size: "180 m²",
    description:
      "Rénovation intérieure complète d'une maison de ville — cuisine ouverte, salle de bains en marbre, parquets massifs et peintures artisanales.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1400&q=90",
    ],
  },
};

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=90",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1400&q=90",
  "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1400&q=90",
];

function mediaUrl(m: number | Media | null | undefined): string {
  if (!m || typeof m === "number") return "";
  return m.sizes?.hero?.url ?? m.url ?? "";
}

interface ProjectData {
  title: string;
  subtitle: string;
  size: string;
  description: string;
  images: string[];
}

async function getProject(slug: string): Promise<ProjectData | null> {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: "realisations",
      where: { slug: { equals: slug }, published: { equals: true } },
      limit: 1,
      depth: 2,
    });
    if (!docs.length) return null;
    const r = docs[0] as unknown as Realisation;
    const parts = (r.subtitle ?? "").split("·").map((s) => s.trim());
    const galleryImages = (r.gallery ?? []).map((g) =>
      mediaUrl(g.image as Media | number)
    ).filter(Boolean);
    const coverImg = mediaUrl(r.cover_image as Media | number);
    const images = [
      ...(coverImg ? [coverImg] : []),
      ...galleryImages,
    ];
    return {
      title: r.title,
      subtitle: parts[0] ?? "",
      size: parts[1] ?? "",
      description: "",
      images: images.length > 0 ? images : DEFAULT_IMAGES,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const demo = DEMO_PROJECTS[slug];
  const title = demo?.title ?? "Réalisation — Rosae Rénovation";
  return {
    title: `${title} — Rosae Rénovation`,
    description: demo?.description ?? "Découvrez cette réalisation Rosae.",
  };
}

export default async function RealisationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  const demo = DEMO_PROJECTS[slug];

  if (!project && !demo) {
    notFound();
  }

  const data: ProjectData = project ?? {
    title: demo!.title,
    subtitle: demo!.subtitle,
    size: demo!.size,
    description: demo!.description,
    images: demo!.images,
  };

  const [hero, ...rest] = data.images;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}>
      <SiteNav activePath="/realisations" />

      <main>
        {/* ── Hero image ──────────────────────────── */}
        <div className="relative overflow-hidden" style={{ height: "clamp(300px, 55vh, 600px)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero || DEFAULT_IMAGES[0]}
            alt={data.title}
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }}
          />
        </div>

        {/* ── Meta ────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pt-8 pb-12 sm:px-6 md:pt-12 md:pb-16">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h1 className="font-serif italic" style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}>
              {data.title}
            </h1>
            {data.size && (
              <span className="text-[12px]" style={{ color: "var(--accent)" }}>
                {data.size}
              </span>
            )}
          </div>
          {data.subtitle && (
            <p
              className="mt-2 text-[11px] uppercase tracking-[0.08em]"
              style={{ color: "var(--text-2)" }}
            >
              {data.subtitle}
            </p>
          )}
          {data.description && (
            <p
              className="mt-6 text-sm leading-[1.9] max-w-lg"
              style={{ color: "var(--text-2)" }}
            >
              {data.description}
            </p>
          )}
        </section>

        {/* ── Gallery ─────────────────────────────── */}
        {rest.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 md:pb-24">
            <div
              className="border-t pt-8 mb-8"
              style={{ borderColor: "var(--line)" }}
            >
              <span
                className="text-[11px] uppercase tracking-[0.13em]"
                style={{ color: "var(--accent)" }}
              >
                Galerie
              </span>
            </div>

            {/* Masonry-ish grid */}
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {rest.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src + i}
                  src={src}
                  alt={`${data.title} — vue ${i + 2}`}
                  loading="lazy"
                  className="w-full object-cover"
                  style={{
                    height: i % 3 === 1 ? "clamp(200px, 32vh, 380px)" : "clamp(180px, 26vh, 320px)",
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Contact CTA ─────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36">
          <div
            className="border-t pt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            style={{ borderColor: "var(--line)" }}
          >
            <div>
              <p className="font-serif italic text-[17px] sm:text-[19px]">
                Un projet similaire ?
              </p>
              <p className="mt-2 text-sm" style={{ color: "var(--text-2)" }}>
                Prenez contact pour en discuter.
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

        {/* ── Back nav ────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-5 pb-12 sm:px-6">
          <a
            href="/realisations"
            className="back-link text-[11px] uppercase tracking-[0.13em] transition-colors duration-300"
            style={{ color: "var(--text-2)" }}
          >
            ← Toutes les réalisations
          </a>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
