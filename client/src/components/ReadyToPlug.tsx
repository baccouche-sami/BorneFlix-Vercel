import { Button } from "@/components/ui/button";
import readyToPlugImage from "@/assets/readytoplug.svg";

const ReadyToPlug = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-secondary/10 text-secondary px-4 py-1 rounded-full text-sm font-medium mb-4">
            NOTRE SOLUTION
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Une solution de recharge "Ready-to-plug"</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Nous proposons une approche clé en main pour équiper votre copropriété avec une infrastructure de recharge adaptée à vos besoins.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                  <div className="w-5 h-5 bg-secondary rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Étude technique personnalisée</h3>
                  <p className="text-gray-600">Nous réalisons un diagnostic complet de votre copropriété pour déterminer la solution la plus adaptée.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                  <div className="w-5 h-5 bg-secondary rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Infrastructure collective optimisée</h3>
                  <p className="text-gray-600">Nous installons une infrastructure dimensionnée pour répondre aux besoins actuels et futurs de tous les résidents.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                  <div className="w-5 h-5 bg-secondary rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Smart Charging Management</h3>
                  <p className="text-gray-600">Notre système de gestion intelligent répartit la puissance disponible et assure une facturation précise pour chaque utilisateur.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                  <div className="w-5 h-5 bg-secondary rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Accompagnement complet</h3>
                  <p className="text-gray-600">Nous vous assistons dans toutes les démarches administratives et l'obtention des aides financières disponibles.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <a href="#devis">
                <Button className="bg-secondary hover:bg-green-600 text-white font-medium py-3 px-8 rounded-full shadow-lg shadow-secondary/20 transition-all duration-300 hover:translate-y-[-2px]">
                  Demander un devis
                </Button>
              </a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative max-w-md">
              <div className="absolute inset-0 bg-secondary/5 transform rotate-3 rounded-lg"></div>
              <div className="relative bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                <img 
                  src={import.meta.env.DEV ? '@/assets/borne-recharge.jpg' : '/images/reelles/borne-recharge.jpg'} 
                  alt="Solution Ready-to-plug pour copropriété" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-secondary text-white rounded-full px-4 py-2 shadow-lg font-bold text-sm">
                  Ready-to-Plug
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToPlug;