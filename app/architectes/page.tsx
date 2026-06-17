import type { Metadata } from 'next'
import Link from 'next/link'
import { ArchitectesForm } from '@/app/_components/ArchitectesForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Architectes d’intérieur · Partenariat — Rosae",
  description:
    "Rosae est l’entreprise générale qui exécute vos projets avec précision et discrétion. Interlocuteur unique, zéro concurrence honoraire, co-publication possible. Découvrez notre programme de partenariat.",
  openGraph: {
    title: "Partenariat architectes · Rosae",
    description:
      "Exécution fidèle à vos plans. Interlocuteur unique sur les chantiers. Commissions transparentes. Rejoignez le réseau Rosae.",
  },
}

const ETAPES = [
  {
    num: '01',
    titre: 'Prise de contact',
    corps: 'Vous nous transmettez les plans ou le cahier des charges. Nous répondons sous 24 h ouvrées avec un retour de faisabilité.',
  },
  {
    num: '02',
    titre: 'Visite & chiffrage',
    corps: 'Stéphane se déplace sur site avec vous ou seul selon votre préférence. Le devis détaillé est remis en 5 jours ouvrés.',
  },
  {
    num: '03',
    titre: 'Coordination chantier',
    corps: "Vous restez maître du projet côté conception. Nous gérons l'intégralité de l'exécution : planning, corps de métier, approvisionnements.",
  },
  {
    num: '04',
    titre: 'Livraison & suivi',
    corps: 'Livraison conforme aux plans, avec rapport photos. La commission vous est versée dès réception du solde client.',
  },
]

const COMMISSIONS = [
  {
    niveau: 'Apporteur ponctuel',
    taux: '3 %',
    desc: 'Vous nous recommandez un client. Versement unique à la réception des travaux.',
  },
  {
    niveau: 'Partenaire récurrent',
    taux: '4 %',
    desc: 'Vous collaborez régulièrement avec Rosae. Commission bonifiée et priorité planning.',
  },
  {
    niveau: 'Premium',
    taux: '5 %',
    desc: 'Partenariat exclusif. Co-signature des projets, co-publication et mise en avant sur nos supports.',
  },
]

