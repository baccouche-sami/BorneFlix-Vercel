import bcrypt from "bcryptjs";
import pg from "pg";
const { Client } = pg;
const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL,
  role text NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS quotes (
  id serial PRIMARY KEY,
  nom text NOT NULL,
  prenom text NOT NULL,
  email text NOT NULL,
  telephone text NOT NULL,
  type_logement text,
  adresse text,
  code_postal text,
  ville text,
  nombre_places_parking text,
  nombre_residents text,
  type_installation text,
  nombre_bornes text,
  puissance_requise text,
  statut_demandeur text,
  date_projet text,
  commentaires text,
  statut text NOT NULL DEFAULT 'nouveau',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS login_attempts (
  id serial PRIMARY KEY,
  ip text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
`;
let ready = null;
function connectionString() {
  const value = process.env.DATABASE_URL;
  if (!value) {
    throw new Error("DATABASE_URL manquante");
  }
  return value;
}
function needsSsl(url) {
  return !url.includes("localhost") && !url.includes("127.0.0.1");
}
async function withDb(run) {
  const url = connectionString();
  const client = new Client({
    connectionString: url,
    ssl: needsSsl(url) ? { rejectUnauthorized: false } : void 0
  });
  await client.connect();
  try {
    return await run(client);
  } finally {
    await client.end();
  }
}
async function migrateAndSeed() {
  await withDb(async (client) => {
    await client.query(SCHEMA_SQL);
    const username = process.env.ADMIN_USERNAME?.trim();
    const configuredHash = process.env.ADMIN_PASSWORD_HASH?.trim();
    const configuredPassword = process.env.ADMIN_PASSWORD;
    if (!username || !configuredHash && !configuredPassword) {
      return;
    }
    const passwordHash = configuredHash || await bcrypt.hash(configuredPassword, 12);
    await client.query(
      `INSERT INTO users (username, password, role)
       SELECT $1, $2, 'admin'
       WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = $1)`,
      [username, passwordHash]
    );
  });
}
function ensureDatabase() {
  if (!ready) {
    ready = migrateAndSeed().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}
function text(value) {
  return typeof value === "string" ? value : "";
}
function mapQuote(row) {
  const created = row.created_at;
  const createdAt = created instanceof Date ? created.toISOString() : text(created);
  return {
    id: Number(row.id),
    nom: text(row.nom),
    prenom: text(row.prenom),
    email: text(row.email),
    telephone: text(row.telephone),
    typeLogement: text(row.type_logement),
    adresse: text(row.adresse),
    codePostal: text(row.code_postal),
    ville: text(row.ville),
    nombrePlacesParking: text(row.nombre_places_parking),
    nombreResidents: text(row.nombre_residents),
    typeInstallation: text(row.type_installation),
    nombreBornes: text(row.nombre_bornes),
    puissanceRequise: text(row.puissance_requise),
    statutDemandeur: text(row.statut_demandeur),
    dateProjet: text(row.date_projet),
    commentaires: typeof row.commentaires === "string" ? row.commentaires : null,
    statut: text(row.statut) || "nouveau",
    createdAt
  };
}
async function findUserByUsername(username) {
  await ensureDatabase();
  return withDb(async (client) => {
    const result = await client.query(
      "SELECT id, username, password, role FROM users WHERE username = $1",
      [username]
    );
    const row = result.rows[0];
    return row ?? null;
  });
}
async function findUserById(id) {
  await ensureDatabase();
  return withDb(async (client) => {
    const result = await client.query(
      "SELECT id, username, password, role FROM users WHERE id = $1",
      [id]
    );
    const row = result.rows[0];
    return row ?? null;
  });
}
async function countRecentLoginFailures(ip) {
  await ensureDatabase();
  return withDb(async (client) => {
    const result = await client.query(
      `SELECT count(*)::int AS total
       FROM login_attempts
       WHERE ip = $1 AND created_at > now() - interval '15 minutes'`,
      [ip]
    );
    return Number(result.rows[0]?.total ?? 0);
  });
}
async function recordLoginFailure(ip) {
  await ensureDatabase();
  await withDb(async (client) => {
    await client.query("INSERT INTO login_attempts (ip) VALUES ($1)", [ip]);
    await client.query(
      "DELETE FROM login_attempts WHERE created_at < now() - interval '1 day'"
    );
  });
}
async function listQuotes() {
  await ensureDatabase();
  return withDb(async (client) => {
    const result = await client.query(
      "SELECT * FROM quotes ORDER BY created_at DESC"
    );
    return result.rows.map((row) => mapQuote(row));
  });
}
async function insertQuote(quote) {
  await ensureDatabase();
  await withDb(async (client) => {
    await client.query(
      `INSERT INTO quotes (
        nom, prenom, email, telephone, type_logement, adresse, code_postal, ville,
        nombre_places_parking, nombre_residents, type_installation, nombre_bornes,
        puissance_requise, statut_demandeur, date_projet, commentaires
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12,
        $13, $14, $15, $16
      )`,
      [
        quote.nom,
        quote.prenom,
        quote.email,
        quote.telephone,
        quote.typeLogement ?? null,
        quote.adresse ?? null,
        quote.codePostal ?? null,
        quote.ville ?? null,
        quote.nombrePlacesParking ?? null,
        quote.nombreResidents ?? null,
        quote.typeInstallation ?? null,
        quote.nombreBornes ?? null,
        quote.puissanceRequise ?? null,
        quote.statutDemandeur ?? null,
        quote.dateProjet ?? null,
        quote.commentaires ?? null
      ]
    );
  });
}
const ALLOWED_STATUSES = ["nouveau", "en_cours", "devis_envoye", "traite"];
function isQuoteStatus(value) {
  return ALLOWED_STATUSES.some((status) => status === value);
}
function handler(_req, res) {
  res.status(404).json({ success: false });
}
async function updateQuoteStatus(id, statut) {
  await ensureDatabase();
  return withDb(async (client) => {
    const result = await client.query(
      "UPDATE quotes SET statut = $1 WHERE id = $2 RETURNING id, statut",
      [statut, id]
    );
    const row = result.rows[0];
    return row ?? null;
  });
}
export {
  countRecentLoginFailures,
  handler as default,
  ensureDatabase,
  findUserById,
  findUserByUsername,
  insertQuote,
  isQuoteStatus,
  listQuotes,
  recordLoginFailure,
  updateQuoteStatus,
  withDb
};
