import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CTA from "@/components/CTA";
import SEOHead from "@/components/SEOHead";

// Import des images
import installationImage from "@/assets/images/reelles/installation.jpg";
import rechargeImage1 from "@/assets/images/gallery/recharge-img01.jpeg";
import rechargeImage2 from "@/assets/images/gallery/recharge-img02.jpeg";
import rechargeImage3 from "@/assets/images/gallery/recharge-img03.jpeg";
import signatureContratImage from "@/assets/images/reelles/signature-contrat.jpg";
import capture1 from "@/assets/images/reelles/images-1.png";
import capture2 from "@/assets/images/reelles/images-4.png";
import capture3 from "@/assets/images/reelles/images-13.png";
import capture4 from "@/assets/images/reelles/borne-recharge.jpg";

const keyBenefits = [
  {
    title: "Économies garanties",
    description: "Jusqu'à 50% d'économies sur vos coûts de recharge grâce à l'optimisation intelligente.",
    image: rechargeImage1,
    icon: "fas fa-euro-sign",
    color: "#8dc63f",
    metric: "Jusqu'à 50%"
  },
  {
    title: "Installation rapide",
    description: "Installation en 2h pour les particuliers, 24h pour les copropriétés. Simplicité et efficacité.",
    image: installationImage,
    icon: "fas fa-bolt",
    color: "#003566",
    metric: "2h-24h"
  },
  {
    title: "Garantie complète",
    description: "Maintenance incluse, garantie 2 ans et support technique 24/7 pour une tranquillité totale.",
    image: signatureContratImage,
    icon: "fas fa-shield-alt",
    color: "#f59e0b",
    metric: "2 ans"
  },
  {
    title: "Support 24/7",
    description: "Une équipe d'experts à votre écoute à tout moment, pour répondre à toutes vos questions.",
    image: rechargeImage2,
    icon: "fas fa-headset",
    color: "#ff6b35",
    metric: "24/7"
  }
];

const proofPoints = [
  {
    title: "Garantie de performance",
    description: "Nos bornes de recharge IRVE sont conçues pour offrir une recharge rapide et fiable, avec une durée de vie élevée.",
    image: rechargeImage3
  },
  {
    title: "Sécurité maximale",
    description: "Nous utilisons des composants de haute qualité et des systèmes de sécurité avancés pour assurer la sécurité de vos véhicules et de vos données.",
    image: capture1
  },
  {
    title: "Simplicité d'utilisation",
    description: "Notre interface utilisateur est intuitive et facile à utiliser, même pour les utilisateurs non techniques.",
    image: capture2
  },
  {
    title: "Fiabilité sans faille",
    description: "Nos bornes de recharge sont conçues pour fonctionner sans interruption, avec des taux de disponibilité élevés.",
    image: capture3
  }
];

const processSteps = [
  {
    step: "1",
    title: "Étude de votre besoin",
    description: "Nous prenons le temps de comprendre vos objectifs et vos besoins en termes de recharge.",
    icon: "fas fa-lightbulb"
  },
  {
    step: "2",
    title: "Proposition personnalisée",
    description: "Nous vous proposons une solution adaptée à votre environnement et à votre budget.",
    icon: "fas fa-pen-nib"
  },
  {
    step: "3",
    title: "Installation",
    description: "Notre équipe expérimentée assure l'installation de votre borne de recharge.",
    icon: "fas fa-tools"
  },
  {
    step: "4",
    title: "Formation et soutien",
    description: "Nous vous assurons un support complet, de la formation à l'assistance technique.",
    icon: "fas fa-handshake"
  }
];

