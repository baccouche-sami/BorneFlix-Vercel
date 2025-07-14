import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, HelpCircle, Building, FileText, Wrench, Zap, Clock, Phone, Mail, MapPin, CreditCard } from "lucide-react";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    document.title = "FAQ BorneFlix - Questions fréquentes sur les bornes de recharge";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Trouvez toutes les réponses à vos questions sur les bornes de recharge : installation, maintenance, aides, démarches. FAQ complète BorneFlix.');
    }
  }, []);

  const faqItems = [
    {
      question: "Comment se déroule le processus d'installation en copropriété ?",
      answer: "Le processus commence par une étude technique gratuite, suivie d'une proposition adaptée à votre copropriété. Après approbation en assemblée générale, nous procédons à l'installation de l'infrastructure puis des bornes individuelles selon les besoins des résidents. Notre équipe vous accompagne à chaque étape, de l'étude initiale jusqu'à la mise en service.",
      icon: Building,
      category: "Installation"
    },
    {
      question: "Quelles sont les aides financières disponibles ?",
      answer: "Plusieurs dispositifs d'aide existent, notamment le programme ADVENIR qui peut couvrir jusqu'à 50% des coûts d'installation pour l'infrastructure collective. Les particuliers peuvent également bénéficier de crédits d'impôt et d'aides locales. Notre équipe vous accompagne dans toutes les démarches administratives pour maximiser les aides auxquelles vous avez droit.",
      icon: HelpCircle,
      category: "Financement"
    },
    {
      question: "Comment fonctionne la facturation de l'électricité ?",
      answer: "Notre système permet une facturation individuelle précise pour chaque utilisateur. Chaque borne est équipée d'un compteur intelligent qui mesure la consommation réelle, et les résidents sont facturés en fonction de leur utilisation effective. Un portail en ligne permet à chacun de suivre sa consommation et de recevoir des factures détaillées automatiquement.",
      icon: FileText,
      category: "Facturation"
    },
    {
      question: "Que se passe-t-il en cas de panne ?",
      answer: "Nous proposons un service de maintenance avec différentes formules selon vos besoins. Notre équipe technique intervient rapidement en cas de dysfonctionnement. De plus, notre système de supervision à distance permet souvent de résoudre les problèmes sans déplacement. Une assistance téléphonique est également disponible 7j/7 pour les utilisateurs.",
      icon: Wrench,
      category: "Maintenance"
    },
    {
      question: "Quelles sont les puissances de charge disponibles ?",
      answer: "Nous proposons différentes puissances de charge, généralement de 3,7 kW à 22 kW, adaptées aux besoins des utilisateurs et aux contraintes techniques du bâtiment. Notre système de gestion dynamique de puissance optimise la répartition de l'énergie disponible entre les différentes bornes, évitant ainsi de surcharger l'installation électrique de la copropriété.",
      icon: Zap,
      category: "Technique"
    },
    {
      question: "Combien de temps prend l'installation complète ?",
      answer: "La durée d'installation varie selon la taille et la complexité de votre copropriété. En général, l'infrastructure collective prend entre 1 et 3 semaines, tandis que l'installation des bornes individuelles peut être réalisée en une journée par borne. Nous établissons un planning précis avec le syndic pour minimiser les perturbations pour les résidents.",
      icon: Clock,
      category: "Installation"
    },
    {
      question: "Quels sont les coûts d'installation ?",
      answer: "Nos solutions démarrent à 299€ pour la prise Green'up et 1,299€ pour l'infrastructure collective. Le coût total dépend du nombre de bornes et de la complexité de l'installation. Nous proposons des devis gratuits et personnalisés, et vous accompagnons dans l'obtention des aides disponibles pour réduire significativement votre investissement.",
      icon: CreditCard,
      category: "Financement"
    },
    {
      question: "Comment fonctionne la gestion des droits d'accès ?",
      answer: "Chaque utilisateur dispose d'un badge ou d'une application mobile pour accéder à sa borne. Le système permet de gérer les droits d'accès individuellement, avec possibilité de restrictions horaires ou de quotas. Les administrateurs peuvent facilement gérer les utilisateurs via une interface web sécurisée.",
      icon: Building,
      category: "Gestion"
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      value: "01 80 91 90 80",
      description: "Lun-Ven 9h-18h"
    },
    {
      icon: Mail,
      title: "Email",
      value: "contact@borneflix.fr",
      description: "Réponse sous 24h"
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "3 Av. des Orangers",
      description: "94380 Bonneuil-sur-Marne"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              Questions
              <span className="block text-[#003566]">Fréquentes</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
              Trouvez rapidement toutes les réponses à vos questions 
              <br className="hidden md:block" />
              sur les bornes de recharge BorneFlix
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#003566] hover:bg-[#00264d] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Consulter la FAQ
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-[#ff6b35]"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Nous contacter
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Éléments décoratifs */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#003566]/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#003566]/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#003566] mb-4">
              FAQ Complète
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Toutes les réponses à vos questions sur l'installation, 
              la maintenance et l'utilisation des bornes de recharge
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-6 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-[#ff6b35]"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mr-4">
                      <item.icon className="w-6 h-6 text-[#ff6b35]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#003566] mb-1">{item.question}</h3>
                      <span className="text-sm text-[#8dc63f] font-medium">{item.category}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-white"
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#003566] mb-4">
              Besoin d'aide supplémentaire ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Notre équipe d'experts est disponible pour répondre à toutes vos questions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#003566] mb-2">{info.title}</h3>
                <p className="text-lg text-gray-700 mb-1">{info.value}</p>
                <p className="text-sm text-gray-500">{info.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#003566] hover:bg-[#00264d] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => window.location.href = '/contact'}
            >
              Nous contacter
              <ChevronRight className="inline ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
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
                onClick={() => window.location.href = '/devis'}
              >
                Demander un devis gratuit
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

export default FAQPage; 