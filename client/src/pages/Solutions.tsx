import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CTA from "@/components/CTA";
import SEOHead from "@/components/SEOHead";

// Import des images
import infrastructureImage from "@/assets/images/gallery/pexels-kindelmedia-9800030.jpg";
import individualImage from "@/assets/images/gallery/images-4.png";
import anticipationImage from "@/assets/images/gallery/images-1.png";
import infrastructureImage2 from "@/assets/images/gallery/images-13.png";
import borneRechargeImage from "@/assets/images/reelles/borne-recharge.jpg";
import installationImage from "@/assets/images/reelles/installation.jpg";
import rechargeImage1 from "@/assets/images/gallery/recharge-img01.jpeg";
import rechargeImage2 from "@/assets/images/gallery/recharge-img02.jpeg";
import rechargeImage3 from "@/assets/images/gallery/recharge-img03.jpeg";
import stationSolaireImage from "@/assets/images/reelles/station-solaire.jpg";
import signatureContratImage from "@/assets/images/reelles/signature-contrat.jpg";
import capture1 from "@/assets/images/reelles/images-1.png";
import capture2 from "@/assets/images/reelles/images-4.png";
import capture3 from "@/assets/images/reelles/images-13.png";
import capture4 from "@/assets/images/reelles/borne-recharge.jpg";
// Images de bornes supplémentaires
import hero2Image from "@/assets/images/hero/hero2.jpg";
import heroRechargeImage1 from "@/assets/images/hero/recharge-img01.jpeg";
import heroRechargeImage2 from "@/assets/images/hero/recharge-img02.jpeg";
import heroRechargeImage3 from "@/assets/images/hero/recharge-img03.jpeg";
import sectionImage1 from "@/assets/images/sections/images-1.png";
import sectionImage13 from "@/assets/images/sections/images-13.png";
import sectionImage4 from "@/assets/images/sections/images-4.png";

