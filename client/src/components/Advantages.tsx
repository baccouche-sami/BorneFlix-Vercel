import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import installationImg from '@/assets/images/installation.jpg';

const Advantages = () => {
  return (
    <section id="avantages" className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold mb-4">
            NOS ATOUTS
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#003566]">Les avantages de choisir <span className="highlight-text">Borne Flix</span></h2>
          <p className="text-lg">
            Faites confiance à notre expertise pour équiper votre copropriété avec des solutions de recharge adaptées et pérennes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-award text-2xl text-primary"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Expertise certifiée</h3>
              <p className="text-gray-600">Installateurs qualifiés IRVE et techniciens formés aux spécificités des copropriétés.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-hand-holding-usd text-2xl text-primary"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Accompagnement financier</h3>
              <p className="text-gray-600">Assistance pour l'obtention des aides ADVENIR et optimisation du plan de financement.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-file-contract text-2xl text-primary"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Conformité juridique</h3>
              <p className="text-gray-600">Respect de toutes les normes en vigueur et accompagnement pour les démarches en assemblée générale.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-headset text-2xl text-primary"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Service client dédié</h3>
              <p className="text-gray-600">Support technique 7j/7 et suivi personnalisé pour les gestionnaires de copropriété.</p>
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
        
        
        <div className="mt-12 text-center">
          <a href="#devis">
            <Button className="bg-secondary hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-secondary/20 transition-all duration-300 hover:translate-y-[-2px]">
              Obtenir un devis personnalisé
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
