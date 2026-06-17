import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Metadata } from "next";
import type { Article, Media } from "@/payload-types";
import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal — Rosae Rénovation",
  description:
    "Actualités, conseils techniques et vies de chantier : le journal de Rosae Rénovation.",
};

const CATEGORIES: Record<string, string> = {
  actualites: "Actualités",
  conseil: "Conseil technique",
  chantier: "Vie de chantier",
  materiaux: "Matériaux & finitions",
};

async function getArticles(): Promise<Article[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "articles",
      where: { published: { equals: true } },
      sort: "-date_publication",
      limit: 50,
    });
    return result.docs as Article[];
  } catch {
    return [];
  }
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function JournalPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}>
      <SiteNav activePath="/journal" />

      <main id="main-content">
        {/* ── Header ──────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-6 md:pt-24 md:pb-16">
          <div className="border-b pb-8" style={{ borderColor: "var(--line)" }}>
            <p
              className="text-[11px] uppercase tracking-[0.13em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              Journal
            </p>
            <h1
              className="font-serif italic"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.15 }}
            >
              Notes & réflexions
            </h1>
            <p
              className="mt-5 text-sm leading-[1.9] max-w-xl"
              style={{ color: "var(--text-2)" }}
            >
              Actualités du chantier, conseils techniques et regard sur les
              matériaux — des articles écrits par l'équipe Rosae.
            </p>
          </div>
        </section>

        {/* ── Articles ────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36">
          {articles.length === 0 ? (
            <p className="text-sm py-16 text-center" style={{ color: "var(--text-2)" }}>
              Aucun article publié pour le moment. Revenez bientôt.
            </p>
          ) : (
            <div className="grid gap-px" style={{ borderColor: "var(--line)" }}>
              {articles.map((article, i) => {
                const coverUrl =
                  typeof article.cover_image === "object" && article.cover_image
                    ? (article.cover_image as Media).url
                    : null;

                return (
                  <article
                    key={article.id}
                    className="group border-b"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <a
                      href={`/journal/${article.slug}`}
                      className="grid gap-6 py-8 transition-opacity duration-300 hover:opacity-80 md:grid-cols-[1fr_320px]"
                    >
                      <div className="flex flex-col justify-center gap-3">
                        <div className="flex items-center gap-3">
                          {article.categorie && (
                            <span
                              className="text-[10px] uppercase tracking-[0.15em]"
                              style={{ color: "var(--accent)" }}
                            >
                              {CATEGORIES[article.categorie] ?? article.categorie}
                            </span>
                          )}
                          {article.date_publication && (
                            <>
                              <span style={{ color: "var(--line)" }}>—</span>
                              <span
                                className="text-[11px]"
                                style={{ color: "var(--text-2)" }}
                              >
                                {formatDate(article.date_publication)}
                              </span>
                            </>
                          )}
                        </div>
                        <h2
                          className="font-serif italic leading-snug"
                          style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                        >
                          {article.title}
                        </h2>
                        {article.excerpt && (
                          <p
                            className="text-sm leading-[1.8] line-clamp-2 max-w-prose"
                            style={{ color: "var(--text-2)" }}
                          >
                            {article.excerpt}
                          </p>
                        )}
                        <span
                          className="mt-1 text-[11px] uppercase tracking-[0.13em]"
                          style={{ color: "var(--accent)" }}
                        >
                          Lire l&apos;article →
                        </span>
                      </div>

                      {coverUrl && (
                        <div className="relative hidden md:block" style={{ height: "200px" }}>
                          <Image
                            src={coverUrl}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="320px"
                            priority={i === 0}
                          />
                        </div>
                      )}
                    </a>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
