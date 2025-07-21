import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Calculator, Calendar, FileText, CheckCircle, ArrowRight, Clock, Users, Zap, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DevisPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  
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
    typeInstallation: "infrastructure-collective",
    nombreBornes: "",
    puissanceRequire: "",
    // Step 4: Informations complémentaires
    statutDemandeur: "",
    dateProjet: "",
    commentaires: "",
    rgpd: false
  });

  // Tracking des étapes
  const [stepTracking, setStepTracking] = useState({
    step1Started: false,
    step1Completed: false,
    step2Started: false,
    step2Completed: false,
    step3Started: false,
    step3Completed: false,
    step4Started: false,
    step4Completed: false,
    totalTimeSpent: 0,
    startTime: Date.now()
  });

  useEffect(() => {
    document.title = "Devis BorneFlix - Demande de devis gratuit pour borne de recharge";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Demandez votre devis gratuit pour l\'installation de bornes de recharge. Formulaire simple et rapide, estimation immédiate, expert dédié. BorneFlix.');
    }
  }, []);

  const benefits = [
    {
      icon: Calculator,
      title: "Estimation immédiate",
      description: "Obtenez une estimation de prix en temps réel"
    },
    {
      icon: Clock,
      title: "Réponse sous 24h",
      description: "Un expert vous recontacte dans les 24h"
    },
    {
      icon: FileText,
      title: "Devis détaillé",
      description: "Devis complet et personnalisé gratuit"
    },
    {
      icon: CheckCircle,
      title: "Sans engagement",
      description: "Aucune obligation d'achat"
    }
  ];

  const installationTypes = [
    {
      id: "infrastructure-collective",
      title: "Infrastructure collective",
      description: "Solution complète pour copropriétés",
      price: "À partir de 999€",
      priceRange: "999€ - 1,999€",
      features: ["Gestion centralisée", "Facturation individuelle", "Installation complète", "Maintenance incluse"],
      icon: "🏢",
      color: "blue"
    },
    {
      id: "borne-individuelle",
      title: "Borne individuelle",
      description: "Borne personnelle connectée",
      price: "À partir de 1,199€",
      priceRange: "1,199€ - 2,199€",
      features: ["Borne connectée", "Application mobile", "Installation incluse", "Garantie 2 ans"],
      icon: "🔌",
      color: "green"
    },
    {
      id: "prise-greenup",
      title: "Prise Green'up",
      description: "Solution rapide et économique",
      price: "À partir de 199€",
      priceRange: "199€ - 399€",
      features: ["Installation rapide", "Certifiée IRVE", "Prix attractif", "Compatible tous véhicules"],
      icon: "⚡",
      color: "orange"
    },
    {
      id: "solution-hybride",
      title: "Solution hybride",
      description: "Mix infrastructure + bornes individuelles",
      price: "À partir de 899€",
      priceRange: "899€ - 1,699€",
      features: ["Flexibilité maximale", "Optimisation des coûts", "Évolutivité", "Gestion intelligente"],
      icon: "🔄",
      color: "purple"
    },
    {
      id: "solution-premium",
      title: "Solution Premium",
      description: "Installation haut de gamme avec services",
      price: "À partir de 1,999€",
      priceRange: "1,999€ - 3,999€",
      features: ["Borne ultra-rapide", "Services premium", "Support 24/7", "Monitoring avancé"],
      icon: "⭐",
      color: "gold"
    },
    {
      id: "solution-eco",
      title: "Solution Éco-responsable",
      description: "Installation avec panneaux solaires",
      price: "À partir de 2,999€",
      priceRange: "2,999€ - 5,999€",
      features: ["Énergie solaire", "Autoconsommation", "Impact environnemental réduit", "Subventions disponibles"],
      icon: "🌱",
      color: "green"
    }
  ];

  const puissanceOptions = [
    { value: "3.7", label: "3.7 kW - Recharge lente (8-12h)", description: "Idéal pour recharges nocturnes" },
    { value: "7.4", label: "7.4 kW - Recharge normale (4-6h)", description: "Standard pour la plupart des véhicules" },
    { value: "11", label: "11 kW - Recharge rapide (2-4h)", description: "Recharge rapide pour usage intensif" },
    { value: "22", label: "22 kW - Recharge très rapide (1-2h)", description: "Recharge ultra-rapide" },
    { value: "50", label: "50 kW - Recharge ultra-rapide (30min)", description: "Pour usage professionnel" },
    { value: "150", label: "150 kW - Recharge ultra-rapide (15min)", description: "Solution ultra-rapide" }
  ];

  // Sauvegarde automatique dans localStorage
  const saveFormData = useCallback((data: any) => {
    try {
      localStorage.setItem('devisFormData', JSON.stringify(data));
      localStorage.setItem('devisFormStep', currentStep.toString());
      localStorage.setItem('devisFormTracking', JSON.stringify(stepTracking));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  }, [currentStep, stepTracking]);

  // Chargement des données sauvegardées
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('devisFormData');
      const savedStep = localStorage.getItem('devisFormStep');
      const savedTracking = localStorage.getItem('devisFormTracking');
      
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
      if (savedStep) {
        setCurrentStep(parseInt(savedStep));
      }
      if (savedTracking) {
        setStepTracking(JSON.parse(savedTracking));
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    }
  }, []);

  // Fermer les suggestions d'adresse quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.address-suggestions') && !target.closest('input[name="adresse"]')) {
        setShowAddressSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Autocomplete d'adresse avec API Adresse.data.gouv.fr
  const searchAddress = async (query: string) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      setShowAddressSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      
      if (data.features) {
        const suggestions = data.features.map((feature: any) => feature.properties.label);
        setAddressSuggestions(suggestions);
        setShowAddressSuggestions(true);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche d\'adresse:', error);
    }
  };

  // Validation des champs
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
      if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
      if (!formData.email.trim()) {
        newErrors.email = "L'email est requis";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Format d'email invalide";
      }
      if (!formData.telephone.trim()) {
        newErrors.telephone = "Le téléphone est requis";
      } else if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.telephone)) {
        newErrors.telephone = "Format de téléphone invalide";
      }
    }

    if (step === 2) {
      if (!formData.typeLogement) newErrors.typeLogement = "Le type de logement est requis";
      if (!formData.adresse.trim()) newErrors.adresse = "L'adresse est requise";
      if (!formData.codePostal.trim()) newErrors.codePostal = "Le code postal est requis";
      if (!formData.ville.trim()) newErrors.ville = "La ville est requise";
      if (!formData.nombrePlacesParking) newErrors.nombrePlacesParking = "Le nombre de places est requis";
      if (!formData.nombreResidents) newErrors.nombreResidents = "Le nombre de résidents est requis";
    }

    if (step === 3) {
      if (!formData.typeInstallation) newErrors.typeInstallation = "Le type d'installation est requis";
      if (!formData.nombreBornes) newErrors.nombreBornes = "Le nombre de bornes est requis";
      if (!formData.puissanceRequire) newErrors.puissanceRequire = "La puissance requise est requise";
    }

    if (step === 4) {
      if (!formData.rgpd) newErrors.rgpd = "Vous devez accepter les conditions RGPD";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    saveFormData(newFormData);

    // Recherche d'adresse automatique
    if (name === 'adresse' && value.length >= 3) {
      searchAddress(value);
    } else if (name === 'adresse') {
      setShowAddressSuggestions(false);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs avant de continuer",
        variant: "destructive",
      });
      return;
    }

    // Tracking de l'étape
    const newTracking = { ...stepTracking };
    if (currentStep === 1) {
      newTracking.step1Completed = true;
      newTracking.step2Started = true;
    } else if (currentStep === 2) {
      newTracking.step2Completed = true;
      newTracking.step3Started = true;
    } else if (currentStep === 3) {
      newTracking.step3Completed = true;
      newTracking.step4Started = true;
    }
    
    setStepTracking(newTracking);
    saveFormData(formData);

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      toast({
        title: "Étape suivante",
        description: `Passage à l'étape ${currentStep + 1}`,
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      toast({
        title: "Étape précédente",
        description: `Retour à l'étape ${currentStep - 1}`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs avant d'envoyer le formulaire",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Envoyer les données au serveur
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tracking: stepTracking,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        toast({
          title: "Devis envoyé avec succès !",
          description: "Nous vous recontacterons dans les 24h avec votre devis personnalisé.",
        });
        
        // Nettoyer le localStorage
        localStorage.removeItem('devisFormData');
        localStorage.removeItem('devisFormStep');
        localStorage.removeItem('devisFormTracking');
        
        // Reset du formulaire
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
          puissanceRequire: "",
          statutDemandeur: "",
          dateProjet: "",
          commentaires: "",
          rgpd: false
        });
        setCurrentStep(1);
        setStepTracking({
          step1Started: false,
          step1Completed: false,
          step2Started: false,
          step2Completed: false,
          step3Started: false,
          step3Completed: false,
          step4Started: false,
          step4Completed: false,
          totalTimeSpent: 0,
          startTime: Date.now()
        });
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast({
        title: "Erreur lors de l'envoi",
        description: "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateEstimation = () => {
    let prixUnitaire = 0;
    let nombreBornes = 1;
    let puissanceMultiplier = 1;
    let prixMin = 0;
    let prixMax = 0;
    
    // Prix de base selon le type d'installation (prix minimum)
    switch (formData.typeInstallation) {
      case "infrastructure-collective":
        prixUnitaire = 999;
        prixMin = 999;
        prixMax = 1999;
        break;
      case "borne-individuelle":
        prixUnitaire = 1199;
        prixMin = 1199;
        prixMax = 2199;
        break;
      case "prise-greenup":
        prixUnitaire = 199;
        prixMin = 199;
        prixMax = 399;
        break;
      case "solution-hybride":
        prixUnitaire = 899;
        prixMin = 899;
        prixMax = 1699;
        break;
      case "solution-premium":
        prixUnitaire = 1999;
        prixMin = 1999;
        prixMax = 3999;
        break;
      case "solution-eco":
        prixUnitaire = 2999;
        prixMin = 2999;
        prixMax = 5999;
        break;
      default:
        prixUnitaire = 999;
        prixMin = 999;
        prixMax = 1999;
    }
    
    // Multiplicateur selon la puissance
    if (formData.puissanceRequire) {
      const puissance = parseFloat(formData.puissanceRequire);
      if (puissance <= 3.7) puissanceMultiplier = 0.8;
      else if (puissance <= 7.4) puissanceMultiplier = 1.0;
      else if (puissance <= 11) puissanceMultiplier = 1.2;
      else if (puissance <= 22) puissanceMultiplier = 1.5;
      else if (puissance <= 50) puissanceMultiplier = 2.0;
      else puissanceMultiplier = 3.0;
    }
    
    // Calcul du nombre de bornes
    if (formData.nombreBornes) {
      if (formData.nombreBornes.includes('-')) {
        const [min, max] = formData.nombreBornes.split('-').map(Number);
        nombreBornes = Math.round((min + max) / 2);
      } else if (formData.nombreBornes.includes('+')) {
        nombreBornes = 25; // Estimation pour "Plus de 20"
      } else {
        nombreBornes = parseInt(formData.nombreBornes);
      }
    }
    
    // Calcul du prix unitaire avec multiplicateur de puissance
    const prixUnitaireFinal = prixUnitaire * puissanceMultiplier;
    const totalEstimation = prixUnitaireFinal * nombreBornes;
    
    // Calcul des estimations min/max
    const estimationMin = Math.round(prixMin * puissanceMultiplier * nombreBornes);
    const estimationMax = Math.round(prixMax * puissanceMultiplier * nombreBornes);
    
    // Économies basées sur l'estimation moyenne
    const estimationMoyenne = Math.round((estimationMin + estimationMax) / 2);
    const economieBase = Math.round(estimationMoyenne * 0.3);
    const prixFinalMin = estimationMin - economieBase;
    const prixFinalMax = estimationMax - economieBase;
    
    return {
      prixUnitaire: Math.round(prixUnitaireFinal),
      nombreBornes,
      totalEstimation: Math.round(totalEstimation),
      estimationMin,
      estimationMax,
      estimationMoyenne,
      economieBase,
      prixFinalMin: Math.round(prixFinalMin),
      prixFinalMax: Math.round(prixFinalMax),
      puissanceMultiplier: puissanceMultiplier.toFixed(1)
    };
  };

  const estimation = calculateEstimation();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#003566] text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Devis Gratuit
              <span className="block text-[#8dc63f]">BorneFlix</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Obtenez votre estimation personnalisée en 2 minutes 
              <br className="hidden md:block" />
              et un expert vous recontacte sous 24h
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="bg-[#8dc63f] hover:bg-[#7db52f] text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
                onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Demander un devis
              </button>
              <button
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors hover:bg-white hover:text-[#003566]"
                onClick={() => document.getElementById('calendly')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Prendre RDV
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#003566] rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#003566] mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#003566] mb-4">
              Demande de Devis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Remplissez ce formulaire pour recevoir votre devis personnalisé 
              et gratuit en moins de 24h
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { step: 1, label: "Contact", icon: "👤" },
                  { step: 2, label: "Projet", icon: "🏢" },
                  { step: 3, label: "Besoins", icon: "⚡" },
                  { step: 4, label: "Validation", icon: "✅" }
                ].map((item, index) => (
                  <div key={item.step} className="flex flex-col items-center relative">
                    <div className="flex items-center justify-center w-full">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 z-10 ${
                        item.step < currentStep 
                          ? 'bg-[#8dc63f] text-white shadow-lg' 
                          : item.step === currentStep
                          ? 'bg-[#003566] text-white shadow-lg scale-110'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {item.step < currentStep ? "✓" : item.icon}
                      </div>
                    </div>
                    {index < 3 && (
                      <div className={`absolute top-6 left-1/2 w-full h-1 bg-gray-200 rounded-full transition-all duration-300 ${
                        item.step < currentStep ? 'bg-[#8dc63f]' : 'bg-gray-200'
                      }`} style={{ width: 'calc(100% + 1rem)', left: '50%', transform: 'translateX(-50%)' }}></div>
                    )}
                    <div className={`mt-3 text-center transition-all duration-300 ${
                      item.step <= currentStep 
                        ? 'text-[#003566] font-semibold' 
                        : 'text-gray-400'
                    }`}>
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className="text-xs mt-1">Étape {item.step}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="inline-flex items-center bg-[#003566]/10 text-[#003566] px-4 py-2 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-[#003566] rounded-full mr-2 animate-pulse"></span>
                  Étape {currentStep} sur 4 - {currentStep === 1 ? "Informations personnelles" : 
                    currentStep === 2 ? "Informations sur la copropriété" :
                    currentStep === 3 ? "Besoins en recharge" : "Validation du projet"}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-[#003566] mb-6">Informations personnelles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Prénom * {errors.prenom && <span className="text-red-500 text-xs">({errors.prenom})</span>}
                          </label>
                          <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-colors ${
                              errors.prenom ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Votre prénom"
                          />
                          {errors.prenom && (
                            <div className="flex items-center mt-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.prenom}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom * {errors.nom && <span className="text-red-500 text-xs">({errors.nom})</span>}
                          </label>
                          <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-colors ${
                              errors.nom ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Votre nom"
                          />
                          {errors.nom && (
                            <div className="flex items-center mt-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.nom}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email * {errors.email && <span className="text-red-500 text-xs">({errors.email})</span>}
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-colors ${
                              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="votre.email@exemple.com"
                          />
                          {errors.email && (
                            <div className="flex items-center mt-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Téléphone * {errors.telephone && <span className="text-red-500 text-xs">({errors.telephone})</span>}
                          </label>
                          <input
                            type="tel"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-colors ${
                              errors.telephone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="01 23 45 67 89"
                          />
                          {errors.telephone && (
                            <div className="flex items-center mt-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.telephone}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-[#003566] mb-6">Informations sur la copropriété</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type de logement * {errors.typeLogement && <span className="text-red-500 text-xs">({errors.typeLogement})</span>}
                          </label>
                          <select
                            name="typeLogement"
                            value={formData.typeLogement}
                            onChange={(e) => handleSelectChange('typeLogement', e.target.value)}
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-colors ${
                              errors.typeLogement ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Sélectionnez...</option>
                            <option value="copropriete">Copropriété</option>
                            <option value="residence">Résidence</option>
                            <option value="immeuble">Immeuble</option>
                            <option value="autre">Autre</option>
                          </select>
                          {errors.typeLogement && (
                            <div className="flex items-center mt-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.typeLogement}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre de résidents * {errors.nombreResidents && <span className="text-red-500 text-xs">({errors.nombreResidents})</span>}
                          </label>
                          <input
                            type="number"
                            name="nombreResidents"
                            value={formData.nombreResidents}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-colors ${
                              errors.nombreResidents ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Ex: 50"
                            min="1"
                          />
                          {errors.nombreResidents && (
                            <div className="flex items-center mt-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.nombreResidents}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adresse * {errors.adresse && <span className="text-red-500 text-xs">({errors.adresse})</span>}
                        </label>
                        <input
                          type="text"
                          name="adresse"
                          value={formData.adresse}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-colors ${
                            errors.adresse ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Commencez à taper votre adresse..."
                          autoComplete="off"
                        />
                        {showAddressSuggestions && addressSuggestions.length > 0 && (
                          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto address-suggestions">
                            {addressSuggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                type="button"
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                                onClick={() => {
                                  setFormData({ ...formData, adresse: suggestion });
                                  setShowAddressSuggestions(false);
                                  // Extraire code postal et ville
                                  const parts = suggestion.split(', ');
                                  if (parts.length >= 2) {
                                    const postalPart = parts[parts.length - 2];
                                    const cityPart = parts[parts.length - 1];
                                    if (postalPart.match(/^\d{5}$/)) {
                                      setFormData(prev => ({
                                        ...prev,
                                        adresse: suggestion,
                                        codePostal: postalPart,
                                        ville: cityPart
                                      }));
                                    }
                                  }
                                }}
                              >
                                <div className="text-sm text-gray-900">{suggestion}</div>
                                <div className="text-xs text-gray-500">Cliquez pour sélectionner</div>
                              </button>
                            ))}
                          </div>
                        )}
                        {errors.adresse && (
                          <div className="flex items-center mt-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.adresse}
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Code postal * {errors.codePostal && <span className="text-red-500 text-xs">({errors.codePostal})</span>}
                          </label>
                          <input
                            type="text"
                            name="codePostal"
                            value={formData.codePostal}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-colors ${
                              errors.codePostal ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="75001"
                            maxLength={5}
                          />
                          {errors.codePostal && (
                            <div className="flex items-center mt-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.codePostal}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ville * {errors.ville && <span className="text-red-500 text-xs">({errors.ville})</span>}
                          </label>
                          <input
                            type="text"
                            name="ville"
                            value={formData.ville}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-colors ${
                              errors.ville ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Paris"
                          />
                          {errors.ville && (
                            <div className="flex items-center mt-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.ville}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre de places de parking * {errors.nombrePlacesParking && <span className="text-red-500 text-xs">({errors.nombrePlacesParking})</span>}
                        </label>
                        <input
                          type="number"
                          name="nombrePlacesParking"
                          value={formData.nombrePlacesParking}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-colors ${
                            errors.nombrePlacesParking ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Ex: 100"
                          min="1"
                        />
                        {errors.nombrePlacesParking && (
                          <div className="flex items-center mt-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.nombrePlacesParking}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-[#003566] mb-6">Informations techniques</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                          Type d'installation souhaitée * {errors.typeInstallation && <span className="text-red-500 text-xs">({errors.typeInstallation})</span>}
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {installationTypes.map((type) => (
                            <div
                              key={type.id}
                              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                formData.typeInstallation === type.id
                                  ? 'border-[#003566] bg-[#003566]/5 shadow-lg scale-105'
                                  : 'border-gray-200 hover:border-[#003566]/30 hover:bg-gray-50'
                              }`}
                              onClick={() => handleSelectChange('typeInstallation', type.id)}
                            >
                              <div className="flex items-center mb-3">
                                <span className="text-2xl mr-3">{type.icon}</span>
                                <div>
                                  <div className="font-bold text-[#003566] text-lg">{type.title}</div>
                                  <div className="text-sm text-gray-600">{type.description}</div>
                                </div>
                              </div>
                              <div className="mb-3">
                                <div className="text-xl font-bold text-[#8dc63f]">{type.price}</div>
                                <div className="text-sm text-gray-500">{type.priceRange}</div>
                              </div>
                              <ul className="text-sm text-gray-600 space-y-2">
                                {type.features.map((feature, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="w-4 h-4 mr-2 text-[#8dc63f] mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              {formData.typeInstallation === type.id && (
                                <div className="mt-4 p-2 bg-[#8dc63f]/10 border border-[#8dc63f]/20 rounded-lg">
                                  <div className="text-sm font-medium text-[#8dc63f] text-center">
                                    ✓ Sélectionné
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {errors.typeInstallation && (
                          <div className="flex items-center mt-2 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.typeInstallation}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre de bornes souhaitées * {errors.nombreBornes && <span className="text-red-500 text-xs">({errors.nombreBornes})</span>}
                          </label>
                          <select
                            name="nombreBornes"
                            value={formData.nombreBornes}
                            onChange={(e) => handleSelectChange('nombreBornes', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-colors ${
                              errors.nombreBornes ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Sélectionnez...</option>
                            <option value="1">1 borne</option>
                            <option value="2-5">2-5 bornes</option>
                            <option value="6-10">6-10 bornes</option>
                            <option value="11-20">11-20 bornes</option>
                            <option value="20+">Plus de 20 bornes</option>
                          </select>
                          {errors.nombreBornes && (
                            <div className="flex items-center mt-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.nombreBornes}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Puissance souhaitée (kW) * {errors.puissanceRequire && <span className="text-red-500 text-xs">({errors.puissanceRequire})</span>}
                          </label>
                          <select
                            name="puissanceRequire"
                            value={formData.puissanceRequire}
                            onChange={(e) => handleSelectChange('puissanceRequire', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent transition-colors ${
                              errors.puissanceRequire ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Sélectionnez la puissance...</option>
                            {puissanceOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {formData.puissanceRequire && (
                            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="text-sm text-blue-800">
                                <strong>Description :</strong> {puissanceOptions.find(opt => opt.value === formData.puissanceRequire)?.description}
                              </div>
                            </div>
                          )}
                          {errors.puissanceRequire && (
                            <div className="flex items-center mt-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.puissanceRequire}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-[#003566] mb-6">Finalisation</h3>
                      
                      <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h4 className="font-semibold text-[#003566] mb-4">Estimation de votre projet</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Type d'installation :</span>
                            <span className="font-semibold text-[#003566]">
                              {installationTypes.find(t => t.id === formData.typeInstallation)?.title || 'Non sélectionné'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Puissance sélectionnée :</span>
                            <span className="font-semibold text-[#003566]">
                              {formData.puissanceRequire ? `${formData.puissanceRequire} kW` : 'Non sélectionnée'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Nombre de bornes :</span>
                            <span className="font-semibold text-[#003566]">{estimation.nombreBornes}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Prix unitaire estimé :</span>
                            <span className="font-semibold text-[#003566]">À partir de {estimation.prixUnitaire}€</span>
                          </div>
                          {estimation.puissanceMultiplier && estimation.puissanceMultiplier !== '1.0' && (
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>Multiplicateur puissance :</span>
                              <span>x{estimation.puissanceMultiplier}</span>
                            </div>
                          )}
                          <div className="border-t border-gray-200 pt-3">
                            <div className="flex justify-between items-center text-lg font-bold text-[#003566]">
                              <span>Estimation :</span>
                              <span>{estimation.estimationMin.toLocaleString()}€ - {estimation.estimationMax.toLocaleString()}€</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                              <span>Prix moyen estimé :</span>
                              <span>{estimation.estimationMoyenne.toLocaleString()}€</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-[#8dc63f] mt-1">
                              <span>Économies possibles :</span>
                              <span>-{estimation.economieBase.toLocaleString()}€</span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-bold text-[#8dc63f] mt-2">
                              <span>Prix final estimé :</span>
                              <span>{estimation.prixFinalMin.toLocaleString()}€ - {estimation.prixFinalMax.toLocaleString()}€</span>
                            </div>
                            <div className="mt-3 p-3 bg-[#8dc63f]/10 border border-[#8dc63f]/20 rounded-lg">
                              <div className="text-sm text-[#8dc63f] text-center font-medium">
                                💡 Prix indicatifs - Devis personnalisé gratuit sous 24h
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Statut du demandeur</label>
                          <select
                            name="statutDemandeur"
                            value={formData.statutDemandeur}
                            onChange={(e) => handleSelectChange('statutDemandeur', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                          >
                            <option value="">Sélectionnez...</option>
                            <option value="syndic">Syndic</option>
                            <option value="coproprietaire">Copropriétaire</option>
                            <option value="gestionnaire">Gestionnaire</option>
                            <option value="autre">Autre</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date souhaitée pour le projet</label>
                          <input
                            type="date"
                            name="dateProjet"
                            value={formData.dateProjet}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Commentaires ou questions</label>
                        <textarea
                          name="commentaires"
                          value={formData.commentaires}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent resize-none"
                          placeholder="Précisez vos besoins ou posez vos questions..."
                        />
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="rgpd"
                          checked={formData.rgpd}
                          onChange={(e) => handleCheckboxChange('rgpd', e.target.checked)}
                          required
                          className={`mt-1 w-4 h-4 text-[#003566] border-gray-300 rounded focus:ring-[#003566] focus:ring-2 ${
                            errors.rgpd ? 'border-red-300' : ''
                          }`}
                        />
                        <div className="flex-1">
                          <label htmlFor="rgpd" className={`text-sm ${errors.rgpd ? 'text-red-600' : 'text-gray-600'}`}>
                            J'accepte que mes données soient utilisées pour traiter ma demande de devis *
                          </label>
                          {errors.rgpd && (
                            <div className="flex items-center mt-1 text-red-500 text-sm">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.rgpd}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-100">
                <motion.button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  whileHover={{ scale: currentStep > 1 ? 1.02 : 1 }}
                  whileTap={{ scale: currentStep > 1 ? 0.98 : 1 }}
                  className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border-2 border-[#003566] text-[#003566] hover:bg-[#003566] hover:text-white shadow-sm'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Précédent
                </motion.button>

                <div className="text-sm text-gray-500">
                  {currentStep === 1 ? "Informations personnelles" : 
                   currentStep === 2 ? "Informations copropriété" :
                   currentStep === 3 ? "Besoins en recharge" : "Validation"}
                </div>

                {currentStep < 4 ? (
                  <motion.button
                    onClick={nextStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center bg-[#003566] hover:bg-[#1a4d85] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Suivant
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
                      isSubmitting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-[#8dc63f] hover:bg-[#7db52f] text-white hover:shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🚀</span>
                        Envoyer le devis
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section id="calendly" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#003566] mb-4">
              Prendre Rendez-vous
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Réservez un créneau avec nos experts pour un accompagnement 
              personnalisé et des réponses à toutes vos questions
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-xl p-8 text-center">
              <Calendar className="w-16 h-16 text-[#003566] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#003566] mb-4">Calendrier de rendez-vous</h3>
              <p className="text-gray-600 mb-6">
                Sélectionnez un créneau qui vous convient pour un appel de 30 minutes avec nos experts
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#003566] hover:bg-[#1a4d85] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.open('https://calendly.com/sami-baccouche1998/30min', '_blank')}
              >
                Prendre rendez-vous
                <Calendar className="inline ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-[#003566] to-[#1a4d85] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à équiper votre copropriété ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rejoignez nos clients satisfaits et bénéficiez de nos solutions 
              de recharge intelligentes dès 299€
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#003566] hover:bg-[#1a4d85] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/solutions'}
              >
                Découvrir nos solutions
                <ChevronRight className="inline ml-2 w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-[#003566]"
                onClick={() => window.location.href = '/contact'}
              >
                Nous contacter
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default DevisPage; 