import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  return (
    <section id="temoignages" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ce que disent nos clients</h2>
          <p className="text-lg">
            Découvrez les retours d'expérience de copropriétés qui nous ont fait confiance pour leurs solutions IRVE intelligentes 
            <span className="text-[#8dc63f] font-medium"> dès 299€ </span>.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white p-6 rounded-lg shadow-md">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <i className="fas fa-quote-left text-3xl text-primary/30 mr-3"></i>
                <div>
                  <div className="text-yellow-400 mb-1">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="mb-4 italic">
                "L'équipe de Borne Flix a su nous proposer une solution parfaitement adaptée aux contraintes de notre résidence. Le processus a été fluide du début à la fin, et les résidents sont très satisfaits."
              </p>
              <div className="pt-4 border-t border-gray-200">
                <p className="font-semibold">Michel Durand</p>
                <p className="text-sm text-gray-600">Syndic de copropriété, Paris</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white p-6 rounded-lg shadow-md">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <i className="fas fa-quote-left text-3xl text-primary/30 mr-3"></i>
                <div>
                  <div className="text-yellow-400 mb-1">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="mb-4 italic">
                "Nous avions de nombreuses interrogations concernant l'installation de bornes dans notre parking. Borne Flix nous a guidés tout au long du projet avec professionnalisme. Je recommande !"
              </p>
              <div className="pt-4 border-t border-gray-200">
                <p className="font-semibold">Sophie Martin</p>
                <p className="text-sm text-gray-600">Présidente de conseil syndical, Lyon</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white p-6 rounded-lg shadow-md">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <i className="fas fa-quote-left text-3xl text-primary/30 mr-3"></i>
                <div>
                  <div className="text-yellow-400 mb-1">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
              </div>
              <p className="mb-4 italic">
                "L'installation s'est déroulée exactement comme prévu, sans surprises. Le système fonctionne parfaitement et le service après-vente est très réactif. Une excellente expérience."
              </p>
              <div className="pt-4 border-t border-gray-200">
                <p className="font-semibold">Laurent Petit</p>
                <p className="text-sm text-gray-600">Copropriétaire, Bordeaux</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
