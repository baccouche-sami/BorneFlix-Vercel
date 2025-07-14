import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import installationImg from '@/assets/images/installation.jpg';

const Advantages = () => {
  return (
    <section id="avantages" className="py-10 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-[#003566]/10 text-[#003566] px-4 md:px-6 py-1 md:py-2 rounded-full text-sm font-medium mb-4 md:mb-6">
            NOS ATOUTS
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#003566]">Les avantages de choisir <span className="highlight-text">BorneFlix</span></h2>
          <p className="text-lg">
            Faites confiance à notre expertise pour équiper votre copropriété avec des solutions IRVE intelligentes 
            <span className="text-[#8dc63f] font-medium"> dès 299€ </span> 
            et 
            <span className="text-[#8dc63f] font-medium"> économies jusqu'à 50% </span>.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="bg-white p-8 rounded-2xl shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:translate-y-[-8px] group">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-award text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-secondary transition-colors">Expertise certifiée</h3>
              <p className="text-gray-600 leading-relaxed mb-6">Installateurs qualifiés IRVE et techniciens formés aux spécificités des copropriétés. Certification garantie.</p>
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Certification</p>
                <p className="text-lg font-bold text-primary">IRVE</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white p-8 rounded-2xl shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:translate-y-[-8px] group">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-euro-sign text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-secondary transition-colors">Économies garanties</h3>
              <p className="text-gray-600 leading-relaxed mb-6">Optimisation intelligente de l'énergie et gestion des coûts pour des économies garanties jusqu'à 50%.</p>
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Économies</p>
                <p className="text-lg font-bold text-primary">Jusqu'à 50%</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white p-8 rounded-2xl shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:translate-y-[-8px] group">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-rocket text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-secondary transition-colors">Installation rapide</h3>
              <p className="text-gray-600 leading-relaxed mb-6">Installation en 24h pour les copropriétés, 2h pour les particuliers. Équipes certifiées et expérimentées.</p>
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Installation</p>
                <p className="text-lg font-bold text-primary">En 24h</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white p-8 rounded-2xl shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:translate-y-[-8px] group">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-headset text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-secondary transition-colors">Support 24/7</h3>
              <p className="text-gray-600 leading-relaxed mb-6">Support technique 7j/7 et suivi personnalisé pour les gestionnaires de copropriété. Maintenance incluse.</p>
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Support</p>
                <p className="text-lg font-bold text-primary">24/7</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* <div className="mt-16">
          <div className="bg-[#003566] rounded-xl overflow-hidden shadow-xl">
            <div className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 text-center">Votre solution inclut</h3>
            </div>
            <img src={installationImg} alt="Fonctionnalités incluses" className="w-full h-48 object-cover" />
          </div>
        </div> */} 
        
        
        {/* Enhanced CTA Section */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-primary">Prêt à économiser jusqu'à 50% ?</h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Rejoignez les milliers de copropriétés qui ont choisi BorneFlix pour leurs solutions IRVE intelligentes. 
              Installation en 24h et garantie complète incluse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#devis">
                <Button className="bg-gradient-to-r from-secondary to-green-600 hover:from-green-600 hover:to-secondary text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:translate-y-[-2px] shadow-lg shadow-green-500/25">
                  <i className="fas fa-calculator mr-2"></i>
                  Devis gratuit en 2 min
                </Button>
              </a>
              <a href="tel:0123456789">
                <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300">
                  <i className="fas fa-phone-alt mr-2"></i>
                  Appeler un expert
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-4 px-8 rounded-full transition-all duration-300">
                  <i className="fas fa-envelope mr-2"></i>
                  Nous contacter
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
