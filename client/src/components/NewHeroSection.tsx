import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import rechargeImg from '@/assets/images/hero/hero2.jpg';

const NewHeroSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-20 pb-10 lg:pt-28 lg:pb-20 bg-[#f8fafc]">
      {/* Background color circles */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] rounded-full bg-yellow-300/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-[#8dc63f]/15 blur-3xl"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#003566]/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
          {/* Left content column */}
          <div className="col-span-12 lg:col-span-6 z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-xl"
            >
              <div className="inline-block bg-secondary/10 text-secondary px-4 py-1 rounded-full text-sm font-medium mb-6">
                Solutions pour copropriétés
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[#003566]">
                Rechargez votre véhicule électrique <span className="text-[#8dc63f]">dès 299€</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                <span className="font-semibold text-[#003566]">BorneFlix</span> révolutionne la recharge en copropriété avec des solutions IRVE intelligentes et connectées. Installation en 24h, 
                <span className="text-[#8dc63f] font-medium"> économies jusqu'à 50% </span> 
                sur votre facture d'énergie et 
                <span className="text-[#8dc63f] font-medium"> gestion intelligente </span> 
                pour une recharge optimale.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a href="#devis">
                  <Button size="lg" className="w-full sm:w-auto bg-[#8dc63f] hover:bg-[#7db52f] text-white font-medium py-4 md:py-6 px-6 md:px-8 rounded-full shadow-lg shadow-[#8dc63f]/30 transition-all duration-300 hover:translate-y-[-2px] text-base md:text-lg">
                    Devis gratuit en 2 min
                  </Button>
                </a>
                <a href="#solutions">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-[#003566] hover:bg-[#003566]/5 text-[#003566] font-medium py-4 md:py-6 px-6 md:px-8 rounded-full transition-all duration-300 text-base md:text-lg">
                    Découvrir nos solutions
                  </Button>
                </a>
              </div>
              
              {/* Trust badges */}
              <div className="hidden md:flex flex-wrap gap-4 items-center pb-10">
                <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                  <div className="text-[#8dc63f]"><i className="fas fa-certificate"></i></div>
                  <span className="text-sm font-medium text-gray-700">IRVE certifié</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                  <div className="text-[#8dc63f]"><i className="fas fa-euro-sign"></i></div>
                  <span className="text-sm font-medium text-gray-700">Aides financières</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                  <div className="text-[#8dc63f]"><i className="fas fa-tools"></i></div>
                  <span className="text-sm font-medium text-gray-700">Maintenance incluse</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          
          {/* Right image column */}
          <div className="col-span-12 lg:col-span-6 z-10 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative"
            >
              <div className="relative">
                {/* Main circular image */}
                <div className="relative w-full max-w-[550px] mx-auto">
                  <div className="rounded-full overflow-hidden border-[15px] border-white shadow-2xl aspect-square">
                    <img 
                      src={rechargeImg} 
                      alt="Personne chargeant un véhicule électrique" 
                      className="w-full h-full object-cover object-right"
                    />
                  </div>
                  
                  {/* Decorative elements */}
                  <motion.div 
                    className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/4 z-20"
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0],
                      y: [0, -5, 0, 5, 0]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <div className="bg-[#8dc63f] rounded-lg px-4 py-3 text-white text-sm font-bold shadow-lg">
                      <i className="fas fa-bolt mr-2"></i>
                      Économies jusqu'à 50%
                    </div>
                  </motion.div>
                  
                  {/* Cable animation */}
                  <motion.div 
                    className="absolute bottom-0 left-1/2 w-1 h-24 bg-blue-500"
                    style={{ 
                      transformOrigin: "top center",
                      transform: "translateX(-50%)" 
                    }}
                    animate={{
                      height: [40, 80, 40],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  ></motion.div>
                </div>
                
                {/* Background circles */}
                <div className="absolute top-1/4 -left-12 w-36 h-36 rounded-full bg-yellow-300/40 blur-md -z-10"></div>
                <div className="absolute bottom-1/4 -right-8 w-28 h-28 rounded-full bg-[#8dc63f]/30 blur-md -z-10"></div>
              </div>
              
              {/* Mobile badges */}
              <div className="flex md:hidden flex-wrap gap-3 items-center justify-center mt-8">
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
                  <div className="text-[#8dc63f] text-sm"><i className="fas fa-certificate"></i></div>
                  <span className="text-xs font-medium text-gray-700">IRVE certifié</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
                  <div className="text-[#8dc63f] text-sm"><i className="fas fa-euro-sign"></i></div>
                  <span className="text-xs font-medium text-gray-700">Aides financières</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
                  <div className="text-[#8dc63f] text-sm"><i className="fas fa-tools"></i></div>
                  <span className="text-xs font-medium text-gray-700">Maintenance incluse</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      
    </section>
  );
};

export default NewHeroSection;