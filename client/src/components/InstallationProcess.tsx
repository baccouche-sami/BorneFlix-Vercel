import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button-unified';

const InstallationProcess = () => {
  const steps = [
    {
      number: '01',
      title: 'Étude Technique',
      description: 'Analyse complète de votre infrastructure électrique et recommandations personnalisées',
      duration: '1-2 semaines',
      icon: 'fas fa-clipboard-check',
      color: 'bg-[#8dc63f]',
    },
    {
      number: '02',
      title: 'Proposition Commerciale',
      description: 'Devis détaillé avec toutes les aides financières et options de financement',
      duration: '48h',
      icon: 'fas fa-file-contract',
      color: 'bg-[#003566]',
    },
    {
      number: '03',
      title: 'Validation Syndic',
      description: 'Accompagnement pour la présentation en assemblée générale',
      duration: '1-2 mois',
      icon: 'fas fa-handshake',
      color: 'bg-[#ff6b35]',
    },
    {
      number: '04',
      title: 'Installation',
      description: 'Installation par nos équipes certifiées IRVE en conditions réelles',
      duration: '1-3 semaines',
      icon: 'fas fa-tools',
      color: 'bg-[#8dc63f]',
    },
    {
      number: '05',
      title: 'Mise en Service',
      description: 'Tests et formation des utilisateurs pour une utilisation optimale',
      duration: '24h',
      icon: 'fas fa-rocket',
      color: 'bg-[#003566]',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-[#003566]/10 text-[#003566] px-4 py-2 rounded-full text-sm font-medium mb-6">
            Notre processus
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003566] mb-6 leading-tight">
            Installation en 5 étapes simples
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Un processus éprouvé qui garantit une installation réussie et un accompagnement 
            personnalisé à chaque étape de votre projet.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#8dc63f] via-[#003566] to-[#ff6b35] transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  {/* Step Number */}
                  <div className={`${step.color} text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto lg:mx-0`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`${step.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6`}>
                    <i className={`${step.icon} text-2xl`}></i>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center lg:text-left">
                    <h3 className="text-xl font-bold text-[#003566] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      <i className="fas fa-clock mr-2"></i>
                      {step.duration}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline for Mobile */}
        <div className="lg:hidden mt-12">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className={`${step.color} text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#003566] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-2 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    <i className="fas fa-clock mr-2"></i>
                    {step.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-[#003566]/5 to-[#8dc63f]/5 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#003566] mb-4">
              Prêt à commencer votre projet ?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Notre équipe d'experts est là pour vous accompagner à chaque étape 
              et vous garantir une installation réussie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg"
                icon={<i className="fas fa-play" />}
                onClick={() => window.location.href = '/devis'}
              >
                Démarrer l'étude gratuite
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                icon={<i className="fas fa-calendar" />}
                onClick={() => window.location.href = '/contact'}
              >
                Prendre rendez-vous
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstallationProcess; 