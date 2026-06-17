import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nom, studio, email, telephone, site, projet, message } = body

    if (!nom || !email || !message) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    await payload.create({
      collection: 'demandes_architectes',
      data: { nom, studio, email, telephone, site, projet, message },
    })

    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const resend = new Resend(resendKey)
      const lignes = [
        `<b>Nom :</b> ${nom}`,
        studio ? `<b>Studio :</b> ${studio}` : null,
        `<b>Email :</b> ${email}`,
        telephone ? `<b>Téléphone :</b> ${telephone}` : null,
        site ? `<b>Site :</b> ${site}` : null,
        projet ? `<b>Projet :</b> ${projet}` : null,
        `<b>Message :</b><br>${message.replace(/\n/g, '<br>')}`,
      ].filter(Boolean)

      await resend.emails.send({
        from: 'Rosae <onboarding@resend.dev>',
        to: ['rosaerenovation@gmail.com'],
        cc: ['carl@sheriffprojects.com'],
        subject: `Nouvelle demande partenariat architecte — ${nom}${studio ? ` · ${studio}` : ''}`,
        html: `<div style="font-family:sans-serif;max-width:600px">${lignes.join('<br><br>')}</div>`,
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
