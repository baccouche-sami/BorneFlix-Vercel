import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button-unified";
import { useIsMobile } from "@/hooks/use-mobile";
import { components } from "@/lib/design-system";

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
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6">
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
        
        {/* Main navigation bar */}
        <div className={`w-full bg-white shadow-sm transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center" onClick={handleLinkClick}>
                  <div className="h-8">
                    <span className="text-[#003566] font-bold text-2xl tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      BORNE<span className="text-[#8dc63f]">FLIX</span>
                    </span>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
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
                <Button variant="secondary" size="md" asChild>
                  <Link href="/devis" onClick={handleLinkClick}>
                    Devis gratuit
                  </Link>
                </Button>
              </nav>

              {/* Mobile menu button */}
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

        {/* Banner */}
        <div className="w-full bg-gradient-to-r from-[#003566] to-[#0056a8] text-white py-3">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              <p className="text-sm font-medium text-center sm:text-left">
                Équipez votre copropriété avec des bornes IRVE intelligentes et économisez jusqu'à 50% sur votre facture d'énergie
              </p>
              <div className="flex items-center space-x-3">
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/devis" onClick={handleLinkClick}>
                    Devis gratuit
                  </Link>
                </Button>
                <a href="tel:0123456789" className="text-white hover:text-[#8dc63f] text-sm transition-colors">
                  <i className="fas fa-phone-alt mr-1"></i>
                  Appeler
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden fixed top-[120px] left-0 right-0 bottom-0 bg-white shadow-lg px-6 pt-6 pb-32 overflow-y-auto transition-transform duration-300 z-40 ${
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
              <i className="fas fa-trophy text-[#8dc63f] mr-3"></i>
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
            <div className="pt-4">
              <Button variant="secondary" size="lg" fullWidth asChild>
                <Link href="/devis" onClick={handleLinkClick}>
                  Devis gratuit
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-[120px]"></div>
    </>
  );
};

export default Header;