const SolutionsPage = () => {
  // Données des solutions
  const solutions = [
    {
      id: "greenup",
      title: "Prise Green'up Legrand",
      subtitle: "SOLUTION RAPIDE",
      description: "Solution rapide et économique avec la prise renforcée Green'up de Legrand. Installation simple en 1h, idéale pour commencer la recharge électrique.",
      image: rechargeImage1,
      icon: "fas fa-bolt",
      color: "#8dc63f",
      price: "299€",
      features: [
        "Installation en 1h",
        "Prise renforcée 32A",
        "Certifiée Legrand"
      ],
      popular: true
    },
    {
      id: "particuliers",
      title: "Borne individuelle connectée",
      subtitle: "PARTICULIERS",
      description: "Installez votre borne de recharge personnelle à domicile. Solution simple, rapide et économique pour recharger votre véhicule électrique.",
      image: individualImage,
      icon: "fas fa-home",
      color: "#8dc63f",
      price: "699€",
      features: [
        "Installation en 2h",
        "Gestion intelligente via app",
        "Économies jusqu'à 50%"
      ],
      popular: false
    },
    {
      id: "coproprietes",
      title: "Infrastructure collective intelligente",
      subtitle: "COPROPRIÉTÉS",
      description: "Équipez l'ensemble de votre parking avec une infrastructure commune connectée. Chaque résident dispose d'un point de charge individuel optimisé.",
      image: infrastructureImage,
      icon: "fas fa-building",
      color: "#003566",
      price: "1 299€",
      features: [
        "Économies d'échelle jusqu'à 50%",
        "Gestion intelligente de la puissance",
        "Installation en 24h"
      ],
      popular: false
    },
    {
      id: "entreprises",
      title: "Solutions professionnelles",
      subtitle: "ENTREPRISES",
      description: "Équipez votre entreprise avec des bornes de recharge intelligentes pour vos employés et clients. Gestion centralisée et optimisation des coûts.",
      image: anticipationImage,
      icon: "fas fa-briefcase",
      color: "#ff6b35",
      price: "Sur devis",
      features: [
        "Gestion centralisée",
        "Facturation automatisée",
        "ROI optimisé"
      ],
      popular: false
    }
  ];

  const advantages = [
    {
      icon: "fas fa-rocket",
      title: "Installation rapide",
      description: "Installation en 24h pour les copropriétés, 2h pour les particuliers. Une équipe d'experts certifiés à votre service.",
      metric: "2-24h",
      color: "secondary"
    },
    {
      icon: "fas fa-brain",
      title: "Gestion intelligente",
      description: "Bornes connectées avec gestion intelligente de l'énergie. Optimisez votre consommation et économisez jusqu'à 50%.",
      metric: "Jusqu'à 50%",
      color: "primary"
    },
    {
      icon: "fas fa-shield-alt",
      title: "Garantie complète",
      description: "Maintenance incluse, garantie 2 ans et support technique 24/7. Votre tranquillité d'esprit garantie.",
      metric: "2 ans",
      color: "yellow"
    }
  ];

  const features = [
    {
      icon: "fas fa-solar-panel",
      title: "Rechargez au meilleur prix",
      description: "Notre système intelligent régule la recharge aux moments où les tarifs du réseau sont les plus bas. Économies garanties grâce aux tarifs dynamiques et à l'optimisation de l'énergie solaire.",
      image: rechargeImage1,
      borderColor: "#8dc63f"
    },
    {
      icon: "fas fa-shield-alt",
      title: "Sécurité totale",
      description: "Notre système intelligent supervise votre consommation et équilibre la charge. Plus de risque de disjonction même si vous cuisinez ou repassez en même temps.",
      image: installationImage,
      borderColor: "#003566"
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Contrôle total via app",
      description: "L'application BorneFlix vous donne le contrôle sur votre recharge intelligente. Suivez vos coûts en temps réel et optimisez votre consommation d'énergie.",
      image: rechargeImage2,
      borderColor: "#f59e0b"
    }
  ];

  return (
    <>
      <SEOHead
        title="Solutions IRVE Intelligentes - BorneFlix | Bornes Recharge Copropriétés & Particuliers"
        description="Découvrez nos solutions IRVE intelligentes : infrastructure collective pour copropriétés (1299€), bornes individuelles (699€), prises Green'up (299€). Installation rapide 24h, économies jusqu'à 50%, garantie 2 ans. Devis gratuit."
        keywords="solutions IRVE, bornes recharge copropriétés, infrastructure collective, bornes individuelles, prises Green'up, installation rapide, économies énergie, garantie 2 ans, BorneFlix"
        url="https://borneflix.fr/solutions"
        type="service"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Solutions IRVE Intelligentes",
          "description": "Solutions complètes de bornes de recharge IRVE pour copropriétés, particuliers et entreprises",
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
            "name": "Solutions BorneFlix",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Infrastructure collective copropriétés",
                  "description": "Infrastructure collective intelligente pour copropriétés",
                  "price": "1299€"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Borne individuelle connectée",
                  "description": "Borne de recharge individuelle pour particuliers",
                  "price": "699€"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Prise Green'up Legrand",
                  "description": "Solution rapide avec prise renforcée Green'up",
                  "price": "299€"
                }
              }
            ]
          }
        }}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#003566] via-[#1a4d85] to-[#2d5a8f] text-white py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Solutions de Recharge
                <span className="block text-[#8dc63f]">Intelligentes</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Des bornes de recharge adaptées à tous vos besoins, 
                <br className="hidden md:block" />
                de la copropriété aux flottes d'entreprise
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#8dc63f] hover:bg-[#7db52f] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Découvrir nos solutions
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-[#003566]"
                  onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Demander un devis
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          {/* Éléments décoratifs */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#8dc63f]/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#8dc63f]/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
        </section>

        {/* Section Solutions - Version moderne et responsive */}
        <section id="solutions" className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
          {/* Éléments décoratifs de fond */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23003566%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#8dc63f]/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-[#003566]/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Header moderne avec animations */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
            >
              {/* Badge animé */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center bg-gradient-to-r from-[#003566]/10 to-[#8dc63f]/10 text-[#003566] px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-[#003566]/20 backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-[#8dc63f] rounded-full mr-3 animate-pulse"></div>
                SOLUTIONS IRVE INTELLIGENTES
                <div className="w-2 h-2 bg-[#8dc63f] rounded-full ml-3 animate-pulse"></div>
              </motion.div>
            
            {/* Titre principal avec gradient */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 lg:mb-8 text-[#003566] leading-tight"
            >
              Rechargez votre véhicule électrique{" "}
              <span className="bg-gradient-to-r from-[#8dc63f] via-[#7db52f] to-[#6ca41e] bg-clip-text text-transparent">
                partout
              </span>
            </motion.h2>
            
            {/* Description avec mise en forme moderne */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-700 mb-8 lg:mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              <span className="font-semibold text-[#003566]">BorneFlix</span> propose des solutions IRVE intelligentes pour{" "}
              <span className="font-semibold text-[#8dc63f] bg-[#8dc63f]/10 px-2 py-1 rounded-lg">particuliers</span>,{" "}
              <span className="font-semibold text-[#8dc63f] bg-[#8dc63f]/10 px-2 py-1 rounded-lg">copropriétés</span>{" "}
              et{" "}
              <span className="font-semibold text-[#8dc63f] bg-[#8dc63f]/10 px-2 py-1 rounded-lg">entreprises</span>.{" "}
              <br className="hidden md:block" />
                          <span className="font-bold text-[#8dc63f]">Dès 299€</span> pour la prise Green'up Legrand ou{" "}
            <span className="font-bold text-[#8dc63f]">699€</span> pour une solution complète.
            </motion.p>
            
            {/* CTA Header moderne */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center"
            >
              <motion.a 
                href="#devis"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-gradient-to-r from-[#8dc63f] to-[#7db52f] text-white font-semibold py-4 px-8 lg:px-10 rounded-full transition-all duration-300 shadow-lg shadow-[#8dc63f]/30 hover:shadow-xl hover:shadow-[#8dc63f]/40"
              >
                <span className="relative z-10 flex items-center">
                  <i className="fas fa-calculator mr-3 text-lg"></i>
                  Devis gratuit en 2 min
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#7db52f] to-[#6ca41e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
              
              <motion.a 
                href="tel:0123456789" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center text-[#003566] hover:text-[#8dc63f] transition-all duration-300 font-semibold bg-white/80 backdrop-blur-sm px-6 py-4 rounded-full border-2 border-[#003566]/20 hover:border-[#8dc63f]/40 hover:bg-[#8dc63f]/5"
              >
                <div className="w-10 h-10 bg-[#003566]/10 rounded-full flex items-center justify-center mr-3 group-hover:bg-[#8dc63f]/20 transition-colors duration-300">
                  <i className="fas fa-phone-alt text-[#003566] group-hover:text-[#8dc63f] transition-colors duration-300"></i>
                </div>
                <span>Appeler un expert</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Solutions Grid moderne et responsive */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20"
          >
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border-0 hover:shadow-2xl transition-all duration-500 h-full relative">
                  {/* Overlay de gradient au hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8dc63f]/5 to-[#003566]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Image avec overlay moderne */}
                  <div className="h-56 lg:h-64 overflow-hidden relative">
                    <img 
                      src={solution.image} 
                      alt={solution.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay gradient sur l'image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
                    {/* Badge de catégorie moderne */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-semibold shadow-lg" style={{ color: solution.color }}>
                      <i className={`${solution.icon} mr-2`}></i>
                      {solution.subtitle}
                    </div>
                    
                    {/* Badge populaire animé */}
                    {solution.popular && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        className="absolute top-4 right-4 bg-gradient-to-r from-[#8dc63f] to-[#7db52f] text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg"
                      >
                        <i className="fas fa-star mr-1 animate-pulse"></i>
                        POPULAIRE
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Contenu de la carte */}
                  <div className="p-6 lg:p-8 flex flex-col relative z-10">
                    <h3 className="text-xl lg:text-2xl font-bold mb-4 text-[#003566] group-hover:text-[#8dc63f] transition-colors duration-300">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm lg:text-base flex-grow leading-relaxed">
                      {solution.description}
                    </p>
                    
                    {/* Features avec design moderne */}
                    <div className="space-y-3 mb-6">
                      {solution.features.map((feature, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-sm lg:text-base"
                        >
                          <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 shadow-sm" style={{ backgroundColor: `${solution.color}15` }}>
                            <i className="fas fa-check text-xs" style={{ color: solution.color }}></i>
                          </div>
                          <span className="font-medium text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Prix avec design moderne */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl mb-6 border border-gray-200/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 font-medium">À partir de</p>
                          <p className="text-2xl lg:text-3xl font-bold" style={{ color: solution.color }}>{solution.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Installation incluse</p>
                          <p className="text-xs font-semibold" style={{ color: solution.color }}>Garantie 2 ans</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* CTA moderne */}
                    <motion.a 
                      href="#devis" 
                      className="mt-auto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-[#8dc63f] to-[#7db52f] hover:from-[#7db52f] hover:to-[#6ca41e] text-white font-semibold py-3 lg:py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#8dc63f]/25 group">
                        <span className="flex items-center justify-center">
                          <i className="fas fa-calculator mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                          Devis gratuit
                        </span>
                      </Button>
                    </motion.a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Section Galerie de Bornes de Recharge */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#003566]">
                Nos <span className="text-[#8dc63f]">bornes de recharge</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez notre gamme complète de bornes de recharge intelligentes et modernes
              </p>
            </div>
            
            {/* Galerie de bornes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-80 overflow-hidden">
                  <img 
                    src={heroRechargeImage1} 
                    alt="Borne de recharge murale intelligente"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-xl font-bold text-[#003566] mb-2">Borne murale intelligente</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Borne de recharge connectée avec gestion intelligente de l'énergie
                    </p>
                                                             <div className="flex items-center justify-between">
                      <span className="text-[#8dc63f] font-bold text-lg">Type : Murale</span>
                      <span className="text-gray-500 text-sm">Installation incluse</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-80 overflow-hidden">
                  <img 
                    src={heroRechargeImage2} 
                    alt="Borne de recharge sur pied"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-xl font-bold text-[#003566] mb-2">Borne sur pied</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Solution idéale pour les parkings extérieurs et espaces publics
                    </p>
                                                             <div className="flex items-center justify-between">
                      <span className="text-[#8dc63f] font-bold text-lg">Type : Sur pied</span>
                      <span className="text-gray-500 text-sm">Installation incluse</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-80 overflow-hidden">
                  <img 
                    src={heroRechargeImage3} 
                    alt="Borne de recharge compacte"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-xl font-bold text-[#003566] mb-2">Borne compacte</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Design compact parfait pour les garages et espaces restreints
                    </p>
                                                             <div className="flex items-center justify-between">
                      <span className="text-[#8dc63f] font-bold text-lg">Type : Compacte</span>
                      <span className="text-gray-500 text-sm">Installation incluse</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-80 overflow-hidden">
                  <img 
                    src={sectionImage1} 
                    alt="Borne de recharge pour copropriété"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-xl font-bold text-[#003566] mb-2">Solution copropriété</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Infrastructure collective avec bornes individuelles connectées
                    </p>
                                                             <div className="flex items-center justify-between">
                      <span className="text-[#8dc63f] font-bold text-lg">Type : Collective</span>
                      <span className="text-gray-500 text-sm">Par place</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-80 overflow-hidden">
                  <img 
                    src={sectionImage13} 
                    alt="Borne de recharge professionnelle"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-xl font-bold text-[#003566] mb-2">Borne professionnelle</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Solution entreprise avec gestion centralisée et facturation
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8dc63f] font-bold text-lg">Type : Professionnelle</span>
                      <span className="text-gray-500 text-sm">Solution sur-mesure</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-80 overflow-hidden">
                  <img 
                    src={sectionImage4} 
                    alt="Prise Green'up Legrand"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-[#8dc63f] text-white px-3 py-1 rounded-full text-sm font-bold">
                    <i className="fas fa-star mr-1"></i>
                    POPULAIRE
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-xl font-bold text-[#003566] mb-2">Prise Green'up</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Solution rapide et économique avec prise renforcée Legrand
                    </p>
                                                             <div className="flex items-center justify-between">
                      <span className="text-[#8dc63f] font-bold text-lg">Type : Prise renforcée</span>
                      <span className="text-gray-500 text-sm">Installation incluse</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* CTA pour les bornes */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#003566]/5 to-[#8dc63f]/5 rounded-2xl p-8 border border-[#003566]/10">
                <h3 className="text-2xl font-bold mb-4 text-[#003566]">Trouvez votre borne idéale</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Nos experts vous aident à choisir la solution parfaite selon vos besoins et votre budget
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#devis">
                    <Button className="bg-gradient-to-r from-[#8dc63f] to-[#7db52f] hover:from-[#7db52f] hover:to-[#6ca41e] text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:translate-y-[-2px] shadow-lg shadow-[#8dc63f]/25">
                      <i className="fas fa-calculator mr-2"></i>
                      Devis personnalisé
                    </Button>
                  </a>
                  <a href="tel:0123456789">
                    <Button variant="outline" className="border-2 border-[#003566] text-[#003566] hover:bg-[#003566] hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300">
                      <i className="fas fa-phone-alt mr-2"></i>
                      Conseiller gratuit
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section Galerie d'images - Solutions en action */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#003566]">
                Nos solutions <span className="text-[#8dc63f]">en action</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez nos installations réelles et nos réalisations sur le terrain
              </p>
            </div>
            
            {/* Galerie d'images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={capture1} 
                  alt="Installation de borne de recharge en copropriété"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">Installation copropriété</h3>
                  <p className="text-white/80 text-sm">Infrastructure collective intelligente</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={capture2} 
                  alt="Borne de recharge individuelle installée"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">Borne individuelle</h3>
                  <p className="text-white/80 text-sm">Solution personnalisée à domicile</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={capture3} 
                  alt="Station de recharge solaire"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">Station solaire</h3>
                  <p className="text-white/80 text-sm">Recharge verte et autonome</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={capture4} 
                  alt="Signature de contrat d'installation"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">Accompagnement</h3>
                  <p className="text-white/80 text-sm">Service client personnalisé</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Section Installation et Processus */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-bold mb-6 border border-[#8dc63f]/20">
                    <i className="fas fa-tools mr-2"></i>
                    PROCESSUS D'INSTALLATION
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#003566] leading-tight">
                    Installation <span className="text-[#8dc63f]">rapide et professionnelle</span>
                  </h3>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Notre équipe d'experts certifiés assure une installation rapide et sécurisée de vos bornes de recharge. 
                    Du diagnostic initial à la mise en service, nous vous accompagnons à chaque étape.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#8dc63f]/20 flex items-center justify-center mr-4 mt-1">
                        <span className="text-[#8dc63f] font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#003566] mb-1">Diagnostic et devis</h4>
                        <p className="text-gray-600 text-sm">Évaluation technique et devis personnalisé en 24h</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#8dc63f]/20 flex items-center justify-center mr-4 mt-1">
                        <span className="text-[#8dc63f] font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#003566] mb-1">Installation</h4>
                        <p className="text-gray-600 text-sm">Installation en 2-24h selon le type de solution</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#8dc63f]/20 flex items-center justify-center mr-4 mt-1">
                        <span className="text-[#8dc63f] font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#003566] mb-1">Mise en service</h4>
                        <p className="text-gray-600 text-sm">Tests et formation à l'utilisation</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <a href="#devis">
                      <Button className="bg-[#8dc63f] hover:bg-[#7ab42f] text-white font-medium py-3 px-6 rounded-full transition-all duration-300 hover:translate-y-[-2px]">
                        <i className="fas fa-calculator mr-2"></i>
                        Devis gratuit
                      </Button>
                    </a>
                    <a href="tel:0123456789" className="inline-flex items-center text-[#003566] hover:text-[#8dc63f] transition-colors">
                      <i className="fas fa-phone-alt mr-2"></i>
                      <span>Parler à un expert</span>
                    </a>
                  </div>
                </div>
                
                <div className="relative bg-[#8dc63f]/5 p-6">
                  <div className="relative flex items-center justify-center h-full overflow-hidden">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#8dc63f]/30 via-[#7db52f]/20 to-[#8dc63f]/30 rounded-lg blur-xl animate-pulse"></div>
                    <img 
                      src={installationImage} 
                      alt="Installation professionnelle de borne de recharge" 
                      className="relative max-w-full h-auto object-contain rounded-lg transform hover:scale-105 transition-transform duration-700"
                      style={{ maxHeight: '400px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section Avantages */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#003566]">
                Pourquoi choisir <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">BorneFlix</span> ?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez les avantages qui font de BorneFlix le leader des solutions IRVE intelligentes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8 bg-white rounded-2xl shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:translate-y-[-5px] group"
                >
                  <div className={`w-20 h-20 bg-gradient-to-r from-${advantage.color}/10 to-${advantage.color === 'secondary' ? 'green-600' : advantage.color === 'primary' ? 'secondary' : 'orange-500'}/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${advantage.icon} text-${advantage.color} text-3xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#003566] group-hover:text-secondary transition-colors">{advantage.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {advantage.description}
                  </p>
                  <div className={`bg-gradient-to-r from-${advantage.color}/5 to-${advantage.color === 'secondary' ? 'green-600' : advantage.color === 'primary' ? 'secondary' : 'orange-500'}/5 p-4 rounded-xl`}>
                    <p className="text-sm text-gray-600">Temps d'installation</p>
                    <p className="text-2xl font-bold text-secondary">{advantage.metric}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section Fonctionnalités */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#003566]">
                Fonctionnalités <span className="text-[#8dc63f]">intelligentes</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez les technologies qui rendent nos solutions uniques
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg border-l-4 overflow-hidden"
                  style={{ borderLeftColor: feature.borderColor }}
                >
                  <div className="h-32 mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: `${feature.borderColor}20` }}>
                      <i className={`${feature.icon} text-xl`} style={{ color: feature.borderColor }}></i>
                    </div>
                    <h3 className="text-lg font-bold text-[#003566]">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
              <h3 className="text-2xl font-bold mb-4 text-[#003566]">Prêt à commencer ?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Rejoignez les milliers de clients satisfaits qui ont choisi BorneFlix pour leurs solutions IRVE intelligentes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#devis">
                  <Button className="bg-gradient-to-r from-secondary to-green-600 hover:from-green-600 hover:to-secondary text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:translate-y-[-2px] shadow-lg shadow-green-500/25">
                    <i className="fas fa-calculator mr-2"></i>
                    Devis gratuit en 2 min
                  </Button>
                </a>
                <a href="tel:0123456789">
                  <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300">
                    <i className="fas fa-phone-alt mr-2"></i>
                    Appeler un expert
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages visuels */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#003566]/5 to-[#8dc63f]/5">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#003566]">
              Nos <span className="text-[#8dc63f]">réalisations</span> en images
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez la qualité de nos installations et la satisfaction de nos clients
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={stationSolaireImage} 
                    alt="Station de recharge solaire BorneFlix"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#003566] mb-2">Station solaire</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Installation de station de recharge alimentée par panneaux solaires pour une solution 100% verte.
                  </p>
                  <div className="flex items-center text-[#8dc63f] text-sm font-medium">
                    <i className="fas fa-leaf mr-2"></i>
                    Solution écologique
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={signatureContratImage} 
                    alt="Signature de contrat BorneFlix"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#003566] mb-2">Accompagnement client</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Notre équipe vous accompagne de la signature du contrat jusqu'à la mise en service.
                  </p>
                  <div className="flex items-center text-[#8dc63f] text-sm font-medium">
                    <i className="fas fa-handshake mr-2"></i>
                    Service personnalisé
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={rechargeImage3} 
                    alt="Borne de recharge moderne"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#003566] mb-2">Technologie moderne</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Bornes de recharge intelligentes avec connectivité et gestion optimisée de l'énergie.
                  </p>
                  <div className="flex items-center text-[#8dc63f] text-sm font-medium">
                    <i className="fas fa-bolt mr-2"></i>
                    Recharge intelligente
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-[#003566] to-[#1a4d85]">
        <CTA />
      </section>
    </main>
    </>
  );
};

export default SolutionsPage; 