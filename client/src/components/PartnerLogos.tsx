import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Liste des partenaires/entreprises
const partners = [
  {
    id: 1,
    name: "Tesla Motors",
    logo: "/images/partners/tesla.svg" // À remplacer par les vrais logos
  },
  {
    id: 2,
    name: "Schneider Electric",
    logo: "/images/partners/schneider.svg"
  },
  {
    id: 3,
    name: "Legrand",
    logo: "/images/partners/legrand.svg"
  },
  {
    id: 4,
    name: "Renault",
    logo: "/images/partners/renault.svg"
  },
  {
    id: 5,
    name: "Enedis",
    logo: "/images/partners/enedis.svg"
  },
  {
    id: 6,
    name: "EDF",
    logo: "/images/partners/edf.svg"
  },
  {
    id: 7,
    name: "ABB",
    logo: "/images/partners/abb.svg"
  },
  {
    id: 8,
    name: "Total Energies",
    logo: "/images/partners/totalenergies.svg"
  }
];

const PartnerLogos = () => {
  const [width, setWidth] = useState(0);
  const [duplicatedPartners, setDuplicatedPartners] = useState([...partners, ...partners]);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      // Calculer la taille nécessaire pour le défilement
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="py-10 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="container mx-auto px-4 mb-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-[#003566]/10 text-[#003566] px-6 py-2 rounded-full text-sm font-bold mb-4">
            ILS NOUS FONT CONFIANCE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003566]">Nos partenaires</h2>
        </div>
      </div>

      {/* Carrousel des logos */}
      <div className="relative w-full overflow-hidden">
        <motion.div 
          ref={carouselRef}
          className="flex items-center"
          animate={{
            x: [-width/2, 0, -width/2]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <motion.div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 px-8 py-4 min-w-[200px]"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md p-4 h-24 flex items-center justify-center transition-all duration-300 border border-gray-100">
                {/* Ajouter les vraies images des logos plus tard */}
                <div className="text-center">
                  <div className="w-full h-12 flex items-center justify-center text-[#003566] text-xl">
                    <i className="fas fa-building"></i>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{partner.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bouton d'action */}
      <div className="text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <a 
            href="/devis" 
            className="inline-flex items-center bg-[#003566] text-white hover:bg-[#002a4f] py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Rejoignez nos clients satisfaits
            <i className="fas fa-arrow-right ml-3"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerLogos;
