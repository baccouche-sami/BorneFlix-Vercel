import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Phone, Mail, Calendar, X, Send, HelpCircle } from 'lucide-react';

// Types améliorés
interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  type?: 'text' | 'card' | 'stats' | 'action' | 'contact';
  data?: any;
}

interface QuickSuggestion {
  id: string;
  text: string;
  query: string;
  category?: string;
  icon?: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  questions: string[];
}

interface FAQData {
  question?: string;
  answer: string;
  followup?: string[];
  category?: string;
  stats?: Record<string, string | number>;
}

interface FAQDatabase {
  [key: string]: FAQData;
}

// Base de connaissances étendue et intelligente
const faqData: FAQDatabase = {
  // Installation et Processus
  "installation": {
    question: "Comment se déroule l'installation d'une borne de recharge ?",
    answer: "L'installation BorneFlix se déroule en 5 étapes simples :\n\n1️⃣ **Étude technique gratuite** (1-2 semaines)\n2️⃣ **Proposition personnalisée** avec devis détaillé\n3️⃣ **Validation en assemblée générale** (nous vous accompagnons)\n4️⃣ **Installation de l'infrastructure** (1-3 semaines)\n5️⃣ **Pose des bornes individuelles** (1-2 jours)\n\n💡 **Avantage BorneFlix** : Notre équipe gère 100% des démarches administratives !",
    followup: ["Combien de temps prend l'installation ?", "Quelles sont les aides financières ?", "Dois-je contacter le syndic ?"],
    category: "installation",
    stats: { time: "2-3 mois", success_rate: "98%", satisfaction: "4.9/5" }
  },
  "délai": {
    question: "Quel est le délai pour installer une borne ?",
    answer: "⏱️ **Délai total : 2 à 3 mois**\n\n📅 **Détail des étapes :**\n• Étude technique : 1-2 semaines\n• Vote AG : selon calendrier copropriété\n• Installation : 1-3 semaines\n• Mise en service : 1-2 jours\n\n🚀 **Accélération possible** pour projets urgents\n💡 **Conseil** : Commencez 6 mois avant votre besoin",
    followup: ["Comment se passe l'étude technique ?", "Peut-on installer sans attendre l'AG ?", "Que faire si c'est urgent ?"],
    category: "installation"
  },
  "prix": {
    question: "Quels sont les tarifs d'installation ?",
    answer: "📊 **Solutions BorneFlix accessibles :**\n\n🔋 **Nos gammes :**\n• **Infrastructure collective** : 1,299€\n• **Borne individuelle** : 1,499€\n• **Prise Green'up** : 299€\n\n🎯 **Avantages inclus :**\n• Étude technique gratuite\n• Installation clé en main\n• Maintenance incluse\n• Garantie étendue\n\n💡 **Devis personnalisé gratuit** selon vos besoins !",
    followup: ["Quelles sont les aides disponibles ?", "Comment obtenir un devis ?", "Quelle solution me convient ?"],
    category: "prix"
  },
  "aides": {
    question: "Quelles sont les aides disponibles ?",
    answer: "🎁 **Aides et accompagnement BorneFlix :**\n\n1️⃣ **Programme ADVENIR**\n• Aide significative pour copropriétés\n• Gestion administrative incluse\n• Accompagnement complet\n\n2️⃣ **Crédit d'impôt**\n• Avantage fiscal pour particuliers\n• Cumulable avec les autres aides\n\n3️⃣ **Aides locales**\n• Soutien des collectivités\n• Variables selon votre région\n\n4️⃣ **Solutions de financement**\n• Options adaptées à votre budget\n• Accompagnement personnalisé\n\n📞 **Notre équipe vous guide dans toutes les démarches !**",
    followup: ["Comment obtenir ces aides ?", "Ces aides sont-elles cumulables ?", "Quels documents faut-il ?"],
    category: "prix"
  },
  
  // Questions techniques avancées
  "puissance": {
    question: "Quelle puissance de borne me faut-il ?",
    answer: "⚡ **Guide puissance BorneFlix :**\n\n🔋 **Recommandations par usage :**\n• **3.7 kW** : Recharge lente (8-12h)\n• **7.4 kW** : Recharge standard (4-8h) ⭐ **Recommandé**\n• **11 kW** : Recharge rapide (3-6h)\n• **22 kW** : Recharge très rapide (2-4h)\n\n🚗 **Par type de véhicule :**\n• Citadine électrique : 7.4 kW\n• SUV/Berline : 11-22 kW\n• Flotte entreprise : 22 kW\n\n💡 **Notre système intelligent** optimise automatiquement la distribution !",
    followup: ["Différence entre 7.4 kW et 22 kW ?", "Faut-il modifier le tableau électrique ?", "Quelle puissance pour ma voiture ?"],
    category: "technique"
  },
  "type": {
    question: "Quels types de bornes proposez-vous ?",
    answer: "🔌 **Gamme complète BorneFlix :**\n\n🏠 **Bornes murales (Wallbox)**\n• Compactes et discrètes\n• Installation intérieure/extérieure\n• Puissance : 3.7 à 22 kW\n• Idéales pour usage personnel\n\n🏢 **Bornes sur pied**\n• Pour parkings extérieurs\n• Résistance aux intempéries\n• Puissance : 7.4 à 22 kW\n• Parfaites pour usage collectif\n\n🤖 **Bornes intelligentes**\n• Pilotage à distance\n• Gestion énergétique optimisée\n• Compatible tous véhicules\n• Solution premium connectée\n\n💡 **Toutes compatibles** avec le marché européen !",
    followup: ["Les bornes sont-elles compatibles avec ma voiture ?", "Peut-on recharger plusieurs véhicules ?", "Quelle borne pour mon usage ?"],
    category: "technique"
  },
  "maintenance": {
    question: "Comment fonctionne la maintenance des bornes ?",
    answer: "🛠️ **Maintenance BorneFlix incluse :**\n\n📊 **Supervision 24/7**\n• Monitoring à distance\n• Détection préventive des pannes\n• Mises à jour automatiques\n\n⚡ **Intervention rapide**\n• Délai : 48h maximum\n• Techniciens certifiés\n• Pièces garanties 2-5 ans\n\n📈 **Statistiques fiabilité :**\n• Durée de vie : 10+ ans\n• Taux de disponibilité : 99.5%\n• Satisfaction client : 4.9/5\n\n💡 **Vous pouvez dormir tranquille !**",
    followup: ["Que faire en cas de panne ?", "Combien coûte la maintenance ?", "Garantie incluse ?"],
    category: "technique",
    stats: { uptime: "99.5%", lifespan: "10+ ans", response_time: "48h" }
  },
  
  // Processus et démarches
  "syndic": {
    question: "Comment procéder avec mon syndic ?",
    answer: "🤝 **BorneFlix s'occupe de tout !**\n\n📋 **Notre accompagnement complet :**\n\n1️⃣ **Préparation du dossier**\n• Étude technique détaillée\n• Dossier administratif complet\n• Présentation claire du projet\n\n2️⃣ **Communication avec le syndic**\n• Contact direct par nos experts\n• Réponses à toutes les questions\n• Négociation si nécessaire\n\n3️⃣ **Assemblée générale**\n• Présentation du projet\n• Réponses aux objections\n• Vote accompagné\n\n💡 **Taux de réussite : 98%** grâce à notre expertise !",
    followup: ["Le syndic peut-il refuser ?", "Faut-il un vote en AG ?", "Que faire en cas de refus ?"],
    category: "demarches",
    stats: { success_rate: "98%", avg_ag_time: "15 min", expert_support: "100%" }
  },
  "droit": {
    question: "Ai-je le droit d'installer une borne ?",
    answer: "⚖️ **Droit à la prise garanti !**\n\n📜 **Cadre légal :**\n• **Loi d'orientation des mobilités (LOM)**\n• **Droit à la prise** depuis 2020\n• **Copropriété ne peut refuser** l'installation\n\n✅ **Vos droits :**\n• Installation à vos frais autorisée\n• Pas de vote en AG obligatoire\n• Syndic doit faciliter les démarches\n\n🛡️ **Protection BorneFlix :**\n• Service juridique spécialisé\n• Intervention en cas de blocage\n• Recours si nécessaire\n\n💡 **La transition énergétique est protégée par la loi !**",
    followup: ["Comment fonctionne le droit à la prise ?", "Que faire si le syndic refuse ?", "Recours possibles ?"],
    category: "demarches"
  },
  
  // Questions spécifiques
  "compatibilite": {
    question: "Les bornes sont-elles compatibles avec ma voiture ?",
    answer: "✅ **Compatibilité universelle BorneFlix !**\n\n🔌 **Standards supportés :**\n• **Type 2** (standard européen)\n• **CCS Combo** (recharge rapide)\n• **CHAdeMO** (Japon/Asie)\n\n🚗 **Véhicules compatibles :**\n• Toutes les marques européennes\n• Tesla (avec adaptateur)\n• Véhicules hybrides rechargeables\n• Véhicules 100% électriques\n\n📱 **Fonctionnalités intelligentes :**\n• Détection automatique du véhicule\n• Adaptation de la puissance\n• Gestion optimisée de la charge\n\n💡 **Testez la compatibilité** sur notre simulateur en ligne !",
    followup: ["Comment tester la compatibilité ?", "Faut-il un adaptateur ?", "Quelle borne pour ma voiture ?"],
    category: "technique"
  },
  "consommation": {
    question: "Comment optimiser ma consommation électrique ?",
    answer: "⚡ **Optimisation BorneFlix :**\n\n🔋 **Gestion intelligente :**\n• **Recharge optimisée** : Heures creuses\n• **Pilotage à distance** : Contrôle total\n• **Suivi en temps réel** : Consommation détaillée\n\n🚗 **Avantages concrets :**\n• **Économies énergétiques** significatives\n• **Recharge plus rapide** et efficace\n• **Réduction de l'empreinte carbone**\n• **Comfort d'utilisation** maximal\n\n💡 **Notre système intelligent** vous aide à optimiser votre consommation !",
    followup: ["Comment fonctionne la gestion intelligente ?", "Puis-je revendre mon électricité ?", "Comment suivre ma consommation ?"],
    category: "technique"
  },
  "securite": {
    question: "Les bornes sont-elles sécurisées ?",
    answer: "🔒 **Sécurité maximale BorneFlix !**\n\n🛡️ **Protections intégrées :**\n• **Surveillance 24/7** à distance\n• **Détection d'anomalies** automatique\n• **Arrêt d'urgence** en cas de problème\n• **Protection contre les surtensions**\n\n🔐 **Sécurité physique :**\n• **Câbles renforcés** anti-vandalisme\n• **Boîtiers IP65** (résistance eau/poussière)\n• **Verrouillage** optionnel\n• **Surveillance vidéo** possible\n\n📱 **Contrôle à distance :**\n• App mobile sécurisée\n• Notifications en temps réel\n• Historique des utilisations\n• Gestion des accès\n\n💡 **Aucun incident** en 5 ans d'exploitation !",
    followup: ["Que faire en cas de problème ?", "Surveillance vidéo incluse ?", "Protection contre le vol ?"],
    category: "technique",
    stats: { incidents: "0", uptime: "99.9%", security_level: "Militaire" }
  },
  
  // Questions business
  "entreprise": {
    question: "Solutions pour entreprises et flottes ?",
    answer: "🏢 **Solutions entreprises BorneFlix :**\n\n🚗 **Gestion de flotte :**\n• **Bornes multiples** (jusqu'à 100+)\n• **Gestion centralisée** via dashboard\n• **Facturation automatique** par véhicule\n• **Rapports détaillés** de consommation\n\n🎯 **Avantages business :**\n• **Réduction des coûts** d'exploitation\n• **Avantages fiscaux** importants\n• **Image RSE** améliorée\n• **Conformité** réglementaire\n\n📊 **Solutions sur mesure :**\n• **Parking privé** : 10-50 bornes\n• **Parking public** : 50-200 bornes\n• **Logistique** : bornes rapides\n\n💡 **Accompagnement dédié** pour votre transition !",
    followup: ["Devis pour ma flotte ?", "Gestion de la facturation ?", "Accompagnement transition ?"],
    category: "business"
  },
  
  // Contact et devis
  "contact": {
    question: "Comment contacter BorneFlix ?",
    answer: "📞 **Contactez-nous facilement :**\n\n1️⃣ **Téléphone** : 01 80 91 90 80\n2️⃣ **Email** : contact@borneflix.fr\n3️⃣ **Devis en ligne** : borneflix.fr/devis\n4️⃣ **Rendez-vous** : Calendly intégré\n\n⏰ **Horaires :**\n• Lundi-Vendredi : 9h-18h\n• Samedi : 9h-12h\n• Support technique : 24/7\n\n💡 **Réponse garantie sous 2h** en heures ouvrables !",
    followup: ["Demander un devis", "Prendre rendez-vous", "Support technique", "Voir nos réalisations"],
    category: "contact"
  },
  "devis": {
    question: "Comment obtenir un devis ?",
    answer: "📋 **Devis gratuit en 2 minutes :**\n\n🚀 **Processus simple :**\n1. **Formulaire en ligne** (2 min)\n2. **Étude technique** gratuite (1-2 semaines)\n3. **Proposition personnalisée** avec prix détaillé\n4. **Accompagnement** jusqu'à l'installation\n\n🎯 **Inclus dans le devis :**\n• Étude technique complète\n• Prix détaillé par solution\n• Aides financières calculées\n• Planning d'installation\n• Garanties et maintenance\n\n💡 **Aucun engagement** - devis 100% gratuit !",
    followup: ["Faire un devis maintenant", "Voir nos solutions", "Consulter les aides", "Parler à un expert"],
    category: "contact"
  },
  
  // Fallback intelligent
  "fallback": {
    answer: "🤔 **Question intéressante !**\n\nJe n'ai pas toutes les informations sur ce sujet spécifique, mais je peux vous aider de plusieurs façons :\n\n1️⃣ **Parler à un expert** BorneFlix (gratuit)\n2️⃣ **Demander un devis** personnalisé\n3️⃣ **Consulter notre FAQ** complète\n4️⃣ **Tester notre simulateur** en ligne\n\n💡 **Notre équipe d'experts** est disponible 7j/7 pour répondre à toutes vos questions !",
    followup: ["Parler à un expert", "Demander un devis", "Voir la FAQ complète", "Tester le simulateur"],
    category: "general"
  }
};

