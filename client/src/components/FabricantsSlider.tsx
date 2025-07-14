import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FabricantsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const fabricants = [
    {
      name: "Smappee",
      logo: "SMAPPEE",
      color: "bg-blue-600",
      description: "Bornes intelligentes connectées"
    },
    {
      name: "ElecQ",
      logo: "ELECQ",
      color: "bg-green-600", 
      description: "Solutions de recharge avancées"
    },
    {
      name: "Autel Energy",
      logo: "AUTEL",
      color: "bg-purple-600",
      description: "Bornes ultra-rapides"
    },
    {
      name: "Legrand",
      logo: "LEGRAND",
      color: "bg-orange-600",
      description: "Infrastructure électrique premium"
    },
    {
      name: "Schneider Electric",
      logo: "SCHNEIDER",
      color: "bg-red-600",
      description: "Solutions énergétiques intelligentes"
    },
    {
      name: "Siemens",
      logo: "SIEMENS",
      color: "bg-gray-700",
      description: "Technologie allemande de pointe"
    },
    {
      name: "ABB",
      logo: "ABB",
      color: "bg-indigo-600",
      description: "Bornes haute puissance"
    },
    {
      name: "Wallbox",
      logo: "WALLBOX",
      color: "bg-teal-600",
      description: "Design et performance"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fabricants.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [fabricants.length]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" 
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {fabricants.map((fabricant, index) => (
          <div key={index} className="w-full flex-shrink-0 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center group"
            >
              <div className="relative">
                <div className={`${fabricant.color} text-white w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-xl group-hover:shadow-2xl`}>
                  <span className="text-2xl font-bold">{fabricant.logo}</span>
                </div>
                
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#8dc63f] rounded-full flex items-center justify-center">
                  <i className="fas fa-star text-white text-sm"></i>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-[#003566] mb-2">{fabricant.name}</h3>
              <p className="text-gray-600">{fabricant.description}</p>
            </motion.div>
          </div>
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {fabricants.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-[#8dc63f]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + fabricants.length) % fabricants.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-300"
      >
        <i className="fas fa-chevron-left text-[#003566]"></i>
      </button>
      
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % fabricants.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-300"
      >
        <i className="fas fa-chevron-right text-[#003566]"></i>
      </button>
    </div>
  );
};

export default FabricantsSlider; 