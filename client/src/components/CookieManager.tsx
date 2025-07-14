import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Shield, BarChart, Target, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookies, CookiePreferences } from "@/hooks/useCookies";

const CookieManager = () => {
  const [showManager, setShowManager] = useState(false);
  const { preferences, savePreferences, resetPreferences, getConsentDate } = useCookies();
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences);

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type === "necessary") return;
    
    setLocalPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSave = () => {
    savePreferences(localPreferences);
    setShowManager(false);
  };

  const handleReset = () => {
    resetPreferences();
    setLocalPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
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

  const consentDate = getConsentDate();

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowManager(true)}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <Settings className="w-4 h-4 mr-2" />
        Gérer les cookies
      </Button>

      <AnimatePresence>
        {showManager && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowManager(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ff6b35]/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#ff6b35]" />
                    </div>
                    <h2 className="text-xl font-semibold text-[#003566]">
                      Gestion des cookies
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowManager(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                {consentDate && (
                  <p className="text-sm text-gray-500 mt-2">
                    Dernière mise à jour : {consentDate.toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>

              <div className="p-6">
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
                    onClick={handleReset}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Réinitialiser
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowManager(false)}
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-[#8dc63f] hover:bg-[#7db52f] text-white"
                  >
                    Sauvegarder
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieManager; 