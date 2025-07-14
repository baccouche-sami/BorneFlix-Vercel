import { useState, useEffect } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export const useCookies = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Charger les préférences depuis localStorage
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setPreferences(parsedConsent);
        setHasConsented(true);
      } catch (error) {
        console.error('Erreur lors du chargement des préférences cookies:', error);
      }
    }
  }, []);

  const savePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
    setHasConsented(true);
    
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    // Appliquer les préférences
    applyCookiePreferences(newPreferences);
  };

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Cookies nécessaires - toujours activés
    if (prefs.necessary) {
      // Activer les cookies de session, sécurité, etc.
      console.log('Cookies nécessaires activés');
    }

    // Cookies d'analyse
    if (prefs.analytics) {
      // Activer Google Analytics, Matomo, etc.
      console.log('Cookies d\'analyse activés');
      // Exemple: gtag('consent', 'update', { analytics_storage: 'granted' });
    } else {
      // Désactiver les cookies d'analyse
      console.log('Cookies d\'analyse désactivés');
      // Exemple: gtag('consent', 'update', { analytics_storage: 'denied' });
    }

    // Cookies marketing
    if (prefs.marketing) {
      // Activer les cookies publicitaires
      console.log('Cookies marketing activés');
      // Exemple: gtag('consent', 'update', { ad_storage: 'granted' });
    } else {
      // Désactiver les cookies marketing
      console.log('Cookies marketing désactivés');
      // Exemple: gtag('consent', 'update', { ad_storage: 'denied' });
    }

    // Cookies de préférences
    if (prefs.preferences) {
      // Activer les cookies de personnalisation
      console.log('Cookies de préférences activés');
    } else {
      // Désactiver les cookies de préférences
      console.log('Cookies de préférences désactivés');
    }
  };

  const resetPreferences = () => {
    localStorage.removeItem('cookieConsent');
    localStorage.removeItem('cookieConsentDate');
    setHasConsented(false);
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  const getConsentDate = () => {
    const date = localStorage.getItem('cookieConsentDate');
    return date ? new Date(date) : null;
  };

  const isConsentExpired = () => {
    const consentDate = getConsentDate();
    if (!consentDate) return true;
    
    // Le consentement expire après 13 mois (conformité RGPD)
    const expirationDate = new Date(consentDate);
    expirationDate.setMonth(expirationDate.getMonth() + 13);
    
    return new Date() > expirationDate;
  };

  return {
    preferences,
    hasConsented,
    savePreferences,
    resetPreferences,
    getConsentDate,
    isConsentExpired,
    applyCookiePreferences,
  };
}; 