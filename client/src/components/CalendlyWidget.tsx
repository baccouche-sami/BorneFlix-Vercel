import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendlyWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  eventTypeUrl: string;
  title?: string;
  description?: string;
}

const CalendlyWidget = ({ 
  isOpen, 
  onClose, 
  eventTypeUrl, 
  title = "Prendre rendez-vous",
  description = "Sélectionnez un créneau qui vous convient"
}: CalendlyWidgetProps) => {
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && calendlyRef.current) {
      // Charger le script Calendly s'il n'est pas déjà chargé
      if (!window.Calendly) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.head.appendChild(script);
      }

      // Initialiser le widget Calendly
      const initCalendly = () => {
        if (window.Calendly && calendlyRef.current) {
          window.Calendly.initInlineWidget({
            url: eventTypeUrl,
            parentElement: calendlyRef.current,
            minWidth: '320px',
            hideLandingPageDetails: false,
            hideEventTypeDetails: false,
            hideGdprBanner: true,
            hideMembers: false,
            prefill: {
              name: '',
              email: '',
              firstName: '',
              lastName: '',
              guests: [],
              customAnswers: {}
            },
            utm: {
              utmCampaign: 'borneflix-website',
              utmSource: 'website',
              utmMedium: 'inline-widget'
            }
          });
        }
      };

      // Attendre que Calendly soit chargé
      if (window.Calendly) {
        initCalendly();
      } else {
        const checkCalendly = setInterval(() => {
          if (window.Calendly) {
            initCalendly();
            clearInterval(checkCalendly);
          }
        }, 100);
      }
    }
  }, [isOpen, eventTypeUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#003566] to-[#004380] text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {title}
                    </h2>
                    <p className="text-white/80">
                      {description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Informations rapides */}
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#ff6b35]" />
                  <span className="text-gray-600">Créneaux disponibles 24h/24</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#ff6b35]" />
                  <span className="text-gray-600">Rendez-vous en ligne ou sur site</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#ff6b35]" />
                  <span className="text-gray-600">Confirmation immédiate</span>
                </div>
              </div>
            </div>

            {/* Widget Calendly */}
            <div className="p-6">
              <div 
                ref={calendlyRef}
                className="calendly-inline-widget min-h-[600px]"
                data-url={eventTypeUrl}
              />
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                <p className="text-sm text-gray-600">
                  Besoin d'aide ? Contactez-nous au 01 80 91 90 80
                </p>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Fermer
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Déclaration TypeScript pour Calendly
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        minWidth?: string;
        hideLandingPageDetails?: boolean;
        hideEventTypeDetails?: boolean;
        hideGdprBanner?: boolean;
        hideMembers?: boolean;
        prefill?: {
          name?: string;
          email?: string;
          firstName?: string;
          lastName?: string;
          guests?: string[];
          customAnswers?: Record<string, string>;
        };
        utm?: {
          utmCampaign?: string;
          utmSource?: string;
          utmMedium?: string;
        };
      }) => void;
    };
  }
}

export default CalendlyWidget; 