export default function ArchitectesPage() {
  return (
    <main id="main-content">
      {/* ── Hero ─────────────────────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-5 pt-28 pb-20 sm:px-6 md:pt-36 md:pb-28"
        aria-labelledby="archi-hero-heading"
      >
        <p
          className="text-[10px] uppercase tracking-[0.2em] mb-8"
          style={{ color: 'var(--accent)' }}
        >
          Partenariat
        </p>
        <h1
          id="archi-hero-heading"
          className="font-serif italic"
          style={{
            fontSize: 'clamp(32px, 5vw, 64px)',
            lineHeight: 1.1,
            color: 'var(--text-1)',
            maxWidth: '18ch',
          }}
        >
          Architectes d&apos;intérieur&nbsp;: exécutons ensemble.
        </h1>
        <p
          className="mt-8 max-w-xl text-sm leading-[1.9]"
          style={{ color: 'var(--text-2)' }}
        >
          Vous concevez. Nous construisons. Depuis 2014, Rosae exécute les projets
          d&apos;architectes d&apos;intérieur parisiens avec la même rigueur qu&apos;un maître
          d&apos;œuvre — sans jamais empiéter sur votre relation client ni sur vos honoraires.
        </p>
      </section>

      {/* ── Valeur ajoutée ───────────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-5 sm:px-6"
        aria-labelledby="archi-valeur-heading"
      >
        <div
          className="border-t pt-14 md:pt-20"
          style={{ borderColor: 'var(--line)' }}
        >
          <h2
            id="archi-valeur-heading"
            className="font-serif italic mb-12"
            style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: 'var(--text-1)' }}
          >
            Ce que Rosae apporte à votre pratique
          </h2>

          <div className="grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                titre: 'Exécution fidèle à vos plans',
                corps: "Nos artisans lisent vos documents d'exécution. Aucune interprétation non validée. Si une adaptation technique est nécessaire, nous vous soumettons les options avant d'agir.",
              },
              {
                titre: 'Interlocuteur unique',
                corps: 'Stéphane Beilin coordonne tous les corps de métier. Vous avez un seul numéro, un seul compte-rendu hebdomadaire, un seul vis-à-vis.',
              },
              {
                titre: 'Zéro concurrence honoraire',
                corps: "Nous ne faisons pas de maîtrise d'œuvre. Nous ne proposons jamais un autre architecte ou décorateur à votre client. Votre relation est intouchable.",
              },
              {
                titre: 'Confidentialité totale',
                corps: "Vos clients ne savent pas que vous travaillez avec Rosae sauf si vous le souhaitez. Nous opérons dans l'ombre ou en lumière, selon votre positionnement.",
              },
              {
                titre: 'Co-publication possible',
                corps: 'Vous le décidez. Certains partenaires profitent de notre réseau Instagram et presse pour diffuser les chantiers signés ensemble.',
              },
              {
                titre: 'Réactivité chantier',
                corps: 'Disponibilité téléphonique 6j/7 pendant les phases actives. Si un problème émerge sur site, vous êtes informé avant la fin de la journée.',
              },
            ].map((item) => (
              <article key={item.titre}>
                <h3
                  className="text-[11px] uppercase tracking-[0.14em] mb-3"
                  style={{ color: 'var(--accent)' }}
                >
                  {item.titre}
                </h3>
                <p className="text-sm leading-[1.9]" style={{ color: 'var(--text-2)' }}>
                  {item.corps}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 étapes ─────────────────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-5 py-20 sm:px-6 md:py-28"
        aria-labelledby="archi-process-heading"
      >
        <div
          className="border-t pt-14 md:pt-20"
          style={{ borderColor: 'var(--line)' }}
        >
          <h2
            id="archi-process-heading"
            className="font-serif italic mb-12"
            style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: 'var(--text-1)' }}
          >
            Comment ça fonctionne
          </h2>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" role="list">
            {ETAPES.map((e) => (
              <li key={e.num} className="flex flex-col gap-3">
                <span
                  className="font-serif italic"
                  style={{ fontSize: '2rem', color: 'var(--line)', lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {e.num}
                </span>
                <h3
                  className="text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: 'var(--text-1)' }}
                >
                  {e.titre}
                </h3>
                <p className="text-sm leading-[1.85]" style={{ color: 'var(--text-2)' }}>
                  {e.corps}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Grille commissions ───────────────────────── */}
      <section
        className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 md:pb-28"
        aria-labelledby="archi-commissions-heading"
      >
        <div
          className="border-t pt-14 md:pt-20"
          style={{ borderColor: 'var(--line)' }}
        >
          <h2
            id="archi-commissions-heading"
            className="font-serif italic mb-4"
            style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: 'var(--text-1)' }}
          >
            Commissions de partenariat
          </h2>
          <p className="text-sm mb-10 max-w-lg leading-[1.9]" style={{ color: 'var(--text-2)' }}>
            Calculées sur le montant HT des travaux exécutés, versées par virement
            30 jours après réception du solde client. Aucune avance de trésorerie requise.
          </p>
          <div className="grid gap-px" style={{ background: 'var(--line)' }}>
            {COMMISSIONS.map((c) => (
              <div
                key={c.niveau}
                className="grid grid-cols-[auto_1fr] items-start gap-8 px-6 py-8 md:grid-cols-[12rem_auto_1fr]"
                style={{ background: 'var(--bg)' }}
              >
                <span
                  className="text-[10px] uppercase tracking-[0.16em] pt-0.5"
                  style={{ color: 'var(--accent)' }}
                >
                  {c.niveau}
                </span>
                <span
                  className="font-serif italic hidden md:block"
                  style={{ fontSize: '1.5rem', color: 'var(--text-1)', minWidth: '4rem' }}
                >
                  {c.taux}
                </span>
                <div>
                  <span
                    className="font-serif italic md:hidden"
                    style={{ fontSize: '1.25rem', color: 'var(--text-1)', display: 'block', marginBottom: '4px' }}
                  >
                    {c.taux}
                  </span>
                  <p className="text-sm leading-[1.85]" style={{ color: 'var(--text-2)' }}>
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[11px] leading-[1.7]" style={{ color: 'var(--text-2)' }}>
            Les taux s&apos;entendent hors taxe. Un contrat de partenariat cadre est signé
            en début de collaboration. Les commissions font l&apos;objet d&apos;une facture
            de votre part.
          </p>
        </div>
      </section>

      {/* ── Formulaire ───────────────────────────────── */}
      <section
        id="formulaire"
        className="mx-auto max-w-6xl px-5 pb-28 sm:px-6 md:pb-40"
        aria-labelledby="archi-form-heading"
      >
        <div
          className="border-t pt-14 md:pt-20"
          style={{ borderColor: 'var(--line)' }}
        >
          <div className="grid gap-14 md:grid-cols-2 md:gap-20">
            <div>
              <h2
                id="archi-form-heading"
                className="font-serif italic mb-5"
                style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: 'var(--text-1)' }}
              >
                Entrons en contact.
              </h2>
              <p className="text-sm leading-[1.9] max-w-sm" style={{ color: 'var(--text-2)' }}>
                Présentez-nous votre pratique en quelques lignes. Stéphane vous répond
                personnellement sous 24 heures ouvrées pour une conversation sans engagement.
              </p>
              <div className="mt-10 flex flex-col gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                <a
                  href="mailto:rosaerenovation@gmail.com"
                  className="transition-colors duration-200 hover:text-[var(--text-1)]"
                >
                  rosaerenovation@gmail.com
                </a>
                <Link
                  href="/realisations"
                  className="text-[10px] uppercase tracking-[0.16em] mt-4 transition-colors duration-200 hover:text-[var(--text-1)]"
                  style={{ color: 'var(--accent)' }}
                >
                  Voir nos réalisations →
                </Link>
              </div>
            </div>
            <div>
              <ArchitectesForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
