# Audit Rosae Rénovation — Vers un site 5 étoiles

Référentiel comparatif : Joseph Dirand Studio, Studio KO, Pierre Yovanovitch, Liaigre,
Humbert & Poyet, Maxime d'Angeac, Studio Parisien.

---

## Légende

| Sévérité | Signification |
|----------|---------------|
| **P0** | Bloquant — absent ou cassé, crédibilité immédiatement impactée |
| **P1** | Important — nettement en-dessous des références, à corriger sous 2 semaines |
| **P2** | Amélioration — différencie un bon site d'un site d'excellence |

---

## 01 — À propos / Studio

| # | Constat | Sévérité |
|---|---------|----------|
| 1.1 | **Page `/studio` inexistante.** Toutes les références ont une page "Qui sommes-nous" avec portrait du fondateur, philosophie de l'atelier, équipe clé. Rosae n'en a aucune. | **P0** |
| 1.2 | Aucune photo d'équipe ou portrait de Stéphane Beilin sur le site. | P1 |
| 1.3 | Pas de date de fondation, pas d'ancrage géographique narratif (Paris, Île-de-France). | P1 |
| 1.4 | La citation Beilin n'existe que sur la homepage — elle mériterait une page Studio pour lui donner de l'espace. | P2 |

---

## 02 — Méthode / Process

