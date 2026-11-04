import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail, verifyEmailConfig } from "../server/mailService";

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

export async function registerRoutes(app: Express): Promise<Server> {
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
