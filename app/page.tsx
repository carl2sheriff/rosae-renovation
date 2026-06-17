export default function RosaeHomepageDemo() {
  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#1A1A1A]">

      <header className="sticky top-0 z-50 w-full border-b border-[#E5E5E5] bg-[#F7F7F5]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-8">
            <span className="text-sm tracking-[0.05em] md:text-base font-medium">ROSAE</span>
            <span className="hidden text-sm text-[#6F6F6F] md:block">Rénovation d&apos;intérieurs à Paris et en Île-de-France</span>
          </div>
          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#accueil" className="hover:opacity-70">Accueil</a>
            <a href="#services" className="hover:opacity-70">Services</a>
            <a href="#realisations" className="hover:opacity-70">Réalisations</a>
            <a href="#engagements" className="hover:opacity-70">Engagements</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO FULL IMAGE */}
      <section className="w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80"
          alt="Intérieur rénové lumineux"
          className="h-[70vh] w-full object-cover"
        />
      </section>

      <main id="accueil">
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-lg leading-8 md:text-[20px] md:leading-9">
              Rosae est une entreprise générale du bâtiment spécialisée dans la rénovation d&apos;intérieurs.
              Nous intervenons aux côtés d&apos;architectes d&apos;intérieur comme directement pour des clients privés,
              sur des projets d&apos;appartements, de maisons, de bureaux et d&apos;espaces commerciaux, notamment
              hôteliers. Chaque projet repose sur une exécution précise et une coordination rigoureuse des
              savoir-faire. Nous accompagnons nos clients du début à la fin, avec une organisation claire et le
              respect des délais.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div>
              <h2 className="text-2xl font-medium md:text-3xl">Compréhension du projet</h2>
            </div>
            <div className="max-w-2xl">
              <p className="text-base leading-8 text-[#3A3A3A] md:text-lg">
                Un projet réussi repose sur une bonne compréhension dès le départ. Nous prenons le temps
                d&apos;échanger, de poser les points clés et de valider les choix, afin d&apos;assurer une exécution fidèle
                au projet. Ces échanges se poursuivent tout au long du chantier pour garantir un déroulement
                maîtrisé jusqu&apos;à la livraison.
              </p>
            </div>
          </div>
        </section>

        <section id="realisations" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="text-2xl font-medium md:text-3xl">Réalisations</h2>
            <a href="#" className="hidden text-sm underline-offset-4 hover:underline md:block">
              Voir toutes les réalisations
            </a>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Appartement — Paris 7e',
                size: 'Rénovation complète · 120 m²',
                image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
              },
              {
                title: 'Maison — Neuilly-sur-Seine',
                size: 'Rénovation intérieure · 180 m²',
                image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
              },
              {
                title: 'Bureaux — Paris 8e',
                size: 'Aménagement et rénovation',
                image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
              },
            ].map((project) => (
              <article key={project.title}>
                <div className="bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image} alt={project.title} className="h-80 w-full object-cover" />
                </div>
                <div className="pt-4">
                  <h3 className="text-base font-medium">{project.title}</h3>
                  <p className="pt-1 text-sm text-[#6F6F6F]">{project.size}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="pt-8 md:hidden">
            <a href="#" className="text-sm underline-offset-4 hover:underline">Voir toutes les réalisations</a>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div>
              <h2 className="text-2xl font-medium md:text-3xl">Services</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-medium">Rénovation complète</h3>
                <p className="pt-3 text-sm leading-7 text-[#6F6F6F]">
                  Prise en charge globale des travaux, avec une organisation structurée et une exécution maîtrisée à chaque phase du chantier.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Coordination des travaux</h3>
                <p className="pt-3 text-sm leading-7 text-[#6F6F6F]">
                  Pilotage des différents corps d&apos;état, avec une planification précise et un suivi constant du chantier.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Exécution des détails</h3>
                <p className="pt-3 text-sm leading-7 text-[#6F6F6F]">
                  Attention portée aux ouvrages et aux finitions, avec un contrôle rigoureux à chaque étape.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="engagements" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div>
              <h2 className="text-2xl font-medium md:text-3xl">Engagements</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="border-t border-[#D9D9D9] pt-4">
                <h3 className="text-lg font-medium">Exécution fidèle au projet</h3>
                <p className="pt-3 text-sm leading-7 text-[#6F6F6F]">
                  Réalisation des travaux dans le respect des plans, des détails et des choix validés.
                </p>
              </div>
              <div className="border-t border-[#D9D9D9] pt-4">
                <h3 className="text-lg font-medium">Organisation et tenue de chantier</h3>
                <p className="pt-3 text-sm leading-7 text-[#6F6F6F]">
                  Planification claire, coordination des équipes et suivi régulier de l&apos;avancement.
                </p>
              </div>
              <div className="border-t border-[#D9D9D9] pt-4">
                <h3 className="text-lg font-medium">Communication claire</h3>
                <p className="pt-3 text-sm leading-7 text-[#6F6F6F]">
                  Des échanges structurés pour permettre un suivi fluide du projet, sans zones d&apos;ombre.
                </p>
              </div>
              <div className="border-t border-[#D9D9D9] pt-4">
                <h3 className="text-lg font-medium">Maîtrise des délais</h3>
                <p className="pt-3 text-sm leading-7 text-[#6F6F6F]">
                  Des délais définis de manière réaliste et suivis tout au long du chantier.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="border border-[#E5E5E5] bg-white px-6 py-8 md:px-10 md:py-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-medium md:text-3xl">Contact</h2>
                <p className="pt-4 text-base leading-8 text-[#3A3A3A]">
                  Pour toute demande de projet, nous vous invitons à nous contacter afin d&apos;échanger sur vos besoins, le cadre de l&apos;intervention et les premières étapes à envisager.
                </p>
              </div>
              <div className="flex flex-col gap-3 text-sm md:items-end">
                <a href="tel:+33100000000" className="hover:opacity-70">+33 1 00 00 00 00</a>
                <a href="mailto:rosaerenovation@gmail.com" className="hover:opacity-70">rosaerenovation@gmail.com</a>
                <button className="mt-2 border border-[#1A1A1A] px-5 py-2.5 text-sm transition hover:bg-[#1A1A1A] hover:text-white">
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E5E5E5]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-[#6F6F6F] md:flex-row md:items-center md:justify-between">
          <div>Rosae — Entreprise générale du bâtiment spécialisée dans la rénovation d&apos;intérieurs.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-70">À propos</a>
            <a href="#" className="hover:opacity-70">Mentions légales</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
