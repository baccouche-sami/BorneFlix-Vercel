import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// Utilisation des SVG existants dans le projet
import evchargingImage from "@/assets/evcharging.svg";
import featuresGridImage from "@/assets/features-grid.svg";
import readyToPlugImage from "@/assets/readytoplug.svg";
import circularImage from "@/assets/circular-image.svg";
import infrastructureImage from "@/assets/images/gallery/pexels-kindelmedia-9800030.jpg";
import individualImage from "@/assets/images/gallery/images-4.png";
import anticipationImage from "@/assets/images/gallery/images-1.png";
import infrastructureImage2 from "@/assets/images/gallery/images-13.png";

const Solutions = () => {
  return (
    <section id="solutions" className="py-10 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-tl-[200px] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-[#003566]/10 text-[#003566] px-4 py-1 rounded-full text-sm font-bold mb-4">
            NOS SOLUTIONS DE RECHARGE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#003566]">
            Installation de <span className="highlight-text">bornes de recharge</span> en copropriété
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="seo-highlight">BorneFlix</span> propose différentes solutions d'installation de <span className="seo-highlight">bornes de recharge</span> pour s'adapter parfaitement aux besoins spécifiques de votre copropriété et maximiser les aides financières ADVENIR jusqu'à 50%.
          </p>
        </div>
        
        {/* Solution tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-white rounded-xl overflow-hidden shadow-lg border-t-4 border-primary hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
            <div className="h-56 overflow-hidden bg-primary/5 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#003566]/20 to-transparent z-10"></div>
              <img 
                src={infrastructureImage} 
                alt="Infrastructure de recharge collective en copropriété"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
            <div className="p-6">
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-4">
                SOLUTION RECOMMANDÉE
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#003566]">Infrastructure collective</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Équipez l'ensemble du parking de votre copropriété avec une infrastructure commune pour tous les résidents.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm">
                  <i className="fas fa-check text-secondary mt-1 mr-2"></i>
                  <span>Économies d'échelle importantes</span>
                </li>
                <li className="flex items-start text-sm">
                  <i className="fas fa-check text-secondary mt-1 mr-2"></i>
                  <span>Gestion intelligente de la puissance</span>
                </li>
                <li className="flex items-start text-sm">
                  <i className="fas fa-check text-secondary mt-1 mr-2"></i>
                  <span>Aides financières maximisées</span>
                </li>
              </ul>
              <a href="#devis" className="text-primary font-medium hover:underline inline-flex items-center">
                En savoir plus <i className="fas fa-arrow-right ml-2 text-xs"></i>
              </a>
            </div>
          </Card>
          
          <Card className="bg-white rounded-xl overflow-hidden shadow-lg border-t-4 border-secondary hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
            <div className="h-56 overflow-hidden bg-secondary/5 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#8dc63f]/20 to-transparent z-10"></div>
              <img 
                src={individualImage} 
                alt="Solution individuelle de recharge en copropriété"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
            <div className="p-6">
              <div className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold mb-4">
                SOLUTION PROGRESSIVE
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#003566]">Solution individuelle</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Installation à la demande au fur et à mesure des besoins des résidents de votre copropriété.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm">
                  <i className="fas fa-check text-secondary mt-1 mr-2"></i>
                  <span>Déploiement progressif</span>
                </li>
                <li className="flex items-start text-sm">
                  <i className="fas fa-check text-secondary mt-1 mr-2"></i>
                  <span>Accompagnement droit à la prise</span>
                </li>
                <li className="flex items-start text-sm">
                  <i className="fas fa-check text-secondary mt-1 mr-2"></i>
                  <span>Installation personnalisée</span>
                </li>
              </ul>
              <a href="#devis" className="text-primary font-medium hover:underline inline-flex items-center">
                En savoir plus <i className="fas fa-arrow-right ml-2 text-xs"></i>
              </a>
            </div>
          </Card>
          
          <Card className="bg-white rounded-xl overflow-hidden shadow-lg border-t-4 border-accent hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
            <div className="h-56 overflow-hidden bg-accent/5 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent z-10"></div>
              <img 
                src={anticipationImage} 
                alt="Pré-équipement pour bornes de recharge"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
            <div className="p-6">
              <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium mb-4">
                SOLUTION D'ANTICIPATION
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#003566]">Pré-équipement</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Préparez votre installation pour faciliter le déploiement futur des bornes de recharge.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm">
                  <i className="fas fa-check text-secondary mt-1 mr-2"></i>
                  <span>Investissement initial réduit</span>
                </li>
                <li className="flex items-start text-sm">
                  <i className="fas fa-check text-secondary mt-1 mr-2"></i>
                  <span>Anticipation des besoins futurs</span>
                </li>
                <li className="flex items-start text-sm">
                  <i className="fas fa-check text-secondary mt-1 mr-2"></i>
                  <span>Travaux limités et optimisés</span>
                </li>
              </ul>
              <a href="#devis" className="text-primary font-medium hover:underline inline-flex items-center">
                En savoir plus <i className="fas fa-arrow-right ml-2 text-xs"></i>
              </a>
            </div>
          </Card>
        </div>
        
        {/* Detailed Solution - Infrastructure collective */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 order-2 lg:order-1 p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold mb-6">
                SOLUTION RECOMMANDÉE
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#003566]">Infrastructure <span className="highlight-text">collective intelligente</span></h3>
              <p className="text-gray-700 mb-6">
                Notre solution d'infrastructure collective permet d'équiper l'ensemble du parking de votre copropriété. Chaque résident peut ainsi disposer d'un point de charge individuel, connecté à un système de gestion intelligent.
              </p>
              
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                      <i className="fas fa-plug text-secondary"></i>
                    </div>
                    <h4 className="font-bold text-gray-900">Installation</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Infrastructure commune avec bornes individuelles par place</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                      <i className="fas fa-bolt text-secondary"></i>
                    </div>
                    <h4 className="font-bold text-gray-900">Puissance</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Gestion dynamique avec répartition intelligente</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                      <i className="fas fa-euro-sign text-secondary"></i>
                    </div>
                    <h4 className="font-bold text-gray-900">Financement</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Aides ADVENIR maximisées jusqu'à 50% du montant</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                      <i className="fas fa-tachometer-alt text-secondary"></i>
                    </div>
                    <h4 className="font-bold text-gray-900">Gestion</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Supervision à distance, maintenance et facturation</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a href="#devis">
                  <Button className="bg-secondary hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 hover:translate-y-[-2px]">
                    Demander un devis gratuit
                  </Button>
                </a>
                <a href="tel:0123456789" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
                  <i className="fas fa-phone-alt mr-2"></i>
                  <span>Appeler un conseiller</span>
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-5 order-1 lg:order-2 relative bg-primary/5 p-6">
              <div className="relative flex items-center justify-center h-full overflow-hidden">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-primary/20 to-secondary/30 rounded-lg blur-xl animate-pulse"></div>
                <img 
                  src={infrastructureImage2} 
                  alt="Infrastructure de recharge collective en copropriété" 
                  className="relative max-w-full h-auto object-contain rounded-lg transform hover:scale-102 transition-transform duration-700"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 text-white">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-4">
                    <i className="fas fa-percentage text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Jusqu'à 50% de subvention</h4>
                    <p className="text-white/80 text-sm">Programme ADVENIR pour copropriétés</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#003566] to-[#1a4d85] rounded-2xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-tr-full"></div>
          
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-white">Prêt à équiper votre copropriété ?</h2>
              <p className="text-white/90 mb-8">
                Demandez dès maintenant votre devis personnalisé et bénéficiez d'un accompagnement sur-mesure pour l'installation de bornes de recharge dans votre copropriété.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#devis">
                  <Button className="bg-white text-[#003566] hover:bg-gray-100 font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-blue-900/20 hover:translate-y-[-2px] w-full sm:w-auto">
                    Demander un devis gratuit
                  </Button>
                </a>
                <a href="#contact">
                  <Button variant="outline" className="border-2 border-white text-[#003566] hover:bg-white/10 font-medium py-3 px-8 rounded-full transition-all duration-300 w-full sm:w-auto">
                    Nous contacter <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;