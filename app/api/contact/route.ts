import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, email, telephone, message, projet_type } = body;

    if (!nom?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis." },
        { status: 400 }
      );
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config: configPromise });
    await payload.create({
      collection: "inquiries",
      data: {
        nom: nom.trim(),
        email: email.trim().toLowerCase(),
        telephone: telephone?.trim() || null,
        message: message.trim(),
        projet_type: projet_type || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact API]", err);
    return NextResponse.json(
      { error: "Erreur interne. Réessayez." },
      { status: 500 }
    );
  }
}
