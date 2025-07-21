import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Shield, Zap, CheckCircle } from 'lucide-react';

const FabricantsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const fabricants = [
    {
      name: "Smappee",
      logo: "SMAPPEE",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      description: "Bornes intelligentes connectées",
      features: ["Monitoring énergétique", "Facturation automatique", "API ouverte"],
      rating: 4.8,
      certified: true,
      warranty: "3 ans",
      powerRange: "3.7 - 22 kW"
    },
    {
      name: "ElecQ",
      logo: "ELECQ",
      color: "bg-gradient-to-br from-green-500 to-green-700", 
      description: "Solutions de recharge avancées",
      features: ["Recharge bidirectionnelle", "Gestion intelligente", "Interface tactile"],
      rating: 4.9,
      certified: true,
      warranty: "5 ans",
      powerRange: "7.4 - 50 kW"
    },
    {
      name: "Autel Energy",
      logo: "AUTEL",
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
      description: "Bornes ultra-rapides",
      features: ["Recharge ultra-rapide", "Design compact", "Connectivité 4G"],
      rating: 4.7,
      certified: true,
      warranty: "4 ans",
      powerRange: "11 - 150 kW"
    },
    {
      name: "Legrand",
      logo: "LEGRAND",
      color: "bg-gradient-to-br from-orange-500 to-orange-700",
      description: "Infrastructure électrique premium",
      features: ["Qualité industrielle", "Installation facile", "Maintenance simplifiée"],
      rating: 4.9,
      certified: true,
      warranty: "5 ans",
      powerRange: "3.7 - 22 kW"
    },
    {
      name: "Schneider Electric",
      logo: "SCHNEIDER",
      color: "bg-gradient-to-br from-red-500 to-red-700",
      description: "Solutions énergétiques intelligentes",
      features: ["EcoStruxure", "Gestion centralisée", "Optimisation énergétique"],
      rating: 4.8,
      certified: true,
      warranty: "5 ans",
      powerRange: "7.4 - 50 kW"
    },
    {
      name: "Siemens",
      logo: "SIEMENS",
      color: "bg-gradient-to-br from-gray-600 to-gray-800",
      description: "Technologie allemande de pointe",
      features: ["Made in Germany", "Haute fiabilité", "Performance optimale"],
      rating: 4.9,
      certified: true,
      warranty: "5 ans",
      powerRange: "11 - 150 kW"
    },
    {
      name: "ABB",
      logo: "ABB",
      color: "bg-gradient-to-br from-indigo-500 to-indigo-700",
      description: "Bornes haute puissance",
      features: ["Terra HP", "Recharge ultra-rapide", "Technologie CCS"],
      rating: 4.8,
      certified: true,
      warranty: "4 ans",
      powerRange: "50 - 350 kW"
    },
    {
      name: "Wallbox",
      logo: "WALLBOX",
      color: "bg-gradient-to-br from-teal-500 to-teal-700",
      description: "Design et performance",
      features: ["Design scandinave", "App mobile intuitive", "Installation rapide"],
      rating: 4.7,
      certified: true,
      warranty: "3 ans",
      powerRange: "3.7 - 22 kW"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fabricants.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [fabricants.length]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4 mr-2" />
            FABRICANTS PARTENAIRES
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003566] mb-4">
            Les meilleurs <span className="text-[#8dc63f]">fabricants</span> du marché
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous travaillons exclusivement avec des fabricants certifiés IRVE 
            pour garantir qualité, fiabilité et performance.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div className="flex transition-transform duration-700 ease-in-out" 
                 style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {fabricants.map((fabricant, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Logo et infos principales */}
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center lg:text-left"
                      >
                        <div className="relative inline-block mb-6">
                          <div className={`${fabricant.color} text-white w-32 h-32 rounded-3xl flex items-center justify-center mx-auto lg:mx-0 group-hover:scale-110 transition-all duration-300 shadow-xl group-hover:shadow-2xl`}>
                            <span className="text-2xl font-bold">{fabricant.logo}</span>
                          </div>
                          
                          {fabricant.certified && (
                            <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#8dc63f] rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-[#003566] mb-2">{fabricant.name}</h3>
                        <p className="text-gray-600 mb-4">{fabricant.description}</p>
                        
                        {/* Rating */}
                        <div className="flex items-center justify-center lg:justify-start mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-5 h-5 ${i < Math.floor(fabricant.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">({fabricant.rating})</span>
                          </div>
                        </div>

                        {/* Caractéristiques */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-sm text-gray-500">Garantie</div>
                            <div className="font-semibold text-[#003566]">{fabricant.warranty}</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-sm text-gray-500">Puissance</div>
                            <div className="font-semibold text-[#003566]">{fabricant.powerRange}</div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Features */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-4"
                      >
                        <h4 className="text-lg font-semibold text-[#003566] mb-4">Points forts</h4>
                        {fabricant.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#8dc63f] rounded-full"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                        
                        <div className="mt-6 p-4 bg-[#8dc63f]/10 rounded-lg border border-[#8dc63f]/20">
                          <div className="flex items-center space-x-2 text-[#8dc63f]">
                            <Shield className="w-5 h-5" />
                            <span className="font-medium">Certifié IRVE</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Conforme aux normes françaises et européennes
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {fabricants.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#8dc63f] scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + fabricants.length) % fabricants.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <ChevronLeft className="w-6 h-6 text-[#003566]" />
          </button>
          
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % fabricants.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <ChevronRight className="w-6 h-6 text-[#003566]" />
          </button>
        </div>

        {/* Avantages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Qualité Premium",
              description: "Tous nos fabricants sont certifiés IRVE et respectent les plus hauts standards de qualité",
              icon: Award,
              color: "bg-[#8dc63f]"
            },
            {
              title: "Garantie Étendue",
              description: "Garanties de 3 à 5 ans selon les fabricants, avec extension possible",
              icon: Shield,
              color: "bg-[#003566]"
            },
            {
              title: "SAV Réactif",
              description: "Support technique dédié et pièces détachées disponibles rapidement",
              icon: Zap,
              color: "bg-[#ff6b35]"
            }
          ].map((avantage, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className={`${avantage.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <avantage.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-lg font-bold text-[#003566] mb-3 text-center">
                {avantage.title}
              </h3>
              
              <p className="text-gray-600 text-sm text-center">
                {avantage.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FabricantsSlider; 