import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { migrations as prodMigrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-in-prod',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Rosae Rénovation',
    },
  },

  i18n: {
    fallbackLanguage: 'fr',
  },

  /* ─── Collections ───────────────────────────────────────── */
  collections: [
    /* Users */
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
        group: 'Administration',
      },
      labels: {
        singular: 'Utilisateur',
        plural: 'Utilisateurs',
      },
      fields: [],
    },

    /* Media */
    {
      slug: 'media',
      upload: {
        staticDir: path.resolve(dirname, 'public/media'),
        imageSizes: [
          { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
          { name: 'card', width: 900, height: 600, position: 'centre' },
          { name: 'hero', width: 1800, height: 1200, position: 'centre' },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
      },
      labels: {
        singular: 'Média',
        plural: 'Médias',
      },
      admin: {
        group: 'Contenu',
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
          label: 'Texte alternatif (description pour accessibilité)',
        },
      ],
    },

    /* Réalisations */
    {
      slug: 'realisations',
      labels: {
        singular: 'Réalisation',
        plural: 'Réalisations',
      },
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'subtitle', 'published', 'order'],
        group: 'Contenu',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titre (ex : Appartement — Paris 7e)',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Sous-titre (ex : Rénovation complète · 120 m²)',
        },
        {
          name: 'cover_image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image principale',
        },
        {
          name: 'gallery',
          type: 'array',
          label: 'Galerie photos',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Photo',
            },
          ],
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            position: 'sidebar',
          },
          label: 'Identifiant URL',
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: {
            position: 'sidebar',
          },
          label: "Ordre d'affichage",
        },
        {
          name: 'published',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            position: 'sidebar',
          },
          label: 'Publié (visible sur le site)',
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            position: 'sidebar',
          },
          label: 'Mis en avant (page projets)',
        },
        {
          name: 'lieu',
          type: 'text',
          label: 'Lieu (ex : Paris 7e)',
        },
        {
          name: 'surface',
          type: 'number',
          label: 'Surface (m²)',
        },
        {
          name: 'duree',
          type: 'text',
          label: 'Durée des travaux (ex : 14 semaines)',
        },
        {
          name: 'annee',
          type: 'number',
          label: 'Année de livraison',
        },
        {
          name: 'type_intervention',
          type: 'select',
          label: "Type d'intervention",
          options: [
            { label: 'Rénovation complète', value: 'renovation_complete' },
            { label: 'Rénovation partielle', value: 'renovation_partielle' },
            { label: 'Aménagement', value: 'amenagement' },
            { label: 'Restauration', value: 'restauration' },
          ],
        },
        {
          name: 'architecte_associe',
          type: 'text',
          label: 'Architecte associé (optionnel)',
        },
        {
          name: 'photographe',
          type: 'text',
          label: 'Crédit photographe (optionnel)',
        },
        {
          name: 'narration',
          type: 'richText',
          editor: lexicalEditor({}),
          label: 'Description narrative du projet',
        },
        {
          name: 'points_cles',
          type: 'array',
          label: 'Points clés (liste à puces)',
          fields: [
            {
              name: 'texte',
              type: 'text',
              required: true,
              label: 'Point clé',
            },
          ],
        },
      ],
    },

    /* Services */
    {
      slug: 'services',
      labels: {
        singular: 'Service',
        plural: 'Services',
      },
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'order'],
        group: 'Contenu',
      },
      fields: [
        {
          name: 'num',
          type: 'text',
          label: 'Numéro (ex : 01)',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titre du service',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: {
            position: 'sidebar',
          },
          label: "Ordre d'affichage",
        },
      ],
    },

    /* Engagements */
    {
      slug: 'engagements',
      labels: {
        singular: 'Engagement',
        plural: 'Engagements',
      },
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'order'],
        group: 'Contenu',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: "Titre de l'engagement",
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: {
            position: 'sidebar',
          },
          label: "Ordre d'affichage",
        },
      ],
    },

    /* Témoignages */
    {
      slug: 'temoignages',
      labels: {
        singular: 'Témoignage',
        plural: 'Témoignages',
      },
      admin: {
        useAsTitle: 'nom_client',
        defaultColumns: ['nom_client', 'projet', 'published', 'order'],
        group: 'Contenu',
      },
      fields: [
        {
          name: 'nom_client',
          type: 'text',
          required: true,
          label: 'Nom du client',
        },
        {
          name: 'projet',
          type: 'text',
          label: 'Projet (ex : Appartement — Paris 7e)',
        },
        {
          name: 'texte',
          type: 'textarea',
          required: true,
          label: 'Texte du témoignage',
        },
        {
          name: 'note',
          type: 'select',
          label: 'Note',
          options: [
            { label: '5 / 5', value: '5' },
            { label: '4 / 5', value: '4' },
            { label: '3 / 5', value: '3' },
          ],
        },
        {
          name: 'published',
          type: 'checkbox',
          defaultValue: true,
          admin: { position: 'sidebar' },
          label: 'Publié',
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: { position: 'sidebar' },
          label: "Ordre d'affichage",
        },
      ],
    },

    /* Architectes partenaires (CRM interne) */
    {
      slug: 'architectes_partenaires',
      labels: {
        singular: 'Architecte partenaire',
        plural: 'Architectes partenaires',
      },
      admin: {
        useAsTitle: 'nom',
        defaultColumns: ['nom', 'studio', 'niveau', 'actif'],
        group: 'Partenaires',
      },
      fields: [
        {
          name: 'nom',
          type: 'text',
          required: true,
          label: 'Nom complet',
        },
        {
          name: 'studio',
          type: 'text',
          label: 'Studio / Cabinet',
        },
        {
          name: 'lieu',
          type: 'text',
          label: 'Lieu (Paris, IDF…)',
        },
        {
          name: 'email_contact',
          type: 'email',
          label: 'Email de contact',
        },
        {
          name: 'telephone',
          type: 'text',
          label: 'Téléphone',
        },
        {
          name: 'site_web',
          type: 'text',
          label: 'Site web (URL)',
        },
        {
          name: 'specialites',
          type: 'array',
          label: 'Spécialités',
          fields: [
            {
              name: 'texte',
              type: 'text',
              required: true,
              label: 'Spécialité',
            },
          ],
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          label: 'Photo / Logo',
        },
        {
          name: 'partenaire_depuis',
          type: 'date',
          label: 'Partenaire depuis',
        },
        {
          name: 'projets_realises_ensemble',
          type: 'relationship',
          relationTo: 'realisations',
          hasMany: true,
          label: 'Réalisations communes',
        },
        {
          name: 'taux_commission',
          type: 'number',
          label: 'Taux de commission (%)',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'niveau',
          type: 'select',
          label: 'Niveau de partenariat',
          options: [
            { label: 'Apporteur ponctuel', value: 'apporteur' },
            { label: 'Partenaire récurrent', value: 'recurrent' },
            { label: 'Premium', value: 'premium' },
          ],
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'actif',
          type: 'checkbox',
          defaultValue: true,
          label: 'Partenaire actif',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'notes_internes',
          type: 'richText',
          editor: lexicalEditor({}),
          label: 'Notes internes (non public)',
        },
      ],
    },

    /* Demandes architectes (formulaire /architectes) */
    {
      slug: 'demandes_architectes',
      labels: {
        singular: 'Demande architecte',
        plural: 'Demandes architectes',
      },
      admin: {
        useAsTitle: 'nom',
        defaultColumns: ['nom', 'studio', 'email', 'createdAt'],
        group: 'Partenaires',
      },
      fields: [
        {
          name: 'nom',
          type: 'text',
          required: true,
          label: 'Nom',
        },
        {
          name: 'studio',
          type: 'text',
          label: 'Studio / Cabinet',
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Email',
        },
        {
          name: 'telephone',
          type: 'text',
          label: 'Téléphone',
        },
        {
          name: 'site',
          type: 'text',
          label: 'Site web',
        },
        {
          name: 'projet',
          type: 'textarea',
          label: 'Nature du projet à venir',
        },
        {
          name: 'message',
          type: 'textarea',
          required: true,
          label: 'Message',
        },
      ],
    },

    /* Newsletter — Carnet Rosae */
    {
      slug: 'newsletter_subscribers',
      labels: {
        singular: 'Abonné newsletter',
        plural: 'Abonnés newsletter',
      },
      admin: {
        useAsTitle: 'email',
        defaultColumns: ['email', 'prenom', 'source', 'createdAt'],
        group: 'Administration',
      },
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          unique: true,
          label: 'Adresse email',
        },
        {
          name: 'prenom',
          type: 'text',
          label: 'Prénom (optionnel)',
        },
        {
          name: 'source',
          type: 'text',
          label: 'Source (journal, footer…)',
          admin: { position: 'sidebar' },
        },
      ],
    },

    /* Demandes de contact */
    {
      slug: 'inquiries',
      labels: {
        singular: 'Demande de contact',
        plural: 'Demandes de contact',
      },
      admin: {
        useAsTitle: 'nom',
        defaultColumns: ['nom', 'email', 'projet_type', 'createdAt'],
        group: 'Administration',
      },
      fields: [
        {
          name: 'nom',
          type: 'text',
          required: true,
          label: 'Nom',
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Email',
        },
        {
          name: 'telephone',
          type: 'text',
          label: 'Téléphone',
        },
        {
          name: 'message',
          type: 'textarea',
          required: true,
          label: 'Message',
        },
        {
          name: 'projet_type',
          type: 'select',
          label: 'Type de projet',
          options: [
            { label: 'Rénovation complète', value: 'complet' },
            { label: 'Rénovation partielle', value: 'partiel' },
            { label: 'Aménagement', value: 'amenagement' },
            { label: 'Autre', value: 'autre' },
          ],
        },
      ],
    },
  ],

  /* ─── Globals ───────────────────────────────────────────── */
  globals: [
    {
      slug: 'home',
      label: "Page d'accueil",
      admin: {
        group: 'Paramètres',
      },
      fields: [
        {
          name: 'hero_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image hero (grande photo en haut)',
        },
        {
          name: 'hero_video_url',
          type: 'text',
          label: 'Vidéo hero (URL — mp4 ou m3u8, optionnel)',
          admin: {
            description: 'Si renseignée, la vidéo remplace la photo hero. Laisser vide pour utiliser uniquement la photo.',
          },
        },
        {
          name: 'intro_text',
          type: 'richText',
          editor: lexicalEditor({}),
          label: "Texte d'introduction (paragraphe principal)",
        },
        {
          name: 'comprehension_text',
          type: 'textarea',
          label: 'Citation barre gauche (texte encadré)',
        },
        {
          name: 'citation_texte',
          type: 'textarea',
          label: 'Citation fondateur (texte)',
        },
        {
          name: 'citation_auteur_nom',
          type: 'text',
          label: 'Nom de l\'auteur de la citation',
          defaultValue: 'Stéphane Beilin',
        },
        {
          name: 'citation_auteur_titre',
          type: 'text',
          label: 'Titre de l\'auteur',
          defaultValue: 'Fondateur · Rosae',
        },
      ],
    },

    {
      slug: 'contact',
      label: 'Contact',
      admin: {
        group: 'Paramètres',
      },
      fields: [
        {
          name: 'cta_title',
          type: 'text',
          label: "Titre de la section contact",
          defaultValue: 'Parlons de votre projet.',
        },
        {
          name: 'cta_subtitle',
          type: 'textarea',
          label: 'Texte sous le titre',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Numéro de téléphone',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Adresse email',
        },
        {
          name: 'address',
          type: 'text',
          label: 'Adresse (optionnel)',
        },
        {
          name: 'calendar_url',
          type: 'text',
          label: 'Lien Cal.com (ex : rosae-renovation/devis)',
          admin: {
            description: 'Partie après cal.com/ dans votre lien de réservation. Laisser vide pour désactiver le calendrier en ligne.',
          },
        },
      ],
    },
  ],

  /* ─── Database ──────────────────────────────────────────── */
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    prodMigrations,
  }),

  /* ─── Editor ────────────────────────────────────────────── */
  editor: lexicalEditor({}),

  /* ─── Storage ───────────────────────────────────────────── */
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],

  /* ─── TypeScript types output ───────────────────────────── */
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
