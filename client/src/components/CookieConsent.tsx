import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Shield, BarChart, Target, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookies, CookiePreferences } from "@/hooks/useCookies";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { preferences, hasConsented, savePreferences, isConsentExpired } = useCookies();
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement et s'il n'a pas expiré
    if (!hasConsented || isConsentExpired()) {
      setShowConsent(true);
    }
  }, [hasConsented, isConsentExpired]);

  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    savePreferences(allAccepted);
    setShowConsent(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    savePreferences(onlyNecessary);
    setShowConsent(false);
  };

  const handleSavePreferences = () => {
    savePreferences(localPreferences);
    setShowConsent(false);
    setShowSettings(false);
  };

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type === "necessary") return; // Les cookies nécessaires ne peuvent pas être désactivés
    
    setLocalPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const cookieTypes = [
    {
      key: "necessary" as const,
      title: "Cookies nécessaires",
      description: "Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés.",
      icon: Shield,
      required: true
    },
    {
      key: "analytics" as const,
      title: "Cookies d'analyse",
      description: "Ces cookies nous aident à comprendre comment les visiteurs interagissent avec le site.",
      icon: BarChart,
      required: false
    },
    {
      key: "marketing" as const,
      title: "Cookies marketing",
      description: "Ces cookies sont utilisés pour suivre les visiteurs sur différents sites web.",
      icon: Target,
      required: false
    },
    {
      key: "preferences" as const,
      title: "Cookies de préférences",
      description: "Ces cookies permettent au site de mémoriser vos choix et préférences.",
      icon: Settings,
      required: false
    }
  ];

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
      >
        <div className="container mx-auto px-4 py-6">
          {!showSettings ? (
            // Vue principale du consentement
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#ff6b35]/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#ff6b35]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#003566]">
                      Respect de votre vie privée
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. 
                    Vous pouvez choisir les types de cookies que vous acceptez.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      Conforme RGPD
                    </span>
                    <span className="flex items-center gap-1">
                      <Info className="w-4 h-4" />
                      Pas de données personnelles
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => setShowSettings(true)}
                    className="border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Personnaliser
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRejectAll}
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    Refuser tout
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-[#8dc63f] hover:bg-[#7db52f] text-white"
                  >
                    Accepter tout
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Vue des paramètres détaillés
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#003566]">
                  Paramètres des cookies
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4 mb-6">
                {cookieTypes.map((cookieType) => (
                  <div
                    key={cookieType.key}
                    className="flex items-start justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-8 h-8 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mt-1">
                        <cookieType.icon className="w-4 h-4 text-[#ff6b35]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-[#003566]">
                            {cookieType.title}
                          </h4>
                          {cookieType.required && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                              Obligatoire
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {cookieType.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center ml-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                                                 <input
                           type="checkbox"
                           checked={localPreferences[cookieType.key]}
                           onChange={() => handlePreferenceChange(cookieType.key)}
                           disabled={cookieType.required}
                           className="sr-only peer"
                         />
                         <div className={`
                           w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                           peer-focus:ring-[#ff6b35]/20 rounded-full peer 
                           ${localPreferences[cookieType.key] ? 'bg-[#8dc63f]' : 'bg-gray-200'}
                           ${cookieType.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                         `}>
                          <div className={`
                            peer-checked:translate-x-full peer-checked:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:rounded-full after:h-5 after:w-5 
                            after:transition-all
                          `}></div>
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(false)}
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="bg-[#8dc63f] hover:bg-[#7db52f] text-white"
                >
                  Sauvegarder mes choix
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent; 