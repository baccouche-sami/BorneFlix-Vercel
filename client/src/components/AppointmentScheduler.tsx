import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Phone, Mail, X, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalendlyWidget from "./CalendlyWidget";

interface AppointmentType {
  id: string;
  title: string;
  duration: string;
  description: string;
  price: string;
  calendlyUrl: string;
}

const AppointmentScheduler = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedType, setSelectedType] = useState<AppointmentType | null>(null);
  const [showCalendly, setShowCalendly] = useState(false);
  const [showCalendlyWidget, setShowCalendlyWidget] = useState(false);

  const appointmentTypes: AppointmentType[] = [
    {
      id: "consultation",
      title: "Consultation gratuite",
      duration: "30 min",
      description: "Échange initial pour comprendre vos besoins et votre projet de borne de recharge",
      price: "Gratuit",
      calendlyUrl: "https://calendly.com/borneflix/consultation-gratuite"
    },
    {
      id: "etude-technique",
      title: "Étude technique",
      duration: "60 min",
      description: "Visite sur site pour évaluer l'infrastructure et établir un devis détaillé",
      price: "Gratuit",
      calendlyUrl: "https://calendly.com/borneflix/etude-technique"
    },
    {
      id: "installation",
      title: "Installation",
      duration: "Variable",
      description: "Installation et mise en service de votre borne de recharge",
      price: "Sur devis",
      calendlyUrl: "https://calendly.com/borneflix/installation"
    },
    {
      id: "maintenance",
      title: "Maintenance",
      duration: "45 min",
      description: "Maintenance préventive et dépannage de votre installation",
      price: "Sur devis",
      calendlyUrl: "https://calendly.com/borneflix/maintenance"
    }
  ];

  const handleOpenCalendly = (appointmentType: AppointmentType) => {
    setSelectedType(appointmentType);
    setShowCalendly(true);
    
    // Ouvrir Calendly dans une nouvelle fenêtre
    window.open(appointmentType.calendlyUrl, '_blank', 'width=800,height=600');
  };

  const handleOpenCalendlyWidget = (appointmentType: AppointmentType) => {
    setSelectedType(appointmentType);
    setShowCalendlyWidget(true);
  };

  const handleCloseCalendly = () => {
    setShowCalendly(false);
    setSelectedType(null);
  };

  const handleCloseCalendlyWidget = () => {
    setShowCalendlyWidget(false);
    setSelectedType(null);
  };

  return (
    <>
      {/* Bouton pour ouvrir le planificateur */}
      <Button
        onClick={() => setShowScheduler(true)}
        className="bg-[#8dc63f] hover:bg-[#7db52f] text-white font-medium py-3 px-6 rounded-full shadow-lg shadow-[#8dc63f]/30 transition-all duration-300 hover:translate-y-[-2px]"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Prendre rendez-vous
      </Button>

      {/* Modal du planificateur */}
      <AnimatePresence>
        {showScheduler && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowScheduler(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ff6b35]/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-[#ff6b35]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#003566]">
                        Prendre rendez-vous
                      </h2>
                      <p className="text-gray-600">
                        Choisissez le type de rendez-vous qui correspond à vos besoins
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowScheduler(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {appointmentTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-6 hover:border-[#ff6b35] hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-[#003566] mb-2">
                            {type.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {type.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4 text-[#8dc63f]" />
                              {type.price}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        {type.description}
                      </p>
                      
                                             <div className="flex gap-2">
                         <Button
                           onClick={() => handleOpenCalendlyWidget(type)}
                           className="flex-1 bg-[#8dc63f] hover:bg-[#7db52f] text-white"
                         >
                           <Calendar className="w-4 h-4 mr-2" />
                           Réserver
                         </Button>
                         <Button
                           variant="outline"
                           onClick={() => handleOpenCalendly(type)}
                           className="border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white"
                         >
                           <ExternalLink className="w-4 h-4" />
                         </Button>
                       </div>
                    </motion.div>
                  ))}
                </div>

                {/* Informations supplémentaires */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#003566] mb-4">
                    Informations importantes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mt-1">
                        <Clock className="w-4 h-4 text-[#ff6b35]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#003566]">Horaires disponibles</h4>
                        <p className="text-sm text-gray-600">Lun-Ven 9h-18h, Sam 9h-12h</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mt-1">
                        <MapPin className="w-4 h-4 text-[#ff6b35]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#003566]">Zone d'intervention</h4>
                        <p className="text-sm text-gray-600">Île-de-France et départements limitrophes</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mt-1">
                        <Phone className="w-4 h-4 text-[#ff6b35]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#003566]">Contact direct</h4>
                        <p className="text-sm text-gray-600">01 80 91 90 80</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mt-1">
                        <Mail className="w-4 h-4 text-[#ff6b35]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#003566]">Email</h4>
                        <p className="text-sm text-gray-600">contact@borneflix.fr</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowScheduler(false)}
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    Fermer
                  </Button>
                  <Button
                    onClick={() => window.open('tel:0180919080', '_self')}
                    className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler maintenant
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Calendly */}
      <AnimatePresence>
        {showCalendly && selectedType && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8dc63f]/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#8dc63f]" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-[#003566] mb-1">
                  Calendly ouvert
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {selectedType.title} - Une nouvelle fenêtre s'est ouverte pour la prise de rendez-vous.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => window.open(selectedType.calendlyUrl, '_blank')}
                    className="bg-[#8dc63f] hover:bg-[#7db52f] text-white text-xs"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Rouvrir
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCloseCalendly}
                    className="text-xs"
                  >
                    Fermer
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
                 )}
       </AnimatePresence>

       {/* Widget Calendly intégré */}
       {selectedType && (
         <CalendlyWidget
           isOpen={showCalendlyWidget}
           onClose={handleCloseCalendlyWidget}
           eventTypeUrl={selectedType.calendlyUrl}
           title={selectedType.title}
           description={selectedType.description}
         />
       )}
     </>
   );
 };

export default AppointmentScheduler; 