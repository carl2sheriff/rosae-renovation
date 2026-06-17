# Design Log — Rosae Rénovation

## V1 — 2026-06-17 (scaffold initial)
Scaffold Next.js 16 + Tailwind + TypeScript. Composant fourni par Carl collé tel quel dans page.tsx avec escape des apostrophes JSX. Header repositionné sticky au-dessus du hero. Pas de design work encore.

## V2 — 2026-06-17 (refonte design complète)
**Objectif** : passer de site BTP générique à portfolio luxe parisien.

**Changements** :
- `globals.css` : palette ivoire (#F2EFE9) / charbon (#1B1916) / bronze (#8A7963) / ligne warm (#D3CEC4). CSS vars pour cohérence. Animations fade-reveal + img-scale en CSS pur.
- `layout.tsx` : remplacement Geist par **EB Garamond** (italic + normal, 400/500) + **Inter** (300/400/500). Tailwind @theme configuré pour `font-serif` / `font-sans`.
- `page.tsx` : refonte complète —
  - Header slim sticky backdrop-blur, logo `ROSAE` en EB Garamond italic, nav uppercase spaced
  - Hero 88vh plein cadre, aucun overlay texte, image `photo-1600210492493-0946911123ea` (intérieur lumineux)
  - Intro en EB Garamond 19–24px clamp, pull-quote secondaire avec bordure-l bronze
  - Réalisations : grille magazine asymétrique (1 large + 2 empilés droite), hover scale 1.025 / 900ms expo
  - Services : liste numérotée 01/02/03, grille 3 colonnes (num / titre / desc)
  - Engagements : 2×2 avec border-top ligne fine
  - Contact : split 2 colonnes, titre EB Garamond italic large, email+phone sans CTA solide
  - Footer minimaliste 1 ligne
- Scroll animations : IntersectionObserver + classe `is-visible`, stagger delays 70–180ms

**Inspirations** : Joseph Dirand (grille magazine), Pierre Yovanovitch (palette ivoire-bronze, EB Garamond), John Pawson (silence, pas de texte hero)

**Next** : screenshot prod → vérifier rendu images → V3 ajustements mobile + possible hero différent si image ne charge pas.
