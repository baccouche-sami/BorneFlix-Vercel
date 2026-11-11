import type { VercelRequest, VercelResponse } from '@vercel/node';
import { insertQuote } from './_lib/db';

interface DevisFormData {
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
  puissanceRequire: string;
  // Step 4: Informations complémentaires
  statutDemandeur: string;
  dateProjet: string;
  commentaires: string;
  rgpd: boolean;
}

interface BrevoConfig {
  apiKey: string;
  senderEmail: string;
  senderName: string;
  recipientEmail: string;
}

const BREVO_CONFIG: BrevoConfig = {
  apiKey: process.env.BREVO_API_KEY || '',
  senderEmail: process.env.BREVO_SENDER_EMAIL || 'noreply@borneflix.fr',
  senderName: process.env.BREVO_SENDER_NAME || 'BorneFlix',
  recipientEmail: process.env.BREVO_RECIPIENT_EMAIL || 'sami.baccouche1998@gmail.com'
};

// Template HTML pour le formulaire de devis
const createDevisEmailTemplate = (data: DevisFormData): string => {
  const installationTypes = {
    'infrastructure-collective': 'Infrastructure collective',
    'borne-individuelle': 'Borne individuelle',
    'prise-greenup': 'Prise Green\'up',
    'solution-hybride': 'Solution hybride',
    'solution-premium': 'Solution Premium',
    'solution-eco': 'Solution Éco-responsable'
  };

  const typeLogementLabels = {
    'copropriete': 'Copropriété',
    'residence': 'Résidence',
    'immeuble': 'Immeuble',
    'autre': 'Autre'
  };

  const statutLabels = {
    'syndic': 'Syndic',
    'coproprietaire': 'Copropriétaire',
    'gestionnaire': 'Gestionnaire',
    'demandeur-professionnel': 'Demandeur professionnel',
    'autre': 'Autre'
  };

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouvelle demande de devis - BorneFlix</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 700px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #003566 0%, #1a4d85 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .header .subtitle {
          margin: 10px 0 0 0;
          opacity: 0.9;
          font-size: 16px;
        }
        .content {
          padding: 30px;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          background: #8dc63f;
          color: white;
          padding: 12px 20px;
          margin: 0 0 15px 0;
          border-radius: 6px;
          font-size: 18px;
          font-weight: bold;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .info-item {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 6px;
          border-left: 3px solid #003566;
        }
        .info-label {
          font-weight: bold;
          color: #003566;
          font-size: 13px;
          margin-bottom: 4px;
        }
        .info-value {
          color: #333;
          font-size: 15px;
        }
        .full-width {
          grid-column: 1 / -1;
        }
        .highlight-box {
          background: linear-gradient(135deg, #8dc63f 0%, #7db52f 100%);
          color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          margin: 20px 0;
        }
        .highlight-box h3 {
          margin: 0 0 10px 0;
          font-size: 20px;
        }
        .footer {
          background: #003566;
          color: white;
          padding: 20px;
          text-align: center;
          font-size: 14px;
        }
        .footer a {
          color: #8dc63f;
          text-decoration: none;
        }
        .timestamp {
          color: #666;
          font-size: 12px;
          text-align: center;
          margin-top: 20px;
        }
        @media (max-width: 600px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 Nouvelle Demande de Devis</h1>
          <p class="subtitle">Formulaire de devis BorneFlix</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2 class="section-title">👤 Informations Personnelles</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Prénom</div>
                <div class="info-value">${data.prenom}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Nom</div>
                <div class="info-value">${data.nom}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${data.email}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Téléphone</div>
                <div class="info-value">${data.telephone}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">🏢 Informations sur la Copropriété</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Type de logement</div>
                <div class="info-value">${typeLogementLabels[data.typeLogement as keyof typeof typeLogementLabels] || data.typeLogement}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Nombre de résidents</div>
                <div class="info-value">${data.nombreResidents}</div>
              </div>
              <div class="info-item full-width">
                <div class="info-label">Adresse</div>
                <div class="info-value">${data.adresse}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Code postal</div>
                <div class="info-value">${data.codePostal}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Ville</div>
                <div class="info-value">${data.ville}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Places de parking</div>
                <div class="info-value">${data.nombrePlacesParking}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">⚡ Informations Techniques</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Type d'installation</div>
                <div class="info-value">${installationTypes[data.typeInstallation as keyof typeof installationTypes] || data.typeInstallation}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Nombre de bornes</div>
                <div class="info-value">${data.nombreBornes}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Puissance souhaitée</div>
                <div class="info-value">${data.puissanceRequire} kW</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">📝 Informations Complémentaires</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Statut du demandeur</div>
                <div class="info-value">${statutLabels[data.statutDemandeur as keyof typeof statutLabels] || data.statutDemandeur || 'Non renseigné'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Date souhaitée</div>
                <div class="info-value">${data.dateProjet || 'Non renseignée'}</div>
              </div>
              ${data.commentaires ? `
              <div class="info-item full-width">
                <div class="info-label">Commentaires</div>
                <div class="info-value">${data.commentaires}</div>
              </div>
              ` : ''}
            </div>
          </div>

          <div class="highlight-box">
            <h3>🚀 Action Requise</h3>
            <p>Une nouvelle demande de devis a été soumise. Veuillez recontacter le client dans les 24h avec un devis personnalisé.</p>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>BorneFlix</strong> - Solutions de recharge intelligentes</p>
          <p>📧 <a href="mailto:contact@borneflix.fr">contact@borneflix.fr</a> | 📞 01 80 91 90 80</p>
          <p>🌐 <a href="https://borneflix.fr">borneflix.fr</a></p>
        </div>
      </div>
      
      <div class="timestamp">
        Email envoyé automatiquement le ${new Date().toLocaleString('fr-FR')}
      </div>
    </body>
    </html>
  `;
};

// Fonction pour envoyer un email via Brevo
const sendEmail = async (to: string, subject: string, htmlContent: string): Promise<boolean> => {
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_CONFIG.apiKey,
      },
      body: JSON.stringify({
        sender: {
          email: BREVO_CONFIG.senderEmail,
          name: BREVO_CONFIG.senderName,
        },
        to: [
          {
            email: to,
            name: 'BorneFlix Team',
          },
          {
            email: 'contact@gh-solutions.fr',
            name: 'BorneFlix Team',
          },
        ],
        subject: subject,
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur Brevo:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Vérifier que la méthode est POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vérifier que l'API key est configurée
  if (!BREVO_CONFIG.apiKey) {
    console.error('BREVO_API_KEY is not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const formData: DevisFormData = req.body;

    // Validation des données requises
    if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone) {
      return res.status(400).json({ 
        error: 'Missing required fields: nom, prenom, email, and telephone are required' 
      });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validation RGPD
    if (!formData.rgpd) {
      return res.status(400).json({ 
        error: 'RGPD consent is required' 
      });
    }

    try {
      await insertQuote({
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
        puissanceRequise: formData.puissanceRequire,
        statutDemandeur: formData.statutDemandeur,
        dateProjet: formData.dateProjet,
        commentaires: formData.commentaires,
      });
    } catch (error) {
      console.error("Demande de devis non enregistrée.", error);
    }

    const subject = `📋 Nouvelle demande de devis - ${formData.prenom} ${formData.nom}`;
    const htmlContent = createDevisEmailTemplate(formData);
    
    const success = await sendEmail(BREVO_CONFIG.recipientEmail, subject, htmlContent);

    if (success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Devis email sent successfully' 
      });
    } else {
      return res.status(500).json({ 
        error: 'Failed to send devis email' 
      });
    }
  } catch (error) {
    console.error('Error in send-devis API:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}