// Catégories organisées
const categories: FAQCategory[] = [
  {
    id: "installation",
    name: "Installation",
    icon: "fas fa-tools",
    color: "#8dc63f",
    questions: ["installation", "délai", "prix", "aides"]
  },
  {
    id: "technique",
    name: "Technique",
    icon: "fas fa-cog",
    color: "#003566",
    questions: ["puissance", "type", "maintenance", "compatibilite", "securite"]
  },
  {
    id: "demarches",
    name: "Démarches",
    icon: "fas fa-file-alt",
    color: "#ff6b35",
    questions: ["syndic", "droit"]
  },
  {
    id: "business",
    name: "Entreprise",
    icon: "fas fa-building",
    color: "#6c5ce7",
    questions: ["entreprise"]
  },
  {
    id: "contact",
    name: "Contact",
    icon: "fas fa-phone",
    color: "#e17055",
    questions: ["contact", "devis"]
  }
];

// Suggestions rapides par catégorie
const initialSuggestions: QuickSuggestion[] = [
  { id: "s1", text: "Comment installer ?", query: "installation", category: "installation", icon: "fas fa-tools" },
  { id: "s2", text: "Nos solutions", query: "prix", category: "prix", icon: "fas fa-star" },
  { id: "s3", text: "Aides disponibles", query: "aides", category: "prix", icon: "fas fa-gift" },
  { id: "s4", text: "Démarches syndic", query: "syndic", category: "demarches", icon: "fas fa-handshake" },
  { id: "s5", text: "Quelle puissance ?", query: "puissance", category: "technique", icon: "fas fa-bolt" },
  { id: "s6", text: "Sécurité", query: "securite", category: "technique", icon: "fas fa-shield-alt" },
  { id: "s7", text: "Demander un devis", query: "devis", category: "contact", icon: "fas fa-calculator" },
  { id: "s8", text: "Nous contacter", query: "contact", category: "contact", icon: "fas fa-phone" }
];