const AvantagesPage = () => {
  return (
    <>
      <SEOHead
        title="Avantages BorneFlix - Économisez 50% Recharge Électrique | Installation Rapide 24h"
        description="Découvrez les avantages BorneFlix : économies jusqu'à 50%, installation en 2h-24h, garantie 2 ans, support 24/7. Plus de 1000 clients satisfaits. La solution IRVE la plus rentable du marché."
        keywords="avantages BorneFlix, économies recharge électrique, installation rapide IRVE, garantie 2 ans, support 24/7, certification IRVE, solution rentable, clients satisfaits"
        url="https://borneflix.fr/avantages"
        type="service"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Avantages BorneFlix",
          "description": "Avantages des solutions IRVE BorneFlix : économies, installation rapide, garantie",
          "provider": {
            "@type": "Organization",
            "name": "BorneFlix"
          },
          "serviceType": "Installation de bornes de recharge IRVE",
          "areaServed": {
            "@type": "Country",
            "name": "France"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Avantages BorneFlix",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Économies garanties",
                  "description": "Jusqu'à 50% d'économies sur les coûts de recharge"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Installation rapide",
                  "description": "Installation en 2h-24h selon le projet"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Garantie complète",
                  "description": "Maintenance incluse et support 24/7 pendant 2 ans"
                }
              }
            ]
          }
        }}
      />

      {/* Hero Section - Promesse globale */}
      <section className="relative bg-gradient-to-br from-[#003566] via-[#1a4d85] to-[#2d5a8f] text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Économisez jusqu'à
              <span className="block text-[#8dc63f]">50% sur votre recharge</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              La solution IRVE la plus rentable du marché
              <br className="hidden md:block" />
              Installation rapide • Garantie 2 ans • Support 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#8dc63f] hover:bg-[#7db52f] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Découvrir les avantages
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-[#003566]"
                onClick={() => window.location.href = '/devis'}
              >
                Devis gratuit en 2 min
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Éléments décoratifs */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#8dc63f]/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#8dc63f]/10 rounded-full blur-2xl"></div>
      </section>

      {/* Section Avantages clés - Grille optimisée */}
      <section id="benefits" className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#003566]">
              Pourquoi <span className="text-[#8dc63f]">BorneFlix</span> ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              4 raisons qui font de nous le leader des solutions IRVE intelligentes
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            {keyBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] border-0 h-full">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={benefit.image} 
                      alt={benefit.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: `${benefit.color}20` }}>
                        <i className={`${benefit.icon} text-xl`} style={{ color: benefit.color }}></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#003566]">{benefit.title}</h3>
                        <div className="text-lg font-bold" style={{ color: benefit.color }}>{benefit.metric}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Preuves - Grille optimisée */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#003566]">
              Nos <span className="text-[#8dc63f]">engagements</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des garanties concrètes pour votre tranquillité d'esprit
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
            {proofPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] border-0 h-full">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={point.image} 
                      alt={point.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#8dc63f]/20 flex items-center justify-center mr-4">
                        <i className="fas fa-check text-[#8dc63f] text-base"></i>
                      </div>
                      <h3 className="text-lg font-bold text-[#003566]">{point.title}</h3>
                    </div>
                    <p className="text-gray-600 text-base">
                      {point.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Processus simplifié - Grille optimisée */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#003566]">
              Installation en <span className="text-[#8dc63f]">4 étapes</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un processus simple et transparent pour votre borne de recharge
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] border-0 h-full">
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-[#8dc63f] text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="font-bold text-2xl">{step.step}</span>
                    </div>
                    <div className="w-16 h-16 bg-[#8dc63f]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className={`${step.icon} text-[#8dc63f] text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-[#003566] mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-base">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section optimisé */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-[#003566] to-[#1a4d85]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Prêt à <span className="text-[#8dc63f]">économiser 50%</span> ?
              </h2>
              <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                Rejoignez les milliers de clients satisfaits qui ont choisi BorneFlix
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl font-bold text-[#8dc63f] mb-2">299€</div>
                  <div className="text-white text-base">À partir de</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl font-bold text-[#8dc63f] mb-2">2h</div>
                  <div className="text-white text-base">Installation</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl font-bold text-[#8dc63f] mb-2">50%</div>
                  <div className="text-white text-base">Économies</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  className="bg-[#8dc63f] hover:bg-[#7db52f] text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => window.location.href = '/devis'}
                >
                  <i className="fas fa-calculator mr-3"></i>
                  Devis gratuit en 2 min
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#003566] px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300"
                  onClick={() => window.location.href = 'tel:0123456789'}
                >
                  <i className="fas fa-phone-alt mr-3"></i>
                  Appeler un expert
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AvantagesPage; 