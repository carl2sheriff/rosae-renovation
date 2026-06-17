"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Realisation, Service, Engagement, Contact, Media } from "@/payload-types";

/* ─── Scroll fade-in wrapper ─────────────────────────────── */
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

/* ─── Types ──────────────────────────────────────────────── */
export interface ProjectCard {
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
}

/* ─── Nav ────────────────────────────────────────────────── */
const navItems: [string, string][] = [
  ["Services", "#services"],
  ["Réalisations", "#realisations"],
  ["Engagements", "#engagements"],
  ["Contact", "#contact"],
];

/* ─── Page client component ──────────────────────────────── */
export function HomePage({ projects, services, engagements, contact, heroImageUrl }: HomePageProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}
    >
      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-50"
        style={{
          borderBottom: "1px solid var(--line)",
          background: "color-mix(in srgb, var(--bg) 88%, transparent)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-[18px]">
          <a
            href="#"
            className="font-serif italic tracking-[0.05em] text-[15px]"
            style={{ color: "var(--text-1)" }}
            onClick={() => setMenuOpen(false)}
          >
            ROSAE
          </a>

          <nav className="hidden gap-10 md:flex">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-[11px] uppercase tracking-[0.13em] transition-colors duration-300"
                style={{ color: "var(--text-2)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-2)")
                }
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-6 h-6"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              className="block h-px w-full transition-all duration-300 origin-center"
              style={{
                backgroundColor: "var(--text-1)",
                transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px w-full transition-all duration-300"
              style={{
                backgroundColor: "var(--text-1)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px w-full transition-all duration-300 origin-center"
              style={{
                backgroundColor: "var(--text-1)",
                transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile nav overlay */}
        {menuOpen && (
          <div
            className="md:hidden border-t"
            style={{
              borderColor: "var(--line)",
              background: "color-mix(in srgb, var(--bg) 97%, transparent)",
            }}
          >
            <nav className="mx-auto max-w-6xl flex flex-col px-6 py-6 gap-6">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="text-[13px] uppercase tracking-[0.13em]"
                  style={{ color: "var(--text-1)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: "88vh" }}>
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
              Rosae &nbsp;·&nbsp; Rénovation d&apos;intérieurs &nbsp;·&nbsp; Paris &nbsp;·&nbsp; Île-de-France &nbsp;·&nbsp; Appartements &nbsp;·&nbsp; Maisons &nbsp;·&nbsp; Bureaux &nbsp;·&nbsp; Espaces hôteliers &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          INTRO
      ══════════════════════════════════════════ */}
      <section id="accueil" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <FadeIn>
          <p
            className="font-serif max-w-[700px]"
            style={{
              fontSize: "clamp(19px, 1.8vw, 24px)",
              lineHeight: 1.8,
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

        <FadeIn delay={160} className="mt-12 md:mt-14">
          <div
            className="max-w-[580px] border-l pl-6"
            style={{ borderColor: "var(--accent)" }}
          >
            <p
              className="text-sm leading-[1.9]"
              style={{ color: "var(--text-2)" }}
            >
              Un projet réussi repose sur une bonne compréhension dès le départ.
              Nous prenons le temps d&apos;échanger, de poser les points clés et
              de valider les choix — pour assurer une exécution fidèle et un
              déroulement maîtrisé jusqu&apos;à la livraison.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════
          RÉALISATIONS
      ══════════════════════════════════════════ */}
      <section
        id="realisations"
        className="mx-auto max-w-6xl px-6 pb-24 md:pb-32"
      >
        <FadeIn>
          <div
            className="mb-10 flex items-baseline justify-between border-t pt-8"
            style={{ borderColor: "var(--line)" }}
          >
            <span
              className="text-[11px] uppercase tracking-[0.13em]"
              style={{ color: "var(--accent)" }}
            >
              Réalisations
            </span>
            <a
              href="#"
              className="text-[11px] transition-colors duration-300"
              style={{ color: "var(--text-2)", letterSpacing: "0.05em" }}
            >
              Voir tout →
            </a>
          </div>
        </FadeIn>

        {projects.length > 0 && (
          <div className="grid gap-3 md:grid-cols-[1.45fr_1fr]">
            {/* Featured large */}
            <FadeIn delay={80}>
              <article className="group cursor-pointer">
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
                    <span className="text-[11px]" style={{ color: "var(--accent)" }}>
                      {projects[0].size}
                    </span>
                  )}
                </div>
                <p
                  className="mt-1 text-[11px] uppercase tracking-[0.08em]"
                  style={{ color: "var(--text-2)" }}
                >
                  {projects[0].subtitle}
                </p>
              </article>
            </FadeIn>

            {/* Stacked right */}
            {projects.length > 1 && (
              <div className="flex flex-col gap-3">
                {projects.slice(1, 3).map((p, i) => (
                  <FadeIn key={p.title} delay={180 + i * 90}>
                    <article className="group cursor-pointer">
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
                        <h3 className="font-serif italic text-[13px]">{p.title}</h3>
                        {p.size && (
                          <span className="text-[11px]" style={{ color: "var(--accent)" }}>
                            {p.size}
                          </span>
                        )}
                      </div>
                      <p
                        className="mt-1 text-[11px] uppercase tracking-[0.08em]"
                        style={{ color: "var(--text-2)" }}
                      >
                        {p.subtitle}
                      </p>
                    </article>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section id="services" className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
        <FadeIn>
          <div
            className="mb-12 border-t pt-8"
            style={{ borderColor: "var(--line)" }}
          >
            <span
              className="text-[11px] uppercase tracking-[0.13em]"
              style={{ color: "var(--accent)" }}
            >
              Services
            </span>
          </div>
        </FadeIn>

        <div style={{ borderTop: "1px solid var(--line)" }}>
          {services.map((s, i) => (
            <FadeIn key={s.num + s.title} delay={i * 90}>
              <div
                className="grid py-8 md:grid-cols-[72px_1fr_2fr] md:gap-8"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <span className="mb-3 text-[11px] md:mb-0" style={{ color: "var(--accent)" }}>
                  {s.num}
                </span>
                <h3 className="font-serif italic text-[17px] mb-3 md:mb-0">{s.title}</h3>
                <p className="text-sm leading-[1.9]" style={{ color: "var(--text-2)" }}>
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
        className="mx-auto max-w-6xl px-6 pb-24 md:pb-32"
      >
        <FadeIn>
          <div
            className="mb-12 border-t pt-8"
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

        <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
          {engagements.map((e, i) => (
            <FadeIn key={e.title} delay={i * 70}>
              <div className="border-t pt-6" style={{ borderColor: "var(--line)" }}>
                <h3 className="font-serif italic text-[17px]">{e.title}</h3>
                <p className="mt-3 text-sm leading-[1.9]" style={{ color: "var(--text-2)" }}>
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
      <section id="contact" className="mx-auto max-w-6xl px-6 pb-32 md:pb-44">
        <FadeIn>
          <div
            className="border-t pt-16 md:pt-20"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2
                  className="font-serif italic"
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 46px)",
                    lineHeight: 1.2,
                    color: "var(--text-1)",
                  }}
                >
                  {contact.ctaTitle.split(".")[0]}.<br />
                  {contact.ctaTitle.includes("\n")
                    ? contact.ctaTitle.split("\n")[1]
                    : ""}
                </h2>
                {contact.ctaSubtitle && (
                  <p
                    className="mt-6 text-sm leading-[1.9] max-w-xs"
                    style={{ color: "var(--text-2)" }}
                  >
                    {contact.ctaSubtitle}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 text-sm md:justify-end md:items-end">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="transition-colors duration-300"
                    style={{ color: "var(--text-1)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                  >
                    {contact.phone}
                  </a>
                )}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors duration-300"
                    style={{ color: "var(--text-1)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                  >
                    {contact.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{ borderTop: "1px solid var(--line)" }}>
        <div
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-[11px]"
          style={{ color: "var(--accent)" }}
        >
          <span>Rosae — Entreprise générale du bâtiment, Paris</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors duration-300 hover:opacity-70">
              Mentions légales
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
