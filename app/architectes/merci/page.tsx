import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Merci — Rosae',
  robots: { index: false },
}

export default function ArchitectesMerciPage() {
  return (
    <main id="main-content">
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-40 sm:px-6 md:pt-48 md:pb-56">
        <p
          className="text-[10px] uppercase tracking-[0.2em] mb-8"
          style={{ color: 'var(--accent)' }}
        >
          Demande reçue
        </p>
        <h1
          className="font-serif italic mb-6"
          style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            lineHeight: 1.15,
            color: 'var(--text-1)',
            maxWidth: '20ch',
          }}
        >
          Merci.
        </h1>
        <p
          className="text-base leading-[1.9] max-w-md mb-12"
          style={{ color: 'var(--text-2)' }}
        >
          Stéphane vous recontacte sous 24&nbsp;h ouvrées pour une première conversation
          sans engagement.
        </p>
        <Link
          href="/"
          className="text-[11px] uppercase tracking-[0.18em] border px-6 py-3 transition-all duration-300 hover:bg-[var(--text-1)] hover:text-[var(--bg)]"
          style={{ borderColor: 'var(--text-1)', color: 'var(--text-1)' }}
        >
          Retour à l&apos;accueil
        </Link>
      </section>
    </main>
  )
}
