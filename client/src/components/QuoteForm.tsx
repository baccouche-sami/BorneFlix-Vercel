import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const QuoteForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Information de base
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    // Step 2: Informations sur la copropriété
    typeLogement: "",
    adresse: "",
    codePostal: "",
    ville: "",
    nombrePlacesParking: "",
    nombreResidents: "",
    // Step 3: Informations techniques
    typeInstallation: "infrastructure-collective", // Default value
    nombreBornes: "",
    puissanceRequise: "",
    // Step 4: Informations complémentaires
    statutDemandeur: "",
    dateProjet: "",
    commentaires: "",
    rgpd: false
  });

  // Fonction pour calculer l'estimation temporaire
  const calculateEstimation = () => {
    let prixUnitaire = 0;
    let installationUnitaire = 0;
    let nombreBornes = 1;
    
    // Prix unitaire selon le type d'installation
    switch (formData.typeInstallation) {
      case "infrastructure-collective":
        prixUnitaire = 799;
        installationUnitaire = 250;
        break;
      case "solution-individuelle":
        prixUnitaire = 399;
        installationUnitaire = 150;
        break;
      case "solution-premium":
        prixUnitaire = 599;
        installationUnitaire = 200;
        break;
      default:
        prixUnitaire = 799;
        installationUnitaire = 250;
    }
    
    // Déterminer le nombre de bornes
    if (formData.nombreBornes) {
      if (formData.nombreBornes.includes('-')) {
        nombreBornes = parseInt(formData.nombreBornes.split('-')[0]);
      } else {
        nombreBornes = parseInt(formData.nombreBornes);
      }
    }
    
    // Ajustement du prix unitaire selon le volume
    let reductionVolume = 1;
    if (nombreBornes >= 20) {
      reductionVolume = 0.75; // Réduction de 25% pour très gros volumes
    } else if (nombreBornes >= 10) {
      reductionVolume = 0.85; // Réduction de 15% pour gros volumes
    } else if (nombreBornes >= 5) {
      reductionVolume = 0.9; // Réduction de 10% pour volumes moyens
    } else if (nombreBornes >= 2) {
      reductionVolume = 0.95; // Réduction de 5% pour petits volumes
    }
    
    // Ajustement selon la puissance
    let multiplicateurPuissance = 1;
    if (formData.puissanceRequise) {
      const puissance = parseFloat(formData.puissanceRequise);
      if (puissance >= 22) {
        multiplicateurPuissance = 1.2; // +20% pour haute puissance
      } else if (puissance >= 11) {
        multiplicateurPuissance = 1.1; // +10% pour puissance moyenne
      }
    }
    
    // Calcul des prix finaux
    const prixUnitaireFinal = Math.round(prixUnitaire * reductionVolume * multiplicateurPuissance);
    const installationUnitaireFinal = Math.round(installationUnitaire * reductionVolume);
    
    const totalBornes = prixUnitaireFinal * nombreBornes;
    const totalInstallation = installationUnitaireFinal * nombreBornes;
    const totalEstimation = totalBornes + totalInstallation;
    
    // Calcul des économies
    const economieBase = Math.round(totalEstimation * 0.3); // 30% d'économies de base
    const economieIntelligente = Math.round(totalEstimation * 0.2); // +20% grâce à l'intelligence
    const totalEconomies = economieBase + economieIntelligente;
    
    return {
      prixUnitaire: prixUnitaireFinal,
      installationUnitaire: installationUnitaireFinal,
      nombreBornes,
      totalBornes,
      totalInstallation,
      totalEstimation,
      totalEconomies,
      prixFinal: totalEstimation - totalEconomies,
      economieBase,
      economieIntelligente,
      reductionVolume: Math.round((1 - reductionVolume) * 100),
      multiplicateurPuissance: Math.round((multiplicateurPuissance - 1) * 100)
    };
  };

  const totalSteps = 4;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const nextStep = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone) {
        toast({
          title: "Champs obligatoires",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive"
        });
        return;
      }
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Email invalide",
          description: "Veuillez entrer une adresse email valide.",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.typeLogement || !formData.adresse || !formData.codePostal || !formData.ville) {
        toast({
          title: "Champs obligatoires",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.typeInstallation || !formData.nombreBornes) {
        toast({
          title: "Champs obligatoires",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      // Scroll intelligent : seulement si l'utilisateur n'est pas déjà en haut du formulaire
      setTimeout(() => {
        const formElement = document.getElementById('devis');
        if (formElement) {
          const formTop = formElement.offsetTop;
          const currentScroll = window.pageYOffset;
          
          // Si on n'est pas déjà en haut du formulaire, on scroll
          if (currentScroll > formTop + 100) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100); // Petit délai pour laisser l'animation se déclencher
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll intelligent : seulement si l'utilisateur n'est pas déjà en haut du formulaire
      setTimeout(() => {
        const formElement = document.getElementById('devis');
        if (formElement) {
          const formTop = formElement.offsetTop;
          const currentScroll = window.pageYOffset;
          
          // Si on n'est pas déjà en haut du formulaire, on scroll
          if (currentScroll > formTop + 100) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100); // Petit délai pour laisser l'animation se déclencher
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.rgpd) {
      toast({
        title: "Consentement requis",
        description: "Veuillez accepter les conditions d'utilisation et la politique de confidentialité.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Envoi des données au serveur
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Afficher le message de succès
        toast({
          title: "Demande envoyée avec succès",
          description: data.message || "Votre demande a été envoyée. Notre expert vous contactera sous 24h pour un devis précis et personnalisé.",
        });
        
        // Réinitialiser le formulaire et revenir à l'étape 1
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          typeLogement: "",
          adresse: "",
          codePostal: "",
          ville: "",
          nombrePlacesParking: "",
          nombreResidents: "",
          typeInstallation: "infrastructure-collective",
          nombreBornes: "",
          puissanceRequise: "",
          statutDemandeur: "",
          dateProjet: "",
          commentaires: "",
          rgpd: false
        });
        setCurrentStep(1);
        
        // Faire défiler vers le haut du formulaire
        const formElement = document.getElementById('devis');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Afficher le message d'erreur
        toast({
          title: "Erreur",
          description: data.message || "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer ultérieurement.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de contacter le serveur. Veuillez vérifier votre connexion et réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to get step icons
  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <i className="fas fa-user"></i>;
      case 2:
        return <i className="fas fa-building"></i>;
      case 3:
        return <i className="fas fa-plug"></i>;
      case 4:
        return <i className="fas fa-clipboard-list"></i>;
      default:
        return step;
    }
  };

  // Function to get step descriptions
  const getStepDescription = (step: number) => {
    switch (step) {
      case 1:
        return "Vos coordonnées";
      case 2:
        return "Votre logement";
      case 3:
        return "Technique";
      case 4:
        return "Finalisation";
      default:
        return "";
    }
  };

  // Render step indicator
  const renderStepIndicator = () => {
    return (
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div key={stepNumber} className="flex items-center">
                <div className={`flex items-center justify-center w-16 h-16 rounded-full border-3 transition-all duration-500 shadow-lg ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#8dc63f] to-[#7db52f] border-[#8dc63f] text-white scale-110' 
                    : isCompleted 
                    ? 'bg-gradient-to-r from-[#8dc63f] to-[#7db52f] border-[#8dc63f] text-white' 
                    : 'bg-white border-gray-200 text-gray-400 shadow-md'
                }`}>
                  {isCompleted ? (
                    <i className="fas fa-check text-lg"></i>
                  ) : (
                    <div className="text-lg">{getStepIcon(stepNumber)}</div>
                  )}
                </div>
                {stepNumber < totalSteps && (
                  <div className={`w-20 h-2 mx-3 transition-all duration-500 rounded-full ${
                    isCompleted ? 'bg-gradient-to-r from-[#8dc63f] to-[#7db52f]' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-6">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            
            return (
              <div key={stepNumber} className={`text-center ${isActive ? 'text-[#8dc63f] font-bold' : 'text-gray-500'}`}>
                <div className="text-sm font-semibold">{getStepDescription(stepNumber)}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Vos informations personnelles";
      case 2:
        return "Informations sur votre logement";
      case 3:
        return "Spécifications techniques";
      case 4:
        return "Informations complémentaires";
      default:
        return "";
    }
  };

  return (
    <section id="devis" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#8dc63f]/10 to-[#003566]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#003566]/10 to-[#8dc63f]/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#8dc63f]/5 to-[#003566]/5 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-[#8dc63f]/20 to-[#003566]/20 text-[#8dc63f] px-6 md:px-8 py-3 rounded-full text-sm font-bold mb-6 md:mb-8 border border-[#8dc63f]/20 backdrop-blur-sm">
            <i className="fas fa-calculator mr-2"></i>
            DEMANDE DE DEVIS GRATUIT
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-[#003566] leading-tight">
            Devis gratuit <span className="bg-gradient-to-r from-[#8dc63f] to-[#7db52f] bg-clip-text text-transparent">en 2 minutes</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Remplissez ce formulaire pour obtenir votre 
            <span className="text-[#8dc63f] font-medium"> estimation temporaire </span> 
            et votre devis personnalisé adapté à vos besoins.
            <br />
            <span className="text-[#8dc63f] font-medium"> Solutions intelligentes dès 399€ </span> 
            et 
            <span className="text-[#8dc63f] font-medium"> économies jusqu'à 50% </span>. 
            Notre expert vous contacte sous 24h pour un devis précis.
          </p>
          
          {/* Form benefits badges - improved design */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-[#8dc63f]/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-clock text-white text-sm"></i>
              </div>
              <span className="text-sm font-bold text-gray-800">Devis en 2 min</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-[#8dc63f]/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-euro-sign text-white text-sm"></i>
              </div>
              <span className="text-sm font-bold text-gray-800">100% gratuit</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-[#8dc63f]/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-shield-alt text-white text-sm"></i>
              </div>
              <span className="text-sm font-bold text-gray-800">Données sécurisées</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-[#8dc63f]/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-phone text-white text-sm"></i>
              </div>
              <span className="text-sm font-bold text-gray-800">Contact sous 24h</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-0 border border-white/20">
            <div className="bg-gradient-to-r from-[#003566] via-[#1a4d85] to-[#2d5a8f] text-white p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 blur-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold mb-4 border border-white/20">
                  Étape {currentStep} sur {totalSteps}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">{renderStepTitle()}</h3>
              </div>
            </div>
            
            <CardContent className="p-8 md:p-10 lg:p-12">
              {renderStepIndicator()}
              
              <form onSubmit={handleSubmit} className="mt-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Informations personnelles */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 md:space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-4">
                          <Label htmlFor="nom" className="text-gray-800 font-bold flex items-center text-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                              <i className="fas fa-user text-white text-sm"></i>
                            </div>
                            Nom <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <div className="relative group">
                            <Input
                              id="nom"
                              name="nom"
                              placeholder="Votre nom"
                              value={formData.nom}
                              onChange={handleInputChange}
                              className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm"
                              required
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400 group-focus-within:text-[#8dc63f] transition-colors">
                              <i className="fas fa-user text-lg"></i>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <Label htmlFor="prenom" className="text-gray-800 font-bold flex items-center text-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                              <i className="fas fa-user text-white text-sm"></i>
                            </div>
                            Prénom <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <div className="relative group">
                            <Input
                              id="prenom"
                              name="prenom"
                              placeholder="Votre prénom"
                              value={formData.prenom}
                              onChange={handleInputChange}
                              className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm"
                              required
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400 group-focus-within:text-[#8dc63f] transition-colors">
                              <i className="fas fa-user text-lg"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="email" className="text-gray-800 font-bold flex items-center text-lg">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-envelope text-white text-sm"></i>
                          </div>
                          Email <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="relative group">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="votreemail@exemple.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm"
                            required
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400 group-focus-within:text-[#8dc63f] transition-colors">
                            <i className="fas fa-envelope text-lg"></i>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="telephone" className="text-gray-800 font-bold flex items-center text-lg">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-phone-alt text-white text-sm"></i>
                          </div>
                          Téléphone <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="relative group">
                          <Input
                            id="telephone"
                            name="telephone"
                            type="tel"
                            placeholder="01 23 45 67 89"
                            value={formData.telephone}
                            onChange={handleInputChange}
                            className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm"
                            required
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400 group-focus-within:text-[#8dc63f] transition-colors">
                            <i className="fas fa-phone-alt text-lg"></i>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 flex items-start shadow-lg">
                        <div className="text-blue-500 mr-4 mt-1">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                            <i className="fas fa-shield-alt text-white text-lg"></i>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-blue-900 font-bold text-lg mb-2">Protection de vos données</h4>
                          <p className="text-blue-800 text-base leading-relaxed">Vos données personnelles sont protégées et traitées conformément au RGPD. Nous ne les partagerons jamais avec des tiers sans votre consentement explicite.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Informations sur la copropriété */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 md:space-y-8"
                    >
                      <div className="space-y-4">
                        <Label htmlFor="typeLogement" className="text-gray-800 font-bold flex items-center text-lg">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-building text-white text-sm"></i>
                          </div>
                          Type de logement <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Select 
                          value={formData.typeLogement} 
                          onValueChange={(value) => handleSelectChange("typeLogement", value)}
                        >
                          <SelectTrigger className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400">
                              <i className="fas fa-building text-lg"></i>
                            </div>
                            <SelectValue placeholder="Sélectionnez un type de logement" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maison-individuelle">Maison individuelle</SelectItem>
                            <SelectItem value="appartement-prive">Appartement privé</SelectItem>
                            <SelectItem value="copropriete">Copropriété</SelectItem>
                            <SelectItem value="immeuble">Immeuble</SelectItem>
                            <SelectItem value="residence">Résidence</SelectItem>
                            <SelectItem value="lotissement">Lotissement</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="adresse" className="text-gray-800 font-bold flex items-center text-lg">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-map-marker-alt text-white text-sm"></i>
                          </div>
                          Adresse de votre logement <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="relative group">
                          <Input
                            id="adresse"
                            name="adresse"
                            placeholder="Numéro et nom de rue"
                            value={formData.adresse}
                            onChange={handleInputChange}
                            className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm"
                            required
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400 group-focus-within:text-[#8dc63f] transition-colors">
                            <i className="fas fa-map-marker-alt text-lg"></i>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-4">
                          <Label htmlFor="codePostal" className="text-gray-800 font-bold flex items-center text-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                              <i className="fas fa-mail-bulk text-white text-sm"></i>
                            </div>
                            Code postal <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <div className="relative group">
                            <Input
                              id="codePostal"
                              name="codePostal"
                              placeholder="75001"
                              value={formData.codePostal}
                              onChange={handleInputChange}
                              className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm"
                              required
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400 group-focus-within:text-[#8dc63f] transition-colors">
                              <i className="fas fa-mail-bulk text-lg"></i>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <Label htmlFor="ville" className="text-gray-800 font-bold flex items-center text-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                              <i className="fas fa-city text-white text-sm"></i>
                            </div>
                            Ville <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <div className="relative group">
                            <Input
                              id="ville"
                              name="ville"
                              placeholder="Paris"
                              value={formData.ville}
                              onChange={handleInputChange}
                              className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm"
                              required
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400 group-focus-within:text-[#8dc63f] transition-colors">
                              <i className="fas fa-city text-lg"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-4">
                          <Label htmlFor="nombrePlacesParking" className="text-gray-800 font-bold flex items-center text-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                              <i className="fas fa-car text-white text-sm"></i>
                            </div>
                            Nombre de places de parking <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <div className="relative group">
                            <Input
                              id="nombrePlacesParking"
                              name="nombrePlacesParking"
                              placeholder="Ex: 50"
                              value={formData.nombrePlacesParking}
                              onChange={handleInputChange}
                              className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm"
                              required
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400 group-focus-within:text-[#8dc63f] transition-colors">
                              <i className="fas fa-car text-lg"></i>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <Label htmlFor="nombreResidents" className="text-gray-800 font-bold flex items-center text-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                              <i className="fas fa-users text-white text-sm"></i>
                            </div>
                            Nombre de résidents <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <div className="relative group">
                            <Input
                              id="nombreResidents"
                              name="nombreResidents"
                              placeholder="Ex: 120"
                              value={formData.nombreResidents}
                              onChange={handleInputChange}
                              className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm"
                              required
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400 group-focus-within:text-[#8dc63f] transition-colors">
                              <i className="fas fa-users text-lg"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Informations techniques */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 md:space-y-8"
                    >
                      <div className="space-y-4">
                        <Label className="text-gray-800 font-bold flex items-center text-lg">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-plug text-white text-sm"></i>
                          </div>
                          Type d'installation souhaité <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <RadioGroup 
                          value={formData.typeInstallation}
                          onValueChange={(value) => handleRadioChange("typeInstallation", value)}
                          className="grid grid-cols-1 gap-4"
                        >
                          <div className="flex items-start space-x-3 p-5 border-2 border-gray-200 hover:border-[#8dc63f] rounded-xl hover:bg-[#8dc63f]/5 cursor-pointer transition-all duration-200 shadow-sm">
                            <RadioGroupItem value="infrastructure-collective" id="infrastructure-collective" className="mt-1 text-[#8dc63f]" />
                            <div>
                              <Label htmlFor="infrastructure-collective" className="font-bold text-lg cursor-pointer">Solution complète intelligente</Label>
                              <p className="text-gray-600 mt-1">Solution complète avec gestion intelligente de l'énergie, économies jusqu'à 50% et installation en 24h. Idéal pour copropriétés et entreprises.</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Recommandé</span>
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Économies 50%</span>
                                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">Dès 799€</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3 p-5 border-2 border-gray-200 hover:border-[#8dc63f] rounded-xl hover:bg-[#8dc63f]/5 cursor-pointer transition-all duration-200 shadow-sm">
                            <RadioGroupItem value="solution-individuelle" id="solution-individuelle" className="mt-1 text-[#8dc63f]" />
                            <div>
                              <Label htmlFor="solution-individuelle" className="font-bold text-lg cursor-pointer">Borne individuelle connectée</Label>
                              <p className="text-gray-600 mt-1">Borne de recharge personnelle avec gestion intelligente via app mobile, installation en 2h et économies jusqu'à 50%. Parfait pour particuliers.</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Populaire</span>
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Économies 50%</span>
                                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">Dès 399€</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3 p-5 border-2 border-gray-200 hover:border-[#8dc63f] rounded-xl hover:bg-[#8dc63f]/5 cursor-pointer transition-all duration-200 shadow-sm">
                            <RadioGroupItem value="solution-premium" id="solution-premium" className="mt-1 text-[#8dc63f]" />
                            <div>
                              <Label htmlFor="solution-premium" className="font-bold text-lg cursor-pointer">Solution premium intelligente</Label>
                              <p className="text-gray-600 mt-1">Borne de recharge haut de gamme avec gestion intelligente avancée, app mobile premium, installation en 2h et économies jusqu'à 50%. Inclut support prioritaire.</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Premium</span>
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Économies 50%</span>
                                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">Dès 299€</span>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Support 24/7</span>
                              </div>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-4">
                          <Label htmlFor="nombreBornes" className="text-gray-800 font-bold flex items-center text-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                              <i className="fas fa-charging-station text-white text-sm"></i>
                            </div>
                            Nombre de bornes souhaité <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Select 
                            value={formData.nombreBornes} 
                            onValueChange={(value) => handleSelectChange("nombreBornes", value)}
                          >
                            <SelectTrigger className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400">
                                <i className="fas fa-charging-station text-lg"></i>
                              </div>
                              <SelectValue placeholder="Sélectionnez une quantité" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 borne</SelectItem>
                              <SelectItem value="2">2 bornes</SelectItem>
                              <SelectItem value="3-5">3 à 5 bornes</SelectItem>
                              <SelectItem value="6-10">6 à 10 bornes</SelectItem>
                              <SelectItem value="11-20">11 à 20 bornes</SelectItem>
                              <SelectItem value="21-50">21 à 50 bornes</SelectItem>
                              <SelectItem value="50+">Plus de 50 bornes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-4">
                          <Label htmlFor="puissanceRequise" className="text-gray-800 font-bold flex items-center text-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                              <i className="fas fa-bolt text-white text-sm"></i>
                            </div>
                            Puissance de charge souhaitée
                          </Label>
                          <Select 
                            value={formData.puissanceRequise} 
                            onValueChange={(value) => handleSelectChange("puissanceRequise", value)}
                          >
                            <SelectTrigger className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400">
                                <i className="fas fa-bolt text-lg"></i>
                              </div>
                              <SelectValue placeholder="Sélectionnez une puissance" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3.7">3.7 kW (charge lente)</SelectItem>
                              <SelectItem value="7.4">7.4 kW (charge accélérée)</SelectItem>
                              <SelectItem value="11">11 kW (charge rapide)</SelectItem>
                              <SelectItem value="22">22 kW (charge très rapide)</SelectItem>
                              <SelectItem value="ne-sais-pas">Je ne sais pas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                    {/* Estimation temporaire */}
                    {formData.typeInstallation && formData.nombreBornes && (
                      <div className="bg-gradient-to-br from-[#8dc63f]/5 via-white to-[#003566]/5 p-8 rounded-3xl border-2 border-[#8dc63f]/20 shadow-2xl backdrop-blur-sm">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-4 shadow-lg">
                            <i className="fas fa-calculator text-white text-lg"></i>
                          </div>
                          <h4 className="text-2xl font-bold text-[#003566]">Estimation temporaire</h4>
                        </div>
                        
                        {(() => {
                          const estimation = calculateEstimation();
                          return (
                            <div className="space-y-3">
                              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200 shadow-lg">
                                <div className="text-center mb-4">
                                  <span className="text-lg font-bold text-blue-900 bg-white/50 px-4 py-2 rounded-full">Configuration sélectionnée</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600">Prix unitaire :</span>
                                  <span className="font-medium">{estimation.prixUnitaire}€</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600">Installation unitaire :</span>
                                  <span className="font-medium">{estimation.installationUnitaire}€</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600">Nombre de bornes :</span>
                                  <span className="font-medium">{estimation.nombreBornes}</span>
                                </div>
                                {estimation.reductionVolume > 0 && (
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Réduction volume :</span>
                                    <span className="font-medium text-green-600">-{estimation.reductionVolume}%</span>
                                  </div>
                                )}
                                {estimation.multiplicateurPuissance > 0 && (
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Majoration puissance :</span>
                                    <span className="font-medium text-orange-600">+{estimation.multiplicateurPuissance}%</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="border-t border-gray-200 pt-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 font-medium">Total bornes ({estimation.nombreBornes}x) :</span>
                                  <span className="font-medium">{estimation.totalBornes}€</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 font-medium">Total installation ({estimation.nombreBornes}x) :</span>
                                  <span className="font-medium">{estimation.totalInstallation}€</span>
                                </div>
                                <div className="border-t border-gray-200 pt-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Total estimé :</span>
                                    <span className="text-lg font-bold text-[#003566]">{estimation.totalEstimation}€</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-gradient-to-r from-[#8dc63f]/10 to-[#7db52f]/10 p-6 rounded-2xl border-2 border-[#8dc63f]/20 shadow-lg">
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[#8dc63f] font-bold text-base">Économies tarifaires :</span>
                                    <span className="text-[#8dc63f] font-bold text-lg">-{estimation.economieBase}€</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-[#8dc63f] font-bold text-base">Économies intelligentes :</span>
                                    <span className="text-[#8dc63f] font-bold text-lg">-{estimation.economieIntelligente}€</span>
                                  </div>
                                  <div className="border-t-2 border-[#8dc63f]/30 pt-3">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[#003566] font-bold text-lg">Total économies :</span>
                                      <span className="text-[#8dc63f] font-bold text-xl">-{estimation.totalEconomies}€</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-gradient-to-br from-[#003566]/10 via-white to-[#8dc63f]/10 p-6 rounded-2xl border-2 border-[#8dc63f]/30 shadow-xl">
                                <div className="flex justify-between items-center mb-3">
                                  <span className="text-[#003566] font-bold text-xl">Prix final estimé :</span>
                                  <span className="text-3xl font-bold bg-gradient-to-r from-[#8dc63f] to-[#7db52f] bg-clip-text text-transparent">{estimation.prixFinal}€</span>
                                </div>
                                <div className="text-sm text-gray-700 font-medium">
                                  Économies de {Math.round((estimation.totalEconomies / estimation.totalEstimation) * 100)}% garanties
                                </div>
                              </div>
                              
                              <div className="text-xs text-gray-500 text-center">
                                * Estimation basée sur vos réponses. Notre expert vous contactera pour un devis précis.
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </motion.div>
                )}

                  {/* Step 4: Informations complémentaires */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 md:space-y-8"
                    >
                      <div className="space-y-4">
                        <Label htmlFor="statutDemandeur" className="text-gray-800 font-bold flex items-center text-lg">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-user-tie text-white text-sm"></i>
                          </div>
                          Votre statut dans la copropriété
                        </Label>
                        <Select 
                          value={formData.statutDemandeur} 
                          onValueChange={(value) => handleSelectChange("statutDemandeur", value)}
                        >
                          <SelectTrigger className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400">
                              <i className="fas fa-user-tie text-lg"></i>
                            </div>
                            <SelectValue placeholder="Sélectionnez votre statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="particulier">Particulier</SelectItem>
                            <SelectItem value="proprietaire">Propriétaire</SelectItem>
                            <SelectItem value="locataire">Locataire</SelectItem>
                            <SelectItem value="resident">Résident (copropriété)</SelectItem>
                            <SelectItem value="syndic">Syndic</SelectItem>
                            <SelectItem value="conseil-syndical">Membre du conseil syndical</SelectItem>
                            <SelectItem value="entreprise">Entreprise</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="dateProjet" className="text-gray-800 font-bold flex items-center text-lg">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-calendar-alt text-white text-sm"></i>
                          </div>
                          Quand souhaitez-vous réaliser ce projet ?
                        </Label>
                        <Select 
                          value={formData.dateProjet} 
                          onValueChange={(value) => handleSelectChange("dateProjet", value)}
                        >
                          <SelectTrigger className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-gray-400">
                              <i className="fas fa-calendar-alt text-lg"></i>
                            </div>
                            <SelectValue placeholder="Sélectionnez une période" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maintenant">Dès que possible</SelectItem>
                            <SelectItem value="3mois">Dans les 3 prochains mois</SelectItem>
                            <SelectItem value="6mois">Dans les 6 prochains mois</SelectItem>
                            <SelectItem value="1an">D'ici un an</SelectItem>
                            <SelectItem value="simple-renseignement">Simple renseignement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="commentaires" className="text-gray-800 font-bold flex items-center text-lg">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-comment-alt text-white text-sm"></i>
                          </div>
                          Commentaires ou précisions supplémentaires
                        </Label>
                        <div className="relative group">
                          <Textarea
                            id="commentaires"
                            name="commentaires"
                            placeholder="Partagez avec nous toute information complémentaire utile à votre projet..."
                            value={formData.commentaires}
                            onChange={handleInputChange}
                            rows={4}
                            className="pl-14 py-5 border-2 border-gray-200 focus:border-[#8dc63f] focus:ring-4 focus:ring-[#8dc63f]/10 transition-all duration-300 group-hover:border-[#8dc63f]/50 rounded-xl text-lg shadow-sm resize-none"
                          />
                          <div className="absolute top-5 left-5 pointer-events-none text-gray-400 group-focus-within:text-[#8dc63f] transition-colors">
                            <i className="fas fa-comment-alt text-lg"></i>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm">
                        <div className="flex items-start space-x-4">
                          <Checkbox
                            id="rgpd"
                            checked={formData.rgpd}
                            onCheckedChange={(checked) => handleCheckboxChange("rgpd", checked as boolean)}
                            className="mt-1 h-5 w-5 border-gray-300 text-[#8dc63f] focus:ring-[#8dc63f]/20"
                          />
                          <div>
                            <Label htmlFor="rgpd" className="text-gray-800 font-bold text-lg cursor-pointer">
                              J'accepte que mes données personnelles soient traitées par Borne Flix <span className="text-red-500">*</span>
                            </Label>
                            <p className="text-gray-600 text-base mt-2 leading-relaxed">
                              En soumettant ce formulaire, j'accepte que les informations saisies soient utilisées pour me recontacter dans le cadre de ma demande de devis.
                              Consultez notre <a href="#" className="text-[#8dc63f] hover:underline font-medium">politique de confidentialité</a>.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200 flex items-start shadow-lg">
                        <div className="text-yellow-600 mr-4 mt-1">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                            <i className="fas fa-shield-alt text-white text-lg"></i>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-yellow-900 font-bold text-lg mb-2">Protection de vos données</h4>
                          <p className="text-yellow-800 text-base leading-relaxed">Toutes vos informations sont sécurisées et traitées conformément au RGPD. Nous ne communiquerons jamais vos coordonnées à des tiers sans votre consentement explicite.</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 flex items-start shadow-lg">
                        <div className="text-blue-600 mr-4 mt-1">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                            <i className="fas fa-info-circle text-white text-lg"></i>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-blue-900 font-bold text-lg mb-2">Processus de devis</h4>
                          <p className="text-blue-800 text-base leading-relaxed">
                            Après envoi de votre demande, notre expert BorneFlix vous contactera sous 24h pour un rendez-vous téléphonique. 
                            Il vous proposera un devis précis et personnalisé basé sur votre situation spécifique, avec des solutions intelligentes 
                            adaptées à vos besoins et à votre budget.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation buttons */}
                <div className="flex flex-col sm:flex-row gap-6 mt-12 pt-8 border-t-2 border-gray-200">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="flex-1 sm:flex-none border-3 border-gray-300 text-gray-700 hover:bg-gray-50 py-6 px-8 rounded-2xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <i className="fas fa-arrow-left mr-3 text-xl"></i>
                      Précédent
                    </Button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 sm:flex-none bg-gradient-to-r from-[#8dc63f] to-[#7db52f] hover:from-[#7db52f] hover:to-[#6ca42e] text-white py-6 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg hover:scale-105"
                    >
                      Continuer <i className="fas fa-arrow-right ml-3 text-xl"></i>
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="flex-1 sm:flex-none bg-gradient-to-r from-[#8dc63f] to-[#7db52f] hover:from-[#7db52f] hover:to-[#6ca42e] text-white py-6 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg hover:scale-105"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin w-6 h-6 border-3 border-white border-r-transparent rounded-full mr-3"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer ma demande <i className="fas fa-check-circle ml-3 text-xl"></i>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteForm;
