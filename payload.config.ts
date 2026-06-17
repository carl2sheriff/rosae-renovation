import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { migrations } from './migrations'

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
      ],
    },
  ],

  /* ─── Database ──────────────────────────────────────────── */
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    migrations,
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
