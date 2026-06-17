import { getPayload } from "payload";
import configPromise from "@payload-config";
import { HomePage } from "./_components/HomePage";
import type { HomePageProps, ProjectCard, ServiceCard, EngagementCard } from "./_components/HomePage";
import type { Media, Realisation } from "@/payload-types";

export const dynamic = 'force-dynamic';

/* ─── Static fallbacks (used when DB unavailable) ───────── */
const FALLBACK: HomePageProps = {
  projects: [
    {
      slug: "appartement-paris-7",
      title: "Appartement — Paris 7e",
      subtitle: "Rénovation complète",
      size: "120 m²",
      imageUrl:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
    },
    {
      slug: "maison-neuilly",
      title: "Maison — Neuilly-sur-Seine",
      subtitle: "Rénovation intérieure",
      size: "180 m²",
      imageUrl:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
    },
    {
      slug: "bureaux-paris-8",
      title: "Bureaux — Paris 8e",
      subtitle: "Aménagement & rénovation",
      size: "",
      imageUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85",
    },
  ],
  services: [
    {
      num: "01",
      title: "Rénovation complète",
      desc: "Prise en charge globale des travaux, avec une organisation structurée et une exécution maîtrisée à chaque phase du chantier.",
    },
    {
      num: "02",
      title: "Coordination des corps de métier",
      desc: "Pilotage des différents intervenants, planification précise et suivi constant de l'avancement du chantier.",
    },
    {
      num: "03",
      title: "Qualité des finitions",
      desc: "Attention portée aux détails et aux ouvrages, avec un contrôle rigoureux jusqu'à la livraison.",
    },
  ],
  engagements: [
    {
      title: "Exécution fidèle",
      desc: "Réalisation dans le respect strict des plans, des détails et des choix validés avec le client.",
    },
    {
      title: "Tenue de chantier",
      desc: "Planification claire, coordination des équipes et suivi régulier de l'avancement.",
    },
    {
      title: "Communication directe",
      desc: "Des échanges structurés pour un suivi fluide du projet, sans zones d'ombre.",
    },
    {
      title: "Maîtrise des délais",
      desc: "Des délais définis de manière réaliste et tenus jusqu'à la livraison.",
    },
  ],
  contact: {
    ctaTitle: "Parlons de votre projet.",
    ctaSubtitle:
      "Pour toute demande, contactez-nous afin d'échanger sur vos besoins, le cadre de l'intervention et les premières étapes à envisager.",
    phone: "+33 1 00 00 00 00",
    email: "rosaerenovation@gmail.com",
  },
};

/* ─── Media URL helper ───────────────────────────────────── */
function mediaUrl(m: number | Media | null | undefined): string {
  if (!m || typeof m === "number") return "";
  return m.sizes?.card?.url ?? m.url ?? "";
}

/* ─── Data fetching ──────────────────────────────────────── */
async function fetchData(): Promise<HomePageProps | null> {
  try {
    const payload = await getPayload({ config: configPromise });

    const [realisations, services, engagements, contact, home] =
      await Promise.all([
        payload.find({
          collection: "realisations",
          where: { published: { equals: true } },
          sort: "order",
          limit: 6,
          depth: 1,
        }),
        payload.find({ collection: "services", sort: "order", limit: 10 }),
        payload.find({ collection: "engagements", sort: "order", limit: 10 }),
        payload.findGlobal({ slug: "contact" }),
        payload.findGlobal({ slug: "home", depth: 1 }),
      ]);

    const projects: ProjectCard[] = (realisations.docs as unknown as Realisation[]).map((r) => {
      const subtitleParts = (r.subtitle ?? "").split("·").map((s) => s.trim());
      return {
        slug: r.slug ?? "",
        title: r.title,
        subtitle: subtitleParts[0] ?? "",
        size: subtitleParts[1] ?? "",
        imageUrl: mediaUrl(r.cover_image as Media | number),
      };
    });

    const serviceCards: ServiceCard[] = services.docs.map((s) => ({
      num: s.num ?? "",
      title: s.title,
      desc: s.description,
    }));

    const engagementCards: EngagementCard[] = engagements.docs.map((e) => ({
      title: e.title,
      desc: e.description,
    }));

    const heroImageUrl =
      typeof home.hero_image === "object" && home.hero_image
        ? (home.hero_image as Media).sizes?.hero?.url ??
          (home.hero_image as Media).url ??
          undefined
        : undefined;

    const citation =
      home.citation_texte
        ? {
            texte: home.citation_texte,
            auteurNom: home.citation_auteur_nom ?? "Stéphane Beilin",
            auteurTitre: home.citation_auteur_titre ?? "Fondateur · Rosae",
          }
        : undefined;

    return {
      projects: projects.length > 0 ? projects : FALLBACK.projects,
      services: serviceCards.length > 0 ? serviceCards : FALLBACK.services,
      engagements:
        engagementCards.length > 0 ? engagementCards : FALLBACK.engagements,
      contact: {
        ctaTitle: contact.cta_title ?? FALLBACK.contact.ctaTitle,
        ctaSubtitle: contact.cta_subtitle ?? FALLBACK.contact.ctaSubtitle,
        phone: contact.phone ?? FALLBACK.contact.phone,
        email: contact.email ?? FALLBACK.contact.email,
      },
      heroImageUrl,
      citation,
    };
  } catch {
    return null;
  }
}

/* ─── Page ───────────────────────────────────────────────── */
export default async function Page() {
  const data = await fetchData();
  return <HomePage {...(data ?? FALLBACK)} />;
}
