import { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, AlertTriangle, Clock, Shield, Users, Building, Phone, Mail } from "lucide-react";

const ConditionsUtilisation = () => {
  useEffect(() => {
    document.title = "Conditions d'utilisation - BorneFlix";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Conditions d\'utilisation de BorneFlix - Règles et conditions d\'usage du site web et des services.');
    }
  }, []);

  const serviceFeatures = [
    {
      icon: CheckCircle,
      title: "Consultation gratuite",
      description: "Accès libre aux informations et ressources du site"
    },
    {
      icon: CheckCircle,
      title: "Devis personnalisés",
      description: "Études techniques et devis sur mesure"
    },
    {
      icon: CheckCircle,
      title: "Accompagnement client",
      description: "Support et conseils personnalisés"
    },
    {
      icon: CheckCircle,
      title: "Installation professionnelle",
      description: "Services d'installation et de maintenance"
    }
  ];

  const obligations = [
    {
      icon: Users,
      title: "Utilisation légale",
      description: "Utiliser le site conformément aux lois en vigueur"
    },
    {
      icon: Shield,
      title: "Respect de la propriété",
      description: "Ne pas copier ou reproduire le contenu sans autorisation"
    },
    {
      icon: AlertTriangle,
      title: "Informations exactes",
      description: "Fournir des informations vraies et complètes"
    },
    {
      icon: Clock,
      title: "Respect des délais",
      description: "Respecter les délais convenus pour les projets"
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
              Conditions d'Utilisation
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
              Règles et conditions d'usage du site web et des services BorneFlix
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
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Présentation</h2>
              
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Les présentes conditions d'utilisation régissent l'utilisation du site web BorneFlix 
                  et de ses services. En accédant à ce site et en utilisant nos services, vous acceptez 
                  d'être lié par ces conditions.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  BorneFlix est une entreprise spécialisée dans l'installation de bornes de recharge 
                  pour véhicules électriques, proposant des solutions adaptées aux particuliers et 
                  aux copropriétés.
                </p>
              </div>
            </motion.div>

            {/* Services proposés */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Services proposés</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {serviceFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#8dc63f]/10 flex items-center justify-center mr-4">
                      <feature.icon className="w-6 h-6 text-[#8dc63f]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#003566] mb-2">{feature.title}</h3>
                      <p className="text-gray-700">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Conditions d'accès */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Conditions d'accès</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Accès au site</h3>
                  <p className="text-gray-700 leading-relaxed">
                    L'accès au site BorneFlix est libre et gratuit. Vous pouvez consulter les informations 
                    disponibles sans créer de compte. Cependant, certaines fonctionnalités (devis, contact) 
                    peuvent nécessiter la fourniture d'informations personnelles.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Équipements requis</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Pour utiliser le site dans des conditions optimales, vous devez disposer d'un ordinateur 
                    ou d'un appareil mobile connecté à Internet, d'un navigateur web récent et d'une connexion 
                    Internet stable.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Disponibilité</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Nous nous efforçons de maintenir le site accessible 24h/24 et 7j/7, mais nous ne pouvons 
                    garantir une disponibilité permanente. Des interruptions peuvent survenir pour maintenance 
                    ou pour des raisons techniques indépendantes de notre volonté.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Obligations de l'utilisateur */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Obligations de l'utilisateur</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {obligations.map((obligation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mr-3">
                        <obligation.icon className="w-5 h-5 text-[#ff6b35]" />
                      </div>
                      <h3 className="font-semibold text-[#003566]">{obligation.title}</h3>
                    </div>
                    <p className="text-gray-700">{obligation.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interdictions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Interdictions</h2>
              
              <div className="space-y-6">
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="font-semibold text-[#003566] mb-4">Utilisation interdite</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Utiliser le site à des fins illégales ou frauduleuses</li>
                    <li>• Tenter de pirater ou de compromettre la sécurité du site</li>
                    <li>• Reproduire, distribuer ou modifier le contenu sans autorisation</li>
                    <li>• Utiliser des robots ou scripts automatisés</li>
                    <li>• Envoyer du spam ou des contenus inappropriés</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Propriété intellectuelle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Propriété intellectuelle</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Droits de BorneFlix</h3>
                  <p className="text-gray-700 leading-relaxed">
                    L'ensemble du contenu du site (textes, images, logos, vidéos, etc.) est la propriété 
                    exclusive de BorneFlix ou de ses partenaires. Toute reproduction, représentation, 
                    modification, publication, adaptation totale ou partielle des éléments du site, 
                    quel que soit le moyen ou le procédé utilisé, est interdite.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Marques et logos</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Les marques et logos mentionnés sur le site sont la propriété de leurs détenteurs 
                    respectifs. Toute reproduction ou représentation, totale ou partielle, faite sans 
                    le consentement préalable et écrit de leur détenteur est illicite.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Responsabilités */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Responsabilités</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Responsabilité de BorneFlix</h3>
                  <p className="text-gray-700 leading-relaxed">
                    BorneFlix s'efforce d'assurer l'exactitude des informations diffusées sur son site, 
                    mais ne peut garantir qu'elles soient exemptes d'erreurs. BorneFlix ne saurait être 
                    tenue responsable des dommages directs ou indirects résultant de l'utilisation du site.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Responsabilité de l'utilisateur</h3>
                  <p className="text-gray-700 leading-relaxed">
                    L'utilisateur est responsable de l'utilisation qu'il fait du site et des informations 
                    qu'il y trouve. Il s'engage à ne pas utiliser le site à des fins illégales ou 
                    préjudiciables à BorneFlix ou à des tiers.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Liens externes</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Le site peut contenir des liens vers des sites externes. BorneFlix n'exerce aucun 
                    contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Protection des données */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Protection des données</h2>
              
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  La collecte et le traitement de vos données personnelles sont régis par notre 
                  <a href="/politique-confidentialite" className="text-[#ff6b35] hover:underline font-medium">
                    Politique de confidentialité
                  </a>. 
                  En utilisant notre site, vous acceptez cette politique.
                </p>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-[#003566] mb-4">Vos droits</h3>
                  <p className="text-gray-700">
                    Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, 
                    d'effacement et de portabilité de vos données personnelles.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Droit applicable et juridiction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Droit applicable et juridiction</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Droit applicable</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Les présentes conditions d'utilisation sont soumises au droit français. 
                    En cas de litige, les tribunaux français seront seuls compétents.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Modifications</h3>
                  <p className="text-gray-700 leading-relaxed">
                    BorneFlix se réserve le droit de modifier ces conditions d'utilisation à tout moment. 
                    Les modifications prendront effet dès leur publication sur le site. Il est recommandé 
                    de consulter régulièrement cette page.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Contact</h2>
              
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Pour toute question concernant ces conditions d'utilisation, vous pouvez nous contacter :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mr-3">
                      <Mail className="w-5 h-5 text-[#ff6b35]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#003566]">Email</p>
                      <p className="text-gray-700">contact@borneflix.fr</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mr-3">
                      <Phone className="w-5 h-5 text-[#ff6b35]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#003566]">Téléphone</p>
                      <p className="text-gray-700">01 80 91 90 80</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mr-3">
                      <Building className="w-5 h-5 text-[#ff6b35]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#003566]">Adresse</p>
                      <p className="text-gray-700">3 Av. des Orangers<br />94380 Bonneuil-sur-Marne</p>
                    </div>
                  </div>
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

export default ConditionsUtilisation; 