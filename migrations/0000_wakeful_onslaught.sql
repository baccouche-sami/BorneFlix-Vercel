CREATE TABLE "quotes" (
	"id" serial PRIMARY KEY NOT NULL,
	"nom" text NOT NULL,
	"prenom" text NOT NULL,
	"email" text NOT NULL,
	"telephone" text NOT NULL,
	"type_logement" text,
	"adresse" text,
	"code_postal" text,
	"ville" text,
	"nombre_places_parking" text,
	"nombre_residents" text,
	"type_installation" text,
	"nombre_bornes" text,
	"puissance_requise" text,
	"statut_demandeur" text,
	"date_projet" text,
	"commentaires" text,
	"statut" text DEFAULT 'nouveau' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
