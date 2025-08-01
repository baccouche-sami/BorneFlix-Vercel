import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  location: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/gallery/pexels-kindelmedia-9800030.jpg",
    alt: "Station de recharge solaire",
    title: "Station solaire intégrée",
    description: "Infrastructure de recharge alimentée par énergie solaire",
    location: "Résidence Le Parc Soleil, Montpellier"
  },
  {
    id: 2,
    src: "/images/gallery/images-13.png",
    alt: "Collaboration entre professionnels",
    title: "Suivi de projet",
    description: "Expertise technique et accompagnement personnalisé",
    location: "Siège BorneFlix, Paris"
  },
  {
    id: 3,
    src: "/images/gallery/images-4.png",
    alt: "Borne de recharge en fonction",
    title: "Borne Roulez Électrique",
    description: "Solution de recharge rapide pour copropriétés",
    location: "Résidence Les Jardins, Lyon"
  },
  {
    id: 4,
    src: "/images/gallery/images-1.png",
    alt: "Signature de contrat",
    title: "Gestion administrative",
    description: "Accompagnement complet dans les démarches",
    location: "Cabinet Martin & Associés, Paris"
  },
  {
    id: 5,
    src: "/images/hero/recharge-img01.jpeg",
    alt: "Utilisateur en action",
    title: "Expérience utilisateur",
    description: "Interface intuitive et système sécurisé",
    location: "Résidence Les Cèdres, Bordeaux"
  },
  {
    id: 6,
    src: "/images/gallery/recharge-img02.jpeg",
    alt: "Infrastructure collective",
    title: "Solution collective",
    description: "Équipement pour parking souterrain",
    location: "Résidence Grand Angle, Lille"
  }
];

const EnhancedGallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  
  // Filter logic
  const filteredImages = filteredCategory 
    ? galleryImages.filter(img => img.description.toLowerCase().includes(filteredCategory.toLowerCase()))
    : galleryImages;
    
  const categories = [
    { id: "all", label: "Toutes" },
    { id: "infra", label: "Infrastructures" },
    { id: "solution", label: "Solutions" },
    { id: "experience", label: "Expérience" }
  ];
  
  // Handle filter click
  const handleFilterClick = (category: string) => {
    setFilteredCategory(category === "all" ? null : category);
  };
  
  return (
    <section id="galerie" className="py-4 bg-gradient-to-br from-white to-gray-50">
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
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleFilterClick(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                (filteredCategory === category.id) || (category.id === "all" && !filteredCategory)
                  ? 'bg-[#003566] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-sm`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <motion.div 
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
              viewport={{ once: true, amount: 0.3 }}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <span className="text-white/80 text-sm block mb-2">{image.location}</span>
                  <h3 className="text-white font-bold text-xl mb-2">{image.title}</h3>
                  <p className="text-white/90">{image.description}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#003566] mb-2">{image.title}</h3>
                <p className="text-gray-600 mb-2">{image.description}</p>
                <span className="text-sm text-[#8dc63f]">{image.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a href="/devis" className="inline-flex items-center bg-[#003566] text-white hover:bg-[#1a4d85] py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium">
            Demander un devis pour votre copropriété
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Modal for enlarged view */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="w-full h-[50vh] bg-gray-100">
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.alt} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <button 
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center"
                  onClick={() => setSelectedImage(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#003566] mb-2">{selectedImage.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{selectedImage.location}</p>
                <p className="text-gray-700">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EnhancedGallery;