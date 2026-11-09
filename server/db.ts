
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL est manquante");
}

const databaseUrl = new URL(process.env.DATABASE_URL);

if (
  databaseUrl.hostname !== "localhost" &&
  databaseUrl.hostname !== "127.0.0.1"
) {
  throw new Error(
    "Connexion refusée : seule la base PostgreSQL locale est autorisée en développement."
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

