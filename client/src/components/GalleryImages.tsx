import React from 'react';

const GalleryImages = () => {
  const images = [
    {
      src: '/images/reelles/station-solaire.jpg',
      alt: 'Station de recharge pour véhicule électrique',
      title: 'Résidence Les Oliviers',
      description: 'Station de recharge rapide pour copropriété'
    },
    {
      src: '/images/reelles/signature-contrat.jpg',
      alt: 'Borne de recharge murale',
      title: 'Villa des Pins', 
      description: 'Installation murale compacte'
    },
    {
      src: '/images/reelles/borne-recharge.jpg',
      alt: 'Borne de recharge extérieure',
      title: 'Parc Saint-Michel',
      description: 'Solution extérieure avec protection intempéries'
    },
    {
      src: '/images/reelles/installation.jpg',
      alt: 'Installation sur parking souterrain',
      title: 'Résidence Le Grand Chêne',
      description: 'Système pour parking sous-terrain'
    },
    {
      src: import.meta.env.DEV ? '/client@/assets/station-solaire.jpg' : '/images/reelles/station-solaire.jpg',
      alt: 'Bornes de recharge en réseau',
      title: 'Les Jardins de Mérignac',
      description: 'Infrastructure collective intelligente'
    },
    {
      src: import.meta.env.DEV ? '/client@/assets/borne-recharge.jpg' : '/images/reelles/borne-recharge.jpg',
      alt: 'Chargeur pour copropriété',
      title: 'Les Terrasses du Parc',
      description: 'Solution complète avec gestion multi-utilisateurs'
    }
  ];

  return (
    <section id="galerie" className="py-24 bg-gradient-to-r from-[#f8fafc] to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-[#8dc63f]/10 text-[#8dc63f] px-6 py-2 rounded-full text-sm font-medium mb-4">
            NOS RÉALISATIONS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#003566]">Nos installations récentes</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Découvrez quelques exemples d'installations de bornes de recharge en copropriété 
            réalisées par notre équipe d'experts pour nos clients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <h3 className="text-white font-bold text-xl mb-2">{image.title}</h3>
                  <p className="text-white/90">{image.description}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#003566] mb-2">{image.title}</h3>
                <p className="text-gray-600">{image.description}</p>
              </div>
            </div>
          ))}
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

export default GalleryImages;