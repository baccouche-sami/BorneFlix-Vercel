import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form submitted:", formData);
    
    // Simuler un envoi de données avec un délai
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Réinitialiser le formulaire
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
    
    // Afficher une notification de succès
    toast({
      title: "Message envoyé !",
      description: "Nous vous contacterons dans les plus brefs délais.",
      variant: "default",
    });
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-[#f8fafc] via-white to-gray-50 relative overflow-hidden">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-40 left-0 w-80 h-80 rounded-full bg-[#8dc63f]/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 rounded-full bg-[#003566]/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-block bg-[#003566]/10 text-[#003566] px-4 md:px-6 py-1 md:py-2 rounded-full text-sm font-medium mb-4 md:mb-6">
            CONTACTEZ-NOUS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-[#003566]">Besoin d'informations ?</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions sur l'installation de bornes IRVE intelligentes 
            <span className="text-[#8dc63f] font-medium"> dès 299€ </span> 
            en copropriété.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-5xl mx-auto">
          <motion.div 
            className="md:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white p-6 md:p-8 rounded-xl shadow-xl h-full border-t-4 border-[#003566] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-[#8dc63f]/10 blur-xl -translate-y-1/4 translate-x-1/4"></div>
              <CardContent className="p-0 relative z-10">
                <h3 className="text-xl font-bold mb-6 text-[#003566]">Nos coordonnées</h3>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#003566]/10 flex items-center justify-center mr-4 text-[#003566]">
                      <i className="fas fa-map-marker-alt text-lg"></i>
                    </div>
                    <div>
                      <p className="font-medium text-[#003566]">Adresse</p>
                      <p className="text-gray-600">3 Av. des Orangers,<br />94380 Bonneuil-sur-Marne, France</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#003566]/10 flex items-center justify-center mr-4 text-[#003566]">
                      <i className="fas fa-phone-alt text-lg"></i>
                    </div>
                    <div>
                      <p className="font-medium text-[#003566]">Téléphone</p>
                      <p className="text-gray-600">01 80 91 90 80</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#003566]/10 flex items-center justify-center mr-4 text-[#003566]">
                      <i className="fas fa-envelope text-lg"></i>
                    </div>
                    <div>
                      <p className="font-medium text-[#003566]">Email</p>
                      <p className="text-gray-600">contact@borneflix.fr</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#003566]/10 flex items-center justify-center mr-4 text-[#003566]">
                      <i className="fas fa-clock text-lg"></i>
                    </div>
                    <div>
                      <p className="font-medium text-[#003566]">Horaires</p>
                      <p className="text-gray-600">Lundi - Vendredi : 9h00 - 18h00</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="font-medium mb-4 text-[#003566]">Suivez-nous</h4>
                  <div className="flex space-x-5">
                    <motion.a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center text-white hover:bg-[#005885] transition-colors duration-300"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:bg-[#0d8ad6] transition-colors duration-300"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fab fa-twitter"></i>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-[#4267B2] flex items-center justify-center text-white hover:bg-[#365899] transition-colors duration-300"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fab fa-facebook-f"></i>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] to-[#e6683c] via-[#dc2743] flex items-center justify-center text-white hover:opacity-90 transition-opacity duration-300"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fab fa-instagram"></i>
                    </motion.a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="md:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white p-6 md:p-8 rounded-xl shadow-xl border-t-4 border-[#8dc63f] overflow-hidden relative">
              <div className="absolute top-0 left-0 w-36 h-36 rounded-full bg-[#003566]/5 blur-xl -translate-x-1/4 -translate-y-1/4"></div>
              <CardContent className="p-0 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#8dc63f]/20 flex items-center justify-center mr-3 text-[#8dc63f]">
                    <i className="fas fa-paper-plane"></i>
                  </div>
                  <h3 className="text-xl font-bold text-[#003566]">Envoyez-nous un message</h3>
                </div>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all duration-300" 
                      placeholder="Votre nom"
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all duration-300" 
                        placeholder="exemple@email.com"
                        required 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all duration-300" 
                        placeholder="01 23 45 67 89"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all duration-300" 
                      placeholder="Décrivez votre projet ou posez vos questions..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="privacy" 
                      className="w-4 h-4 text-[#8dc63f] border-gray-300 rounded focus:ring-[#8dc63f]" 
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      J'accepte que mes données soient traitées conformément à la <a href="#" className="text-[#003566] hover:text-[#8dc63f] hover:underline transition-colors duration-300">politique de confidentialité</a>
                    </label>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-[#003566] hover:bg-[#002548] text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2 animate-spin">
                            <i className="fas fa-circle-notch"></i>
                          </span>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer 
                          <i className="fas fa-paper-plane ml-2"></i>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
