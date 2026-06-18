// SEED placeholder — à remplacer par les vraies réalisations Stéphane Beilin dès qu'il fournit ses photos
// Run: node scripts/seed-realisations.js

const { Client } = require('pg');
const { randomUUID } = require('crypto');

const DB_URL =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_nXdQixo93IBf@ep-withered-shadow-abiflhps.eu-west-2.aws.neon.tech/neondb?sslmode=require';

// ── Lexical richText helper ────────────────────────────────────────────────
function richText(paragraphs) {
  return {
    root: {
      children: paragraphs.map((text) => ({
        children: [{ detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  };
}

// ── Unsplash URL helper ────────────────────────────────────────────────────
function unsplash(photoId, w = 1800, h = 1200) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;
}

// ── Seed data ──────────────────────────────────────────────────────────────

// Each project defines: cover + gallery images, then the realisation fields
const PROJECTS = [
  // ── 1. Restauration — Hôtel particulier · Paris 8e ──────────────────
  {
    title: 'Restauration — Hôtel particulier · Paris 8e',
    subtitle: 'Boiseries XVIIIe + cheminée Carrare · 320 m²',
    slug: 'restauration-hotel-particulier-paris-8',
    lieu: 'Paris 8e',
    surface: 320,
    duree: '22 semaines',
    annee: 2023,
    type_intervention: 'restauration',
    architecte_associe: 'Atelier Paluel Marmont APM',
    featured: true,
    order: 10,
    cover: {
      photoId: 'photo-1600607687920-4e2a09cf159d',
      alt: 'Salon principal, hôtel particulier Paris 8e — boiseries XVIIIe restaurées',
    },
    gallery: [
      { photoId: 'photo-1583847268964-b28dc8f51f92', alt: 'Détail cheminée marbre Carrare' },
      { photoId: 'photo-1618219944342-824e40a13285', alt: 'Parquet point de Hongrie restauré' },
      { photoId: 'photo-1616046229478-9901c5536a45', alt: 'Antichambre, moulures dorées' },
      { photoId: 'photo-1513694203232-719a280e022f', alt: 'Vue d\'ensemble séjour double' },
    ],
    narration: richText([
      "L'immeuble était classé. Cela imposait un protocole strict : chaque intervention sur les boiseries XVIIIe du grand salon devait être documentée, validée, réversible.",
      "Nous avons commencé par les boiseries elles-mêmes. Trente-deux panneaux, dont sept présentaient des soulèvements de la couche picturale. Le choix s'est posé entre consolidation à la japonaise ou décapage complet. Avec l'architecte des Bâtiments de France, la décision a été prise de conserver la polychromie d'origine : décapage chimique doux, consolidation résine époxy, repolissage à la main.",
      "La cheminée Régence en marbre de Carrare posait un autre problème. Plusieurs congères étaient fissurées — non structurellement, mais visiblement. Les marbriers ont travaillé pièce par pièce, en taillant les comblements dans du Carrare de même veine prélevé en carrière en Toscane. Chaque dalle a été choisie sur quai.",
      "Les parquets — point de Hongrie en chêne massif — avaient été recouverts d'une moquette synthétique dans les années 1980. On les a découverts en très bon état. Ponçage, bouvetage des languettes décollées, finition à l'huile naturelle avec une légère teinte cérusée. Aucune lame n'a été remplacée.",
    ]),
    points_cles: [
      'Boiseries classées XVIIIe décapées et repolies à la main (consolidation résine époxy)',
      'Cheminée Régence marbre Carrare — joints refaits à la chaux, veines raccordées sur quai',
      'Parquet point de Hongrie chêne massif poncé et huilé, aucun remplacement',
      'Dorures moulures retravaillées à la feuille d\'or 23 carats',
    ],
  },

  // ── 2. Restauration — Appartement 1930 · Paris 7e ───────────────────
  {
    title: 'Restauration — Appartement 1930 · Paris 7e',
    subtitle: 'Parquet Versailles + cheminées Art déco · 185 m²',
    slug: 'restauration-appartement-1930-paris-7',
    lieu: 'Paris 7e',
    surface: 185,
    duree: '16 semaines',
    annee: 2024,
    type_intervention: 'restauration',
    architecte_associe: 'Séverine de Lanversin',
    featured: false,
    order: 20,
    cover: {
      photoId: 'photo-1616046229478-9901c5536a45',
      alt: 'Séjour principal, parquet Versailles en chêne restauré, Paris 7e',
    },
    gallery: [
      { photoId: 'photo-1586023492125-27b2c045efd7', alt: 'Cheminée Art déco marbre vert de Suède' },
      { photoId: 'photo-1522708323590-d24dbb6b0267', alt: 'Chambre principale, lambris gris de Lin' },
      { photoId: 'photo-1566665797739-1674de7a421a', alt: 'Bibliothèque encadrée boiserie' },
      { photoId: 'photo-1597047084897-51e81819a499', alt: 'Couloir, carrelage faïence découvert' },
    ],
    narration: richText([
      "L'appartement avait traversé les décennies sans grande transformation. C'est précisément ce qui en faisait la valeur : le parquet Versailles en chêne massif de l'entre-deux-guerres, les lambris peints couleur gris de Lin, les cheminées Art déco en marbre vert de Suède.",
      "La restauration a duré seize semaines. L'enjeu principal résidait dans le parquet : 90 m² de Versailles dont certains caissons avaient joué, d'autres s'étaient soulevés sous l'effet d'une ancienne fuite. Nous avons déposé les zones abîmées, reconstitué les manques avec du chêne de même calibre, puis poncé l'ensemble à plat.",
      "Les cheminées présentaient des fissurations superficielles dans le marbre et des joints hors d'usage. Le fumiste a repris l'ensemble des carnaux, posé des conduits de tubage conformes, puis les marbriers ont rejointé à la chaux de Lecce — un mortier traditionnel de teinte ivoire qui se fond dans la matière sans raideur.",
      "L'une des cheminées du bureau dissimulait, sous son tablier, un ancien carrelage en faïence peinte de l'atelier Sarreguemines. On l'a découvert en fin de démontage. Il est resté en place.",
    ]),
    points_cles: [
      'Parquet Versailles chêne massif — dépose zones dégradées, reconstitution à l\'identique',
      'Tubage intégral des trois cheminées, conformité DTU 24.1',
      'Joints marbre refaits à la chaux de Lecce (teinte ivoire naturelle)',
      'Carrelage faïence Sarreguemines conservé in situ après découverte',
    ],
  },

  // ── 3. Aménagement — Loft · Paris 11e ──────────────────────────────
  {
    title: 'Aménagement — Loft · Paris 11e',
    subtitle: 'Bibliothèque sol-plafond + béton ciré · 160 m²',
    slug: 'amenagement-loft-paris-11',
    lieu: 'Paris 11e',
    surface: 160,
    duree: '14 semaines',
    annee: 2024,
    type_intervention: 'amenagement',
    architecte_associe: 'Stéphanie Délégué',
    featured: false,
    order: 30,
    cover: {
      photoId: 'photo-1586023492125-27b2c045efd7',
      alt: 'Loft Paris 11e — bibliothèque ébénisterie chêne du sol au plafond',
    },
    gallery: [
      { photoId: 'photo-1616486338812-3dadae4b4ace', alt: 'Cuisine ouverte inox brossé et chêne massif' },
      { photoId: 'photo-1556909114-f6e7ad7d3136', alt: 'Détail plan de travail inox plié d\'une pièce' },
      { photoId: 'photo-1595526114035-0d45ed16cfad', alt: 'Chambre, béton ciré continu' },
      { photoId: 'photo-1600566753086-00f18fb6b3ea', alt: 'Vue d\'ensemble loft, double hauteur' },
    ],
    narration: richText([
      "La hauteur sous plafond était le point de départ : 6,10 m, une dalle béton brut, et un plan quasi libre. Stéphanie Délégué avait posé comme exigence que la bibliothèque mange tout le pignon nord — du sol au plafond, sans interruption.",
      "L'ébénisterie a été réalisée par un atelier du faubourg Saint-Antoine. Seize jours de pose, en partant du bas. Les tablettes sont en chêne massif naturel (35 mm d'épaisseur), les montants en MDF laqué blanc cassé. Pas de câbles, pas d'éclairage intégré — une décision assumée pour ne pas briser la lecture de la masse de chêne.",
      "Au sol, le béton ciré a été appliqué sur la dalle existante après ponçage mécanique. Deux couches de résine époxy, une couche de cire de finition. Pas de joints, pas de recoupement : un seul plan continu de 160 m².",
      "La cuisine ouverte, en inox brossé et chêne massif, reprend le même vocabulaire : matières industrielles traitées à l'artisanal. Le plan de travail en inox a été plié en une seule pièce de 3,20 m, gorge intégrée.",
    ]),
    points_cles: [
      'Bibliothèque ébénisterie chêne massif du sol au plafond (6,10 m) — atelier Saint-Antoine',
      'Béton ciré sur dalle existante, sans joint, plan continu 160 m²',
      'Cuisine inox brossé et chêne massif — plan de travail plié d\'une pièce (3,20 m)',
      'Structure acier HEA conservée, passivée et intégrée au volume',
    ],
  },

  // ── 4. Aménagement — Penthouse · Paris 16e ──────────────────────────
  {
    title: 'Aménagement — Penthouse · Paris 16e',
    subtitle: 'Cuisine verrière + chêne fumé · 210 m²',
    slug: 'amenagement-penthouse-paris-16',
    lieu: 'Paris 16e',
    surface: 210,
    duree: '18 semaines',
    annee: 2025,
    type_intervention: 'amenagement',
    architecte_associe: 'Caroline des Cars',
    featured: true,
    order: 40,
    cover: {
      photoId: 'photo-1631679706909-1844bbd07221',
      alt: 'Penthouse Paris 16e — séjour vue terrasse, verrière d\'angle acier noir',
    },
    gallery: [
      { photoId: 'photo-1556909172-54557c7e4fb7', alt: 'Cuisine chêne fumé et granit gris anthracite' },
      { photoId: 'photo-1552321554-5fefe8c9ef14', alt: 'Détail verrière acier thermolaqué noir' },
      { photoId: 'photo-1615529162924-f8605388461d', alt: 'Salle de bain marbre et bois' },
      { photoId: 'photo-1598928506311-c55ded91a20c', alt: 'Terrasse bois ipe, vue Paris' },
    ],
    narration: richText([
      "Le penthouse avait tout pour lui sauf une pièce maîtresse : la cuisine était logée dans un couloir sombre, sans vue. Caroline des Cars a suggéré de la déplacer en angle sur la terrasse, derrière une verrière d'atelier. Un déplacement de réseau de 4 ml pour les fluides, une ouverture à créer en façade.",
      "La verrière — 5 ml en angle, structure acier thermolaquée noir — a été fabriquée sur mesure par une serrurerie en Seine-Saint-Denis, livrée en deux panneaux assemblés sur site. L'étanchéité a été la contrainte principale : accès pompier, règles de copropriété, voisins à l'étage.",
      "La cuisine en chêne fumé et granit gris anthracite reprend le vocabulaire de la verrière : noir et bois, masse et légèreté. Les façades sont en placage chêne fumé sur substrat hydrofuge. Le granit, livré en dalles de 3,20 m × 1,40 m, a été découpé et posé jointif.",
      "Le plancher chauffant hydraulique a été intégré dans un ragréage de 45 mm, posé sur la dalle existante après traitement primaire. La chape autonivelante a permis de supprimer les seuils entre les pièces — un seul niveau continu sur 210 m².",
    ]),
    points_cles: [
      'Verrière d\'angle 5 ml, acier thermolaqué noir, fabrication sur mesure',
      'Cuisine chêne fumé et granit anthracite — dalles 3,20 m posées jointives',
      'Plancher chauffant hydraulique intégré dans ragréage 45 mm (sans seuils)',
      'Déplacement réseau fluides 4 ml pour repositionner la cuisine en façade',
    ],
  },

  // ── 5. Rénovation partielle — Appartement · Neuilly-sur-Seine ───────
  {
    title: 'Rénovation partielle — Appartement · Neuilly',
    subtitle: 'Salle de bain monolithique Calacatta · 95 m²',
    slug: 'renovation-partielle-appartement-neuilly',
    lieu: 'Neuilly-sur-Seine',
    surface: 95,
    duree: '8 semaines',
    annee: 2022,
    type_intervention: 'renovation_partielle',
    architecte_associe: null,
    featured: false,
    order: 50,
    cover: {
      photoId: 'photo-1615529179035-e760f6a2dcee',
      alt: 'Salle de bain monolithique marbre Calacatta oro, Neuilly-sur-Seine',
    },
    gallery: [
      { photoId: 'photo-1571624436279-b272aff752b5', alt: 'Douche italienne 180 × 90 cm, bonde encastrée' },
      { photoId: 'photo-1615529162924-f8605388461d', alt: 'Détail vasque onyx miel sur console laiton' },
      { photoId: 'photo-1590381105924-c72589b9ef3f', alt: 'Vue d\'ensemble, veines Calacatta raccordées' },
      { photoId: 'photo-1552321554-5fefe8c9ef14', alt: 'Robinetterie laiton brossé Vola' },
    ],
    narration: richText([
      "La salle de bain n'était pas grande — 9 m². L'objectif n'était pas de l'agrandir, mais de lui donner une présence.",
      "Le choix du Calacatta oro extra s'est imposé rapidement. Un marbre à fond blanc, avec des veines dorées larges et des inclusions de gris bleuté. La contrainte : les veines devaient se suivre d'un mur à l'autre, sans rupture. La carrière a sélectionné quatre blocs issus du même front de taille. Chaque dalle a été numérotée avant découpe, livrée dans l'ordre.",
      "La douche à l'italienne — 180 × 90 cm — fonctionne sans receveur ni joint de dilatation apparent : la pente est intégrée directement dans la chape (1,5 % vers la bonde). Le seuil entre la douche et le reste de la pièce est un simple congé en marbre poli.",
      "La vasque est monolithique : taillée dans un bloc d'onyx miel de 60 × 40 × 18 cm. Le poids (42 kg) imposait un support spécifique — une console en laiton massif, fixée à huit chevilles chimiques dans la maçonnerie.",
    ]),
    points_cles: [
      'Marbre Calacatta oro extra — veines raccordées mur à mur (4 blocs même front de taille)',
      'Douche italienne sans joint apparent, pente 1,5 % intégrée en chape',
      'Vasque monolithique onyx miel (42 kg) sur console laiton massif',
      'Robinetterie Vola série T39 laiton brossé',
    ],
  },

  // ── 6. Rénovation complète — Maison de ville · Vincennes ─────────────
  {
    title: 'Rénovation complète — Maison de ville · Vincennes',
    subtitle: 'Extension ossature bois + double hauteur · 240 m²',
    slug: 'renovation-complete-maison-vincennes',
    lieu: 'Vincennes',
    surface: 240,
    duree: '24 semaines',
    annee: 2024,
    type_intervention: 'renovation_complete',
    architecte_associe: 'Atelier Paluel Marmont APM',
    featured: false,
    order: 60,
    cover: {
      photoId: 'photo-1600210492486-724fe5c67fb0',
      alt: 'Maison de ville rénovée Vincennes — séjour double hauteur, mezzanine acier',
    },
    gallery: [
      { photoId: 'photo-1497366216548-37526070297c', alt: 'Mezzanine acier HEA et escalier chêne' },
      { photoId: 'photo-1600585154340-be6161a56a0c', alt: 'Extension ossature bois, façade bois brûlé' },
      { photoId: 'photo-1618219944342-824e40a13285', alt: 'Cuisine repensée, ouverture IPN 7 ml' },
      { photoId: 'photo-1583847268964-b28dc8f51f92', alt: 'Vue nuit, terrasse bois ipe' },
    ],
    narration: richText([
      "La maison de ville avait été construite en 1968 sur trois niveaux. La structure portait, mais le reste — distribution, enveloppe, équipements — était à repenser intégralement.",
      "La première décision a été structurelle : supprimer un mur porteur au rez-de-chaussée pour créer un espace séjour-cuisine ouvert. Un IPN de 7 ml, posé sur plots béton, a permis de reprendre la charge du plancher haut. L'intervention a duré quatre jours, les occupants du dessus maintenus en charge par étaiement provisoire.",
      "Le séjour bénéficie désormais d'une double hauteur partielle — une mezzanine en structure acier (HEA 120, garde-corps lame d'acier brut) a été intégrée côté nord, accessible par un escalier acier-chêne. L'acier a été laissé brut, simplement passivé.",
      "L'extension de 40 m² en ossature bois (BBC, U = 0,15 W/m²K) a été préfabriquée en atelier et levée en deux jours. L'isolation thermique par l'extérieur couvre l'ensemble de l'enveloppe. La consommation énergétique a été ramenée de l'étiquette E à l'étiquette B.",
    ]),
    points_cles: [
      'IPN 7 ml pour suppression mur porteur — étaiement 4 jours, reprise de charge à froid',
      'Mezzanine acier HEA 120, garde-corps lame acier brut, escalier acier-chêne',
      'Extension 40 m² ossature bois préfabriquée, levée en 2 jours (BBC, étiquette B)',
      'ITE 14 cm laine de roche — passage étiquette E → B (DPE)',
    ],
  },
];

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  const client = new Client({ connectionString: DB_URL });
  await client.connect();
  console.log('Connected to DB');

  try {
    await client.query('BEGIN');

    for (const p of PROJECTS) {
      // 1. Insert cover media
      const coverRes = await client.query(
        `INSERT INTO media (alt, url, sizes_card_url, sizes_hero_url, sizes_thumbnail_url,
          mime_type, width, height, filesize,
          sizes_card_width, sizes_card_height, sizes_hero_width, sizes_hero_height,
          sizes_thumbnail_width, sizes_thumbnail_height,
          updated_at, created_at)
         VALUES ($1,$2,$3,$4,$5,'image/jpeg',1800,1200,800000,900,600,1800,1200,400,266,now(),now())
         RETURNING id`,
        [
          p.cover.alt,
          unsplash(p.cover.photoId, 1800, 1200),
          unsplash(p.cover.photoId, 900, 600),
          unsplash(p.cover.photoId, 1800, 1200),
          unsplash(p.cover.photoId, 400, 266),
        ]
      );
      const coverId = coverRes.rows[0].id;

      // 2. Insert gallery media
      const galleryIds = [];
      for (const g of p.gallery) {
        const gRes = await client.query(
          `INSERT INTO media (alt, url, sizes_card_url, sizes_hero_url, sizes_thumbnail_url,
            mime_type, width, height, filesize,
            sizes_card_width, sizes_card_height, sizes_hero_width, sizes_hero_height,
            sizes_thumbnail_width, sizes_thumbnail_height,
            updated_at, created_at)
           VALUES ($1,$2,$3,$4,$5,'image/jpeg',1800,1200,600000,900,600,1800,1200,400,266,now(),now())
           RETURNING id`,
          [
            g.alt,
            unsplash(g.photoId, 1800, 1200),
            unsplash(g.photoId, 900, 600),
            unsplash(g.photoId, 1800, 1200),
            unsplash(g.photoId, 400, 266),
          ]
        );
        galleryIds.push(gRes.rows[0].id);
      }

      // 3. Insert realisation
      const rRes = await client.query(
        `INSERT INTO realisations
          (title, subtitle, slug, lieu, surface, duree, annee, type_intervention,
           architecte_associe, cover_image_id, featured, "order", published, narration,
           updated_at, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,now(),now())
         RETURNING id`,
        [
          p.title,
          p.subtitle,
          p.slug,
          p.lieu,
          p.surface,
          p.duree,
          p.annee,
          p.type_intervention,
          p.architecte_associe,
          coverId,
          p.featured,
          p.order,
          true,
          JSON.stringify(p.narration),
        ]
      );
      const rId = rRes.rows[0].id;

      // 4. Insert gallery rows
      for (let i = 0; i < galleryIds.length; i++) {
        await client.query(
          `INSERT INTO realisations_gallery (_order, _parent_id, id, image_id)
           VALUES ($1,$2,$3,$4)`,
          [i + 1, rId, randomUUID(), galleryIds[i]]
        );
      }

      // 5. Insert points_cles
      for (let i = 0; i < p.points_cles.length; i++) {
        await client.query(
          `INSERT INTO realisations_points_cles (_order, _parent_id, id, texte)
           VALUES ($1,$2,$3,$4)`,
          [i + 1, rId, randomUUID(), p.points_cles[i]]
        );
      }

      console.log(`  Inserted: ${p.slug} (id=${rId}, cover=${coverId})`);
    }

    await client.query('COMMIT');
    console.log('\nSeed complete — 6 projets inserted');
    console.log('Slugs:');
    PROJECTS.forEach((p) => console.log('  /realisations/' + p.slug));
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('ROLLBACK — error:', err.message);
    throw err;
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
