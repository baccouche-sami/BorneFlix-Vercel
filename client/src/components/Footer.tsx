import { Button } from "@/components/ui/button-unified";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* CTA Section */}
        <div className="bg-white rounded-xl p-8 shadow-xl mb-12 relative -mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-[#003566] mb-2">
                Prêt à équiper votre copropriété ?
              </h3>
              <p className="text-gray-600 text-base">
                Contactez-nous dès maintenant pour obtenir une étude personnalisée et un devis gratuit.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Button variant="secondary" size="lg" asChild>
                <a href="/devis">
                  Demander un devis gratuit
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <span className="text-[#003566] font-bold text-2xl tracking-tight bg-white px-3 py-1 rounded">
                BORNE<span className="text-[#8dc63f]">FLIX</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Leader français de l'installation de bornes de recharge IRVE pour copropriétés. 
              Solutions intelligentes et connectées dès 299€.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <i className="fas fa-map-marker-alt text-[#8dc63f] mr-3 w-5"></i>
                <span>3 Av. des Orangers, 94380 Bonneuil-sur-Marne</span>
              </div>
              <div className="flex items-center text-gray-300">
                <i className="fas fa-phone text-[#8dc63f] mr-3 w-5"></i>
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center text-gray-300">
                <i className="fas fa-envelope text-[#8dc63f] mr-3 w-5"></i>
                <span>contact@borneflix.fr</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="/solutions" className="text-gray-300 hover:text-[#8dc63f] transition-colors">
                  Solutions IRVE
                </a>
              </li>
              <li>
                <a href="/avantages" className="text-gray-300 hover:text-[#8dc63f] transition-colors">
                  Avantages
                </a>
              </li>
              <li>
                <a href="/realisations" className="text-gray-300 hover:text-[#8dc63f] transition-colors">
                  Réalisations
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-300 hover:text-[#8dc63f] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="/contact" className="text-gray-300 hover:text-[#8dc63f] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/devis" className="text-gray-300 hover:text-[#8dc63f] transition-colors">
                  Devis gratuit
                </a>
              </li>
              <li>
                <a href="/mentions-legales" className="text-gray-300 hover:text-[#8dc63f] transition-colors">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="/politique-confidentialite" className="text-gray-300 hover:text-[#8dc63f] transition-colors">
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h4 className="text-lg font-semibold mb-6 text-white">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Restez informé des dernières actualités et offres spéciales.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-l-lg focus:border-[#8dc63f] focus:ring-2 focus:ring-[#8dc63f]/20 transition-all duration-300 bg-white text-gray-800"
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  className="rounded-l-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <i className="fas fa-paper-plane"></i>
                  )}
                </Button>
              </div>
            </form>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-[#8dc63f] transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#8dc63f] transition-colors">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#8dc63f] transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#8dc63f] transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © 2024 BorneFlix. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6">
              <a href="/mentions-legales" className="text-gray-300 hover:text-[#8dc63f] text-sm transition-colors">
                Mentions légales
              </a>
              <a href="/politique-confidentialite" className="text-gray-300 hover:text-[#8dc63f] text-sm transition-colors">
                Politique de confidentialité
              </a>
              <a href="/conditions-utilisation" className="text-gray-300 hover:text-[#8dc63f] text-sm transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cookie Manager */}
      <CookieManager />
    </footer>
  );
};

export default Footer;