| # | Constat | Sévérité |
|---|---------|----------|
| 2.1 | **Page `/methode` inexistante.** Liaigre et Dirand détaillent leur processus en 4–6 étapes illustrées. Rosae n'en a aucune. | **P0** |
| 2.2 | La section Services sur la homepage reste très générique (3 items, pas d'illustration de la démarche). | P1 |
| 2.3 | Pas de mention du processus d'onboarding client (RDV initial, visite chantier, devis, etc.). | P1 |

---

## 03 — Galerie Projets

| # | Constat | Sévérité |
|---|---------|----------|
| 3.1 | **Toutes les images sont Unsplash**, non représentatives de vrais chantiers Rosae. | **P0** |
| 3.2 | La page de détail d'une réalisation n'exploite pas les nouveaux champs Payload (lieu, surface, narration, points_cles, type_intervention). | **P0** |
| 3.3 | Pas de lightbox sur la galerie photos : l'utilisateur ne peut pas zoomer sur les détails d'exécution. | P1 |
| 3.4 | Pas de navigation prev/next entre projets. | P1 |
| 3.5 | Pas de filtrage par type d'intervention sur `/realisations`. | P2 |
| 3.6 | Grid `/realisations` manque de hiérarchie éditoriale — toutes les cartes ont la même taille. | P2 |

---

## 04 — Témoignages

| # | Constat | Sévérité |
|---|---------|----------|
| 4.1 | **Aucun témoignage client** sur l'ensemble du site. Studio KO et Yovanovitch affichent des citations clients dans les pages projets et en homepage. | **P0** |
| 4.2 | Pas de collection Payload `temoignages` permettant au client d'ajouter des avis. | P1 |
| 4.3 | Pas d'intégration Google Reviews / Houzz. | P2 |

---

## 05 — Partenaires

| # | Constat | Sévérité |
|---|---------|----------|
| 5.1 | **Aucune mention des partenaires** (fournisseurs, architectes avec qui Rosae travaille régulièrement). Les références du secteur les affichent. | P1 |
| 5.2 | Pas de page `/partenaires` ou de section dédiée. | P2 |

---

## 06 — Presse / Distinctions

| # | Constat | Sévérité |
|---|---------|----------|
| 6.1 | Pas de section presse (logos médias, citations d'articles). | P1 |
| 6.2 | Pas de page `/presse`. | P2 |

---

## 07 — Journal / Blog

| # | Constat | Sévérité |
|---|---------|----------|
| 7.1 | Pas de contenu éditorial ("chantiers en cours", "articles métier"). Dirand et Studio KO publient du contenu régulier qui nourrit le SEO et l'image. | P1 |
| 7.2 | Pas de collection `articles` dans Payload. | P2 |

---

## 08 — Contact étoffé

| # | Constat | Sévérité |
|---|---------|----------|
| 8.1 | Le champ `calendar_url` (Cal.com) est configurable mais pas encore renseigné en prod — le bouton de rendez-vous ne fonctionne pas. | **P0** |
| 8.2 | Pas d'horaires de disponibilité mentionnés. | P2 |
| 8.3 | Pas de formulaire de contact alternatif (email + message) pour les prospects qui ne veulent pas appeler ni réserver en ligne. | P1 |
| 8.4 | Adresse physique absente (Payload a le champ, mais il n'est pas rempli). | P2 |

---

## 09 — FAQ

| # | Constat | Sévérité |
|---|---------|----------|
| 9.1 | Pas de FAQ sur les délais, devis, types d'intervention, zone géographique couverte. Les références premium répondent aux objections en ligne. | P1 |
| 9.2 | Pas de section FAQ sur `/services` ou `/contact`. | P2 |

---

## 10 — Mentions légales / Confidentialité

| # | Constat | Sévérité |
|---|---------|----------|
| 10.1 | **Pages `/mentions-legales` et `/confidentialite` inexistantes.** Obligatoires légalement (RGPD, loi Confiance numérique). | **P0** |
| 10.2 | Footer pointe vers `#` pour les mentions légales. | **P0** |
| 10.3 | Aucune politique de cookies — seulement required si cookies tiers actifs. Cal.com en pose si intégré. | P1 |

---

## 11 — SEO

| # | Constat | Sévérité |
|---|---------|----------|
| 11.1 | `generateMetadata` présent sur `/realisations/[slug]` mais `description` utilise un fallback générique. | P1 |
| 11.2 | **Pas d'Open Graph image** sur aucune page (pas de `og:image`). Les partages sur LinkedIn/WhatsApp n'affichent pas d'image. | P1 |
| 11.3 | **Pas de JSON-LD** (LocalBusiness, Service, BreadcrumbList). Impact direct sur l'affichage enrichi Google. | P1 |
| 11.4 | Pas de `sitemap.xml`. Next.js peut le générer automatiquement via `app/sitemap.ts`. | P1 |
| 11.5 | Pas de `robots.txt`. | P2 |
| 11.6 | Balises canoniques absentes. | P2 |
| 11.7 | Les mots-clés "rénovation intérieure Paris", "entreprise générale Paris", "rénovation appartement haussmannien" ne sont pas utilisés de manière stratégique dans les `<h1>` / `description`. | P1 |

---

## 12 — Performance (Lighthouse)

| # | Constat | Sévérité |
|---|---------|----------|
| 12.1 | Images Unsplash sans `width`/`height` explicites → risque de CLS. | P1 |
| 12.2 | `force-dynamic` sur toutes les pages désactive le cache statique Next.js → LCP plus lent. À revisiter une fois le contenu stable. | P1 |
| 12.3 | Cal.com embed.js chargé au montage même si non configuré — risque de ralentissement inutile. Déjà géré : chargement conditionnel sur `calLink`. | ✅ |
| 12.4 | Pas de `preconnect` vers `app.cal.com` ou `images.unsplash.com`. | P2 |
| 12.5 | EB Garamond chargé via Google Fonts (`next/font`) avec `display: swap` — OK. | ✅ |

---

## 13 — Accessibilité

| # | Constat | Sévérité |
|---|---------|----------|
| 13.1 | Les images héros ont `alt=""` et `aria-hidden="true"` — correct pour images décoratives. | ✅ |
| 13.2 | Images galerie ont des `alt` descriptifs. | ✅ |
| 13.3 | Navigation mobile (hamburger) : pas de `aria-expanded`, `aria-controls`, `aria-label` complets sur le bouton toggle. | P1 |
| 13.4 | Contraste `--text-2` (#68625A) sur `--bg` (#F2EFE9) = ~4.2:1 — passe WCAG AA mais juste. À vérifier avec les tailles de texte réelles (< 14px = risque). | P1 |
| 13.5 | Pas de `skip-to-content` link. | P2 |
| 13.6 | Pas de gestion du focus visible (outline) distincte des styles navigateur. | P2 |

---

## Résumé des priorités

### P0 — À traiter immédiatement (bloquants)

- [ ] `/studio` page (identité, fondateur, philosophie)
- [ ] `/methode` page (processus client)
- [ ] Page de détail réalisation exploitant les nouveaux champs Payload
- [ ] Photos réelles Rosae (remplacer Unsplash)
- [ ] Témoignages clients
- [ ] Configurer `calendar_url` en production
- [ ] `/mentions-legales` et `/confidentialite`
- [ ] Footer : corriger le lien `#` vers `/mentions-legales`

### P1 — Sous 2 semaines

- [ ] Portrait / photo équipe
- [ ] Formulaire de contact alternatif
- [ ] Lightbox galerie sur détail projet
- [ ] Nav prev/next entre projets
- [ ] Open Graph images
- [ ] JSON-LD (LocalBusiness + BreadcrumbList)
- [ ] Sitemap XML (`app/sitemap.ts`)
- [ ] Aria sur hamburger nav
- [ ] SEO keywords stratégiques dans titres + meta descriptions
- [ ] Vérification contraste WCAG AA sur textes < 14px

### P2 — Dans les 4 semaines

- [ ] Page `/partenaires`
- [ ] Page `/journal`
- [ ] Filtrage projets par type
- [ ] FAQ
- [ ] `robots.txt`
- [ ] `preconnect` hints
- [ ] Skip-to-content link
- [ ] Focus visible styles
