import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "newsletter_subscribers" (
      "id" serial PRIMARY KEY NOT NULL,
      "email" varchar NOT NULL,
      "prenom" varchar,
      "source" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE ("email")
    );

    CREATE INDEX IF NOT EXISTS "newsletter_subscribers_updated_at_idx"
      ON "newsletter_subscribers" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "newsletter_subscribers_created_at_idx"
      ON "newsletter_subscribers" USING btree ("created_at");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "newsletter_subscribers";
  `);
}
