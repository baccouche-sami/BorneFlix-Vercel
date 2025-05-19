import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PartnerLogos from './PartnerLogos';
import userImage from '@/assets/user.png';
interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  text: string;
  rating: number;
  image: string;
}

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Claire Moreau",
    position: "Présidente de copropriété",
    company: "Copropriété",
    text: "Nous avons installé une solution collective avec Borne Flix dans notre immeuble. Très bon accompagnement, présentation claire en AG, et aucun stress pour la gestion des démarches.",
    rating: 5,
    image: userImage
  },
  {
    id: 2,
    name: "Yassine El Amrani",
    position: "Gestionnaire de copropriétés",
    company: "Copropriétés",
    text: "Borne Flix nous fait gagner un temps précieux. Ils s’occupent de tout : étude, installation, relation avec les copropriétaires... Un vrai service clé en main que je recommande.",
    rating: 5,
    image: userImage
  },
  {
    id: 3,
    name: "Rania Fantar",
    position: "Propriétaire de véhicule électrique",
    company: "Propriétaire",
    text: "Je suis pleinement satisfait de l’installation de ma borne de recharge pour V.E par BORNE FLIX. Mr BEN MAATOUK et son équipe ont fait preuve d’un grand professionnalisme. Je recommande vivement !!",
    rating: 4,
    image: userImage
  }
];

const EnhancedTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Auto-play testimonials
  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % testimonialData.length);
      }, 8000);
    };
    
    startAutoPlay();
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  
  // Reset interval on manual navigation
  const handleNavigation = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonialData.length);
    }, 8000);
  };
  
  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? testimonialData.length - 1 : activeIndex - 1;
    handleNavigation(newIndex);
  };
  
  const handleNext = () => {
    const newIndex = (activeIndex + 1) % testimonialData.length;
    handleNavigation(newIndex);
  };

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };
  
  return (
    <section id="temoignages" className="py-10 bg-gradient-to-br from-[#f8fafc] to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#003566]/5 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#8dc63f]/5 translate-x-1/4 translate-y-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-[#8dc63f]/10 text-[#8dc63f] px-6 py-2 rounded-full text-sm font-medium mb-4">
            CE QUE NOS CLIENTS DISENT
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#003566]">Témoignages clients</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Découvrez comment nous aidons les copropriétés à s'équiper en bornes de recharge et comment
            nos clients apprécient nos services et solutions.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Testimonial Slider */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="min-h-[400px] md:min-h-[320px] relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div 
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0 p-6 md:p-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 h-full">
                    <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center md:items-start md:border-r border-gray-100 pr-0 md:pr-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-[#f8fafc] shadow-md">
                        <img 
                          src={testimonialData[activeIndex].image}
                          alt={testimonialData[activeIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-[#003566] mb-1">{testimonialData[activeIndex].name}</h3>
                      <p className="text-sm text-gray-500 mb-1">{testimonialData[activeIndex].position}</p>
                      <p className="text-sm font-medium text-[#8dc63f] mb-4">{testimonialData[activeIndex].company}</p>
                      <div className="flex items-center text-yellow-400 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`fas fa-star ${i < testimonialData[activeIndex].rating ? 'text-yellow-400' : 'text-gray-200'} mr-1`}></i>
                        ))}
                      </div>
                    </div>
                    
                    <div className="md:col-span-8 lg:col-span-9 flex items-center">
                      <div>
                        <p className="text-gray-700 text-lg leading-relaxed italic">
                          <i className="fas fa-quote-left text-[#8dc63f] opacity-30 text-3xl mr-2 mb-1 inline-block"></i>
                          {testimonialData[activeIndex].text}
                          <i className="fas fa-quote-right text-[#8dc63f] opacity-30 text-3xl ml-2 mt-1 inline-block"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation controls */}
            <div className="bg-gray-50 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {testimonialData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigation(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'bg-[#003566] w-6' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Témoignage ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-[#003566] hover:text-white transition-colors"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-[#003566] hover:text-white transition-colors"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative badge */}
          <div className="absolute -top-6 -right-6 bg-[#8dc63f] text-white font-bold px-6 py-3 rounded-full transform rotate-12 shadow-lg hidden md:block">
            100% Satisfaction
          </div>
        </div>
        
        


       
      </div>
    </section>
  );
};

export default EnhancedTestimonials;