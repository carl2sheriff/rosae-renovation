import { getPayload } from "payload";
import configPromise from "@payload-config";
import { HomePage } from "./_components/HomePage";
import type { HomePageProps, ProjectCard, ServiceCard, EngagementCard, TemoignageCard } from "./_components/HomePage";
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
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    },
    {
      slug: "maison-neuilly",
      title: "Maison — Neuilly-sur-Seine",
      subtitle: "Rénovation intérieure",
      size: "180 m²",
      imageUrl:
        "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=900&q=85",
    },
    {
      slug: "appartement-paris-16",
      title: "Appartement — Paris 16e",
      subtitle: "Rénovation partielle",
      size: "75 m²",
      imageUrl:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
    },
  ],
  services: [
    {
      num: "01",
      title: "Rénovation complète",
      desc: "Nous prenons en charge l'intégralité du chantier — démolition, gros œuvre, lots techniques, finitions — et coordonnons chaque corps de métier jusqu'à la livraison. Un interlocuteur unique, du devis aux clés.",
    },
    {
      num: "02",
      title: "Coordination des corps de métier",
      desc: "Chaque chantier est planifié semaine par semaine avant même le démarrage. Les intervenants sont coordonnés en amont. Les aléas sont anticipés, pas subis.",
    },
    {
      num: "03",
      title: "Rigueur des finitions",
      desc: "La réception se fait avec vous, point par point. Rien n'est livré tant que la réserve n'est pas levée. C'est la différence entre finir un chantier et terminer un ouvrage.",
    },
  ],
  engagements: [
    {
      title: "Exécution fidèle",
      desc: "Chaque choix validé avec vous est respecté jusqu'au détail. Plans, matériaux, finitions — sans déviation non discutée.",
    },
    {
      title: "Tenue de chantier",
      desc: "Un planning établi avant le démarrage, tenu jusqu'à la livraison. Les équipes sont coordonnées, les sous-traitants sélectionnés avec soin.",
    },
    {
      title: "Transparence totale",
      desc: "Points d'avancement réguliers, sans filtre. Vous savez à tout moment où en est le chantier — et pourquoi.",
    },
    {
      title: "Délais tenus",
      desc: "Les délais sont définis de manière réaliste, dès le devis. Ils sont ensuite respectés — ou l'écart est expliqué avant qu'il ne devienne un problème.",
    },
  ],
  contact: {
    ctaTitle: "Parlons de votre projet.",
    ctaSubtitle:
      "Prenez contact pour un premier échange — sans engagement. Nous écoutons avant de proposer.",
    phone: "+33 6 73 55 10 64",
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

    const [realisations, services, engagements, temoignagesRes, contact, home] =
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
        payload.find({
          collection: "temoignages",
          where: { published: { equals: true } },
          sort: "order",
          limit: 6,
        }),
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

    const temoignageCards: TemoignageCard[] = temoignagesRes.docs.map((t) => ({
      nomClient: t.nom_client,
      projet: t.projet ?? undefined,
      texte: t.texte,
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
      temoignages: temoignageCards.length > 0 ? temoignageCards : undefined,
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
