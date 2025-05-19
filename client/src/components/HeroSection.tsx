import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-r from-[#003566] to-[#001d3d] text-white pb-20">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#8dc63f]/10 blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-yellow-200/10 blur-3xl translate-y-1/4 -translate-x-1/4"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left content column */}
          <div className="lg:col-span-7 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="text-xl font-light mb-3 text-white/80">
                <span className="inline-block bg-[#8dc63f]/20 text-[#8dc63f] px-4 py-1 rounded-full text-sm font-medium mb-2">
                  Solutions pour copropriétés
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                La recharge en <span className="text-[#8dc63f]">copropriété</span> n'aura jamais été aussi simple
              </h1>
              
              <h2 className="text-xl md:text-2xl mb-8 font-light text-white/80">
                <span className="font-medium text-[#8dc63f]">BorneFlix</span> propose des installations de bornes de recharge pour véhicules électriques (IRVE), adaptées aux besoins de chaque client.. Une solution <span className="font-medium">clé en main</span> à 
                moindre coût et <span className="font-medium">sans reste à charge</span> pour les copropriétés.
              </h2>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
                <a href="#devis" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-[#8dc63f] hover:bg-[#7ab42f] text-white font-medium py-6 px-8 rounded-full shadow-lg shadow-[#8dc63f]/30 transition-all duration-300 hover:translate-y-[-2px]">
                    Contactez-nous
                  </Button>
                </a>
                <a href="#solutions" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white hover:bg-white/10 text-white font-medium py-6 px-8 rounded-full transition-all duration-300">
                    En savoir plus
                  </Button>
                </a>
              </div>
              
              {/* Trust badges */}
              <div className="flex flex-wrap gap-5 items-center">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 hover:bg-white/15 transition-colors duration-300">
                  <div className="text-[#8dc63f] mr-3"><i className="fas fa-certificate"></i></div>
                  <span className="text-sm font-medium">IRVE certifié</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 hover:bg-white/15 transition-colors duration-300">
                  <div className="text-[#8dc63f] mr-3"><i className="fas fa-euro-sign"></i></div>
                  <span className="text-sm font-medium">Aides financières</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 hover:bg-white/15 transition-colors duration-300">
                  <div className="text-[#8dc63f] mr-3"><i className="fas fa-tools"></i></div>
                  <span className="text-sm font-medium">Maintenance incluse</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right column with 3D animation et image */}
          <div className="lg:col-span-5 xl:col-span-6 relative">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="rounded-full overflow-hidden border-8 border-white/10 shadow-2xl relative aspect-square max-w-[500px] mx-auto">
                {/* Arrière-plan avec des cercles colorés */}
                <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-yellow-300/40 blur-md z-0"></div>
                <div className="absolute top-1/4 -right-10 w-40 h-40 rounded-full bg-[#8dc63f]/40 blur-md z-0"></div>
                
                {/* Image principale */}
                <img 
                  src="@/assets/images/hero/recharge-img01.jpeg" 
                  alt="Personne utilisant une borne de recharge pour véhicule électrique" 
                  className="w-full h-full object-cover scale-110 z-10 relative"
                />
                
                {/* Effets visuels créatifs */}
                <div className="absolute inset-0 z-20 opacity-30 mix-blend-screen">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-green-500/20"></div>
                </div>
                
                {/* Fil décoratif */}
                <motion.div 
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-1 h-32 bg-[#00aaff]"
                  animate={{ 
                    height: [32, 80, 32],
                    opacity: [0.6, 1, 0.6] 
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
              </div>
              
              {/* Badge avec animation */}
              <motion.div 
                className="absolute -right-4 top-10 transform rotate-12 z-30"
                initial={{ opacity: 0, y: -20, rotate: 0 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: 12 } : { opacity: 0, y: -20, rotate: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.2 } }}
              >
                <div className="bg-[#8dc63f] text-white font-bold text-sm md:text-base p-3 md:p-4 rounded-lg shadow-lg">
                  <i className="fas fa-check-circle mr-2"></i> Jusqu'à 50% d'aides
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-20 text-white transform rotate-180">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="white" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white"></path>
          </svg>
        </div>
      </div>
      
      {/* Stats banner */}
      <div className="relative bg-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#003566]/5 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-[#003566]">
                <i className="fas fa-plug text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-[#003566] mb-2">+2500</h3>
              <p className="text-gray-600">Bornes installées en copropriété</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#8dc63f]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-[#8dc63f]">
                <i className="fas fa-building text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-[#003566] mb-2">+150</h3>
              <p className="text-gray-600">Copropriétés équipées</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-yellow-600">
                <i className="fas fa-euro-sign text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold text-[#003566] mb-2">-50%</h3>
              <p className="text-gray-600">Sur le coût d'installation grâce aux aides</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
