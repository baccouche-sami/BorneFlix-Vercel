import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail, verifyEmailConfig } from "../server/mailService";
import { db } from "./db";
import { quotes } from "../shared/schema";

import bcrypt from "bcrypt";
// Limiter les tentatives de connexion pour réduire les attaques par force brute
import { rateLimit } from "express-rate-limit";
import { randomBytes, timingSafeEqual } from "node:crypto";
// Format de devis pour le formulaire
interface QuoteFormData {
  // Step 1: Information de base
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  // Step 2: Informations sur la copropriété
  typeLogement: string;
  adresse: string;
  codePostal: string;
  ville: string;
  nombrePlacesParking: string;
  nombreResidents: string;
  // Step 3: Informations techniques
  typeInstallation: string;
  nombreBornes: string;
  puissanceRequise: string;
  // Step 4: Informations complémentaires
  statutDemandeur: string;
  dateProjet: string;
  commentaires: string;
}

// Interface pour l'inscription à la newsletter
interface NewsletterSubscription {
  email: string;
}

 // Middleware de sécurité pour les routes administrateur
async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Récupérer l'identifiant administrateur depuis la session
    const adminId = (
      req.session as typeof req.session & { adminId?: number }
    ).adminId;

    // Refuser l'accès si aucune session administrateur n'existe
    if (typeof adminId !== "number") {
      res.status(401).json({
        success: false,
        message: "Vous devez vous connecter.",
      });
      return;
    }

    // Vérifier que le compte existe et possède toujours le rôle admin
    const admin = await storage.getUser(adminId);

    if (!admin || admin.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Accès administrateur interdit.",
      });
      return;
    }

    // Autoriser la requête à continuer vers la route protégée
    next();
  } catch (error) {
    // Ne pas exposer les détails techniques au navigateur
    console.error("Erreur de vérification des droits administrateur.");

    res.status(500).json({
      success: false,
      message: "Erreur lors de la vérification des autorisations.",
    });
  }
}

  // Définir les informations supplémentaires stockées dans la session
  type AdminSession = Request["session"] & {
    adminId?: number;
    csrfToken?: string;
  };

  // Générer ou récupérer le jeton CSRF de la session actuelle
  function getCsrfToken(req: Request): string {
    const adminSession = req.session as AdminSession;

    // Générer un jeton aléatoire uniquement s'il n'existe pas
    if (!adminSession.csrfToken) {
      adminSession.csrfToken = randomBytes(32).toString("hex");
    }

    return adminSession.csrfToken;
  }

  // Vérifier le jeton CSRF envoyé par le navigateur
  function requireCsrf(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const adminSession = req.session as AdminSession;

    // Récupérer le jeton transmis dans l'en-tête HTTP
    const receivedToken = req.get("X-CSRF-Token");
    const expectedToken = adminSession.csrfToken;

    // Refuser les requêtes sans jeton valide
    if (
      !receivedToken ||
      !expectedToken ||
      !/^[a-f0-9]{64}$/.test(receivedToken)
    ) {
      return res.status(403).json({
        success: false,
        message: "Jeton CSRF manquant ou invalide.",
      });
    }

    // Convertir les jetons en buffers pour une comparaison sécurisée
    const receivedBuffer = Buffer.from(receivedToken, "hex");
    const expectedBuffer = Buffer.from(expectedToken, "hex");

    // Vérifier la longueur avant la comparaison
    if (
      receivedBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(receivedBuffer, expectedBuffer)
    ) {
      return res.status(403).json({
        success: false,
        message: "Jeton CSRF invalide.",
      });
    }

    // Autoriser la requête si les jetons correspondent
    next();
  }


  // Limiter les tentatives de connexion administrateur
  const adminLoginLimiter = rateLimit({
    // Durée de la fenêtre : 15 minutes
    windowMs: 15 * 60 * 1000,

    // Autoriser au maximum 5 tentatives échouées par adresse IP
    limit: 5,

    // Ne pas comptabiliser les connexions réussies
    skipSuccessfulRequests: true,

    // Utiliser les en-têtes HTTP standard de limitation
    standardHeaders: "draft-7",

    // Désactiver les anciens en-têtes de limitation
    legacyHeaders: false,

    // Message envoyé lorsque la limite est atteinte
    message: {
      success: false,
      message: "Trop de tentatives de connexion. Réessayez dans 15 minutes.",
    },
  });


