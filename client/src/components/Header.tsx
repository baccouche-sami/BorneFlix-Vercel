import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Clean up the overflow style when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Force close mobile menu and scroll to top when clicking on a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
    
    // Scroll vers le haut immédiatement
    window.scrollTo(0, 0);
    
    // Double vérification après un court délai
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  return (
    <>
      {/* Fixed top header with top bar and social icons */}
      <header className="fixed w-full z-50 top-0">
        {/* Top bar with contact info and social icons */}
        <div className="w-full bg-gradient-to-r from-[#003566] to-[#1a4d85] text-white py-2 hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
                <a href="tel:0123456789" className="flex items-center text-white hover:text-[#8dc63f] transition-colors text-sm">
                  <i className="fas fa-phone-alt mr-2"></i>
                  <span>01 23 45 67 89</span>
                </a>
                <a href="mailto:contact@borneflix.fr" className="flex items-center text-white hover:text-[#8dc63f] transition-colors text-sm">
                  <i className="fas fa-envelope mr-2"></i>
                  <span>contact@borneflix.fr</span>
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-white hover:text-[#8dc63f] transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white hover:text-[#8dc63f] transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="text-white hover:text-[#8dc63f] transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white hover:text-[#8dc63f] transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main navigation bar - more attractive with better fonts */}
        <div className="w-full bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="flex justify-between items-center">
              {/* Logo with new font style */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center" onClick={handleLinkClick}>
                  <div className="h-6 md:h-8">
                    <span className="text-[#003566] font-bold text-xl md:text-2xl tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      BORNE<span className="text-[#8dc63f]">FLIX</span>
                    </span>
                  </div>
                </Link>
              </div>

              {/* Desktop Nav - clean and attractive */}
              <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <Link href="/solutions" className="text-sm font-medium text-[#003566] hover:text-[#8dc63f] transition-colors border-b-2 border-transparent hover:border-[#8dc63f] pb-1" onClick={handleLinkClick}>
                  Solutions
                </Link>
                <Link href="/avantages" className="text-sm font-medium text-[#003566] hover:text-[#8dc63f] transition-colors border-b-2 border-transparent hover:border-[#8dc63f] pb-1" onClick={handleLinkClick}>
                  Avantages
                </Link>
                <Link href="/realisations" className="text-sm font-medium text-[#003566] hover:text-[#8dc63f] transition-colors border-b-2 border-transparent hover:border-[#8dc63f] pb-1" onClick={handleLinkClick}>
                  Réalisations
                </Link>
                <Link href="/faq" className="text-sm font-medium text-[#003566] hover:text-[#8dc63f] transition-colors border-b-2 border-transparent hover:border-[#8dc63f] pb-1" onClick={handleLinkClick}>
                  FAQ
                </Link>
                <Link href="/contact" className="text-sm font-medium text-[#003566] hover:text-[#8dc63f] transition-colors border-b-2 border-transparent hover:border-[#8dc63f] pb-1" onClick={handleLinkClick}>
                  Contact
                </Link>
                <Link href="/devis" className="text-sm font-medium bg-[#8dc63f] hover:bg-[#7db52f] text-white px-4 md:px-5 py-2 md:py-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md" onClick={handleLinkClick}>
                  Devis gratuit
                </Link>
              </nav>

              {/* Mobile menu button with improved style */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="focus:outline-none p-2 transition-colors duration-300"
                  aria-label="Menu principal"
                  aria-expanded={isMobileMenuOpen}
                >
                  <i className={`${isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'} text-[#003566] text-xl`}></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Simplified banner that looks more elegant */}
        <div className="w-full bg-gradient-to-r from-[#003566] to-[#0056a8] text-white py-2 md:py-3">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              <p className="text-sm md:text-base font-medium text-center sm:text-left">
                Équipez votre copropriété avec des bornes IRVE intelligentes et économisez jusqu'à 50% sur votre facture d'énergie
              </p>
              <div className="flex items-center space-x-3">
                <Link href="/devis" className="bg-[#8dc63f] hover:bg-[#7db52f] text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300" onClick={handleLinkClick}>
                  Devis gratuit
                </Link>
                <a href="tel:0123456789" className="text-white hover:text-[#8dc63f] text-xs md:text-sm transition-colors">
                  <i className="fas fa-phone-alt mr-1"></i>
                  Appeler
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown - Minimalist and attractive */}
        <div 
          className={`md:hidden fixed top-[84px] left-0 right-0 bottom-0 bg-white shadow-lg px-6 pt-6 pb-32 overflow-y-auto transition-transform duration-300 z-40 ${
            isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none'
          }`}
        >
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/solutions" 
              className="flex items-center font-medium text-[#003566] hover:text-[#8dc63f] transition-colors py-3 border-b border-gray-100"
              onClick={handleLinkClick}
            >
              <i className="fas fa-plug text-[#8dc63f] mr-3"></i>
              <span>Solutions</span>
            </Link>
            <Link 
              href="/avantages" 
              className="flex items-center font-medium text-[#003566] hover:text-[#8dc63f] transition-colors py-3 border-b border-gray-100"
              onClick={handleLinkClick}
            >
              <i className="fas fa-star text-[#8dc63f] mr-3"></i>
              <span>Avantages</span>
            </Link>
            <Link 
              href="/realisations" 
              className="flex items-center font-medium text-[#003566] hover:text-[#8dc63f] transition-colors py-3 border-b border-gray-100"
              onClick={handleLinkClick}
            >
              <i className="fas fa-images text-[#8dc63f] mr-3"></i>
              <span>Réalisations</span>
            </Link>
            <Link 
              href="/faq" 
              className="flex items-center font-medium text-[#003566] hover:text-[#8dc63f] transition-colors py-3 border-b border-gray-100"
              onClick={handleLinkClick}
            >
              <i className="fas fa-question-circle text-[#8dc63f] mr-3"></i>
              <span>FAQ</span>
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center font-medium text-[#003566] hover:text-[#8dc63f] transition-colors py-3 border-b border-gray-100"
              onClick={handleLinkClick}
            >
              <i className="fas fa-envelope text-[#8dc63f] mr-3"></i>
              <span>Contact</span>
            </Link>
          </nav>
          
          <div className="mt-8">
            <Link 
              href="/devis" 
              className="bg-[#8dc63f] hover:bg-[#7db52f] text-white font-medium py-3 px-6 rounded-full text-center transition-all duration-300 w-full block shadow-sm hover:shadow-md"
              onClick={handleLinkClick}
            >
              Devis gratuit
            </Link>
          </div>
        </div>
      </header>

      {/* Empty space to offset the fixed header */}
      <div className="h-[140px]"></div>
      
      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Header;
