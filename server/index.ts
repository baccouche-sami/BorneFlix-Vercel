import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

import session from "express-session";

// Stockage des sessions administrateur dans PostgreSQL
import connectPgSimple from "connect-pg-simple";

// Réutilisation de la connexion PostgreSQL existante
import { pool } from "./db";




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Configuration des sessions administrateur BorneFlix.
 * Les sessions seront enregistrées dans PostgreSQL.
 */

// Vérifier que la clé secrète est bien configurée
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET est manquante dans .env");
}

// Créer le stockage PostgreSQL des sessions
const PgSession = connectPgSimple(session);

  // Vérifier que la clé secrète de session est configurée
  // Ne jamais démarrer le serveur avec une clé absente
  if (!process.env.SESSION_SECRET) {
    throw new Error(
      "SESSION_SECRET est obligatoire pour sécuriser les sessions."
    );
  }

  // Conserver la clé vérifiée pour la configuration Express
  const sessionSecret = process.env.SESSION_SECRET;

// Activer les sessions sur le serveur Express
app.use(
  session({
    // Utiliser la clé secrète définie dans .env
    secret:sessionSecret,

    // Ne pas réenregistrer une session si elle n'a pas changé
    resave: false,

    // Ne pas créer de session pour les visiteurs non connectés
    saveUninitialized: false,

    // Stocker les sessions dans PostgreSQL
    store: new PgSession({
      pool: pool,

      // Créer automatiquement la table des sessions si nécessaire
      createTableIfMissing: true,

      // Nom de la table PostgreSQL
      tableName: "session",
    }),

    // Configuration du cookie de connexion
    cookie: {
      // Empêcher JavaScript d'accéder au cookie
      httpOnly: true,

      // Limiter l'envoi du cookie aux requêtes du même site
      sameSite: "lax",

      // En développement local HTTP, ne pas exiger HTTPS
      // En production, HTTPS sera obligatoire
      secure: process.env.NODE_ENV === "production",

      // Durée maximale de la session : 8 heures
      maxAge: 8 * 60 * 60 * 1000,
    },
  })
);


// Logging middleware

 // Journalisation des requêtes API sans afficher les données clients
app.use((req, res, next) => {
  // Enregistrer le début de la requête pour mesurer sa durée
  const start = Date.now();

  // Récupérer le chemin de la requête
  const requestPath = req.path;

  // Attendre que la réponse soit terminée
  res.on("finish", () => {
    // Calculer la durée de traitement
    const duration = Date.now() - start;

    // Journaliser uniquement les requêtes API
    if (requestPath.startsWith("/api")) {
      // Afficher la méthode, le chemin, le statut HTTP et la durée
      // Ne jamais afficher le contenu JSON des réponses
      const logLine =
        `${req.method} ${requestPath} ${res.statusCode} in ${duration}ms`;

      log(logLine);
    }
  });

  // Continuer le traitement normal de la requête
  next();
});


  (async () => {
    const server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      throw err;
    });

    // Setup Vite in development
    await setupVite(app, server);

    // Start development server
    const port = process.env.PORT || 5005;
    server.listen({
      port: Number(port),
      host: "0.0.0.0",
    }, () => {
      log(`Development server running on port ${port}`);
    });
  })();
