import { useEffect } from "react";
import { motion } from "framer-motion";
import { Building, MapPin, Phone, Mail, Calendar, FileText } from "lucide-react";

const MentionsLegales = () => {
  useEffect(() => {
    document.title = "Mentions légales - BorneFlix";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mentions légales de BorneFlix - Informations légales et administratives sur l\'entreprise et le site web.');
    }
  }, []);

  const companyInfo = [
    {
      icon: Building,
      title: "Raison sociale",
      value: "BorneFlix",
      description: "Entreprise spécialisée dans les bornes de recharge"
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "3 Av. des Orangers",
      description: "94380 Bonneuil-sur-Marne, France"
    },
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
      description: "Support client"
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
              Mentions Légales
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
              Informations légales et administratives sur BorneFlix
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Informations de l'entreprise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Informations de l'entreprise</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {companyInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mr-4">
                      <info.icon className="w-6 h-6 text-[#ff6b35]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#003566] mb-1">{info.title}</h3>
                      <p className="text-lg text-gray-700 mb-1">{info.value}</p>
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Informations légales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Informations légales</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Directeur de publication</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Le directeur de publication de ce site web est le représentant légal de BorneFlix, 
                    responsable de la publication des contenus et de la conformité des informations diffusées.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Hébergement</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ce site web est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
                    L'hébergeur assure la disponibilité technique du site et la sécurité des données hébergées.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Propriété intellectuelle</h3>
                  <p className="text-gray-700 leading-relaxed">
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                    et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour 
                    les documents téléchargeables et les représentations iconographiques et photographiques.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Marques et logos</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Les marques et logos mentionnés sur ce site sont la propriété de leurs détenteurs respectifs. 
                    Toute reproduction ou représentation, totale ou partielle, faite sans le consentement préalable 
                    et écrit de leur détenteur est illicite.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Responsabilités */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Responsabilités</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Contenu du site</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement 
                    remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes. 
                    Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien 
                    vouloir le signaler par email à l'adresse contact@borneflix.fr.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Liens hypertextes</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Les liens hypertextes mis en place dans le cadre du présent site web en direction d'autres 
                    ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de BorneFlix.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#003566] mb-4">Cookies</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Le site peut-être amené à vous demander l'acceptation des cookies pour des besoins de statistiques 
                    et d'affichage. Un cookie ne nous permet pas de vous identifier ; il sert uniquement à enregistrer 
                    les informations relatives à la navigation de votre ordinateur sur notre site.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Droit applicable */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-[#003566] mb-8">Droit applicable</h2>
              
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Tout litige en relation avec l'utilisation du site BorneFlix est soumis au droit français. 
                  Hormis les cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction 
                  aux tribunaux compétents de Paris.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
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

export default MentionsLegales; 