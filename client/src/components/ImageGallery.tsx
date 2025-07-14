import React from 'react';
import { AnimateOnScroll } from './ui/animate-on-scroll';

interface GalleryImage {
  id: number;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
}

const galleryData: GalleryImage[] = [
  {
    id: 1,
    title: "Borne Solaire Premium",
    location: "Centre Commercial Éco-Park, Montpellier",
    description: "Installation de stations solaires pour recharge écologique et autonome",
    imageUrl: "/images/gallery/pexels-kindelmedia-9800030.jpg"
  },
  {
    id: 2,
    title: "Partenariat et Installation",
    location: "Résidence Les Terrasses, Nantes",
    description: "Accompagnement complet depuis l'étude technique jusqu'à la livraison finale",
    imageUrl: "/images/gallery/images-13.png"
  },
  {
    id: 3,
    title: "Borne Connectée Pro",
    location: "Copropriété Les Cèdres, Bordeaux",
    description: "Solution française avec affichage 'Roulez Électrique' et connectivité avancée",
    imageUrl: "/images/gallery/images-4.png"
  },
  {
    id: 4,
    title: "Gestion Financière",
    location: "Immeuble Le Phare, Lille",
    description: "Solutions de financement adaptées et optimisation des coûts pour les copropriétés",
    imageUrl: "/images/gallery/images-1.png"
  },
  {
    id: 5,
    title: "Installation Express",
    location: "Résidence Grand Angle, Lyon",
    description: "Mise en service rapide avec raccordement aux standards européens",
    imageUrl: "/images/gallery/recharge-img01.jpeg"
  },
  {
    id: 6,
    title: "Solution Collective",
    location: "Les Jardins Connectés, Paris",
    description: "Infrastructure multi-bornes pour grandes copropriétés avec gestion intelligente",
    imageUrl: "/images/gallery/recharge-img02.jpeg"
  },
];

const ImageGallery = () => {
  return (
    <section id="galerie" className="py-24 bg-gradient-to-r from-[#f8fafc] to-gray-100">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade" threshold={0.1} delay={0.1}>
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
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryData.map((item, index) => (
            <AnimateOnScroll 
              key={item.id} 
              animation="slide-up" 
              threshold={0.1} 
              delay={0.1 * (index % 3)}
              className="h-full"
            >
              <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                    <span className="text-white/80 text-sm block mb-2">{item.location}</span>
                    <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-white/90 text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="text-[#8dc63f] text-sm block mb-2">{item.location}</span>
                  <h3 className="text-xl font-bold text-[#003566] mb-2">{item.title}</h3>
                  <p className="text-gray-600 flex-grow">{item.description}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <a 
                      href="#devis" 
                      className="inline-flex items-center text-[#003566] hover:text-[#8dc63f] transition-colors duration-200 font-medium text-sm"
                    >
                      Découvrir ce projet
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        
        <AnimateOnScroll animation="fade" threshold={0.1} delay={0.3}>
          <div className="text-center mt-12">
            <a 
              href="#devis" 
              className="inline-flex items-center bg-[#003566] text-white hover:bg-[#1a4d85] py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
            >
              Devis gratuit dès 299€
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default ImageGallery;