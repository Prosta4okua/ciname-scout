-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."mpaa_rating" AS ENUM('G', 'PG', 'PG-13', 'R', 'NC-17');--> statement-breakpoint
CREATE SEQUENCE "public"."customer_customer_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."actor_actor_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."category_category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."film_film_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."address_address_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."city_city_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."country_country_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."inventory_inventory_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."language_language_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."payment_payment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."rental_rental_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."staff_staff_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE SEQUENCE "public"."store_store_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "actor" (
	"actor_id" integer PRIMARY KEY DEFAULT nextval('actor_actor_id_seq'::regclass) NOT NULL,
	"first_name" varchar(45) NOT NULL,
	"last_name" varchar(45) NOT NULL,
	"last_update" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "store" (
	"store_id" integer PRIMARY KEY DEFAULT nextval('store_store_id_seq'::regclass) NOT NULL,
	"manager_staff_id" smallint NOT NULL,
	"address_id" smallint NOT NULL,
	"last_update" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"address_id" integer PRIMARY KEY DEFAULT nextval('address_address_id_seq'::regclass) NOT NULL,
	"address" varchar(50) NOT NULL,
	"address2" varchar(50),
	"district" varchar(20) NOT NULL,
	"city_id" smallint NOT NULL,
	"postal_code" varchar(10),
	"phone" varchar(20) NOT NULL,
	"last_update" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"category_id" integer PRIMARY KEY DEFAULT nextval('category_category_id_seq'::regclass) NOT NULL,
	"name" varchar(25) NOT NULL,
	"last_update" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "city" (
	"city_id" integer PRIMARY KEY DEFAULT nextval('city_city_id_seq'::regclass) NOT NULL,
	"city" varchar(50) NOT NULL,
	"country_id" smallint NOT NULL,
	"last_update" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "country" (
	"country_id" integer PRIMARY KEY DEFAULT nextval('country_country_id_seq'::regclass) NOT NULL,
	"country" varchar(50) NOT NULL,
	"last_update" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer" (
	"customer_id" integer PRIMARY KEY DEFAULT nextval('customer_customer_id_seq'::regclass) NOT NULL,
	"store_id" smallint NOT NULL,
	"first_name" varchar(45) NOT NULL,
	"last_name" varchar(45) NOT NULL,
	"email" varchar(50),
	"address_id" smallint NOT NULL,
	"activebool" boolean DEFAULT true NOT NULL,
	"create_date" date DEFAULT ('now' NOT NULL,
	"last_update" timestamp DEFAULT now(),
	"active" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventory" (
	"inventory_id" integer PRIMARY KEY DEFAULT nextval('inventory_inventory_id_seq'::regclass) NOT NULL,
	"film_id" smallint NOT NULL,
	"store_id" smallint NOT NULL,
	"last_update" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "language" (
	"language_id" integer PRIMARY KEY DEFAULT nextval('language_language_id_seq'::regclass) NOT NULL,
	"name" char(20) NOT NULL,
	"last_update" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rental" (
	"rental_id" integer PRIMARY KEY DEFAULT nextval('rental_rental_id_seq'::regclass) NOT NULL,
	"rental_date" timestamp NOT NULL,
	"inventory_id" integer NOT NULL,
	"customer_id" smallint NOT NULL,
	"return_date" timestamp,
	"staff_id" smallint NOT NULL,
	"last_update" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staff" (
	"staff_id" integer PRIMARY KEY DEFAULT nextval('staff_staff_id_seq'::regclass) NOT NULL,
	"first_name" varchar(45) NOT NULL,
	"last_name" varchar(45) NOT NULL,
	"address_id" smallint NOT NULL,
	"email" varchar(50),
	"store_id" smallint NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"username" varchar(16) NOT NULL,
	"password" varchar(40),
	"last_update" timestamp DEFAULT now() NOT NULL,
	"picture" "bytea"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment" (
	"payment_id" integer PRIMARY KEY DEFAULT nextval('payment_payment_id_seq'::regclass) NOT NULL,
	"customer_id" smallint NOT NULL,
	"staff_id" smallint NOT NULL,
	"rental_id" integer NOT NULL,
	"amount" numeric(5, 2) NOT NULL,
	"payment_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "film" (
	"film_id" integer PRIMARY KEY DEFAULT nextval('film_film_id_seq'::regclass) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"release_year" "year",
	"language_id" smallint NOT NULL,
	"rental_duration" smallint DEFAULT 3 NOT NULL,
	"rental_rate" numeric(4, 2) DEFAULT '4.99' NOT NULL,
	"length" smallint,
	"replacement_cost" numeric(5, 2) DEFAULT '19.99' NOT NULL,
	"rating" "mpaa_rating" DEFAULT 'G',
	"last_update" timestamp DEFAULT now() NOT NULL,
	"special_features" text[],
	"fulltext" "tsvector" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "film_actor" (
	"actor_id" smallint NOT NULL,
	"film_id" smallint NOT NULL,
	"last_update" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "film_actor_pkey" PRIMARY KEY("actor_id","film_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "film_category" (
	"film_id" smallint NOT NULL,
	"category_id" smallint NOT NULL,
	"last_update" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "film_category_pkey" PRIMARY KEY("film_id","category_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store" ADD CONSTRAINT "store_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."address"("address_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "store" ADD CONSTRAINT "store_manager_staff_id_fkey" FOREIGN KEY ("manager_staff_id") REFERENCES "public"."staff"("staff_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "fk_address_city" FOREIGN KEY ("city_id") REFERENCES "public"."city"("city_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "city" ADD CONSTRAINT "fk_city" FOREIGN KEY ("country_id") REFERENCES "public"."country"("country_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customer" ADD CONSTRAINT "customer_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."address"("address_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "public"."film"("film_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rental" ADD CONSTRAINT "rental_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("customer_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rental" ADD CONSTRAINT "rental_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "public"."inventory"("inventory_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rental" ADD CONSTRAINT "rental_staff_id_key" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("staff_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staff" ADD CONSTRAINT "staff_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."address"("address_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment" ADD CONSTRAINT "payment_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("customer_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment" ADD CONSTRAINT "payment_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "public"."rental"("rental_id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment" ADD CONSTRAINT "payment_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("staff_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "film" ADD CONSTRAINT "film_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."language"("language_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "film_actor" ADD CONSTRAINT "film_actor_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "public"."actor"("actor_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "film_actor" ADD CONSTRAINT "film_actor_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "public"."film"("film_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "film_category" ADD CONSTRAINT "film_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "film_category" ADD CONSTRAINT "film_category_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "public"."film"("film_id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_actor_last_name" ON "actor" USING btree ("last_name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_unq_manager_staff_id" ON "store" USING btree ("manager_staff_id" int2_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_city_id" ON "address" USING btree ("city_id" int2_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_country_id" ON "city" USING btree ("country_id" int2_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_address_id" ON "customer" USING btree ("address_id" int2_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_store_id" ON "customer" USING btree ("store_id" int2_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_last_name" ON "customer" USING btree ("last_name" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_store_id_film_id" ON "inventory" USING btree ("store_id" int2_ops,"film_id" int2_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_inventory_id" ON "rental" USING btree ("inventory_id" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_unq_rental_rental_date_inventory_id_customer_id" ON "rental" USING btree ("rental_date" int4_ops,"inventory_id" int2_ops,"customer_id" timestamp_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_customer_id" ON "payment" USING btree ("customer_id" int2_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_rental_id" ON "payment" USING btree ("rental_id" int4_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_staff_id" ON "payment" USING btree ("staff_id" int2_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "film_fulltext_idx" ON "film" USING gist ("fulltext" tsvector_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_language_id" ON "film" USING btree ("language_id" int2_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_title" ON "film" USING btree ("title" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_fk_film_id" ON "film_actor" USING btree ("film_id" int2_ops);--> statement-breakpoint
CREATE VIEW "public"."actor_info" AS (SELECT a.actor_id, a.first_name, a.last_name, group_concat(DISTINCT (c.name::text || ': '::text) || (( SELECT group_concat(f.title::text) AS group_concat FROM film f JOIN film_category fc_1 ON f.film_id = fc_1.film_id JOIN film_actor fa_1 ON f.film_id = fa_1.film_id WHERE fc_1.category_id = c.category_id AND fa_1.actor_id = a.actor_id GROUP BY fa_1.actor_id))) AS film_info FROM actor a LEFT JOIN film_actor fa ON a.actor_id = fa.actor_id LEFT JOIN film_category fc ON fa.film_id = fc.film_id LEFT JOIN category c ON fc.category_id = c.category_id GROUP BY a.actor_id, a.first_name, a.last_name);--> statement-breakpoint
CREATE VIEW "public"."customer_list" AS (SELECT cu.customer_id AS id, (cu.first_name::text || ' '::text) || cu.last_name::text AS name, a.address, a.postal_code AS "zip code", a.phone, city.city, country.country, CASE WHEN cu.activebool THEN 'active'::text ELSE ''::text END AS notes, cu.store_id AS sid FROM customer cu JOIN address a ON cu.address_id = a.address_id JOIN city ON a.city_id = city.city_id JOIN country ON city.country_id = country.country_id);--> statement-breakpoint
CREATE VIEW "public"."film_list" AS (SELECT film.film_id AS fid, film.title, film.description, category.name AS category, film.rental_rate AS price, film.length, film.rating, group_concat((actor.first_name::text || ' '::text) || actor.last_name::text) AS actors FROM category LEFT JOIN film_category ON category.category_id = film_category.category_id LEFT JOIN film ON film_category.film_id = film.film_id JOIN film_actor ON film.film_id = film_actor.film_id JOIN actor ON film_actor.actor_id = actor.actor_id GROUP BY film.film_id, film.title, film.description, category.name, film.rental_rate, film.length, film.rating);--> statement-breakpoint
CREATE VIEW "public"."nicer_but_slower_film_list" AS (SELECT film.film_id AS fid, film.title, film.description, category.name AS category, film.rental_rate AS price, film.length, film.rating, group_concat(((upper("substring"(actor.first_name::text, 1, 1)) || lower("substring"(actor.first_name::text, 2))) || upper("substring"(actor.last_name::text, 1, 1))) || lower("substring"(actor.last_name::text, 2))) AS actors FROM category LEFT JOIN film_category ON category.category_id = film_category.category_id LEFT JOIN film ON film_category.film_id = film.film_id JOIN film_actor ON film.film_id = film_actor.film_id JOIN actor ON film_actor.actor_id = actor.actor_id GROUP BY film.film_id, film.title, film.description, category.name, film.rental_rate, film.length, film.rating);--> statement-breakpoint
CREATE VIEW "public"."sales_by_film_category" AS (SELECT c.name AS category, sum(p.amount) AS total_sales FROM payment p JOIN rental r ON p.rental_id = r.rental_id JOIN inventory i ON r.inventory_id = i.inventory_id JOIN film f ON i.film_id = f.film_id JOIN film_category fc ON f.film_id = fc.film_id JOIN category c ON fc.category_id = c.category_id GROUP BY c.name ORDER BY (sum(p.amount)) DESC);--> statement-breakpoint
CREATE VIEW "public"."sales_by_store" AS (SELECT (c.city::text || ','::text) || cy.country::text AS store, (m.first_name::text || ' '::text) || m.last_name::text AS manager, sum(p.amount) AS total_sales FROM payment p JOIN rental r ON p.rental_id = r.rental_id JOIN inventory i ON r.inventory_id = i.inventory_id JOIN store s ON i.store_id = s.store_id JOIN address a ON s.address_id = a.address_id JOIN city c ON a.city_id = c.city_id JOIN country cy ON c.country_id = cy.country_id JOIN staff m ON s.manager_staff_id = m.staff_id GROUP BY cy.country, c.city, s.store_id, m.first_name, m.last_name ORDER BY cy.country, c.city);--> statement-breakpoint
CREATE VIEW "public"."staff_list" AS (SELECT s.staff_id AS id, (s.first_name::text || ' '::text) || s.last_name::text AS name, a.address, a.postal_code AS "zip code", a.phone, city.city, country.country, s.store_id AS sid FROM staff s JOIN address a ON s.address_id = a.address_id JOIN city ON a.city_id = city.city_id JOIN country ON city.country_id = country.country_id);
*/