// Fonctions utilitaires améliorées
const generateId = () => Math.random().toString(36).substring(2, 9);

const getBotResponse = (query: string): { answer: string, followup?: string[], category?: string, stats?: any } => {
  const normalizedQuery = query.toLowerCase();
  
  // Recherche intelligente avec mots-clés
  const keywords = {
    'installation': ['installer', 'installation', 'poser', 'mettre', 'équiper'],
    'prix': ['tarif', 'solution', 'gamme', 'offre', 'proposition'],
    'aides': ['aide', 'subvention', 'crédit', 'impôt', 'advenir'],
    'délai': ['temps', 'délai', 'durée', 'quand', 'rapidement'],
    'puissance': ['puissance', 'kw', 'rapide', 'lent', 'vitesse'],
    'type': ['type', 'modèle', 'borne', 'wallbox', 'pied'],
    'maintenance': ['maintenance', 'entretien', 'panne', 'réparation', 'garantie'],
    'syndic': ['syndic', 'copropriété', 'assemblée', 'vote', 'autorisation'],
    'droit': ['droit', 'légal', 'loi', 'autorisation', 'refus'],
    'compatibilite': ['compatible', 'voiture', 'véhicule', 'modèle', 'marque'],
    'consommation': ['consommation', 'électricité', 'kwh', 'optimisation', 'gestion'],
    'securite': ['sécurité', 'sûr', 'protection', 'vol', 'vandalisme'],
    'entreprise': ['entreprise', 'flotte', 'business', 'professionnel', 'commercial'],
    'contact': ['contact', 'téléphone', 'email', 'appeler', 'contacter'],
    'devis': ['devis', 'estimation', 'prix', 'calculer', 'budget']
  };
  
  // Recherche par mots-clés
  for (const [key, words] of Object.entries(keywords)) {
    if (words.some(word => normalizedQuery.includes(word))) {
      return faqData[key] || faqData.fallback;
    }
  }
  
  // Recherche directe
  for (const [key, data] of Object.entries(faqData)) {
    if (normalizedQuery.includes(key) || (data as any).question?.toLowerCase().includes(normalizedQuery)) {
      return data as { answer: string, followup?: string[], category?: string, stats?: any };
    }
  }
  
  return faqData.fallback;
};

