# Design References — Rosae Rénovation

## Synthèse des 12 sites de référence

### Patterns récurrents chez les meilleurs studios

**Typographie**
- Mélange systématique serif display / sans-serif body (jamais tout-sans ni tout-serif)
- Le serif est utilisé exclusivement pour les titres, noms de projet, signatures de marque
- Letter-spacing généreux sur les labels et nav items (uppercase, 0.10–0.15em)
- Échelle très modérée : pas de gros titres héroïques, tout parle à voix basse
- EB Garamond, Cormorant, Editorial New sont les références du moment

**Palette**
- Jamais blanc pur (#FFF) — toujours ivoire, crème, pierre (eg. #F2EEE9, #EDE8E0)
- Jamais noir pur (#000) — charbon chaud, encre (eg. #1A1815, #2A2724)
- 1 seul accent discret : bronze, sable, ocre, pousse de saule (jamais flashy)
- 3 couleurs max sur tout le site
- Fond légèrement plus chaud que les standards Tailwind stone/zinc

**Hero**
- Plein cadre, jamais de texte overlay (logo seul parfois, en petit)
- Ratio portrait ou carré possible, mais 16:9 le plus courant
- Silence total : pas de CTA, pas de tagline dans l'image
- Photographie professionnelle, lumière naturelle, pas de mise en scène évidente

**Navigation**
- Horizontal top, toujours
- Logo à gauche (parfois centré sur très petits sites), nav à droite
- Sticky avec fond légèrement opaque + blur au scroll
- Items : 4–5 max, très courts, souvent uppercase spaced
- Aucun bouton CTA dans le nav

**Whitespace**
- Les meilleurs sites ont 40–50% de vide visible
- Sections séparées par des lignes fines (1px warm gray), jamais d'espacement gap seul
- Les grilles respirent : gap minimal entre images (3–6px), puis grand blanc après

**Photographie**
- Lumière naturelle latérale ou zénithale — jamais flash ou éclairage artificiel évident
- Angles légèrement en hauteur ou eye-level, focale normale à longue
- Pas de personnes (ou silhouette non-identifiable)
- Styling épuré : surfaces nues, matières vraies, pas de fleurs/bougies staging stock

**Copy**
- Extrêmement court
- Factuel : noms de projets + localisation + surface. C'est tout.
- Les textes d'approche existent mais sont lus comme des manifestes, pas comme du marketing
- Pas de "Découvrez", "Expertise", "Passion", "Savoir-faire unique"
- Voix : présente, directe, légèrement formelle mais pas froide

**Animation**
- Fade-in au scroll, lent (700–900ms), avec translateY minimal (16–24px)
- Hover image : scale 1.02–1.03 max, easing expo out, 800–900ms
- Aucune animation sur le nav, les séparateurs, les labels
- Pas de parallax agressif, pas de clip-path reveal, pas de stagger excessif

---

## 5 Directions candidates pour Rosae

### Direction 1 — Pierre Yovanovitch Éditorial
*Ivoire-charbon-bronze, EB Garamond, grilles asymétriques magazine, photographie architectorale*
Ivoire chaud comme fond, charbon comme texte primaire, accent bronze unique. EB Garamond italic pour tous les headings. Grille réalisations type magazine (1 large + 2 empilés). Services en liste numérotée. Très généreux en whitespace. Fade-in lents.

### Direction 2 — John Pawson Minimalisme Radical
*Blanc cassé pur, gris anthracite, aucun accent couleur, images 50% de la surface, silence total*
Typographie réduite à l'essentiel. Pas de numérotation, pas de labels. Juste les images et des titres courts en serif. Risque : trop abstrait pour un client BTP grand public, trop peu d'info.

### Direction 3 — Studio KO Méditerranéen
*Teintes sable et ocre chaud, serif élancé, photos architecturales grand format paysage*
Plus de chaleur, légère référence au sud. Palette sable/craie/ocre. Titres en Playfair Display ou Freight Display. Réalisations en fullwidth sliders. Plus accessible mais moins distinctif.

### Direction 4 — Liaigre Monochrome Luxe
*Très sombre (fond quasi-noir), blanc cassé pour le texte, or comme unique accent*
Mode nuit permanent. Très premium mais risqué pour un artisan bâtiment — peut effrayer les clients particuliers cherchant de la confiance. Réservé aux marques de mode.

### Direction 5 — 1100 Architect Editorial Clean
*Off-white, mid-gray, police sans-serif fine (eg. GT America Light) pour tout, images très grandes*
Complètement sans serif. Moderne et presque corporate. Moins poétique, mais très lisible. Bon pour les bureaux / hôtels, moins adapté au résidentiel haut de gamme.

---

## Direction choisie : **Direction 1 — Pierre Yovanovitch Éditorial**

Rosae travaille sur du résidentiel haut de gamme parisien, des maisons en IDF, et des espaces hôteliers. Ses clients sont des particuliers cultivés ET des architectes d'intérieur. La direction 1 répond à ces deux audiences : elle a la sophistication qu'un architecte attend, et la chaleur qu'un particulier ressent.

Le duo EB Garamond italic + Inter léger crée exactement la tension serif/sans qui distingue les meilleures agences parisiennes. La palette ivoire-charbon-bronze évite l'écueil du site BTP trop blanc/bleu, et reste assez neutre pour que les photos parlent.

*Implemented: 2026-06-17*
