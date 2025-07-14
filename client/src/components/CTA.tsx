import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#003566] to-[#1a4d85] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 md:w-64 h-48 md:h-64 rounded-full bg-white/5 translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute top-1/2 left-1/2 w-64 md:w-80 h-64 md:h-80 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 md:px-6 py-1 md:py-2 rounded-full text-sm font-medium mb-6 md:mb-8">
            DEMANDE DE DEVIS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">Rechargez votre véhicule électrique <span className="text-[#8dc63f]">dès 299€</span></h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 text-white/90">
            Devenez acteur de la transition énergétique ! Demandez votre 
            <span className="text-[#8dc63f] font-medium"> devis gratuit </span> 
            pour l'installation de bornes IRVE intelligentes dans votre copropriété. 
            <span className="text-[#8dc63f] font-medium"> Économies jusqu'à 50% </span> 
            et installation en 24h.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#devis">
              <Button className="bg-[#8dc63f] hover:bg-[#7db52f] text-white font-medium py-4 md:py-6 px-6 md:px-10 rounded-full shadow-lg shadow-[#8dc63f]/30 transition-all duration-300 hover:translate-y-[-2px] text-base md:text-lg">
                Je demande mon devis gratuit
              </Button>
            </a>
            <a href="#contact" className="text-white hover:text-[#8dc63f] transition-colors flex items-center">
              <i className="fas fa-phone-alt mr-2"></i>
              <span>Nous contacter</span>
            </a>
          </div>
          
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">5069</div>
              <div className="text-white/80 text-sm md:text-base">Bornes installées</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">362535</div>
              <div className="text-white/80 text-sm md:text-base">kWh délivrés</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">2035</div>
              <div className="text-white/80 text-sm md:text-base">Clients satisfaits</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
