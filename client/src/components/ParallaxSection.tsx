import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import infrastructureImage from "@/assets/images/gallery/pexels-kindelmedia-9800030.jpg";
const ParallaxSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  
  return (
    <section ref={ref} className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
      {/* Image de fond avec effet parallaxe */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src={infrastructureImage}
          alt="Station de recharge de véhicules électriques" 
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Contenu centré */}
      <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-20">
        <motion.div 
          className="text-center text-white max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Prêt à électrifier votre copropriété ?
          </h2>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Le futur de la mobilité est électrique. Préparez votre copropriété dès aujourd'hui.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#devis" 
              className="bg-[#8dc63f] hover:bg-[#7ab42f] text-white py-3 px-8 rounded-full shadow-lg transition-all duration-300 font-medium"
            >
              Obtenir un devis gratuit
            </a>
            <a 
              href="#contact" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white py-3 px-8 rounded-full shadow-lg transition-all duration-300 font-medium"
            >
              Parler à un expert
            </a>
          </div>
        </motion.div>
      </div>
     
    </section>
  );
};

export default ParallaxSection;