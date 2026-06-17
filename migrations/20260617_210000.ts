import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "temoignages" (
      "id" serial PRIMARY KEY NOT NULL,
      "nom_client" varchar NOT NULL,
      "projet" varchar,
      "texte" varchar NOT NULL,
      "note" varchar,
      "published" boolean DEFAULT true,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "temoignages_updated_at_idx" ON "temoignages" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "temoignages_created_at_idx" ON "temoignages" USING btree ("created_at");

    CREATE TABLE IF NOT EXISTS "inquiries" (
      "id" serial PRIMARY KEY NOT NULL,
      "nom" varchar NOT NULL,
      "email" varchar NOT NULL,
      "telephone" varchar,
      "message" varchar NOT NULL,
      "projet_type" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "inquiries_updated_at_idx" ON "inquiries" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "temoignages";
    DROP TABLE IF EXISTS "inquiries";
  `);
}
