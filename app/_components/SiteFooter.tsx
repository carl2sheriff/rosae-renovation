export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)" }}>
      <div
        className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-[11px] sm:flex-row sm:items-center sm:justify-between sm:px-6"
        style={{ color: "var(--accent)" }}
      >
        <span>Rosae — Entreprise générale du bâtiment, Paris</span>
        <div className="flex gap-6">
          <a href="/contact" className="transition-opacity duration-300 hover:opacity-70">
            Contact
          </a>
          <a href="/partenaires" className="transition-opacity duration-300 hover:opacity-70">
            Partenaires
          </a>
          <a href="/mentions-legales" className="transition-opacity duration-300 hover:opacity-70">
            Mentions légales
          </a>
          <a href="/confidentialite" className="transition-opacity duration-300 hover:opacity-70">
            Confidentialité
          </a>
        </div>
      </div>
    </footer>
  );
}
