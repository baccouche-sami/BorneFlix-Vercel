import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
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

// Template HTML pour le formulaire de contact
const createContactEmailTemplate = (data: ContactFormData): string => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouveau message de contact - BorneFlix</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
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
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }
        .info-item {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #8dc63f;
        }
        .info-label {
          font-weight: bold;
          color: #003566;
          font-size: 14px;
          margin-bottom: 5px;
        }
        .info-value {
          color: #333;
          font-size: 16px;
        }
        .message-section {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #003566;
        }
        .message-label {
          font-weight: bold;
          color: #003566;
          margin-bottom: 10px;
        }
        .message-content {
          color: #333;
          line-height: 1.6;
          white-space: pre-wrap;
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
          <h1>🔌 Nouveau Message de Contact</h1>
          <p class="subtitle">Formulaire de contact BorneFlix</p>
        </div>
        
        <div class="content">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">👤 Nom complet</div>
              <div class="info-value">${data.name}</div>
            </div>
            <div class="info-item">
              <div class="info-label">📧 Email</div>
              <div class="info-value">${data.email}</div>
            </div>
            <div class="info-item">
              <div class="info-label">📞 Téléphone</div>
              <div class="info-value">${data.phone || 'Non renseigné'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">🕒 Date d'envoi</div>
              <div class="info-value">${new Date().toLocaleString('fr-FR')}</div>
            </div>
          </div>
          
          <div class="message-section">
            <div class="message-label">💬 Message</div>
            <div class="message-content">${data.message}</div>
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
    const formData: ContactFormData = req.body;

    // Validation des données
    if (!formData.name || !formData.email || !formData.message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const subject = `🔌 Nouveau message de contact - ${formData.name}`;
    const htmlContent = createContactEmailTemplate(formData);
    
    const success = await sendEmail(BREVO_CONFIG.recipientEmail, subject, htmlContent);

    if (success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Email sent successfully' 
      });
    } else {
      return res.status(500).json({ 
        error: 'Failed to send email' 
      });
    }
  } catch (error) {
    console.error('Error in send-contact API:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}
