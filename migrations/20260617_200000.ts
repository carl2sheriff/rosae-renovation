import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "calendar_url" varchar;

    ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "citation_texte" varchar;
    ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "citation_auteur_nom" varchar DEFAULT 'Stéphane Beilin';
    ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "citation_auteur_titre" varchar DEFAULT 'Fondateur · Rosae';

    ALTER TABLE "realisations" ADD COLUMN IF NOT EXISTS "lieu" varchar;
    ALTER TABLE "realisations" ADD COLUMN IF NOT EXISTS "surface" numeric;
    ALTER TABLE "realisations" ADD COLUMN IF NOT EXISTS "duree" varchar;
    ALTER TABLE "realisations" ADD COLUMN IF NOT EXISTS "type_intervention" varchar;
    ALTER TABLE "realisations" ADD COLUMN IF NOT EXISTS "architecte_associe" varchar;
    ALTER TABLE "realisations" ADD COLUMN IF NOT EXISTS "photographe" varchar;
    ALTER TABLE "realisations" ADD COLUMN IF NOT EXISTS "annee" numeric;
    ALTER TABLE "realisations" ADD COLUMN IF NOT EXISTS "narration" jsonb;
    ALTER TABLE "realisations" ADD COLUMN IF NOT EXISTS "featured" boolean DEFAULT false;

    CREATE TABLE IF NOT EXISTS "realisations_points_cles" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "texte" varchar,
      CONSTRAINT "realisations_points_cles_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "realisations"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION
    );
    CREATE INDEX IF NOT EXISTS "realisations_points_cles_order_idx"
      ON "realisations_points_cles" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "realisations_points_cles_parent_id_idx"
      ON "realisations_points_cles" USING btree ("_parent_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "realisations_points_cles";
    ALTER TABLE "realisations" DROP COLUMN IF EXISTS "featured";
    ALTER TABLE "realisations" DROP COLUMN IF EXISTS "narration";
    ALTER TABLE "realisations" DROP COLUMN IF EXISTS "annee";
    ALTER TABLE "realisations" DROP COLUMN IF EXISTS "photographe";
    ALTER TABLE "realisations" DROP COLUMN IF EXISTS "architecte_associe";
    ALTER TABLE "realisations" DROP COLUMN IF EXISTS "type_intervention";
    ALTER TABLE "realisations" DROP COLUMN IF EXISTS "duree";
    ALTER TABLE "realisations" DROP COLUMN IF EXISTS "surface";
    ALTER TABLE "realisations" DROP COLUMN IF EXISTS "lieu";
    ALTER TABLE "home" DROP COLUMN IF EXISTS "citation_auteur_titre";
    ALTER TABLE "home" DROP COLUMN IF EXISTS "citation_auteur_nom";
    ALTER TABLE "home" DROP COLUMN IF EXISTS "citation_texte";
    ALTER TABLE "contact" DROP COLUMN IF EXISTS "calendar_url";
  `);
}
