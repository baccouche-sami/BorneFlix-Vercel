import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.svg";
import CookieManager from "./CookieManager";

const Footer = () => {
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gestion de l'inscription à la newsletter
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple de l'email
    if (!newsletterEmail) {
      toast({
        title: "Email requis",
        description: "Veuillez entrer votre adresse email pour vous inscrire à la newsletter.",
        variant: "destructive"
      });
      return;
    }
    
    // Vérification simple du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast({
        title: "Format invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: newsletterEmail })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Inscription réussie",
          description: data.message || "Vous êtes désormais inscrit à notre newsletter. Merci !",
        });
        setNewsletterEmail("");
      } else {
        toast({
          title: "Erreur",
          description: data.message || "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription à la newsletter:", error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de contacter le serveur. Veuillez vérifier votre connexion et réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <footer className="bg-[#003566] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* CTA Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-xl mb-12 relative -mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Prêt à équiper votre copropriété ?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-0 text-sm md:text-base">
                Contactez-nous dès maintenant pour obtenir une étude personnalisée et un devis gratuit.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <a href="/devis">
                <Button size="lg" className="bg-[#8dc63f] hover:bg-[#7db52f] text-white font-medium py-4 md:py-6 px-6 md:px-8 rounded-full shadow-lg shadow-[#8dc63f]/30 transition-all duration-300 hover:translate-y-[-2px] text-sm md:text-base">
                  Demander un devis gratuit
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="mb-6">
              <div className="h-10">
                <span className="text-white font-bold text-2xl tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>BORNE<span className="text-[#8dc63f]">FLIX</span></span>
              </div>
            </div>
            <p className="mb-6 text-gray-300 max-w-md">
              Solutions de recharge pour véhicules électriques en copropriété. Installation, maintenance et services personnalisés adaptés à vos besoins.
            </p>
            <div className="flex space-x-4 mb-8">
              <a href="https://linkedin.com/company/borneflix" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://twitter.com/borneflix" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://facebook.com/borneflix" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com/borneflix" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="bg-[#004380] rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <i className="fas fa-headset mr-2 text-secondary"></i>
                Support technique
              </h4>
              <p className="text-sm text-gray-300 mb-2">Assistance disponible 7j/7</p>
              <a href="tel:0180919080" className="text-white text-lg font-bold hover:text-secondary transition-colors">
                01 80 91 90 80
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <span className="w-8 h-1 bg-secondary rounded-full inline-block mr-2"></span>
              Solutions
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/solutions" className="hover:text-secondary transition-colors inline-block">
                  Infrastructure collective
                </a>
              </li>
              <li>
                <a href="/solutions" className="hover:text-secondary transition-colors inline-block">
                  Solution individuelle
                </a>
              </li>
              <li>
                <a href="/solutions" className="hover:text-secondary transition-colors inline-block">
                  Pré-équipement
                </a>
              </li>
              <li>
                <a href="/solutions" className="hover:text-secondary transition-colors inline-block">
                  Supervision
                </a>
              </li>
              <li>
                <a href="/solutions" className="hover:text-secondary transition-colors inline-block">
                  Maintenance
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <span className="w-8 h-1 bg-secondary rounded-full inline-block mr-2"></span>
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="hover:text-secondary transition-colors inline-block">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/solutions" className="hover:text-secondary transition-colors inline-block">
                  Solutions
                </a>
              </li>
              <li>
                <a href="/avantages" className="hover:text-secondary transition-colors inline-block">
                  Avantages
                </a>
              </li>
              <li>
                <a href="/realisations" className="hover:text-secondary transition-colors inline-block">
                  Réalisations
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-secondary transition-colors inline-block">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-secondary transition-colors inline-block">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <span className="w-8 h-1 bg-secondary rounded-full inline-block mr-2"></span>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 w-5 text-center text-secondary"></i>
                <span>3 Av. des Orangers<br/>94380 Bonneuil-sur-Marne, France</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 w-5 text-center text-secondary"></i>
                <a href="tel:0180919080" className="hover:text-secondary transition-colors">
                  01 80 91 90 80
                </a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 w-5 text-center text-secondary"></i>
                <a href="mailto:contact@borneflix.fr" className="hover:text-secondary transition-colors">
                  contact@borneflix.fr
                </a>
              </li>
            </ul>
            
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="px-4 py-2 bg-white/10 text-white rounded-l-md focus:outline-none w-full"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={isSubmitting}
                />
                <button 
                  type="submit"
                  className="bg-secondary hover:bg-green-600 text-white py-2 px-4 rounded-r-md transition-colors flex items-center justify-center min-w-[48px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-paper-plane"></i>
                  )}
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-2">
                Recevez nos conseils et actualités sur la mobilité électrique
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} BorneFlix. Tous droits réservés.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</a>
            <span className="hidden md:inline">|</span>
            <a href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</a>
            <span className="hidden md:inline">|</span>
            <a href="/conditions-utilisation" className="hover:text-white transition-colors">Conditions d'utilisation</a>
            <span className="hidden md:inline">|</span>
            <CookieManager />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
