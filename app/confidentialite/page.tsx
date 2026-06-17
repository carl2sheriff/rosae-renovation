import { SiteNav } from "@/app/_components/SiteNav";
import { SiteFooter } from "@/app/_components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Rosae Rénovation",
  description: "Politique de confidentialité et traitement des données personnelles par Rosae Rénovation.",
};

export default function ConfidentialitePage() {
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
            Politique de confidentialité
          </h1>
        </div>

        <div>
          <Section title="Responsable du traitement">
            <p>
              <strong>Rosae Rénovation</strong><br />
              Email : rosaerenovation@gmail.com
            </p>
          </Section>

          <Section title="Données collectées">
            <p>
              Rosae Rénovation peut collecter les données suivantes dans le cadre de votre
              prise de contact ou de votre réservation d&apos;un rendez-vous :
            </p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Description de votre projet</li>
            </ul>
            <p>
              Ces données sont collectées uniquement avec votre consentement, via le
              formulaire de contact ou la plateforme de prise de rendez-vous Cal.com.
            </p>
          </Section>

          <Section title="Finalités du traitement">
            <p>
              Les données collectées sont utilisées exclusivement pour :
            </p>
            <ul>
              <li>Répondre à vos demandes de renseignements</li>
              <li>Planifier et organiser un rendez-vous de visite</li>
              <li>Établir un devis pour votre projet</li>
            </ul>
            <p>
              Elles ne sont en aucun cas transmises à des tiers à des fins commerciales.
            </p>
          </Section>

          <Section title="Durée de conservation">
            <p>
              Vos données sont conservées pendant la durée nécessaire au traitement de
              votre demande et au maximum 3 ans à compter du dernier contact.
            </p>
          </Section>

          <Section title="Vos droits">
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et
              à la loi Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul>
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d&apos;opposition</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à :{" "}
              <a
                href="mailto:rosaerenovation@gmail.com"
                style={{ color: "var(--text-1)", textDecoration: "underline" }}
              >
                rosaerenovation@gmail.com
              </a>
            </p>
          </Section>

          <Section title="Services tiers">
            <p>
              Ce site peut utiliser les services suivants, disposant de leur propre
              politique de confidentialité :
            </p>
            <ul>
              <li>
                <strong>Cal.com</strong> — prise de rendez-vous en ligne.{" "}
                <a
                  href="https://cal.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-1)", textDecoration: "underline" }}
                >
                  Politique de confidentialité Cal.com
                </a>
              </li>
              <li>
                <strong>Vercel</strong> — hébergement du site.{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-1)", textDecoration: "underline" }}
                >
                  Politique de confidentialité Vercel
                </a>
              </li>
            </ul>
          </Section>

          <Section title="Contact">
            <p>
              Pour toute question relative à cette politique de confidentialité :{" "}
              <a
                href="mailto:rosaerenovation@gmail.com"
                style={{ color: "var(--text-1)", textDecoration: "underline" }}
              >
                rosaerenovation@gmail.com
              </a>
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
      <div
        className="text-sm leading-[1.9] [&_ul]:mt-3 [&_ul]:mb-3 [&_ul]:pl-4 [&_li]:list-disc [&_li]:ml-2 [&_li]:mb-1 [&_p]:mb-3"
        style={{ color: "var(--text-2)" }}
      >
        {children}
      </div>
    </div>
  );
}
