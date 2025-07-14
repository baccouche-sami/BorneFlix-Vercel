import { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database, Mail, Phone, Calendar, FileText, User, Building, Settings, Edit, Trash2, Download } from "lucide-react";

const PolitiqueConfidentialite = () => {
  useEffect(() => {
    document.title = "Politique de confidentialité - BorneFlix";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Politique de confidentialité de BorneFlix - Protection de vos données personnelles et conformité RGPD.');
    }
  }, []);

  const dataCategories = [
    {
      icon: User,
      title: "Données d'identification",
      description: "Nom, prénom, adresse email, numéro de téléphone",
      purpose: "Contact et communication"
    },
    {
      icon: Building,
      title: "Données professionnelles",
      description: "Type de logement, adresse, nombre de résidents",
      purpose: "Étude technique et devis"
    },
    {
      icon: Settings,
      title: "Données techniques",
      description: "Adresse IP, cookies, logs de navigation",
      purpose: "Amélioration du service"
    },
    {
      icon: FileText,
      title: "Données de projet",
      description: "Informations sur votre projet de borne de recharge",
      purpose: "Accompagnement personnalisé"
    }
  ];

  const rights = [
    {
      icon: Eye,
      title: "Droit d'accès",
      description: "Consulter vos données personnelles"
    },
    {
      icon: Edit,
      title: "Droit de rectification",
      description: "Corriger des données inexactes"
    },
    {
      icon: Trash2,
      title: "Droit à l'effacement",
      description: "Supprimer vos données"
    },
    {
      icon: Download,
      title: "Droit à la portabilité",
      description: "Récupérer vos données"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#ff6b35] via-[#ff8c42] to-[#ffa726] text-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Politique de Confidentialité
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
              Protection de vos données personnelles et conformité RGPD
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Notre engagement</h2>
              
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  BorneFlix s'engage à protéger la vie privée de ses utilisateurs et à traiter leurs données 
                  personnelles avec la plus grande confidentialité. Cette politique de confidentialité décrit 
                  comment nous collectons, utilisons et protégeons vos informations personnelles.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  Cette politique est conforme au Règlement Général sur la Protection des Données (RGPD) 
                  et à la loi Informatique et Libertés modifiée.
                </p>
              </div>
            </motion.div>

            {/* Responsable du traitement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Responsable du traitement</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mr-4">
                    <Building className="w-6 h-6 text-[#ff6b35]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003566] mb-2">BorneFlix</h3>
                    <p className="text-gray-700">3 Av. des Orangers, 94380 Bonneuil-sur-Marne, France</p>
                    <p className="text-gray-700">Email : contact@borneflix.fr</p>
                    <p className="text-gray-700">Téléphone : 01 80 91 90 80</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Données collectées */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Données collectées</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {dataCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mr-3">
                        <category.icon className="w-5 h-5 text-[#ff6b35]" />
                      </div>
                      <h3 className="font-semibold text-[#003566]">{category.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{category.description}</p>
                    <p className="text-sm text-[#8dc63f] font-medium">Finalité : {category.purpose}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Finalités du traitement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Finalités du traitement</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-[#003566] mb-3">📞 Communication client</h3>
                    <p className="text-gray-700 text-sm">
                      Répondre à vos demandes, vous accompagner dans votre projet, 
                      vous informer sur nos services.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-[#003566] mb-3">📋 Étude technique</h3>
                    <p className="text-gray-700 text-sm">
                      Analyser vos besoins, établir des devis personnalisés, 
                      préparer les études d'installation.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-[#003566] mb-3">🔧 Amélioration du service</h3>
                    <p className="text-gray-700 text-sm">
                      Analyser l'utilisation du site, optimiser nos services, 
                      développer de nouvelles fonctionnalités.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-[#003566] mb-3">⚖️ Obligations légales</h3>
                    <p className="text-gray-700 text-sm">
                      Respecter les obligations légales et réglementaires, 
                      tenir la comptabilité, gérer les litiges.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Base légale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Base légale du traitement</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8dc63f] text-white flex items-center justify-center mr-4 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003566] mb-2">Exécution d'un contrat</h3>
                    <p className="text-gray-700">
                      Le traitement est nécessaire à l'exécution du contrat de service 
                      ou à l'exécution de mesures précontractuelles prises à votre demande.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8dc63f] text-white flex items-center justify-center mr-4 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003566] mb-2">Intérêt légitime</h3>
                    <p className="text-gray-700">
                      Le traitement est nécessaire aux fins des intérêts légitimes 
                      poursuivis par BorneFlix (amélioration des services, sécurité).
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8dc63f] text-white flex items-center justify-center mr-4 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003566] mb-2">Consentement</h3>
                    <p className="text-gray-700">
                      Pour certains traitements (cookies, marketing), nous recueillons 
                      votre consentement explicite.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Destinataires */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Destinataires des données</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-[#003566] mb-4">Personnel autorisé</h3>
                  <p className="text-gray-700">
                    Seul le personnel de BorneFlix habilité et soumis à une obligation 
                    de confidentialité peut accéder à vos données.
                  </p>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="font-semibold text-[#003566] mb-4">Prestataires de services</h3>
                  <p className="text-gray-700">
                    Nous pouvons partager vos données avec des prestataires techniques 
                    (hébergement, maintenance) sous garantie de protection.
                  </p>
                </div>
                
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="font-semibold text-[#003566] mb-4">Autorités compétentes</h3>
                  <p className="text-gray-700">
                    Nous pouvons être amenés à communiquer vos données aux autorités 
                    compétentes en cas d'obligation légale.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Durée de conservation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Durée de conservation</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-l-4 border-[#ff6b35] pl-4">
                    <h3 className="font-semibold text-[#003566] mb-2">Données clients</h3>
                    <p className="text-gray-700 text-sm">3 ans après le dernier contact</p>
                  </div>
                  
                  <div className="border-l-4 border-[#8dc63f] pl-4">
                    <h3 className="font-semibold text-[#003566] mb-2">Données prospects</h3>
                    <p className="text-gray-700 text-sm">3 ans après le dernier contact</p>
                  </div>
                  
                  <div className="border-l-4 border-[#003566] pl-4">
                    <h3 className="font-semibold text-[#003566] mb-2">Cookies</h3>
                    <p className="text-gray-700 text-sm">13 mois maximum</p>
                  </div>
                  
                  <div className="border-l-4 border-[#6c5ce7] pl-4">
                    <h3 className="font-semibold text-[#003566] mb-2">Logs techniques</h3>
                    <p className="text-gray-700 text-sm">12 mois</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vos droits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Vos droits</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {rights.map((right, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mr-4">
                      <right.icon className="w-6 h-6 text-[#ff6b35]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#003566] mb-2">{right.title}</h3>
                      <p className="text-gray-700">{right.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-[#003566]/5 rounded-lg">
                <h3 className="font-semibold text-[#003566] mb-4">Comment exercer vos droits ?</h3>
                <p className="text-gray-700 mb-4">
                  Pour exercer vos droits, contactez-nous par email à 
                  <strong> contact@borneflix.fr</strong> ou par courrier à l'adresse suivante :
                </p>
                <p className="text-gray-700">
                  BorneFlix<br />
                  3 Av. des Orangers<br />
                  94380 Bonneuil-sur-Marne, France
                </p>
              </div>
            </motion.div>

            {/* Sécurité */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Sécurité des données</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-[#ff6b35]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003566] mb-2">Mesures techniques</h3>
                    <p className="text-gray-700">
                      Nous mettons en œuvre des mesures techniques et organisationnelles 
                      appropriées pour protéger vos données contre la perte, l'accès non autorisé, 
                      la divulgation, l'altération et la destruction.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mr-4">
                    <Lock className="w-6 h-6 text-[#ff6b35]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003566] mb-2">Chiffrement</h3>
                    <p className="text-gray-700">
                      Vos données sont chiffrées lors de leur transmission et stockage 
                      pour garantir leur confidentialité.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact DPO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Contact et réclamations</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-[#003566] mb-4">Délégué à la protection des données</h3>
                  <p className="text-gray-700 mb-4">
                    Pour toute question relative à la protection de vos données personnelles, 
                    vous pouvez contacter notre délégué à la protection des données :
                  </p>
                  <p className="text-gray-700">
                    Email : <strong>dpo@borneflix.fr</strong><br />
                    Adresse : 3 Av. des Orangers, 94380 Bonneuil-sur-Marne, France
                  </p>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="font-semibold text-[#003566] mb-4">Autorité de contrôle</h3>
                  <p className="text-gray-700">
                    Vous avez le droit de déposer une réclamation auprès de la CNIL 
                    (Commission Nationale de l'Informatique et des Libertés) si vous 
                    estimez que vos droits ne sont pas respectés.
                  </p>
                </div>
                
                <p className="text-gray-700">
                  <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PolitiqueConfidentialite; 