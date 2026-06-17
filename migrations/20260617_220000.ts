import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "articles" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "excerpt" varchar,
      "cover_image_id" integer,
      "contenu" jsonb,
      "categorie" varchar,
      "slug" varchar NOT NULL,
      "published" boolean DEFAULT false,
      "date_publication" timestamp(3) with time zone,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "articles_slug_unique" UNIQUE("slug")
    );
    CREATE INDEX IF NOT EXISTS "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "articles_created_at_idx" ON "articles" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "articles_slug_idx" ON "articles" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "articles_date_publication_idx" ON "articles" USING btree ("date_publication");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "articles";`);
}
