import chargingStation1 from "@/assets/images/gallery/images-1.png";
import chargingStation2 from "@/assets/images/gallery/images-4.png";
import chargingStation3 from "@/assets/images/gallery/pexels-kindelmedia-9800030.jpg";
import chargingStation4 from "@/assets/images/gallery/images-13.png";
import chargingStation5 from "@/assets/images/gallery/image-newsletter-ok.jpeg";
// import chargingStation6 from "@/assets/images/reelles/screenshot-1747485121313.png"; // Image supprimée

const Gallery = () => {
  return (
    <section id="realisations" className="py-24 bg-gradient-to-r from-[#f8fafc] to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-[#8dc63f]/10 text-[#8dc63f] px-6 py-2 rounded-full text-sm font-medium mb-4">
            NOS PROJETS RÉALISÉS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#003566]">Nos réalisations récentes</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Découvrez quelques exemples d'installations de bornes de recharge en copropriété réalisées 
            par Borne Flix dans différents types de résidences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Carte de réalisation 1 */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={chargingStation1} 
                alt="Installation en parking souterrain" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#003566] mb-2">Résidence Les Oliviers</h3>
              <p className="text-gray-600">Installation de 12 bornes en infrastructure collective pour une résidence de 40 logements.</p>
            </div>
          </div>
          
          {/* Carte de réalisation 2 */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={chargingStation2} 
                alt="Bornes en parking extérieur" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#003566] mb-2">Parc Saint-Michel</h3>
              <p className="text-gray-600">Solutions individuelles pour un parking extérieur de 8 places avec alimentation optimisée.</p>
            </div>
          </div>
          
          {/* Carte de réalisation 3 */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={chargingStation3} 
                alt="Voiture en charge" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#003566] mb-2">Les Terrasses du Parc</h3>
              <p className="text-gray-600">Pré-équipement pour 24 places avec installation progressive de bornes à la demande.</p>
            </div>
          </div>
          
          {/* Carte de réalisation 4 */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={chargingStation4} 
                alt="Installation collectif de bornes" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#003566] mb-2">Résidence Le Grand Chêne</h3>
              <p className="text-gray-600">Solution mixte avec infrastructure collective et bornes individuelles pour 18 résidents.</p>
            </div>
          </div>
          
          {/* Carte de réalisation 5 */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={chargingStation5} 
                alt="Parking souterrain équipé" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#003566] mb-2">Les Jardins de Mérignac</h3>
              <p className="text-gray-600">Installation évolutive pour une résidence de 60 appartements avec gestion dynamique de charge.</p>
            </div>
          </div>
          
          {/* Carte de réalisation 6 */}
          <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={chargingStation6} 
                alt="Bornes de recharge extérieures" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#003566] mb-2">Villa des Pins</h3>
              <p className="text-gray-600">Solution complète pour petite copropriété de 6 logements avec comptage individuel intégré.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a href="#devis" className="inline-flex items-center bg-[#003566] text-white hover:bg-[#1a4d85] py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium">
            Demander un devis pour votre copropriété
            <i className="fas fa-arrow-right ml-3"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
