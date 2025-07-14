import { Card, CardContent } from "@/components/ui/card";

const Introduction = () => {
  return (
    <section className="py-20 bg-white relative">
      {/* Decorative elements */}
      <div className="absolute left-0 bottom-0 w-40 h-40 bg-primary/5 rounded-tr-[100px] z-0"></div>
      <div className="absolute right-0 top-1/2 w-24 h-24 bg-secondary/5 rounded-full -translate-y-1/2 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block bg-secondary/10 text-secondary px-4 py-1 rounded-full text-sm font-medium mb-4">
            NOTRE EXPERTISE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">La recharge en copropriété <span className="text-[#8dc63f]">intelligente</span></h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold text-[#003566]">BorneFlix</span> est le spécialiste français des infrastructures IRVE intelligentes pour copropriétés. Nous proposons des solutions 
            <span className="text-[#8dc63f] font-medium"> connectées et optimisées </span> 
            à partir de 
            <span className="text-[#8dc63f] font-medium"> 299€ </span> 
            pour équiper votre copropriété et maximiser les économies d'énergie.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white border-t-4 border-t-primary p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
            <CardContent className="p-0">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-plug text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Installation sur mesure</h3>
              <p className="text-gray-600">Notre équipe d'experts réalise une étude technique complète pour proposer la solution adaptée à votre copropriété.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-t-4 border-t-secondary p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
            <CardContent className="p-0">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-wallet text-2xl text-secondary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Financement optimisé</h3>
              <p className="text-gray-600">Profitez des aides financières et subventions disponibles pour réduire le coût d'installation de votre infrastructure.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-t-4 border-t-accent p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
            <CardContent className="p-0">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-tools text-2xl text-accent"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Maintenance garantie</h3>
              <p className="text-gray-600">Service après-vente réactif et maintenance préventive pour assurer le bon fonctionnement de vos bornes à long terme.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
