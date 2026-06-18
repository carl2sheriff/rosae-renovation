import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Rosae Rénovation",
  description: "Mentions légales de Rosae Rénovation, entreprise générale de rénovation à Paris.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text-1)" }}>
      <SiteNav />

      <main className="mx-auto max-w-3xl px-5 pt-16 pb-24 sm:px-6 md:pt-24 md:pb-36">
        <div className="border-b pb-8 mb-12" style={{ borderColor: "var(--line)" }}>
          <p
            className="text-[11px] uppercase tracking-[0.13em] mb-4"
            style={{ color: "var(--accent)" }}
          >
            Légal
          </p>
          <h1
            className="font-serif italic"
            style={{ fontSize: "clamp(26px, 3.5vw, 44px)", lineHeight: 1.15 }}
          >
            Mentions légales
          </h1>
        </div>

        <div className="prose-rosae">
          <Section title="Éditeur du site">
            <p>
              Le site <strong>rosae-renovation.fr</strong> est édité par :
            </p>
            <p>
              <strong>Rosae Rénovation</strong><br />
              SAS — entreprise générale du bâtiment<br />
              Siège social : 29 rue du Faubourg Montmartre, 75009 Paris<br />
              SIRET : 891 140 295 00017<br />
              TVA intracommunautaire : FR17 891140295<br />
              Téléphone : +33 6 73 55 10 64<br />
              Email : rosaerenovation@gmail.com
            </p>
          </Section>

          <Section title="Assurances professionnelles">
            <p>
              Rosae Rénovation est titulaire d&apos;une assurance décennale (garantie de parfait achèvement,
              garantie biennale, garantie décennale) couvrant l&apos;ensemble des travaux de construction
              et de rénovation réalisés.
            </p>
            <p>
              Une assurance responsabilité civile professionnelle couvre les dommages causés aux tiers
              dans le cadre de l&apos;exercice de notre activité. Les attestations sont disponibles sur
              simple demande.
            </p>
          </Section>

          <Section title="Directeur de la publication">
            <p>Stéphane Beilin, fondateur de Rosae Rénovation.</p>
          </Section>

          <Section title="Hébergement">
            <p>
              Ce site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis<br />
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-1)", textDecoration: "underline" }}
              >
                vercel.com
              </a>
            </p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, graphismes,
              logotypes, icônes, sons, logiciels, etc.) sont la propriété exclusive de
              Rosae Rénovation ou de ses partenaires et sont protégés par les lois françaises
              et internationales relatives à la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication ou adaptation de
              tout ou partie des éléments du site, quel que soit le moyen ou le procédé
              utilisé, est interdite sans l&apos;autorisation écrite préalable de Rosae Rénovation.
            </p>
          </Section>

          <Section title="Responsabilité">
            <p>
              Les informations contenues sur ce site sont aussi précises que possible et
              régulièrement mises à jour. Cependant, Rosae Rénovation ne peut garantir
              l&apos;exactitude, la complétude et l&apos;actualité des informations diffusées.
            </p>
            <p>
              Rosae Rénovation décline toute responsabilité pour tout dommage résultant
              d&apos;une intrusion frauduleuse d&apos;un tiers ayant entraîné une modification
              des informations publiées sur le site.
            </p>
          </Section>

          <Section title="Liens hypertextes">
            <p>
              Le site peut contenir des liens vers d&apos;autres sites. Rosae Rénovation
              n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité
              quant à leur contenu.
            </p>
          </Section>

          <Section title="Droit applicable">
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de
              litige, les tribunaux français seront seuls compétents.
            </p>
          </Section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2
        className="font-serif italic mb-4"
        style={{ fontSize: "clamp(16px, 1.6vw, 20px)", color: "var(--text-1)" }}
      >
        {title}
      </h2>
      <div className="text-sm leading-[1.9]" style={{ color: "var(--text-2)" }}>
        {children}
      </div>
    </div>
  );
}
