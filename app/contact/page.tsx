import { getPayload } from "payload";
import configPromise from "@payload-config";
import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import { CalComEmbed } from "@/app/_components/CalComEmbed";
import { ContactForm } from "@/app/_components/ContactForm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact — Rosae Rénovation",
  description:
    "Prenez rendez-vous pour une visite de chantier ou contactez Rosae pour discuter de votre projet de rénovation.",
};

interface ContactData {
  ctaTitle: string;
  ctaSubtitle: string;
  phone: string;
  email: string;
  address?: string;
  calendarUrl?: string;
}

const FALLBACK: ContactData = {
  ctaTitle: "Parlons de votre projet.",
  ctaSubtitle:
    "Pour toute demande, contactez-nous afin d'échanger sur vos besoins, le cadre de l'intervention et les premières étapes à envisager.",
  phone: "+33 1 00 00 00 00",
  email: "rosaerenovation@gmail.com",
};

async function getContact(): Promise<ContactData> {
  try {
    const payload = await getPayload({ config: configPromise });
    const contact = await payload.findGlobal({ slug: "contact" });
    return {
      ctaTitle: contact.cta_title ?? FALLBACK.ctaTitle,
      ctaSubtitle: contact.cta_subtitle ?? FALLBACK.ctaSubtitle,
      phone: contact.phone ?? FALLBACK.phone,
      email: contact.email ?? FALLBACK.email,
      address: contact.address ?? undefined,
      calendarUrl: contact.calendar_url ?? undefined,
    };
  } catch {
    return FALLBACK;
  }
}

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}>
      <SiteNav activePath="/contact" />

      <main>
        {/* ── Header ────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-6 md:pt-24 md:pb-16">
          <div
            className="border-b pb-8"
            style={{ borderColor: "var(--line)" }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.13em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              Contact
            </p>
            <h1
              className="font-serif italic"
              style={{
                fontSize: "clamp(28px, 4vw, 52px)",
                lineHeight: 1.15,
              }}
            >
              {contact.ctaTitle}
            </h1>
            {contact.ctaSubtitle && (
              <p
                className="mt-5 text-sm leading-[1.9] max-w-lg"
                style={{ color: "var(--text-2)" }}
              >
                {contact.ctaSubtitle}
              </p>
            )}
          </div>
        </section>

        {/* ── Contacts directs ─────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-6 md:pb-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-10">
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-3 text-sm transition-colors duration-300"
                style={{ color: "var(--text-1)" }}
              >
                <span
                  className="text-[11px] uppercase tracking-[0.1em]"
                  style={{ color: "var(--accent)" }}
                >
                  Tél.
                </span>
                <span className="group-hover:underline">{contact.phone}</span>
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-3 text-sm transition-colors duration-300"
                style={{ color: "var(--text-1)" }}
              >
                <span
                  className="text-[11px] uppercase tracking-[0.1em]"
                  style={{ color: "var(--accent)" }}
                >
                  Email
                </span>
                <span className="group-hover:underline">{contact.email}</span>
              </a>
            )}
            {contact.address && (
              <span className="flex items-center gap-3 text-sm" style={{ color: "var(--text-2)" }}>
                <span
                  className="text-[11px] uppercase tracking-[0.1em]"
                  style={{ color: "var(--accent)" }}
                >
                  Adresse
                </span>
                {contact.address}
              </span>
            )}
          </div>
        </section>

        {/* ── Rendez-vous ──────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36">
          <div
            className="border-t pt-12"
            style={{ borderColor: "var(--line)" }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.13em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              Rendez-vous
            </p>
            <h2
              className="font-serif italic mb-3"
              style={{
                fontSize: "clamp(20px, 2.5vw, 30px)",
                lineHeight: 1.25,
              }}
            >
              Planifier une première visite
            </h2>
            <p
              className="text-sm leading-[1.9] mb-8 max-w-md"
              style={{ color: "var(--text-2)" }}
            >
              Sélectionnez un créneau dans notre calendrier pour convenir
              d&apos;une première rencontre sur site.
            </p>

            {contact.calendarUrl ? (
              <CalComEmbed calLink={contact.calendarUrl} />
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${(contact.phone ?? "").replace(/\s/g, "")}`}
                  className="inline-block text-[11px] uppercase tracking-[0.18em] border px-6 py-3 transition-all duration-300 hover:bg-[var(--text-1)] hover:text-[var(--bg)]"
                  style={{ borderColor: "var(--text-1)", color: "var(--text-1)" }}
                >
                  Appeler
                </a>
                <a
                  href={`mailto:${contact.email ?? ""}`}
                  className="inline-block text-[11px] uppercase tracking-[0.18em] border px-6 py-3 transition-all duration-300 hover:bg-[var(--text-1)] hover:text-[var(--bg)]"
                  style={{ borderColor: "var(--text-1)", color: "var(--text-1)" }}
                >
                  Écrire
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 md:pb-28">
          <div
            className="border-t pt-12"
            style={{ borderColor: "var(--line)" }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.13em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              Questions fréquentes
            </p>
            <h2
              className="font-serif italic mb-10"
              style={{ fontSize: "clamp(18px, 2.2vw, 26px)", lineHeight: 1.25 }}
            >
              Ce que vous voulez savoir
            </h2>

            <div className="max-w-2xl faq-list">
              {[
                {
                  q: "Comment se déroule la première visite ?",
                  a: "Nous venons sur site pour évaluer l'état du logement, comprendre votre projet et prendre les mesures nécessaires. C'est un échange sans engagement, d'environ une heure, à l'issue duquel nous définissons ensemble le périmètre de l'intervention.",
                },
                {
                  q: "Quel est le délai pour recevoir un devis ?",
                  a: "Sous une semaine après la visite. Notre devis est détaillé poste par poste — gros œuvre, second œuvre, finitions — pour que vous compreniez précisément à quoi correspond chaque ligne.",
                },
                {
                  q: "Intervenez-vous uniquement à Paris ?",
                  a: "Nous intervenons principalement à Paris et en première couronne (Neuilly, Boulogne, Vincennes, Saint-Cloud…). Pour des projets d'envergure, nous nous déplaçons en Île-de-France sans frais supplémentaires.",
                },
                {
                  q: "Travaillez-vous avec des architectes ?",
                  a: "Oui. Nous collaborons régulièrement avec des architectes d'intérieur et des maîtres d'œuvre. Nous intervenons aussi bien en entreprise générale autonome que comme prestataire technique dans leur équipe.",
                },
                {
                  q: "Quels sont vos délais d'intervention ?",
                  a: "Entre la signature du devis et le début des travaux, il faut généralement compter 4 à 8 semaines selon la disponibilité de nos équipes et la complexité du projet. Nous planifions toujours un rétroplanning précis en début de chantier.",
                },
                {
                  q: "Comment gérez-vous les imprévus de chantier ?",
                  a: "Chaque chantier de rénovation réserve des surprises. Nous les documentons systématiquement, proposons des solutions et chiffrons toute modification avant d'agir — jamais de travaux supplémentaires sans votre accord écrit.",
                },
              ].map(({ q, a }) => (
                <details
                  key={q}
                  className="group border-b"
                  style={{ borderColor: "var(--line)" }}
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-4 py-5 text-sm font-medium select-none list-none"
                    style={{ color: "var(--text-1)" }}
                  >
                    <span>{q}</span>
                    <span
                      className="shrink-0 transition-transform duration-300 group-open:rotate-45"
                      style={{ color: "var(--accent)", fontSize: "20px", lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="pb-5 pr-8 text-sm leading-[1.9]"
                    style={{ color: "var(--text-2)" }}
                  >
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Formulaire de contact ─────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-36">
          <div
            className="border-t pt-12"
            style={{ borderColor: "var(--line)" }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.13em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              Message
            </p>
            <h2
              className="font-serif italic mb-3"
              style={{
                fontSize: "clamp(18px, 2.2vw, 26px)",
                lineHeight: 1.25,
              }}
            >
              Nous écrire directement
            </h2>
            <p
              className="text-sm leading-[1.9] mb-8 max-w-md"
              style={{ color: "var(--text-2)" }}
            >
              Décrivez votre projet — nous vous répondrons sous 48 h.
            </p>
            <ContactForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
