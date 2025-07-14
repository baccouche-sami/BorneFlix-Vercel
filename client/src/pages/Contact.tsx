import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Phone, Mail, MapPin, Clock, Send, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.title = "Contact BorneFlix - Nous contacter pour vos bornes de recharge";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contactez BorneFlix pour vos projets de bornes de recharge. Équipe d\'experts disponible pour vous accompagner. Devis gratuit et sans engagement.');
    }
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      value: "01 80 91 90 80",
      description: "Lun-Ven 9h-18h",
      color: "text-blue-600"
    },
    {
      icon: Mail,
      title: "Email",
      value: "contact@borneflix.fr",
      description: "Réponse sous 24h",
      color: "text-green-600"
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "3 Av. des Orangers",
      description: "94380 Bonneuil-sur-Marne",
      color: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Horaires",
      value: "Lundi - Vendredi",
      description: "9h00 - 18h00",
      color: "text-orange-600"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", color: "bg-[#0077B5] hover:bg-[#005885]", label: "LinkedIn" },
    { icon: Twitter, href: "#", color: "bg-[#1DA1F2] hover:bg-[#0d8ad6]", label: "Twitter" },
    { icon: Facebook, href: "#", color: "bg-[#4267B2] hover:bg-[#365899]", label: "Facebook" },
    { icon: Instagram, href: "#", color: "bg-gradient-to-tr from-[#f09433] to-[#e6683c] via-[#dc2743] hover:opacity-90", label: "Instagram" }
  ];

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
    
    // Simuler un envoi de données avec un délai
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Réinitialiser le formulaire
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
    
    // Afficher une notification de succès (simulation)
    alert("Message envoyé ! Nous vous contacterons dans les plus brefs délais.");
    
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#ff6b35] via-[#ff8c42] to-[#ffa726] text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Contactez
              <span className="block text-[#003566]">BorneFlix</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
              Notre équipe d'experts est là pour vous accompagner 
              <br className="hidden md:block" />
              dans votre projet de borne de recharge
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#003566] hover:bg-[#00264d] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Nous contacter
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-[#ff6b35]"
                onClick={() => window.location.href = '/devis'}
              >
                Demander un devis
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Éléments décoratifs */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#003566]/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-[#003566]/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#003566] mb-4">
              Contactez Notre Équipe
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nos experts sont disponibles pour répondre à toutes vos questions 
              et vous accompagner dans votre projet
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Informations de contact */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#003566] mb-6">Nos coordonnées</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-6 h-6 text-[#ff6b35]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#003566] mb-1">{info.title}</p>
                        <p className="text-lg text-gray-700 mb-1">{info.value}</p>
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold mb-4 text-[#003566]">Suivez-nous</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 rounded-full ${social.color} flex items-center justify-center text-white transition-all duration-300`}
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#003566] to-[#1a4d85] rounded-xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Pourquoi nous choisir ?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#8dc63f] rounded-full mr-3"></div>
                    Expertise technique reconnue
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#8dc63f] rounded-full mr-3"></div>
                    Accompagnement complet du projet
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#8dc63f] rounded-full mr-3"></div>
                    Solutions sur mesure
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#8dc63f] rounded-full mr-3"></div>
                    Support technique 7j/7
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Formulaire de contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#003566] mb-6">Envoyez-nous un message</h3>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all duration-300"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all duration-300"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all duration-300"
                      placeholder="01 23 45 67 89"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Décrivez votre projet ou posez-nous vos questions..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#ff6b35] hover:bg-[#ff8c42] text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-[#003566] to-[#1a4d85] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rejoignez nos clients satisfaits et bénéficiez de nos solutions 
              de recharge intelligentes dès 299€
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#ff6b35] hover:bg-[#ff8c42] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/devis'}
              >
                Demander un devis gratuit
                <ChevronRight className="inline ml-2 w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-[#003566]"
                onClick={() => window.location.href = '/solutions'}
              >
                Découvrir nos solutions
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage; 