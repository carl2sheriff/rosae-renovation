'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ArchitectesForm() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError(null)

    const form = e.currentTarget
    const data = {
      nom: (form.elements.namedItem('nom') as HTMLInputElement).value.trim(),
      studio: (form.elements.namedItem('studio') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      telephone: (form.elements.namedItem('telephone') as HTMLInputElement).value.trim(),
      site: (form.elements.namedItem('site') as HTMLInputElement).value.trim(),
      projet: (form.elements.namedItem('projet') as HTMLTextAreaElement).value.trim(),
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    }

    try {
      const res = await fetch('/api/architectes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error || 'Erreur réseau.')
      }

      router.push('/architectes/merci')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setPending(false)
    }
  }

  const inputClass = `w-full border-b bg-transparent py-3 text-sm outline-none transition-colors duration-200 placeholder:text-[var(--text-2)] focus:border-[var(--text-1)]`
  const inputStyle = { borderColor: 'var(--line)', color: 'var(--text-1)' }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className="block text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: 'var(--text-2)' }}>
            Nom <span aria-hidden="true">*</span>
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            style={inputStyle}
            placeholder="Prénom Nom"
          />
        </div>
        <div>
          <label htmlFor="studio" className="block text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: 'var(--text-2)' }}>
            Studio / Cabinet
          </label>
          <input
            id="studio"
            name="studio"
            type="text"
            autoComplete="organization"
            className={inputClass}
            style={inputStyle}
            placeholder="Studio Dupont Architecture"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: 'var(--text-2)' }}>
            Email professionnel <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            style={inputStyle}
            placeholder="contact@studio.fr"
          />
        </div>
        <div>
          <label htmlFor="telephone" className="block text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: 'var(--text-2)' }}>
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            style={inputStyle}
            placeholder="+33 6 …"
          />
        </div>
      </div>

      <div>
        <label htmlFor="site" className="block text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: 'var(--text-2)' }}>
          Site web
        </label>
        <input
          id="site"
          name="site"
          type="url"
          autoComplete="url"
          className={inputClass}
          style={inputStyle}
          placeholder="https://votre-studio.fr"
        />
      </div>

      <div>
        <label htmlFor="projet" className="block text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: 'var(--text-2)' }}>
          Nature du projet à venir
        </label>
        <textarea
          id="projet"
          name="projet"
          rows={2}
          className={`${inputClass} resize-none`}
          style={inputStyle}
          placeholder="Rénovation complète, appartement 80 m², Paris 16e…"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: 'var(--text-2)' }}>
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={`${inputClass} resize-none`}
          style={inputStyle}
          placeholder="Présentez votre démarche et vos attentes vis-à-vis de l'entreprise générale…"
        />
      </div>

      {error && (
        <p className="text-sm" style={{ color: '#c0392b' }} role="alert">
          {error}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={pending}
          className="text-[11px] uppercase tracking-[0.18em] border px-8 py-3.5 transition-all duration-300 hover:bg-[var(--text-1)] hover:text-[var(--bg)] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ borderColor: 'var(--text-1)', color: 'var(--text-1)' }}
        >
          {pending ? 'Envoi…' : 'Envoyer ma demande'}
        </button>
      </div>
    </form>
  )
}
