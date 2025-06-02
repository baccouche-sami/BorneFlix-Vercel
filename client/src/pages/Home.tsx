import HeroSection from "@/components/NewHeroSection";
import Introduction from "@/components/Introduction";
import Solutions from "@/components/Solutions";
import Advantages from "@/components/Advantages";
import Process from "@/components/Process";
import ParallaxSection from "@/components/ParallaxSection";
import Testimonials from "@/components/EnhancedTestimonials";

import FAQ from "@/components/ModernFAQ";
import QuoteForm from "@/components/QuoteForm";
import Gallery from "@/components/EnhancedGallery";
import Contact from "@/components/Contact";
import { useEffect } from "react";
import CalendlyScheduler from "@/components/CalendlyScheduler";
import PartnerLogos from "@/components/PartnerLogos";

const Home = () => {
  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash && target.hash !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80, // Adjust for fixed header
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  return (
    <main>
      <HeroSection />
      <Introduction />
      <Solutions />
      <Advantages />
      <Process />
      <ParallaxSection />
      <Testimonials />
      <Gallery /> 
      <PartnerLogos />
      <FAQ />
      <QuoteForm />
      <CalendlyScheduler url="https://calendly.com/sami-baccouche1998/30min" className="h-[650px]" />
      <Contact />
    </main>
  );
};

export default Home;
