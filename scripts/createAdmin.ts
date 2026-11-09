
import bcrypt from "bcrypt";
import { storage } from "../server/storage";
import { pool } from "../server/db";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

// Script réservé à la création d'un administrateur local
async function createAdmin() {
  // Empêcher son exécution dans un environnement de production
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Ce script est réservé au développement.");
  }
  
  // Récupérer l'adresse de connexion PostgreSQL
  const connectionString: string | undefined = process.env.DATABASE_URL;

  // Vérifier que l'adresse est bien définie
  if (typeof connectionString !== "string" || connectionString.length === 0) {
    throw new Error("DATABASE_URL est manquante.");
  }

  // Convertir l'adresse PostgreSQL en objet URL
  const databaseUrl = new URL(connectionString);

  // Vérifier que nous utilisons uniquement la base locale bornflix_dev
  if (
    !["localhost", "127.0.0.1"].includes(databaseUrl.hostname) ||
    databaseUrl.pathname !== "/bornflix_dev"
  ) {
    throw new Error(
      "Sécurité : création autorisée uniquement dans bornflix_dev en local."
    );
  }

  

  // Préparer la saisie des identifiants dans le terminal
  const rl = createInterface({ input: stdin, output: stdout });

  try {
    // Demander le nom d'utilisateur de l'administrateur
    
    // Demander le nom d'utilisateur jusqu'à obtenir une valeur valide
    let username = "";

    while (!username) {
      // Lire le nom d'utilisateur depuis le terminal
      username = (await rl.question("Nom d'utilisateur admin : ")).trim();

      // Informer l'utilisateur si aucune valeur n'a été récupérée
      if (!username) {
        console.log("Le nom d'utilisateur est vide. Veuillez réessayer.");
      }
    }

    // Demander le mot de passe après validation du nom d'utilisateur
    const password = await rl.question("Mot de passe de test : ");

     // Vérifier si le nom d'utilisateur a bien été récupéré
    console.log("Nom d'utilisateur renseigné :", username.length > 0);

    // Vérifier la longueur du mot de passe sans afficher sa valeur
    console.log("Longueur du mot de passe :", password.length);

    // Vérifier les informations saisies
    if (!username || password.length < 12) {
      throw new Error(
        "Nom d'utilisateur obligatoire et mot de passe de 12 caractères minimum."
      );
    }

    // Vérifier que le compte n'existe pas déjà
    const existingUser = await storage.getUserByUsername(username);

    if (existingUser) {
      throw new Error("Ce nom d'utilisateur existe déjà.");
    }

    // Hacher le mot de passe avant son enregistrement
    const hashedPassword = await bcrypt.hash(password, 12);

    // Enregistrer le compte dans PostgreSQL
    await storage.createUser({
      username,
      password: hashedPassword,
    });

    // Confirmer la création sans afficher le mot de passe
    console.log("Compte administrateur local créé avec succès.");
  } finally {
    // Fermer la saisie et la connexion PostgreSQL
    rl.close();
    await pool.end();
  }
}

// Exécuter le script et afficher les éventuelles erreurs
createAdmin().catch((error) => {
  console.error("Erreur :", error.message);
  process.exitCode = 1;
});

