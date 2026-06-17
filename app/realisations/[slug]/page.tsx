import { getPayload } from "payload";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import { Gallery } from "@/app/_components/Gallery";
import type { Media, Realisation } from "@/payload-types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

/* ─── Type helpers ─────────────────────────────────────── */
const TYPE_LABELS: Record<string, string> = {
  renovation_complete: "Rénovation complète",
  renovation_partielle: "Rénovation partielle",
  amenagement: "Aménagement",
  restauration: "Restauration",
};

/* ─── Demo fallback ─────────────────────────────────────── */
const DEMO_PROJECTS: Record<string, {
  title: string;
  subtitle: string;
  size: string;
  lieu: string;
  description: string;
  images: string[];
}> = {
  "appartement-paris-7": {
    title: "Appartement — Paris 7e",
    subtitle: "Rénovation complète",
    size: "120 m²",
    lieu: "Paris 7e",
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
    lieu: "Neuilly-sur-Seine",
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
  lieu: string;
  description: string;
  narrationParagraphs: string[];
  pointsCles: string[];
  annee?: number;
  duree?: string;
  typeIntervention?: string;
  architecte?: string;
  photographe?: string;
  images: string[];
}

function extractTextFromLexical(doc: Record<string, unknown> | null | undefined): string[] {
  if (!doc) return [];
  const root = doc.root as { children?: Array<{ children?: Array<{ text?: string }>; text?: string }> } | undefined;
  if (!root?.children) return [];

  return root.children
    .map((node) => {
      if (node.children) {
        return node.children.map((leaf) => leaf.text ?? "").join("");
      }
      return (node as { text?: string }).text ?? "";
    })
    .filter(Boolean);
}

interface Neighbor {
  slug: string;
  title: string;
}

async function fetchNeighbors(
  slug: string
): Promise<{ prev: Neighbor | null; next: Neighbor | null }> {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: "realisations",
      where: { published: { equals: true } },
      sort: "order",
      limit: 100,
      depth: 0,
    });
    const index = docs.findIndex((r) => r.slug === slug);
    if (index === -1) return { prev: null, next: null };
    const prev =
      index > 0
        ? { slug: docs[index - 1].slug ?? "", title: docs[index - 1].title }
        : null;
    const next =
      index < docs.length - 1
        ? { slug: docs[index + 1].slug ?? "", title: docs[index + 1].title }
        : null;
    return { prev, next };
  } catch {
    return { prev: null, next: null };
  }
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
    const galleryImages = (r.gallery ?? [])
      .map((g) => mediaUrl(g.image as Media | number))
      .filter(Boolean);
    const coverImg = mediaUrl(r.cover_image as Media | number);
    const images = [
      ...(coverImg ? [coverImg] : []),
      ...galleryImages,
    ];

    const narrationParagraphs = extractTextFromLexical(
      r.narration as Record<string, unknown> | null
    );
    const pointsCles = (r.points_cles ?? [])
      .map((p) => p.texte)
      .filter(Boolean);

    return {
      title: r.title,
      subtitle: parts[0] ?? "",
      size: r.surface ? `${r.surface} m²` : (parts[1] ?? ""),
      lieu: r.lieu ?? "",
      description: "",
      narrationParagraphs,
      pointsCles,
      annee: r.annee ?? undefined,
      duree: r.duree ?? undefined,
      typeIntervention: r.type_intervention
        ? (TYPE_LABELS[r.type_intervention] ?? r.type_intervention)
        : undefined,
      architecte: r.architecte_associe ?? undefined,
      photographe: r.photographe ?? undefined,
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
  const project = await getProject(slug);
  const demo = DEMO_PROJECTS[slug];
  const title = project?.title ?? demo?.title ?? "Réalisation — Rosae Rénovation";
  const desc =
    project?.narrationParagraphs[0] ??
    demo?.description ??
    "Découvrez cette réalisation Rosae.";
  return {
    title: `${title} — Rosae Rénovation`,
    description: desc,
    openGraph: {
      title: `${title} — Rosae Rénovation`,
      description: desc,
      images: project?.images[0]
        ? [{ url: project.images[0] }]
        : demo?.images[0]
        ? [{ url: demo.images[0] }]
        : [],
    },
  };
}

