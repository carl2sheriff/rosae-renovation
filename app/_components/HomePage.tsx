"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

/* ─── Scroll fade-in ──────────────────────────────────────── */
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("is-visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.07, rootMargin: "0px 0px -28px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`fade-reveal ${className}`}>
      {children}
    </div>
  );
}

/* ─── Types ───────────────────────────────────────────────── */
export interface ProjectCard {
  slug: string;
  title: string;
  subtitle: string;
  size: string;
  imageUrl: string;
}

export interface ServiceCard {
  num: string;
  title: string;
  desc: string;
}

export interface EngagementCard {
  title: string;
  desc: string;
}

export interface ContactData {
  ctaTitle: string;
  ctaSubtitle: string;
  phone: string;
  email: string;
}

export interface HomePageProps {
  projects: ProjectCard[];
  services: ServiceCard[];
  engagements: EngagementCard[];
  contact: ContactData;
  heroImageUrl?: string;
  citation?: {
    texte: string;
    auteurNom: string;
    auteurTitre: string;
  };
}

/* ─── Page component ──────────────────────────────────────── */
export function HomePage({
  projects,
  services,
  engagements,
  contact,
  heroImageUrl,
  citation,
}: HomePageProps) {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}
    >
      <SiteNav activePath="/" />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ height: "clamp(320px, 88vh, 900px)" }}
        aria-label="Image de présentation"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            heroImageUrl ||
            "https://images.unsplash.com/photo-1644589104114-41ea93fc02e7?auto=format&fit=crop&w=1800&q=85"
          }
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--bg))",
          }}
        />
      </section>

      {/* ══════════════════════════════════════════
          MARQUEE BAND
      ══════════════════════════════════════════ */}
      <div
        className="overflow-hidden py-4 border-y"
        style={{ borderColor: "var(--line)" }}
        aria-hidden="true"
      >
        <div className="marquee-track">
          {[0, 1].map((n) => (
            <span
              key={n}
              className="pr-10 text-[11px] uppercase tracking-[0.18em] whitespace-nowrap"
              style={{ color: "var(--accent)" }}
            >
              Rosae &nbsp;·&nbsp; Rénovation d&apos;intérieurs &nbsp;·&nbsp;
              Paris &nbsp;·&nbsp; Île-de-France &nbsp;·&nbsp; Appartements
              &nbsp;·&nbsp; Maisons &nbsp;·&nbsp; Bureaux &nbsp;·&nbsp; Espaces
              hôteliers &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          INTRO
      ══════════════════════════════════════════ */}
      <section
        id="accueil"
        className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-28"
      >
        <FadeIn>
          <p
            className="font-serif max-w-[680px]"
            style={{
              fontSize: "clamp(17px, 1.8vw, 23px)",
              lineHeight: 1.85,
              color: "var(--text-1)",
            }}
          >
            Rosae est une entreprise générale du bâtiment spécialisée dans la
            rénovation d&apos;intérieurs. Nous intervenons aux côtés
            d&apos;architectes comme directement pour des clients privés —
            appartements, maisons, bureaux, espaces hôteliers. Chaque projet
            repose sur une exécution précise et une coordination rigoureuse des
            savoir-faire, du démarrage jusqu&apos;à la livraison.
          </p>
        </FadeIn>

        <FadeIn delay={160} className="mt-10 md:mt-14">
          <blockquote
            className="max-w-[560px] border-l-[1.5px] pl-6"
            style={{ borderColor: "var(--accent)" }}
          >
            <p
              className="font-serif italic leading-[1.85]"
              style={{ fontSize: "clamp(14px, 1.3vw, 17px)", color: "var(--text-2)" }}
            >
              {citation?.texte ||
                "Un projet réussi commence bien avant le premier coup de marteau. Nous prenons le temps d’écouter, de comprendre l’intention, d’éclaircir chaque choix avant qu’il ne devienne une décision. Cette rigueur en amont, c’est ce qui permet d’arriver à la livraison sans aucune surprise — pour le client comme pour ses architectes."}
            </p>
            <footer className="mt-5">
              <p
                className="text-[10px] uppercase tracking-[0.14em]"
                style={{ color: "var(--accent)" }}
              >
                — {citation?.auteurNom || "Stéphane Beilin"}
                {(citation?.auteurTitre || "Fondateur · Rosae") && (
                  <span style={{ color: "var(--text-2)" }}>
                    {" "}/ {citation?.auteurTitre || "Fondateur · Rosae"}
                  </span>
                )}
              </p>
            </footer>
          </blockquote>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════
          RÉALISATIONS
      ══════════════════════════════════════════ */}
      <section
        id="realisations"
        className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 md:pb-28"
      >
        <FadeIn>
          <div
            className="mb-8 flex items-baseline justify-between border-t pt-8"
            style={{ borderColor: "var(--line)" }}
          >
            <span
              className="text-[11px] uppercase tracking-[0.13em]"
              style={{ color: "var(--accent)" }}
            >
              Réalisations
            </span>
            <a
              href="/realisations"
              className="text-[11px] transition-colors duration-300"
              style={{ color: "var(--text-2)", letterSpacing: "0.05em" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-2)")
              }
            >
              Voir tout →
            </a>
          </div>
        </FadeIn>

        {projects.length > 0 && (
          <>
            {/* Mobile: single column */}
            <div className="flex flex-col gap-5 md:hidden">
              {projects.slice(0, 3).map((p, i) => (
                <FadeIn key={p.slug || p.title} delay={i * 80}>
                  <a
                    href={`/realisations/${p.slug}`}
                    className="group block"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <div className="overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="img-scale h-[240px] w-full object-cover"
                      />
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <h3 className="font-serif italic text-[14px]">
                        {p.title}
                      </h3>
                      {p.size && (
                        <span
                          className="text-[11px] ml-2 shrink-0"
                          style={{ color: "var(--accent)" }}
                        >
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
                </FadeIn>
              ))}
            </div>

            {/* Desktop: editorial grid */}
            <div className="hidden md:grid gap-3 md:grid-cols-[1.45fr_1fr]">
              {/* Featured */}
              <FadeIn delay={80}>
                <a
                  href={`/realisations/${projects[0].slug}`}
                  className="group block"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <div className="overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={projects[0].imageUrl}
                      alt={projects[0].title}
                      loading="lazy"
                      className="img-scale h-[58vh] w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <h3 className="font-serif italic text-[15px]">
                      {projects[0].title}
                    </h3>
                    {projects[0].size && (
                      <span
                        className="text-[11px]"
                        style={{ color: "var(--accent)" }}
                      >
                        {projects[0].size}
                      </span>
                    )}
                  </div>
                  {projects[0].subtitle && (
                    <p
                      className="mt-1 text-[11px] uppercase tracking-[0.08em]"
                      style={{ color: "var(--text-2)" }}
                    >
                      {projects[0].subtitle}
                    </p>
                  )}
                </a>
              </FadeIn>

              {/* Stacked right */}
              {projects.length > 1 && (
                <div className="flex flex-col gap-3">
                  {projects.slice(1, 3).map((p, i) => (
                    <FadeIn key={p.slug || p.title} delay={180 + i * 90}>
                      <a
                        href={`/realisations/${p.slug}`}
                        className="group block"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        <div className="overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            loading="lazy"
                            className="img-scale h-[27.5vh] w-full object-cover"
                          />
                        </div>
                        <div className="mt-3 flex items-baseline justify-between">
                          <h3 className="font-serif italic text-[13px]">
                            {p.title}
                          </h3>
                          {p.size && (
                            <span
                              className="text-[11px]"
                              style={{ color: "var(--accent)" }}
                            >
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
                    </FadeIn>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section
        id="services"
        className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 md:pb-28"
      >
        <FadeIn>
          <div
            className="mb-8 flex items-baseline justify-between border-t pt-8"
            style={{ borderColor: "var(--line)" }}
          >
            <span
              className="text-[11px] uppercase tracking-[0.13em]"
              style={{ color: "var(--accent)" }}
            >
              Services
            </span>
            <a
              href="/services"
              className="text-[11px] transition-colors duration-300"
              style={{ color: "var(--text-2)", letterSpacing: "0.05em" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-2)")
              }
            >
              En savoir plus →
            </a>
          </div>
        </FadeIn>

        <div style={{ borderTop: "1px solid var(--line)" }}>
          {services.map((s, i) => (
            <FadeIn key={s.num + s.title} delay={i * 90}>
              <div
                className="grid gap-3 py-7 md:grid-cols-[72px_1fr_2fr] md:gap-8 md:py-8"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <span
                  className="text-[11px]"
                  style={{ color: "var(--accent)" }}
                >
                  {s.num}
                </span>
                <h3 className="font-serif italic text-[16px] sm:text-[17px]">
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-[1.9]"
                  style={{ color: "var(--text-2)" }}
                >
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ENGAGEMENTS
      ══════════════════════════════════════════ */}
      <section
        id="engagements"
        className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 md:pb-28"
      >
        <FadeIn>
          <div
            className="mb-8 border-t pt-8"
            style={{ borderColor: "var(--line)" }}
          >
            <span
              className="text-[11px] uppercase tracking-[0.13em]"
              style={{ color: "var(--accent)" }}
            >
              Engagements
            </span>
          </div>
        </FadeIn>

        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2 md:gap-x-16 md:gap-y-10">
          {engagements.map((e, i) => (
            <FadeIn key={e.title} delay={i * 70}>
              <div
                className="border-t pt-6"
                style={{ borderColor: "var(--line)" }}
              >
                <h3 className="font-serif italic text-[16px] sm:text-[17px]">
                  {e.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-[1.9]"
                  style={{ color: "var(--text-2)" }}
                >
                  {e.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section
        id="contact"
        className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-40"
      >
        <FadeIn>
          <div
            className="border-t pt-14 md:pt-20"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <h2
                  className="font-serif italic"
                  style={{
                    fontSize: "clamp(26px, 3.5vw, 44px)",
                    lineHeight: 1.2,
                    color: "var(--text-1)",
                  }}
                >
                  {contact.ctaTitle}
                </h2>
                {contact.ctaSubtitle && (
                  <p
                    className="mt-5 text-sm leading-[1.9] max-w-sm"
                    style={{ color: "var(--text-2)" }}
                  >
                    {contact.ctaSubtitle}
                  </p>
                )}
                <a
                  href="/contact"
                  className="mt-8 inline-block text-[11px] uppercase tracking-[0.18em] border px-6 py-3 transition-all duration-300 hover:bg-[var(--text-1)] hover:text-[var(--bg)]"
                  style={{
                    borderColor: "var(--text-1)",
                    color: "var(--text-1)",
                  }}
                >
                  Prendre rendez-vous
                </a>
              </div>

              <div className="flex flex-col gap-3 text-sm md:justify-end md:items-end">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="transition-colors duration-300"
                    style={{ color: "var(--text-1)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-1)")
                    }
                  >
                    {contact.phone}
                  </a>
                )}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors duration-300"
                    style={{ color: "var(--text-1)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-1)")
                    }
                  >
                    {contact.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <SiteFooter />
    </div>
  );
}
