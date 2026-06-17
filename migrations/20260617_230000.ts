import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "architectes_partenaires" (
      "id" serial PRIMARY KEY NOT NULL,
      "nom" varchar NOT NULL,
      "studio" varchar,
      "lieu" varchar,
      "email_contact" varchar,
      "telephone" varchar,
      "site_web" varchar,
      "photo_id" integer,
      "partenaire_depuis" timestamp(3) with time zone,
      "taux_commission" numeric,
      "niveau" varchar,
      "actif" boolean DEFAULT true,
      "notes_internes" jsonb,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "architectes_partenaires_specialites" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "texte" varchar,
      CONSTRAINT "architectes_partenaires_specialites_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "architectes_partenaires"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION
    );

    CREATE TABLE IF NOT EXISTS "architectes_partenaires_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "realisations_id" integer,
      CONSTRAINT "architectes_partenaires_rels_parent_fk"
        FOREIGN KEY ("parent_id") REFERENCES "architectes_partenaires"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION,
      CONSTRAINT "architectes_partenaires_rels_realisations_fk"
        FOREIGN KEY ("realisations_id") REFERENCES "realisations"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION
    );

    CREATE TABLE IF NOT EXISTS "demandes_architectes" (
      "id" serial PRIMARY KEY NOT NULL,
      "nom" varchar NOT NULL,
      "studio" varchar,
      "email" varchar NOT NULL,
      "telephone" varchar,
      "site" varchar,
      "projet" varchar,
      "message" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "architectes_partenaires"
      ADD CONSTRAINT "architectes_partenaires_photo_id_media_id_fk"
      FOREIGN KEY ("photo_id") REFERENCES "media"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION;

    CREATE INDEX IF NOT EXISTS "architectes_partenaires_photo_idx"
      ON "architectes_partenaires" USING btree ("photo_id");
    CREATE INDEX IF NOT EXISTS "architectes_partenaires_updated_at_idx"
      ON "architectes_partenaires" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "architectes_partenaires_created_at_idx"
      ON "architectes_partenaires" USING btree ("created_at");

    CREATE INDEX IF NOT EXISTS "architectes_partenaires_specialites_order_idx"
      ON "architectes_partenaires_specialites" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "architectes_partenaires_specialites_parent_id_idx"
      ON "architectes_partenaires_specialites" USING btree ("_parent_id");

    CREATE INDEX IF NOT EXISTS "architectes_partenaires_rels_order_idx"
      ON "architectes_partenaires_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "architectes_partenaires_rels_parent_idx"
      ON "architectes_partenaires_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "architectes_partenaires_rels_path_idx"
      ON "architectes_partenaires_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "architectes_partenaires_rels_realisations_id_idx"
      ON "architectes_partenaires_rels" USING btree ("realisations_id");

    CREATE INDEX IF NOT EXISTS "demandes_architectes_updated_at_idx"
      ON "demandes_architectes" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "demandes_architectes_created_at_idx"
      ON "demandes_architectes" USING btree ("created_at");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "architectes_partenaires_rels";
    DROP TABLE IF EXISTS "architectes_partenaires_specialites";
    DROP TABLE IF EXISTS "architectes_partenaires";
    DROP TABLE IF EXISTS "demandes_architectes";
  `);
}