export default async function RealisationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, { prev, next }] = await Promise.all([
    getProject(slug),
    fetchNeighbors(slug),
  ]);
  const demo = DEMO_PROJECTS[slug];

  if (!project && !demo) {
    notFound();
  }

  const data: ProjectData = project ?? {
    title: demo!.title,
    subtitle: demo!.subtitle,
    size: demo!.size,
    lieu: demo!.lieu,
    description: demo!.description,
    narrationParagraphs: demo!.description ? [demo!.description] : [],
    pointsCles: [],
    images: demo!.images,
  };

  const [hero, ...rest] = data.images;

  const infoItems = [
    data.lieu && { label: "Lieu", value: data.lieu },
    data.size && { label: "Surface", value: data.size },
    data.duree && { label: "Durée", value: data.duree },
    data.annee && { label: "Année", value: String(data.annee) },
    data.typeIntervention && { label: "Intervention", value: data.typeIntervention },
    data.architecte && { label: "Architecte", value: data.architecte },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}>
      <SiteNav activePath="/realisations" />

      <main>
        {/* ── Hero image ──────────────────────────── */}
        <div className="relative overflow-hidden" style={{ height: "clamp(340px, 62vh, 720px)" }}>
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
            className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }}
          />
        </div>

        {/* ── Header + Infos ──────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pt-8 pb-10 sm:px-6 md:pt-14 md:pb-14">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
            {/* Title block */}
            <div>
              {data.subtitle && (
                <p
                  className="mb-3 text-[11px] uppercase tracking-[0.13em]"
                  style={{ color: "var(--accent)" }}
                >
                  {data.subtitle}
                </p>
              )}
              <h1 className="font-serif italic" style={{ fontSize: "clamp(22px, 3vw, 40px)", lineHeight: 1.2 }}>
                {data.title}
              </h1>
            </div>

            {/* Infos panel */}
            {infoItems.length > 0 && (
              <dl
                className="grid gap-y-4 gap-x-8 shrink-0"
                style={{ gridTemplateColumns: "auto 1fr", minWidth: "220px" }}
              >
                {infoItems.map(({ label, value }) => (
                  <div key={label} className="contents">
                    <dt
                      className="text-[10px] uppercase tracking-[0.12em] pt-px"
                      style={{ color: "var(--accent)" }}
                    >
                      {label}
                    </dt>
                    <dd className="text-[13px]" style={{ color: "var(--text-2)" }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        {/* ── Narration ───────────────────────────── */}
        {data.narrationParagraphs.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-6 md:pb-16">
            <div
              className="border-t pt-8 max-w-[640px]"
              style={{ borderColor: "var(--line)" }}
            >
              {data.narrationParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-sm leading-[1.95] mb-5"
                  style={{ color: "var(--text-2)" }}
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* ── Points clés ─────────────────────────── */}
        {data.pointsCles.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-6 md:pb-16">
            <ul className="flex flex-col gap-2 max-w-lg">
              {data.pointsCles.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-2)" }}>
                  <span
                    className="mt-[6px] h-[1px] w-4 shrink-0 inline-block"
                    style={{ backgroundColor: "var(--accent)" }}
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </section>
        )}

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

            <Gallery images={rest} altBase={data.title} />

            {data.photographe && (
              <p
                className="mt-4 text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "var(--text-2)" }}
              >
                Photos : {data.photographe}
              </p>
            )}
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

        {/* ── Prev / Next navigation ──────────────── */}
        <div
          className="mx-auto max-w-6xl px-5 pb-16 sm:px-6"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <div className="flex items-center justify-between pt-8 gap-4">
            <div className="flex-1">
              {prev && (
                <a
                  href={`/realisations/${prev.slug}`}
                  className="group flex flex-col gap-1"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.12em] transition-colors duration-300"
                    style={{ color: "var(--accent)" }}
                  >
                    ← Précédent
                  </span>
                  <span
                    className="font-serif italic text-[14px] sm:text-[15px] transition-colors duration-300"
                    style={{ color: "var(--text-2)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
                  >
                    {prev.title}
                  </span>
                </a>
              )}
            </div>

            <a
              href="/realisations"
              className="shrink-0 text-[10px] uppercase tracking-[0.12em] transition-colors duration-300"
              style={{ color: "var(--text-2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
            >
              Toutes
            </a>

            <div className="flex-1 text-right">
              {next && (
                <a
                  href={`/realisations/${next.slug}`}
                  className="group inline-flex flex-col gap-1 items-end"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.12em] transition-colors duration-300"
                    style={{ color: "var(--accent)" }}
                  >
                    Suivant →
                  </span>
                  <span
                    className="font-serif italic text-[14px] sm:text-[15px] transition-colors duration-300"
                    style={{ color: "var(--text-2)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
                  >
                    {next.title}
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
