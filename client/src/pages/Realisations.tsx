import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Star, MapPin, Calendar, Users, Award } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const RealisationsPage = () => {
  // Données des installations
  const installations = [
    {
      id: 1,
      title: "Station solaire intégrée",
      description: "Infrastructure de recharge alimentée par énergie solaire",
      location: "Résidence Le Parc Soleil, Montpellier",
      image: "/images/gallery/pexels-kindelmedia-9800030.jpg",
      type: "Infrastructure collective",
      power: "22kW",
      date: "2024"
    },
    {
      id: 2,
      title: "Suivi de projet professionnel",
      description: "Expertise technique et accompagnement personnalisé",
      location: "Siège BorneFlix, Paris",
      image: "/images/gallery/images-13.png",
      type: "Accompagnement",
      power: "N/A",
      date: "2024"
    },
    {
      id: 3,
      title: "Borne Roulez Électrique",
      description: "Solution de recharge rapide pour copropriétés",
      location: "Résidence Les Jardins, Lyon",
      image: "/images/gallery/images-4.png",
      type: "Borne individuelle",
      power: "7.4kW",
      date: "2024"
    },
    {
      id: 4,
      title: "Gestion administrative complète",
      description: "Accompagnement complet dans les démarches",
      location: "Cabinet Martin & Associés, Paris",
      image: "/images/gallery/images-1.png",
      type: "Services",
      power: "N/A",
      date: "2024"
    },
    {
      id: 5,
      title: "Expérience utilisateur optimisée",
      description: "Interface intuitive et système sécurisé",
      location: "Résidence Les Cèdres, Bordeaux",
      image: "/images/hero/recharge-img01.jpeg",
      type: "Borne connectée",
      power: "11kW",
      date: "2024"
    },
    {
      id: 6,
      title: "Solution collective moderne",
      description: "Équipement pour parking souterrain",
      location: "Résidence Grand Angle, Lille",
      image: "/images/gallery/recharge-img02.jpeg",
      type: "Infrastructure collective",
      power: "22kW",
      date: "2024"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Claire Moreau",
      position: "Présidente de copropriété",
      company: "Résidence Le Parc Soleil",
      text: "Nous avons installé une solution collective avec BorneFlix dans notre immeuble. Très bon accompagnement, présentation claire en AG, et aucun stress pour la gestion des démarches. L'équipe est professionnelle et réactive.",
      rating: 5,
      image: "/images/user.png"
    },
    {
      id: 2,
      name: "Yassine El Amrani",
      position: "Gestionnaire de copropriétés",
      company: "Syndic Plus",
      text: "BorneFlix nous fait gagner un temps précieux. Ils s'occupent de tout : étude, installation, relation avec les copropriétaires... Un vrai service clé en main que je recommande vivement à tous mes clients.",
      rating: 5,
      image: "/images/user.png"
    },
    {
      id: 3,
      name: "Rania Fantar",
      position: "Propriétaire de véhicule électrique",
      company: "Résidence Les Cèdres",
      text: "Je suis pleinement satisfait de l'installation de ma borne de recharge pour V.E par BorneFlix. L'équipe a fait preuve d'un grand professionnalisme du début à la fin. Installation rapide et propre.",
      rating: 5,
      image: "/images/user.png"
    },
    {
      id: 4,
      name: "Marc Dubois",
      position: "Syndic bénévole",
      company: "Résidence Grand Angle",
      text: "Excellent travail de BorneFlix pour notre infrastructure collective. Le projet a été mené à bien dans les délais annoncés. Les copropriétaires sont ravis de pouvoir recharger leurs véhicules électriques.",
      rating: 5,
      image: "/images/user.png"
    }
  ];

  const stats = [
    { number: "150+", label: "Installations réalisées", icon: Award },
    { number: "98%", label: "Clients satisfaits", icon: Star },
    { number: "24h", label: "Temps de réponse moyen", icon: Calendar },
    { number: "50+", label: "Copropriétés équipées", icon: Users }
  ];

  return (
    <>
      <SEOHead
        title="Réalisations BorneFlix - Installations Bornes Recharge IRVE | Galerie Projets"
        description="Découvrez nos réalisations : plus de 2500 bornes installées, 150 copropriétés équipées. Galerie photos de nos installations IRVE réussies partout en France. Témoignages clients satisfaits."
        keywords="réalisations BorneFlix, installations bornes recharge, galerie projets IRVE, copropriétés équipées, exemples installations, témoignages clients, BorneFlix"
        url="https://borneflix.fr/realisations"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Réalisations BorneFlix",
          "description": "Galerie des réalisations et installations de bornes de recharge IRVE par BorneFlix",
          "url": "https://borneflix.fr/realisations",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Réalisations BorneFlix",
            "description": "Liste des installations de bornes de recharge IRVE réalisées par BorneFlix",
            "numberOfItems": 6,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Service",
                  "name": "Station solaire intégrée",
                  "description": "Infrastructure de recharge alimentée par énergie solaire"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Service",
                  "name": "Borne Roulez Électrique",
                  "description": "Solution de recharge rapide pour copropriétés"
                }
              }
            ]
          }
        }}
      />

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
                Nos Réalisations
                <span className="block text-[#003566]">& Témoignages</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
                Découvrez nos installations et l'expérience 
                <br className="hidden md:block" />
                de nos clients satisfaits
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#003566] hover:bg-[#00264d] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => document.getElementById('installations')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Voir nos installations
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-[#ff6b35]"
                  onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Lire les témoignages
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          {/* Éléments décoratifs */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#003566]/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#003566]/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
        </section>

        {/* Stats Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-[#003566] mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Installations Section */}
        <section id="installations" className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#003566] mb-4">
                Nos Installations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez nos réalisations dans toute la France, de la copropriété 
                aux entreprises, en passant par les parkings publics
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {installations.map((installation, index) => (
                <motion.div
                  key={installation.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={installation.image} 
                      alt={installation.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 bg-[#ff6b35] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {installation.type}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center text-white text-sm mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {installation.location}
                      </div>
                      <div className="flex items-center text-white text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {installation.date}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#003566] mb-2">{installation.title}</h3>
                    <p className="text-gray-600 mb-4">{installation.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#8dc63f] font-medium">{installation.location}</span>
                      {installation.power !== "N/A" && (
                        <span className="text-sm bg-[#003566]/10 text-[#003566] px-2 py-1 rounded-full">
                          {installation.power}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#003566] mb-4">
                Témoignages Clients
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ce que disent nos clients satisfaits de leur expérience BorneFlix
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-[#003566]">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                      <p className="text-sm text-[#8dc63f] font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#003566] mb-4">
                Nos Partenaires
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Des partenaires de confiance pour des solutions de qualité
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {[
                { name: "IRVE Certifié", logo: "🔌", color: "text-blue-600" },
                { name: "ADVENIR", logo: "⚡", color: "text-green-600" },
                { name: "QualiPac", logo: "🏆", color: "text-yellow-600" },
                { name: "RGE", logo: "🌱", color: "text-emerald-600" },
                { name: "ISO 9001", logo: "📋", color: "text-purple-600" },
                { name: "Garantie 2 ans", logo: "🛡️", color: "text-red-600" }
              ].map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className={`text-4xl mb-2 group-hover:scale-110 transition-transform duration-300 ${partner.color}`}>
                    {partner.logo}
                  </div>
                  <div className="text-sm font-medium text-[#003566]">{partner.name}</div>
                </motion.div>
              ))}
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
    </>
  );
};

export default RealisationsPage; 