import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import SolutionsPage from "@/pages/Solutions";
import AvantagesPage from "@/pages/Avantages";
import RealisationsPage from "@/pages/Realisations";
import FAQPage from "@/pages/FAQ";
import DevisPage from "@/pages/Devis";
import ContactPage from "@/pages/Contact";
import MentionsLegales from "@/pages/MentionsLegales";
import PolitiqueConfidentialite from "@/pages/PolitiqueConfidentialite";
import ConditionsUtilisation from "@/pages/ConditionsUtilisation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTopButton from "./components/BackToTopButton";
import ChatbotFAQ from "./components/ChatbotFAQ";
import CookieConsent from "./components/CookieConsent";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/solutions" component={SolutionsPage} />
      <Route path="/avantages" component={AvantagesPage} />
      <Route path="/realisations" component={RealisationsPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/devis" component={DevisPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/mentions-legales" component={MentionsLegales} />
      <Route path="/politique-confidentialite" component={PolitiqueConfidentialite} />
      <Route path="/conditions-utilisation" component={ConditionsUtilisation} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Header />
        <Router />
        <Footer />
        <ChatbotFAQ />
        <CookieConsent />
        <ScrollToTop />
        <BackToTopButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
