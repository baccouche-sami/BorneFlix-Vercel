import { useEffect } from 'react';
import { useLocation } from 'wouter';

const ScrollToTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll vers le haut immédiatement
    window.scrollTo(0, 0);
    
    // Forcer le scroll même si la page n'a pas encore changé
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    
    const timer2 = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [location]);

  return null;
};

export default ScrollToTop;