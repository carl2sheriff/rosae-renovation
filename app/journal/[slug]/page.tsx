import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Metadata } from "next";
import type { Article, Media } from "@/payload-types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";

export const dynamic = "force-dynamic";

const CATEGORIES: Record<string, string> = {
  actualites: "Actualités",
  conseil: "Conseil technique",
  chantier: "Vie de chantier",
  materiaux: "Matériaux & finitions",
};

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "articles",
      where: { slug: { equals: slug }, published: { equals: true } },
      limit: 1,
    });
    return (result.docs[0] as Article) ?? null;
  } catch {
    return null;
  }
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: `${article.title} — Journal Rosae`,
    description: article.excerpt ?? undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const coverUrl =
    typeof article.cover_image === "object" && article.cover_image
      ? (article.cover_image as Media).url
      : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}>
      <SiteNav />

      <main id="main-content">
        {/* ── Hero ────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-6 md:pt-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <a
                href="/journal"
                className="text-[11px] uppercase tracking-[0.13em] transition-opacity duration-300 hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                ← Journal
              </a>
              {article.categorie && (
                <>
                  <span style={{ color: "var(--line)" }}>·</span>
                  <span
                    className="text-[10px] uppercase tracking-[0.15em]"
                    style={{ color: "var(--text-2)" }}
                  >
                    {CATEGORIES[article.categorie] ?? article.categorie}
                  </span>
                </>
              )}
            </div>

            <h1
              className="font-serif italic leading-[1.15]"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              {article.title}
            </h1>

            {article.date_publication && (
              <p className="mt-4 text-sm" style={{ color: "var(--text-2)" }}>
                {formatDate(article.date_publication)}
              </p>
            )}

            {article.excerpt && (
              <p
                className="mt-5 text-base leading-[1.9] max-w-2xl"
                style={{ color: "var(--text-2)" }}
              >
                {article.excerpt}
              </p>
            )}
          </div>
        </section>

        {/* ── Cover image ─────────────────────────── */}
        {coverUrl && (
          <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-6">
            <div className="relative w-full" style={{ height: "clamp(280px, 45vw, 560px)" }}>
              <Image
                src={coverUrl}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1152px"
                priority
              />
            </div>
          </section>
        )}

        {/* ── Body ────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36">
          <div
            className="max-w-2xl prose-article"
            style={{
              fontSize: "15px",
              lineHeight: "1.9",
              color: "var(--text-1)",
            }}
          >
            {article.contenu ? (
              <RichText data={article.contenu} />
            ) : (
              <p style={{ color: "var(--text-2)" }}>Contenu à venir.</p>
            )}
          </div>

          {/* ── Back link ───────────────────────────── */}
          <div className="mt-16 border-t pt-10" style={{ borderColor: "var(--line)" }}>
            <a
              href="/journal"
              className="text-[11px] uppercase tracking-[0.13em] transition-opacity duration-300 hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              ← Retour au journal
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
