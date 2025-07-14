import NewHeroSection from '@/components/NewHeroSection';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card-unified';
import { Button } from '@/components/ui/button-unified';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Users, Award, Phone, Calculator, ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';
import FabricantsSlider from '@/components/FabricantsSlider';
import AppointmentScheduler from '@/components/AppointmentScheduler';
// Import des images
import borneRecharge from '@/assets/images/reelles/borne-recharge.webp';
import installation from '@/assets/images/reelles/EV_Ultra-white.webp';
import stationSolaire from '@/assets/images/reelles/station-solaire.jpg';
import signatureContrat from '@/assets/images/reelles/signature-contrat.jpg';
import images1 from '@/assets/images/reelles/real.webp';
import images4 from '@/assets/images/reelles/images-4.png';
import images13 from '@/assets/images/reelles/images-13.png';
import newsletterImg from '@/assets/images/gallery/image-newsletter-ok.jpeg';
import galleryImg1 from '@/assets/images/gallery/recharge-img01.jpeg';
import galleryImg2 from '@/assets/images/gallery/recharge-img02.jpeg';
import galleryImg3 from '@/assets/images/gallery/recharge-img03.jpeg';

const Home = () => {
  return (
    <>
      <SEOHead
        title="BorneFlix - Leader Installation Bornes Recharge IRVE Copropriétés | Devis Gratuit 24h"
        description="BorneFlix, leader français de l'installation de bornes de recharge IRVE pour copropriétés. Installation en 24h, économies jusqu'à 50%, maintenance incluse, aides ADVENIR. Plus de 2500 bornes installées. Devis gratuit immédiat."
        keywords="bornes de recharge IRVE, BorneFlix, installation bornes électriques copropriété, véhicule électrique, IRVE certifié, infrastructure collective recharge, solution recharge VE, ADVENIR aides, droit à la prise, installation rapide 24h, économies énergie 50%, maintenance incluse, leader français"
        url="https://borneflix.fr"
        type="service"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "BorneFlix",
          "description": "Leader français de l'installation de bornes de recharge IRVE pour copropriétés",
          "url": "https://borneflix.fr",
          "telephone": "+33-1-80-91-90-80",
          "email": "contact@borneflix.fr",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "3 Av. des Orangers",
            "addressLocality": "Bonneuil-sur-Marne",
            "postalCode": "94380",
            "addressCountry": "FR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 48.7749,
            "longitude": 2.4897
          },
          "openingHours": "Mo-Fr 09:00-18:00",
          "priceRange": "€€",
          "serviceArea": {
            "@type": "Country",
            "name": "France"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Services BorneFlix",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Installation de bornes de recharge IRVE",
                  "description": "Installation de bornes de recharge IRVE pour copropriétés avec certification et garantie"
                }
              }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "150"
          }
        }}
      />
      
      {/* Hero Section */}
      <NewHeroSection />
      
      {/* Solutions Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-medium mb-4 md:mb-6">
              <Zap className="w-4 h-4 mr-2" />
              NOS SOLUTIONS
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#003566] mb-4 md:mb-6 leading-tight">
              Solutions IRVE <span className="text-[#8dc63f]">intelligentes</span> pour copropriétés
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des bornes de recharge connectées et optimisées, installation rapide en 24h, 
              maintenance incluse et économies garanties sur votre facture d'énergie.
            </p>
          </motion.div>
          
          {/* Image principale des solutions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 md:mb-16"
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={borneRecharge} 
                alt="Borne de recharge BorneFlix installée en copropriété" 
                className="w-full h-48 md:h-64 lg:h-80 xl:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003566]/80 via-[#003566]/20 to-transparent"></div>
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">Installation professionnelle</h3>
                <p className="text-sm md:text-base text-white/90">Bornes certifiées IRVE installées par nos experts</p>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
                title: "Bornes Intelligentes",
                description: "Bornes connectées avec gestion intelligente de la charge et optimisation des coûts",
                features: ["Gestion intelligente", "Optimisation coûts", "Monitoring temps réel"],
                color: "bg-[#8dc63f]"
              },
              {
                icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />,
                title: "Installation Sécurisée",
                description: "Installation certifiée IRVE avec garantie et maintenance incluse",
                features: ["Certification IRVE", "Garantie 2 ans", "Maintenance incluse"],
                color: "bg-[#003566]"
              },
              {
                icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />,
                title: "Économies Garanties",
                description: "Réduction jusqu'à 50% sur votre facture d'énergie grâce aux aides",
                features: ["Aides financières", "ROI optimisé", "Économies long terme"],
                color: "bg-[#ff6b35]"
              }
            ].map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-6 md:p-8">
                    <div className={`${solution.color} text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {solution.icon}
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center text-[#003566]">
                      {solution.title}
                    </h3>
                    
                    <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 text-center leading-relaxed">
                      {solution.description}
                    </p>
                    
                    <div className="space-y-2 md:space-y-3">
                      {solution.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm md:text-base text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#8dc63f] mr-3 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12 md:mt-16"
          >
            <Button 
              size="lg"
              className="bg-[#8dc63f] hover:bg-[#7db52f] text-white px-8 py-3 text-base md:text-lg"
              onClick={() => window.location.href = '/solutions'}
            >
              Découvrir toutes nos solutions
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Avantages Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center bg-[#003566]/10 text-[#003566] px-4 py-2 rounded-full text-sm font-medium mb-4 md:mb-6">
              <Award className="w-4 h-4 mr-2" />
              POURQUOI NOUS CHOISIR
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#003566] mb-4 md:mb-6 leading-tight">
              L'expertise <span className="text-[#8dc63f]">reconnue</span> en recharge IRVE
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Plus de 2500 bornes installées, 150 copropriétés équipées et 98% de clients satisfaits. 
              Notre expertise fait de nous le leader français de la recharge en copropriété.
            </p>
          </motion.div>
          
          {/* Image d'installation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 md:mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
                <img 
                  src={installation} 
                  alt="Installation de borne de recharge par nos équipes" 
                  className="w-full h-48 md:h-64 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8dc63f]/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-base md:text-lg font-bold">Installation rapide en 24h</h3>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#003566] mb-6 md:mb-8">Notre expertise en chiffres</h3>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {[
                    { number: "+2500", label: "Bornes installées", icon: <Zap className="w-5 h-5 md:w-6 md:h-6" /> },
                    { number: "+150", label: "Copropriétés équipées", icon: <Users className="w-5 h-5 md:w-6 md:h-6" /> },
                    { number: "98%", label: "Clients satisfaits", icon: <Star className="w-5 h-5 md:w-6 md:h-6" /> },
                    { number: "24h", label: "Installation moyenne", icon: <Award className="w-5 h-5 md:w-6 md:h-6" /> }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-[#8dc63f]/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                          <div className="text-[#8dc63f]">
                            {stat.icon}
                          </div>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-[#003566] mb-1 md:mb-2">{stat.number}</div>
                        <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Partenaires Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center bg-[#ff6b35]/10 text-[#ff6b35] px-4 py-2 rounded-full text-sm font-medium mb-4 md:mb-6">
              <Shield className="w-4 h-4 mr-2" />
              NOS PARTENAIRES
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#003566] mb-4 md:mb-6 leading-tight">
              Certifications et <span className="text-[#8dc63f]">partenaires</span> de confiance
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Partenaires officiels des principales aides financières et certifications IRVE 
              pour garantir la qualité et la conformité de nos installations.
            </p>
          </motion.div>
          
          {/* Logos Partenaires - Carrousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 md:mb-16"
          >
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold text-[#003566] mb-6 md:mb-8 text-center">
                Nos partenaires officiels
              </h3>
              
              {/* Grille de logos */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8 items-center">
                {[
                  {
                    name: "ADVENIR",
                    description: "Programme d'aide à la recharge",
                    icon: "fas fa-euro-sign",
                    color: "bg-blue-500"
                  },
                  {
                    name: "IRVE Certifié",
                    description: "Installation certifiée",
                    icon: "fas fa-certificate",
                    color: "bg-green-500"
                  },
                  {
                    name: "QualiPac",
                    description: "Qualification professionnelle",
                    icon: "fas fa-award",
                    color: "bg-purple-500"
                  },
                  {
                    name: "RGE",
                    description: "Reconnu Garant de l'Environnement",
                    icon: "fas fa-leaf",
                    color: "bg-emerald-500"
                  },
                  {
                    name: "ISO 9001",
                    description: "Management qualité",
                    icon: "fas fa-shield-alt",
                    color: "bg-orange-500"
                  },
                  {
                    name: "Garantie 2 ans",
                    description: "Maintenance incluse",
                    icon: "fas fa-tools",
                    color: "bg-red-500"
                  }
                ].map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="relative">
                      {/* Logo container */}
                      <div className={`${partner.color} text-white w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                        <i className={`${partner.icon} text-xl md:text-2xl`}></i>
                      </div>
                      
                      {/* Badge de certification */}
                      <div className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-[#8dc63f] rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                    </div>
                    
                    <div className="text-xs md:text-sm font-bold text-[#003566] mb-1">{partner.name}</div>
                    <div className="text-xs text-gray-500">{partner.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Certifications détaillées */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Certification IRVE",
                description: "Installation certifiée selon les normes en vigueur",
                features: ["Conformité réglementaire", "Sécurité garantie", "Performance optimale"],
                icon: "fas fa-certificate",
                color: "bg-green-500"
              },
              {
                title: "Aides Financières",
                description: "Accompagnement complet pour les subventions",
                features: ["ADVENIR", "CEE", "Fonds européens", "Aides locales"],
                icon: "fas fa-euro-sign",
                color: "bg-blue-500"
              },
              {
                title: "Garantie Qualité",
                description: "Engagement sur la qualité et la durabilité",
                features: ["Garantie 2 ans", "Maintenance incluse", "SAV réactif", "Pièces détachées"],
                icon: "fas fa-shield-alt",
                color: "bg-orange-500"
              }
            ].map((certification, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className={`${certification.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${certification.icon} text-xl`}></i>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#003566] mb-3 text-center">
                    {certification.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-center text-sm">
                    {certification.description}
                  </p>
                  
                  <div className="space-y-2">
                    {certification.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#8dc63f] mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
          
          {/* CTA Partenaires */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-[#003566] to-[#1a4d85] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Faites confiance à nos certifications
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Nos partenariats et certifications garantissent la qualité de nos installations 
                et vous donnent accès aux meilleures aides financières disponibles.
              </p>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#003566]"
                onClick={() => window.location.href = '/avantages'}
              >
                Découvrir nos garanties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Fabricants Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-medium mb-4 md:mb-6">
              <Star className="w-4 h-4 mr-2" />
              NOS FABRICANTS
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#003566] mb-4 md:mb-6 leading-tight">
              Bornes de recharge <span className="text-[#8dc63f]">premium</span> des leaders du marché
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nous travaillons exclusivement avec les meilleurs fabricants européens 
              pour garantir des bornes de recharge fiables, performantes et durables.
            </p>
          </motion.div>
          
          {/* Slider Fabricants */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 md:mb-16"
          >
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl border border-gray-100">
              <h3 className="text-lg md:text-xl font-semibold text-[#003566] mb-6 md:mb-8 text-center">
                Nos fabricants partenaires
              </h3>
              
              <FabricantsSlider />
            </div>
          </motion.div>
          
          {/* Avantages Fabricants */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Qualité Premium",
                description: "Bornes certifiées et testées",
                icon: "fas fa-award",
                color: "bg-[#8dc63f]"
              },
              {
                title: "Garantie Étendue",
                description: "2 à 5 ans selon les fabricants",
                icon: "fas fa-shield-alt",
                color: "bg-[#003566]"
              },
              {
                title: "SAV Réactif",
                description: "Support technique dédié",
                icon: "fas fa-headset",
                color: "bg-[#ff6b35]"
              }
            ].map((avantage, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className={`${avantage.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${avantage.icon} text-xl`}></i>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#003566] mb-3">
                    {avantage.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">
                    {avantage.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Avis Clients Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#003566] to-[#1a4d85] text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 md:mb-6">
              <Users className="w-4 h-4 mr-2" />
              TÉMOIGNAGES CLIENTS
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Ce que disent nos <span className="text-[#8dc63f]">clients</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Découvrez les retours d'expérience de nos clients satisfaits 
              qui ont transformé leur copropriété avec nos solutions.
            </p>
          </motion.div>
          
          {/* Image de réalisation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 md:mb-16"
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={images1} 
                alt="Réalisation BorneFlix - Installation de bornes en copropriété" 
                className="w-full h-48 md:h-64 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003566]/90 to-transparent"></div>
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2">Nos réalisations</h3>
                <p className="text-sm md:text-base text-white/90">Découvrez nos installations et témoignages clients</p>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Marie L.",
                role: "Présidente de copropriété",
                content: "Installation rapide et professionnelle. Nos résidents sont ravis de pouvoir recharger leurs véhicules facilement.",
                rating: 5,
                image: images4
              },
              {
                name: "Pierre D.",
                role: "Syndic",
                content: "BorneFlix a su nous accompagner de A à Z. L'équipe est réactive et les économies sont au rendez-vous.",
                rating: 5,
                image: images13
              },
              {
                name: "Sophie M.",
                role: "Propriétaire",
                content: "Excellent rapport qualité-prix. La maintenance est incluse et le service client est impeccable.",
                rating: 5,
                image: signatureContrat
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
                  <div className="relative h-32 mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={`Témoignage ${testimonial.name}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#003566]/60 to-transparent"></div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#8dc63f] fill-current" />
                      ))}
                    </div>
                    <p className="text-white/90 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-white/70 text-sm">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Devis Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-medium mb-4 md:mb-6">
              <Calculator className="w-4 h-4 mr-2" />
              DEVIS GRATUIT
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#003566] mb-4 md:mb-6 leading-tight">
              Obtenez votre <span className="text-[#8dc63f]">devis personnalisé</span> en 2 minutes
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Formulaire simple et rapide pour recevoir une estimation précise 
              de votre projet d'installation de bornes de recharge.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
              {/* Image de station solaire */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1"
              >
                <img 
                  src={stationSolaire} 
                  alt="Station de recharge solaire BorneFlix" 
                  className="w-full h-48 md:h-64 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003566]/60 to-transparent"></div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Solutions durables</h3>
                  <p className="text-sm md:text-base text-white/90">Recharge intelligente et écologique</p>
                </div>
              </motion.div>
              
              {/* Carte devis */}
              <Card className="bg-gradient-to-br from-[#003566] to-[#1a4d85] text-white border-0 shadow-2xl order-1 lg:order-2">
                <CardContent className="p-6 md:p-8 lg:p-12">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Devis gratuit et sans engagement</h3>
                    <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                      <li className="flex items-center text-sm md:text-base">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#8dc63f] mr-3 flex-shrink-0" />
                        Étude technique personnalisée
                      </li>
                      <li className="flex items-center text-sm md:text-base">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#8dc63f] mr-3 flex-shrink-0" />
                        Estimation précise des coûts
                      </li>
                      <li className="flex items-center text-sm md:text-base">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#8dc63f] mr-3 flex-shrink-0" />
                        Accompagnement aux aides financières
                      </li>
                      <li className="flex items-center text-sm md:text-base">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#8dc63f] mr-3 flex-shrink-0" />
                        Réponse sous 24h
                      </li>
                    </ul>
                    
                    <div className="text-center">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                        <Calculator className="w-12 h-12 md:w-16 md:h-16 text-[#8dc63f] mx-auto mb-3 md:mb-4" />
                        <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">2 minutes</div>
                        <div className="text-sm md:text-base text-white/80 mb-4 md:mb-6">pour obtenir votre devis</div>
                        <Button 
                          size="lg"
                          className="bg-[#8dc63f] hover:bg-[#7db52f] text-white w-full px-6 py-3 text-base md:text-lg"
                          onClick={() => window.location.href = '/devis'}
                        >
                          Commencer maintenant
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center bg-[#ff6b35]/10 text-[#ff6b35] px-4 py-2 rounded-full text-sm font-medium mb-4 md:mb-6">
              <Phone className="w-4 h-4 mr-2" />
              CONTACT
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#003566] mb-4 md:mb-6 leading-tight">
              Parlez à nos <span className="text-[#8dc63f]">experts</span> BorneFlix
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Notre équipe d'experts est disponible pour répondre à toutes vos questions 
              et vous accompagner dans votre projet de recharge électrique.
            </p>
          </motion.div>
          
          {/* Galerie d'images */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 md:mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                <img 
                  src={galleryImg1} 
                  alt="Installation BorneFlix - Recharge électrique" 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003566]/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold">Installation professionnelle</h4>
                </div>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                <img 
                  src={galleryImg2} 
                  alt="Borne de recharge connectée" 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8dc63f]/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold">Technologie connectée</h4>
                </div>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                <img 
                  src={galleryImg3} 
                  alt="Solution de recharge intelligente" 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#ff6b35]/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold">Recharge intelligente</h4>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Téléphone",
                content: "01 23 45 67 89",
                description: "Lun-Ven 9h-18h",
                action: "Appeler maintenant"
              },
              {
                icon: <Calculator className="w-8 h-8" />,
                title: "Devis en ligne",
                content: "Formulaire rapide",
                description: "Réponse sous 24h",
                action: "Demander un devis"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Rendez-vous",
                content: "Visite technique",
                description: "Gratuit et sans engagement",
                action: "Prendre RDV",
                customAction: true
              }
            ].map((contact, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#8dc63f]/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <div className="text-[#8dc63f]">
                      {contact.icon}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-[#003566]">{contact.title}</h3>
                  <div className="text-base md:text-lg font-semibold mb-2">{contact.content}</div>
                  <div className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">{contact.description}</div>
                  {contact.customAction ? (
                    <AppointmentScheduler />
                  ) : (
                    <Button 
                      variant="outline"
                      className="border-[#003566] text-[#003566] hover:bg-[#003566] hover:text-white"
                      onClick={() => window.location.href = '/contact'}
                    >
                      {contact.action}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#003566] to-[#1a4d85] text-white relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src={newsletterImg} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Prêt à équiper votre copropriété ?
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Rejoignez les centaines de copropriétés qui ont déjà choisi BorneFlix 
              pour leur installation de bornes de recharge intelligentes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 md:mb-12">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-[#8dc63f] hover:bg-[#7db52f] text-white px-6 py-3 text-base md:text-lg"
                onClick={() => window.location.href = '/devis'}
              >
                <Calculator className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Commencer maintenant
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#003566] px-6 py-3 text-base md:text-lg"
                onClick={() => window.location.href = '/contact'}
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Parler à un expert
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#8dc63f] mb-1 md:mb-2">24h</div>
                <div className="text-xs md:text-sm opacity-90">Installation moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#8dc63f] mb-1 md:mb-2">-50%</div>
                <div className="text-xs md:text-sm opacity-90">Sur votre facture d'énergie</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#8dc63f] mb-1 md:mb-2">98%</div>
                <div className="text-xs md:text-sm opacity-90">Clients satisfaits</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