export async function registerRoutes(app: Express): Promise<Server> {
  
  // API de connexion au dashboard administrateur
  app.post("/api/admin/login", adminLoginLimiter, async (req, res) =>{
    try {
      // Récupérer les identifiants envoyés par le formulaire
      const { username, password } = req.body ?? {};

      // Vérifier le format des données reçues
      if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        !username.trim() ||
        !password ||
        username.length > 120 ||
        password.length > 1024
      ) {
        return res.status(400).json({
          success: false,
          message: "Identifiants invalides.",
        });
      }

      // Rechercher l'utilisateur dans PostgreSQL
      const user = await storage.getUserByUsername(username.trim());

      // Vérifier le mot de passe haché avec bcrypt
      // Le message reste identique si l'utilisateur n'existe pas
      const passwordValid = user
        ? await bcrypt.compare(password, user.password)
        : false;

      // Autoriser uniquement les utilisateurs ayant le rôle admin
      if (!user || !passwordValid || user.role !== "admin") {
        return res.status(401).json({
          success: false,
          message: "Nom d'utilisateur ou mot de passe incorrect.",
        });
      }

      // Renouveler l'identifiant de session après la connexion
      req.session.regenerate((error) => {
        if (error) {
          console.error("Erreur de création de session administrateur.");

          return res.status(500).json({
            success: false,
            message: "Impossible de créer la session.",
          });
        }

        // Enregistrer l'identifiant de l'administrateur dans la session
        // Le typage TypeScript de cette propriété sera ajouté ensuite
        (req.session as typeof req.session & { adminId?: number }).adminId =
          user.id;

        // Sauvegarder la session dans PostgreSQL avant de répondre
        req.session.save((saveError) => {
          if (saveError) {
            console.error("Erreur d'enregistrement de session.");

            return res.status(500).json({
              success: false,
              message: "Impossible d'enregistrer la session.",
            });
          }

          // Confirmer la connexion sans transmettre le mot de passe
          return res.status(200).json({
            success: true,
            message: "Connexion administrateur réussie.",
            user: {
              id: user.id,
              username: user.username,
              role: user.role,
            },
          });
        });
      });
    } catch (error) {
      // Ne pas exposer les détails internes au navigateur
      console.error("Erreur lors de la connexion administrateur.");

      return res.status(500).json({
        success: false,
        message: "Une erreur interne est survenue.",
      });
    }
  })
  
  // Vérifier si une session administrateur est active
  app.get("/api/admin/me", async (req, res) => {
    try {
      // Récupérer l'identifiant administrateur depuis la session
      const adminId = (
        req.session as typeof req.session & { adminId?: number }
      ).adminId;

      // Refuser l'accès si aucune session administrateur n'existe
      if (typeof adminId !== "number") {
        return res.status(401).json({
          success: false,
          message: "Vous devez vous connecter.",
        });
      }

      // Vérifier que le compte existe toujours et possède le rôle admin
      const admin = await storage.getUser(adminId);

      if (!admin || admin.role !== "admin") {
        return res.status(401).json({
          success: false,
          message: "Session administrateur invalide.",
        });
      }

      // Confirmer la session sans exposer le mot de passe
      return res.status(200).json({
        success: true,
        user: {
          id: admin.id,
          username: admin.username,
          role: admin.role,
        },
      });
    } catch (error) {
      // Ne pas exposer les détails internes du serveur
      console.error("Erreur de vérification de session administrateur.");

      return res.status(500).json({
        success: false,
        message: "Impossible de vérifier la session.",
      });
    }
  });
  
  // Fournir un jeton CSRF à l'administrateur connecté
  app.get("/api/admin/csrf-token", requireAdmin, (req, res) => {
    try {
      // Récupérer ou générer le jeton lié à la session
      const csrfToken = getCsrfToken(req);

      // Sauvegarder le jeton dans la session PostgreSQL
      req.session.save((error) => {
        if (error) {
          // Ne pas exposer les détails internes du serveur
          console.error("Erreur d'enregistrement du jeton CSRF.");

          return res.status(500).json({
            success: false,
            message: "Impossible de préparer la session sécurisée.",
          });
        }

        // Empêcher la mise en cache du jeton
        res.setHeader("Cache-Control", "no-store");

        // Envoyer le jeton au navigateur authentifié
        return res.status(200).json({
          success: true,
          csrfToken,
        });
      });
    } catch {
      // Gérer les erreurs sans exposer les informations internes
      return res.status(500).json({
        success: false,
        message: "Impossible de générer le jeton CSRF.",
      });
    }
  });

  
  // Déconnecter l'administrateur en détruisant sa session
  app.post("/api/admin/logout", requireAdmin,requireCsrf, (req, res) => {
    // Supprimer la session enregistrée côté serveur
    req.session.destroy((error) => {
      // Signaler un problème si la suppression échoue
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Impossible de se déconnecter.",
        });
      }

      // Supprimer le cookie de session du navigateur
      res.clearCookie("connect.sid", {
        path: "/",
      });

      // Confirmer la déconnexion
      return res.status(200).json({
        success: true,
        message: "Déconnexion réussie.",
      });
    });
  });

  
  // Récupérer les demandes de devis pour le dashboard administrateur
  // requireAdmin vérifie la session et le rôle avant d'autoriser l'accès
  app.get("/api/admin/quotes", requireAdmin, async (req, res) => {
    try {
      // Récupérer les demandes de devis depuis PostgreSQL
      const allQuotes = await storage.getAllQuotes();

      // Envoyer les demandes au dashboard
      return res.status(200).json({
        success: true,
        quotes: allQuotes,
      });
    } catch (error) {
      // Ne pas exposer les détails techniques ou les données clients
      console.error("Erreur lors de la récupération des devis.");

      return res.status(500).json({
        success: false,
        message: "Impossible de récupérer les demandes de devis.",
      });
    }
  });
  
  // Modifier le statut d'une demande de devis
  // Seul un administrateur authentifié peut accéder à cette API
  app.patch("/api/admin/quotes/:id/status", requireAdmin,requireCsrf, async (req, res) => {
    try {
      // Récupérer l'identifiant de la demande depuis l'URL
      const id = Number(req.params.id);

      // Vérifier que l'identifiant est un entier positif valide
      if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
          success: false,
          message: "Identifiant de demande invalide.",
        });
      }

      // Définir les quatre statuts autorisés
      const allowedStatuses = [
        "nouveau",
        "en_cours",
        "devis_envoye",
        "traite",
      ] as const;

      // Récupérer le statut envoyé par le dashboard
      const { statut } = req.body ?? {};

      // Refuser les statuts inconnus ou invalides
      if (
        typeof statut !== "string" ||
        !allowedStatuses.some((value) => value === statut)
      ) {
        return res.status(400).json({
          success: false,
          message: "Statut de demande invalide.",
        });
      }

      // Mettre à jour le statut dans PostgreSQL
      const updatedQuote = await storage.updateQuoteStatus(id, statut);

      // Vérifier que la demande existe
      if (!updatedQuote) {
        return res.status(404).json({
          success: false,
          message: "Demande de devis introuvable.",
        });
      }

      // Confirmer la modification sans renvoyer les données personnelles
      return res.status(200).json({
        success: true,
        message: "Statut mis à jour avec succès.",
        quote: {
          id: updatedQuote.id,
          statut: updatedQuote.statut,
        },
      });
    } catch (error) {
      // Ne pas exposer les détails internes du serveur
      console.error("Erreur lors de la modification du statut.");

      return res.status(500).json({
        success: false,
        message: "Impossible de modifier le statut de la demande.",
      });
    }
  });




  
  // API route for contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: "Veuillez remplir tous les champs obligatoires"
        });
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Adresse email invalide"
        });
      }

      // Verify email configuration and send email
      try {
        const isConfigValid = await verifyEmailConfig();

        if (!isConfigValid) {
          console.error("La configuration d'email n'est pas valide");
          return res.status(500).json({
            success: false,
            message: "Problème de configuration du service d'email. Veuillez contacter l'administrateur."
          });
        }

        // Send email to the BorneFlix team
        await sendEmail({
          to: process.env.CONTACT_EMAIL_RECIPIENT || 'contact@borneflix.fr',
          subject: `Nouveau message de contact - ${name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                h1 { color: #0460D9; }
                .section { margin-bottom: 30px; }
                .field { margin-bottom: 10px; }
                .label { font-weight: bold; }
                .value { margin-left: 10px; }
                .footer { margin-top: 30px; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Nouveau message de contact</h1>
                <p>Un nouveau message a été envoyé via le formulaire de contact du site web.</p>
                
                <div class="section">
                  <div class="field">
                    <span class="label">Nom:</span>
                    <span class="value">${name}</span>
                  </div>
                  <div class="field">
                    <span class="label">Email:</span>
                    <span class="value">${email}</span>
                  </div>
                  <div class="field">
                    <span class="label">Téléphone:</span>
                    <span class="value">${phone || 'Non fourni'}</span>
                  </div>
                  <div class="field">
                    <span class="label">Message:</span>
                    <div class="value" style="white-space: pre-line;">${message}</div>
                  </div>
                </div>
                
                <div class="footer">
                  <p>Ce message a été généré automatiquement suite à une demande sur le site BorneFlix.</p>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
NOUVEAU MESSAGE DE CONTACT

Un nouveau message a été envoyé via le formulaire de contact du site web.

Nom: ${name}
Email: ${email}
Téléphone: ${phone || 'Non fourni'}
Message:
${message}

Ce message a été généré automatiquement suite à une demande sur le site BorneFlix.
          `
        });

        // Send confirmation email to the sender
        await sendEmail({
          to: email,
          subject: "Confirmation de votre message - BorneFlix",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                h1 { color: #0460D9; }
                .footer { margin-top: 30px; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Message bien reçu</h1>
                <p>Bonjour ${name},</p>
                <p>Nous avons bien reçu votre message et nous vous remercions de nous avoir contactés.</p>
                <p>Notre équipe va étudier votre demande et vous répondra dans les plus brefs délais.</p>
                <p>Cordialement,</p>
                <p>L'équipe BorneFlix</p>
                <div class="footer">
                  <p>Ce message a été généré automatiquement. Merci de ne pas y répondre.</p>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
Message bien reçu

Bonjour ${name},

Nous avons bien reçu votre message et nous vous remercions de nous avoir contactés.

Notre équipe va étudier votre demande et vous répondra dans les plus brefs délais.

Cordialement,
L'équipe BorneFlix

Ce message a été généré automatiquement. Merci de ne pas y répondre.
          `
        });

        return res.status(200).json({
          success: true,
          message: "Merci pour votre message ! Nous vous contacterons bientôt."
        });
      } catch (emailError) {
        console.error("Erreur lors de l'envoi de l'email:", emailError);
        return res.status(500).json({
          success: false,
          message: "Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer ultérieurement."
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de l'envoi du formulaire"
      });
    }
  });

  // API route for quote form submissions
  app.post("/api/quote", async (req, res) => {
    try {
      const formData: QuoteFormData = req.body;

      // Validation des champs requis
      if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone) {
        return res.status(400).json({
          success: false,
          message: "Veuillez remplir tous les champs obligatoires"
        });
      }

      // Vérification simple de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return res.status(400).json({
          success: false,
          message: "Adresse email invalide"
        });
      }
      
      // Enregistrement de la demande dans PostgreSQL
      await db.insert(quotes).values({
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        typeLogement: formData.typeLogement,
        adresse: formData.adresse,
        codePostal: formData.codePostal,
        ville: formData.ville,
        nombrePlacesParking: formData.nombrePlacesParking,
        nombreResidents: formData.nombreResidents,
        typeInstallation: formData.typeInstallation,
        nombreBornes: formData.nombreBornes,
        puissanceRequise: formData.puissanceRequise,
        statutDemandeur: formData.statutDemandeur,
        dateProjet: formData.dateProjet,
        commentaires: formData.commentaires,
      });
      
      // Mode développement : ne pas envoyer d'e-mails réels
      if (process.env.NODE_ENV === "development") {
        return res.status(201).json({
          success: true,
          message: "Demande de devis enregistrée en base de données (mode développement).",
        });
      }



      // Préparation du contenu de l'email
      const emailHtml = generateQuoteEmailHtml(formData);
      const emailText = generateQuoteEmailText(formData);

      // Envoi de l'email via le service d'email
      try {
        // Vérifier d'abord la configuration d'email
        const isConfigValid = await verifyEmailConfig();

        if (!isConfigValid) {
          console.error("La configuration d'email n'est pas valide");
          return res.status(500).json({
            success: false,
            message: "Problème de configuration du service d'email. Veuillez contacter l'administrateur."
          });
        }

        // Envoyer l'email au destinataire (équipe commerciale)
        await sendEmail({
          to: process.env.QUOTE_EMAIL_RECIPIENT || 'contact@borneflix.fr',
          subject: `Nouvelle demande de devis - ${formData.prenom} ${formData.nom}`,
          html: emailHtml,
          text: emailText
        });

        // Envoyer un email de confirmation au client
        await sendEmail({
          to: formData.email,
          subject: "Confirmation de votre demande de devis - BorneFlix",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                h1 { color: #0460D9; }
                .footer { margin-top: 30px; font-size: 12px; color: #666; }
                .button { background-color: #8dc63f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Demande de devis reçue</h1>
                <p>Bonjour ${formData.prenom},</p>
                <p>Nous avons bien reçu votre demande de devis pour l'installation de bornes de recharge de véhicules électriques.</p>
                <p>Notre équipe va étudier votre projet et vous contactera dans les plus brefs délais pour discuter des détails et vous proposer une solution adaptée à vos besoins.</p>
                <p>Si vous avez des questions en attendant, n'hésitez pas à nous contacter au 01 86 04 18 02.</p>
                <p>Cordialement,</p>
                <p>L'équipe BorneFlix</p>
                <div class="footer">
                  <p>Ce message a été généré automatiquement. Merci de ne pas y répondre.</p>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
Demande de devis reçue

Bonjour ${formData.prenom},

Nous avons bien reçu votre demande de devis pour l'installation de bornes de recharge de véhicules électriques.

Notre équipe va étudier votre projet et vous contactera dans les plus brefs délais pour discuter des détails et vous proposer une solution adaptée à vos besoins.

Si vous avez des questions en attendant, n'hésitez pas à nous contacter au 01 86 04 18 02.

Cordialement,
L'équipe BorneFlix

Ce message a été généré automatiquement. Merci de ne pas y répondre.
          `
        });

        return res.status(200).json({
          success: true,
          message: "Votre demande de devis a été envoyée avec succès. Nous vous contacterons dans les plus brefs délais."
        });
      } catch (emailError) {
        console.error("Erreur lors de l'envoi de l'email:", emailError);
        return res.status(500).json({
          success: false,
          message: "Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer ultérieurement."
        });
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire de devis:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer ultérieurement."
      });
    }
  });

  // API route for newsletter subscriptions
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;

      // Validation de l'email
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "L'adresse email est requise"
        });
      }

      // Vérification simple de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Adresse email invalide"
        });
      }

      // Envoi d'un email de confirmation au service et au client
      try {
        // Vérifier d'abord la configuration d'email
        const isConfigValid = await verifyEmailConfig();

        if (!isConfigValid) {
          console.error("La configuration d'email n'est pas valide");
          return res.status(500).json({
            success: false,
            message: "Problème de configuration du service d'email. Veuillez contacter l'administrateur."
          });
        }

        // Envoyer un email à l'équipe de BorneFlix concernant la nouvelle inscription
        await sendEmail({
          to: process.env.NEWSLETTER_EMAIL_RECIPIENT || 'marketing@borneflix.fr',
          subject: "Nouvelle inscription à la newsletter",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                h1 { color: #0460D9; }
                .footer { margin-top: 30px; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Nouvelle inscription à la newsletter</h1>
                <p>Une nouvelle adresse email s'est inscrite à la newsletter :</p>
                <p><strong>${email}</strong></p>
                <p>N'oubliez pas d'ajouter cette adresse à votre liste de diffusion.</p>
                <div class="footer">
                  <p>Ce message a été généré automatiquement suite à une demande sur le site BorneFlix.</p>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
NOUVELLE INSCRIPTION À LA NEWSLETTER

Une nouvelle adresse email s'est inscrite à la newsletter :

${email}

N'oubliez pas d'ajouter cette adresse à votre liste de diffusion.

Ce message a été généré automatiquement suite à une demande sur le site BorneFlix.
          `
        });

        // Envoyer un email de confirmation à l'inscrit
        await sendEmail({
          to: email,
          subject: "Confirmation d'inscription à la newsletter BorneFlix",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                h1 { color: #0460D9; }
                .button { background-color: #8dc63f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 20px; }
                .footer { margin-top: 30px; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Bienvenue à la newsletter BorneFlix !</h1>
                <p>Merci de vous être inscrit à notre newsletter. Vous recevrez désormais nos actualités, conseils et offres spéciales concernant les solutions de recharge pour véhicules électriques.</p>
                <p>Vous pourrez vous désinscrire à tout moment en cliquant sur le lien de désinscription présent dans chacun de nos emails.</p>
                <p>Cordialement,</p>
                <p>L'équipe BorneFlix</p>
                <div class="footer">
                  <p>Ce message a été généré automatiquement. Merci de ne pas y répondre.</p>
                  <p>Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer cet email.</p>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
Bienvenue à la newsletter BorneFlix !

Merci de vous être inscrit à notre newsletter. Vous recevrez désormais nos actualités, conseils et offres spéciales concernant les solutions de recharge pour véhicules électriques.

Vous pourrez vous désinscrire à tout moment en cliquant sur le lien de désinscription présent dans chacun de nos emails.

Cordialement,
L'équipe BorneFlix

Ce message a été généré automatiquement. Merci de ne pas y répondre.
Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer cet email.
          `
        });

        return res.status(200).json({
          success: true,
          message: "Vous êtes désormais inscrit à notre newsletter. Merci !"
        });
      } catch (emailError) {
        console.error("Erreur lors de l'envoi de l'email de newsletter:", emailError);
        return res.status(500).json({
          success: false,
          message: "Une erreur est survenue lors de l'inscription. Veuillez réessayer ultérieurement."
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription à la newsletter:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de l'inscription. Veuillez réessayer ultérieurement."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Fonction pour générer le contenu HTML de l'email
function generateQuoteEmailHtml(data: QuoteFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { color: #0460D9; }
        h2 { color: #38b000; margin-top: 30px; }
        .section { margin-bottom: 30px; }
        .field { margin-bottom: 10px; }
        .label { font-weight: bold; }
        .value { margin-left: 10px; }
        .footer { margin-top: 30px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Nouvelle demande de devis</h1>
        <p>Une nouvelle demande de devis a été soumise via le formulaire de votre site web.</p>
        
        <div class="section">
          <h2>Informations personnelles</h2>
          <div class="field">
            <span class="label">Nom:</span>
            <span class="value">${data.nom}</span>
          </div>
          <div class="field">
            <span class="label">Prénom:</span>
            <span class="value">${data.prenom}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${data.email}</span>
          </div>
          <div class="field">
            <span class="label">Téléphone:</span>
            <span class="value">${data.telephone}</span>
          </div>
        </div>
        
        <div class="section">
          <h2>Informations sur la copropriété</h2>
          <div class="field">
            <span class="label">Type de logement:</span>
            <span class="value">${data.typeLogement}</span>
          </div>
          <div class="field">
            <span class="label">Adresse:</span>
            <span class="value">${data.adresse}</span>
          </div>
          <div class="field">
            <span class="label">Code postal:</span>
            <span class="value">${data.codePostal}</span>
          </div>
          <div class="field">
            <span class="label">Ville:</span>
            <span class="value">${data.ville}</span>
          </div>
          <div class="field">
            <span class="label">Nombre de places de parking:</span>
            <span class="value">${data.nombrePlacesParking || 'Non spécifié'}</span>
          </div>
          <div class="field">
            <span class="label">Nombre de résidents:</span>
            <span class="value">${data.nombreResidents || 'Non spécifié'}</span>
          </div>
        </div>
        
        <div class="section">
          <h2>Spécifications techniques</h2>
          <div class="field">
            <span class="label">Type d'installation:</span>
            <span class="value">${data.typeInstallation}</span>
          </div>
          <div class="field">
            <span class="label">Nombre de bornes souhaité:</span>
            <span class="value">${data.nombreBornes}</span>
          </div>
          <div class="field">
            <span class="label">Puissance de charge souhaitée:</span>
            <span class="value">${data.puissanceRequise || 'Non spécifié'}</span>
          </div>
        </div>
        
        <div class="section">
          <h2>Informations complémentaires</h2>
          <div class="field">
            <span class="label">Statut du demandeur:</span>
            <span class="value">${data.statutDemandeur || 'Non spécifié'}</span>
          </div>
          <div class="field">
            <span class="label">Date du projet:</span>
            <span class="value">${data.dateProjet || 'Non spécifié'}</span>
          </div>
          <div class="field">
            <span class="label">Commentaires:</span>
            <div class="value" style="white-space: pre-line;">${data.commentaires || 'Aucun commentaire'}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>Ce message a été généré automatiquement suite à une demande sur le site BorneFlix.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Fonction pour générer le contenu texte de l'email (version sans HTML)
function generateQuoteEmailText(data: QuoteFormData): string {
  return `
NOUVELLE DEMANDE DE DEVIS

Une nouvelle demande de devis a été soumise via le formulaire de votre site web.

INFORMATIONS PERSONNELLES
-------------------------
Nom: ${data.nom}
Prénom: ${data.prenom}
Email: ${data.email}
Téléphone: ${data.telephone}

INFORMATIONS SUR LA COPROPRIÉTÉ
-------------------------------
Type de logement: ${data.typeLogement}
Adresse: ${data.adresse}
Code postal: ${data.codePostal}
Ville: ${data.ville}
Nombre de places de parking: ${data.nombrePlacesParking || 'Non spécifié'}
Nombre de résidents: ${data.nombreResidents || 'Non spécifié'}

SPÉCIFICATIONS TECHNIQUES
-------------------------
Type d'installation: ${data.typeInstallation}
Nombre de bornes souhaité: ${data.nombreBornes}
Puissance de charge souhaitée: ${data.puissanceRequise || 'Non spécifié'}

INFORMATIONS COMPLÉMENTAIRES
----------------------------
Statut du demandeur: ${data.statutDemandeur || 'Non spécifié'}
Date du projet: ${data.dateProjet || 'Non spécifié'}
Commentaires: ${data.commentaires || 'Aucun commentaire'}

Ce message a été généré automatiquement suite à une demande sur le site BorneFlix.
  `;
}