// Composant principal amélioré
const ChatbotFAQ: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<QuickSuggestion[]>(initialSuggestions);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [showCategories, setShowCategories] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Message de bienvenue amélioré
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: generateId(),
        sender: 'bot',
        text: "👋 **Bonjour ! Je suis l'assistant BorneFlix**\n\nJe peux vous aider avec :\n\n🔧 **Installation** et processus\n💰 **Tarifs** et aides financières\n⚡ **Questions techniques**\n📋 **Démarches** administratives\n🏢 **Solutions entreprises**\n\n💡 **Posez-moi votre question** ou choisissez une suggestion ci-dessous !",
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = (text: string, isQuickReply = false) => {
    // Ajouter le message utilisateur
    const userMessage: ChatMessage = {
      id: generateId(),
      sender: 'user',
      text,
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setTypingIndicator(true);
    
    // Simuler le délai de réponse du bot
    setTimeout(() => {
      setTypingIndicator(false);
      
      const response = getBotResponse(text);
      const botMessage: ChatMessage = {
        id: generateId(),
        sender: 'bot',
        text: response.answer,
        timestamp: new Date(),
        type: response.stats ? 'stats' : 'text',
        data: response.stats
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Ajouter les suggestions de suivi si disponibles
      if (response.followup && response.followup.length > 0) {
        setTimeout(() => {
          const followupMessage: ChatMessage = {
            id: generateId(),
            sender: 'bot',
            text: "💡 **Autres questions qui pourraient vous intéresser :**",
            timestamp: new Date(),
            type: 'action',
            data: {
              suggestions: response.followup!.map((text, index) => ({
                id: `followup-${index}`,
                text,
                query: text.toLowerCase()
              }))
            }
          };
          setMessages(prev => [...prev, followupMessage]);
        }, 1000);
      }

      // Proposer le contact après 3 échanges
      if (messages.length >= 4) {
        setTimeout(() => {
          const contactMessage: ChatMessage = {
            id: generateId(),
            sender: 'bot',
            text: "💬 **Besoin d'aide plus personnalisée ?**\n\nNotre équipe d'experts est disponible pour vous accompagner !",
            timestamp: new Date(),
            type: 'contact'
          };
          setMessages(prev => [...prev, contactMessage]);
        }, 2000);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSendMessage(inputValue.trim());
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([]);
    }
  };

  const handleContactAction = (action: string) => {
    switch (action) {
      case 'phone':
        window.location.href = 'tel:0180919080';
        break;
      case 'email':
        window.location.href = 'mailto:contact@borneflix.fr';
        break;
      case 'devis':
        window.location.href = '/devis';
        break;
      case 'calendly':
        // Ouvrir Calendly si disponible
        const calendlyElement = document.querySelector('[data-calendly]');
        if (calendlyElement) {
          (calendlyElement as HTMLElement).click();
        } else {
          window.location.href = '/contact';
        }
        break;
      default:
        break;
    }
  };

  const renderCategories = () => (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCurrentCategory(category.id);
              setShowCategories(false);
              const categoryQuestions = category.questions.slice(0, 3);
              setSuggestions(categoryQuestions.map((q, index) => ({
                id: `cat-${index}`,
                text: faqData[q]?.question || q,
                query: q,
                category: category.id
              })));
            }}
            className="px-3 py-2 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              backgroundColor: currentCategory === category.id ? category.color : '#f3f4f6',
              color: currentCategory === category.id ? 'white' : '#374151'
            }}
          >
            <i className={`${category.icon} mr-2`}></i>
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderStats = (stats: Record<string, string | number>) => (
    <div className="mt-4 p-4 bg-gradient-to-r from-[#8dc63f]/10 to-[#003566]/10 rounded-lg">
      <h4 className="font-semibold text-[#003566] mb-3">📊 Statistiques BorneFlix</h4>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="text-center">
            <div className="text-2xl font-bold text-[#ff6b35]">{value}</div>
            <div className="text-xs text-gray-600 capitalize">{key.replace('_', ' ')}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessage = (message: ChatMessage) => {
    const isBot = message.sender === 'bot';
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
      >
        <div className={`max-w-[80%] ${isBot ? 'bg-white' : 'bg-[#ff6b35] text-white'} rounded-2xl px-4 py-3 shadow-md`}>
          {message.type === 'contact' ? (
            <div className="space-y-3">
              <div className="whitespace-pre-line text-sm">{message.text}</div>
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleContactAction('phone')}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  Appeler
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleContactAction('email')}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  Envoyer un email
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleContactAction('devis')}
                  className="flex items-center gap-2 bg-[#8dc63f] hover:bg-[#7db52f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  <HelpCircle className="w-4 h-4" />
                  Demander un devis
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleContactAction('calendly')}
                  className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  <Calendar className="w-4 h-4" />
                  Prendre rendez-vous
                </motion.button>
              </div>
            </div>
          ) : message.type === 'action' && message.data?.suggestions ? (
            <div className="space-y-3">
              <div className="whitespace-pre-line text-sm">{message.text}</div>
              <div className="flex flex-wrap gap-2">
                {message.data.suggestions.map((suggestion: any) => (
                  <motion.button
                    key={suggestion.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage(suggestion.query, true)}
                    className="bg-[#003566] hover:bg-[#00264d] text-white px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300"
                  >
                    {suggestion.text}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="whitespace-pre-line text-sm">{message.text}</div>
              {message.data && message.type === 'stats' && renderStats(message.data)}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Bouton flottant du chatbot */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-[#ff6b35] hover:bg-[#ff8c42] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Ouvrir le chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Interface du chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 left-6 z-40 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Assistant BorneFlix</h3>
                    <p className="text-xs opacity-90">En ligne • Réponse instantanée</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleChat}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(renderMessage)}
              
              {typingIndicator && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start mb-4"
                >
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions rapides */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-3">💡 Suggestions rapides :</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.slice(0, 3).map((suggestion) => (
                    <motion.button
                      key={suggestion.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSendMessage(suggestion.query, true)}
                      className="bg-[#003566] hover:bg-[#00264d] text-white px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300"
                    >
                      {suggestion.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all duration-300 text-sm"
                  disabled={typingIndicator}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim() || typingIndicator}
                  className="bg-[#ff6b35] hover:bg-[#ff8c42] disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotFAQ;