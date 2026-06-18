import { getPayload } from "payload";
import configPromise from "@payload-config";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, prenom, source } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requis." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    const payload = await getPayload({ config: configPromise });

    await payload.create({
      collection: "newsletter_subscribers",
      data: {
        email: email.toLowerCase().trim(),
        prenom: typeof prenom === "string" ? prenom.trim() : undefined,
        source: typeof source === "string" ? source : "journal",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("unique") || msg.includes("duplicate")) {
      return NextResponse.json({ error: "Déjà inscrit." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
