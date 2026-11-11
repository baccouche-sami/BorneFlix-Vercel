interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

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

// Fonction pour envoyer l'email de contact via l'API interne
export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const response = await fetch('/api/send-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur API contact:', errorData);
      return false;
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de contact:', error);
    return false;
  }
};

// Fonction pour envoyer l'email de devis via l'API interne
export const sendDevisEmail = async (formData: DevisFormData): Promise<boolean> => {
  try {
    const response = await fetch('/api/send-devis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur API devis:', errorData);
      return false;
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de devis:', error);
    return false;
  }
};

export type { ContactFormData, DevisFormData };