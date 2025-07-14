import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  color: string;
  icon: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen, color, icon }) => {
  return (
    <motion.div 
      className={`mb-6 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${color}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <button 
        onClick={toggleOpen}
        className="w-full flex items-start justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors duration-300"
      >
        <div className="flex items-center">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full ${color.replace('border-l-4', 'bg')} text-${color} flex items-center justify-center  mr-4`}>
            <i className={`fas ${icon}`}></i>
          </div>
          <h3 className="text-xl font-semibold pr-8">{question}</h3>
        </div>
        <div className="flex-shrink-0 ml-4">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100"
          >
            <i className="fas fa-chevron-down text-gray-500 text-sm"></i>
          </motion.div>
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white"
          >
            <div className="p-6 pt-0 border-t border-gray-100">
              <p className="text-gray-700 leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ModernFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqItems = [
    {
      question: "Comment se déroule le processus d'installation en copropriété ?",
      answer: "Le processus commence par une étude technique gratuite, suivie d'une proposition adaptée à votre copropriété. Après approbation en assemblée générale, nous procédons à l'installation de l'infrastructure puis des bornes individuelles selon les besoins des résidents. Notre équipe vous accompagne à chaque étape, de l'étude initiale jusqu'à la mise en service.",
      color: "border-l-4 border-[#003566] text-[#003566] bg-[#003566]/10",
      icon: "fa-building"
    },
    {
      question: "Quelles sont les aides financières disponibles ?",
      answer: "Plusieurs dispositifs d'aide existent, notamment le programme ADVENIR qui peut couvrir jusqu'à 50% des coûts d'installation pour l'infrastructure collective. Les particuliers peuvent également bénéficier de crédits d'impôt et d'aides locales. Notre équipe vous accompagne dans toutes les démarches administratives pour maximiser les aides auxquelles vous avez droit.",
      color: "border-l-4 border-[#8dc63f] text-[#8dc63f] bg-[#8dc63f]/10",
      icon: "fa-euro-sign"
    },
    {
      question: "Comment fonctionne la facturation de l'électricité ?",
      answer: "Notre système permet une facturation individuelle précise pour chaque utilisateur. Chaque borne est équipée d'un compteur intelligent qui mesure la consommation réelle, et les résidents sont facturés en fonction de leur utilisation effective. Un portail en ligne permet à chacun de suivre sa consommation et de recevoir des factures détaillées automatiquement.",
      color: "border-l-4 border-purple-500 text-purple-500 bg-purple-500/10",
      icon: "fa-file-invoice"
    },
    {
      question: "Que se passe-t-il en cas de panne ?",
      answer: "Nous proposons un service de maintenance avec différentes formules selon vos besoins. Notre équipe technique intervient rapidement en cas de dysfonctionnement. De plus, notre système de supervision à distance permet souvent de résoudre les problèmes sans déplacement. Une assistance téléphonique est également disponible 7j/7 pour les utilisateurs.",
      color: "border-l-4 border-orange-500 text-orange-500 bg-orange-500/10",
      icon: "fa-tools"
    },
    {
      question: "Quelles sont les puissances de charge disponibles ?",
      answer: "Nous proposons différentes puissances de charge, généralement de 3,7 kW à 22 kW, adaptées aux besoins des utilisateurs et aux contraintes techniques du bâtiment. Notre système de gestion dynamique de puissance optimise la répartition de l'énergie disponible entre les différentes bornes, évitant ainsi de surcharger l'installation électrique de la copropriété.",
      color: "border-l-4 border-blue-500 text-blue-500 bg-blue-500/10",
      icon: "fa-bolt"
    },
    {
      question: "Combien de temps prend l'installation complète ?",
      answer: "La durée d'installation varie selon la taille et la complexité de votre copropriété. En général, l'infrastructure collective prend entre 1 et 3 semaines, tandis que l'installation des bornes individuelles peut être réalisée en une journée par borne. Nous établissons un planning précis avec le syndic pour minimiser les perturbations pour les résidents.",
      color: "border-l-4 border-yellow-500 text-yellow-500 bg-yellow-500/10",
      icon: "fa-clock"
    },
  ];
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="py-20 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMCAzaDR2MWgtNHYtMXptMCAzaDR2MWgtNHYtMXptLTUgMGg0djFoLTR2LTF6bS01IDBoNHYxaC00di0xem0tNSAwaDR2MWgtNHYtMXptLTUgMGg0djFoLTR2LTF6bS01IDBoNHYxaC00di0xek02IDQwaDR2MUg2di0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-25"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="inline-block bg-[#003566]/10 text-[#003566] px-6 py-2 rounded-full text-sm font-bold mb-4">
            POUR TOUT SAVOIR
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#003566]">Questions fréquentes</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Tout ce que vous devez savoir sur l'installation de bornes IRVE intelligentes 
            <span className="text-[#8dc63f] font-medium"> dès 299€ </span> 
            en copropriété. Nous répondons à vos interrogations sur les 
            <span className="text-[#8dc63f] font-medium"> économies d'énergie </span> 
            et l'installation en 24h.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
              color={item.color}
              icon={item.icon}
            />
          ))}
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-lg mb-6">Vous avez d'autres questions ?</p>
            <a href="#contact" className="inline-flex items-center bg-[#003566] text-white hover:bg-[#1a4d85] py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium">
              Contactez-nous
              <i className="fas fa-arrow-right ml-3"></i>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ModernFAQ;