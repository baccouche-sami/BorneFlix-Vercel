import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Calculator, Calendar, FileText, CheckCircle, ArrowRight, Clock, Users, Zap } from "lucide-react";

const DevisPage = () => {
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
    typeInstallation: "infrastructure-collective",
    nombreBornes: "",
    puissanceRequise: "",
    // Step 4: Informations complémentaires
    statutDemandeur: "",
    dateProjet: "",
    commentaires: "",
    rgpd: false
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
      price: "1,299€",
      features: ["Gestion centralisée", "Facturation individuelle", "Installation complète"]
    },
    {
      id: "borne-individuelle",
      title: "Borne individuelle",
      description: "Borne personnelle connectée",
      price: "1,499€",
      features: ["Borne connectée", "Application mobile", "Installation incluse"]
    },
    {
      id: "prise-greenup",
      title: "Prise Green'up",
      description: "Solution rapide et économique",
      price: "299€",
      features: ["Installation rapide", "Certifiée IRVE", "Prix attractif"]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi
    alert("Devis envoyé ! Un expert vous recontacte sous 24h.");
  };

  const calculateEstimation = () => {
    let prixUnitaire = 0;
    let nombreBornes = 1;
    
    switch (formData.typeInstallation) {
      case "infrastructure-collective":
        prixUnitaire = 1299;
        break;
      case "borne-individuelle":
        prixUnitaire = 1499;
        break;
      case "prise-greenup":
        prixUnitaire = 299;
        break;
      default:
        prixUnitaire = 1299;
    }
    
    if (formData.nombreBornes) {
      if (formData.nombreBornes.includes('-')) {
        nombreBornes = parseInt(formData.nombreBornes.split('-')[0]);
      } else {
        nombreBornes = parseInt(formData.nombreBornes);
      }
    }
    
    const totalEstimation = prixUnitaire * nombreBornes;
    const economieBase = Math.round(totalEstimation * 0.3);
    const prixFinal = totalEstimation - economieBase;
    
    return {
      prixUnitaire,
      nombreBornes,
      totalEstimation,
      economieBase,
      prixFinal
    };
  };

  const estimation = calculateEstimation();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#ff6b35] via-[#ff8c42] to-[#ffa726] text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Devis Gratuit
              <span className="block text-[#003566]">BorneFlix</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Obtenez votre estimation personnalisée en 2 minutes 
              <br className="hidden md:block" />
              et un expert vous recontacte sous 24h
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#003566] hover:bg-[#00264d] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Demander un devis
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-[#ff6b35]"
                onClick={() => document.getElementById('calendly')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Prendre RDV
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Éléments décoratifs */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#003566]/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#003566]/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
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
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      step <= currentStep 
                        ? 'bg-[#ff6b35] text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 ${
                        step < currentStep ? 'bg-[#ff6b35]' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-gray-600">
                Étape {currentStep} sur 4
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
                          <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                          <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                          <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                          <input
                            type="tel"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-[#003566] mb-6">Informations sur la copropriété</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Type de logement *</label>
                          <select
                            name="typeLogement"
                            value={formData.typeLogement}
                            onChange={(e) => handleSelectChange('typeLogement', e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                          >
                            <option value="">Sélectionnez...</option>
                            <option value="copropriete">Copropriété</option>
                            <option value="residence">Résidence</option>
                            <option value="immeuble">Immeuble</option>
                            <option value="autre">Autre</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de résidents</label>
                          <input
                            type="number"
                            name="nombreResidents"
                            value={formData.nombreResidents}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
                        <input
                          type="text"
                          name="adresse"
                          value={formData.adresse}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Code postal *</label>
                          <input
                            type="text"
                            name="codePostal"
                            value={formData.codePostal}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                          <input
                            type="text"
                            name="ville"
                            value={formData.ville}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-[#003566] mb-6">Informations techniques</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">Type d'installation souhaitée *</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {installationTypes.map((type) => (
                            <div
                              key={type.id}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                                formData.typeInstallation === type.id
                                  ? 'border-[#ff6b35] bg-[#ff6b35]/5'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => handleSelectChange('typeInstallation', type.id)}
                            >
                              <div className="font-semibold text-[#003566] mb-2">{type.title}</div>
                              <div className="text-sm text-gray-600 mb-2">{type.description}</div>
                              <div className="text-lg font-bold text-[#ff6b35] mb-2">{type.price}</div>
                              <ul className="text-xs text-gray-500 space-y-1">
                                {type.features.map((feature, index) => (
                                  <li key={index} className="flex items-center">
                                    <CheckCircle className="w-3 h-3 mr-1 text-[#8dc63f]" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de bornes souhaitées</label>
                          <select
                            name="nombreBornes"
                            value={formData.nombreBornes}
                            onChange={(e) => handleSelectChange('nombreBornes', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                          >
                            <option value="">Sélectionnez...</option>
                            <option value="1">1 borne</option>
                            <option value="2-5">2-5 bornes</option>
                            <option value="6-10">6-10 bornes</option>
                            <option value="11-20">11-20 bornes</option>
                            <option value="20+">Plus de 20 bornes</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Puissance souhaitée (kW)</label>
                          <input
                            type="number"
                            name="puissanceRequise"
                            value={formData.puissanceRequise}
                            onChange={handleInputChange}
                            placeholder="7.4, 11, 22..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-[#003566] mb-6">Finalisation</h3>
                      
                      <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h4 className="font-semibold text-[#003566] mb-4">Estimation de votre projet</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Prix unitaire :</span>
                            <span className="font-semibold">{estimation.prixUnitaire}€</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Nombre de bornes :</span>
                            <span className="font-semibold">{estimation.nombreBornes}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-[#003566] border-t pt-2">
                            <span>Total estimé :</span>
                            <span>{estimation.totalEstimation}€</span>
                          </div>
                          <div className="flex justify-between text-sm text-[#8dc63f]">
                            <span>Économies possibles :</span>
                            <span>-{estimation.economieBase}€</span>
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
                          className="mt-1"
                        />
                        <label htmlFor="rgpd" className="text-sm text-gray-600">
                          J'accepte que mes données soient utilisées pour traiter ma demande de devis *
                        </label>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <motion.button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  whileHover={{ scale: currentStep > 1 ? 1.05 : 1 }}
                  whileTap={{ scale: currentStep > 1 ? 0.95 : 1 }}
                  className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-100 text-[#003566] hover:bg-gray-200'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Précédent
                </motion.button>

                {currentStep < 4 ? (
                  <motion.button
                    onClick={nextStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center bg-[#ff6b35] hover:bg-[#ff8c42] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Suivant
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center bg-[#003566] hover:bg-[#00264d] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Envoyer le devis
                    <ArrowRight className="w-5 h-5 ml-2" />
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
              <Calendar className="w-16 h-16 text-[#ff6b35] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#003566] mb-4">Calendrier de rendez-vous</h3>
              <p className="text-gray-600 mb-6">
                Sélectionnez un créneau qui vous convient pour un appel de 30 minutes avec nos experts
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#ff6b35] hover:bg-[#ff8c42] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
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
                className="bg-[#ff6b35] hover:bg-[#ff8c42] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
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