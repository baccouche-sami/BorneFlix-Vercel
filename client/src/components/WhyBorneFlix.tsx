import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card-unified';
import { Button } from '@/components/ui/button-unified';

const WhyBorneFlix = () => {
  const features = [
    {
      icon: 'fas fa-bolt',
      title: 'Installation Rapide',
      description: 'Installation en 24h avec notre équipe certifiée IRVE',
      color: 'text-[#8dc63f]',
      bgColor: 'bg-[#8dc63f]/10',
    },
    {
      icon: 'fas fa-euro-sign',
      title: 'Économies Garanties',
      description: 'Jusqu\'à 50% d\'économies sur votre facture d\'énergie',
      color: 'text-[#003566]',
      bgColor: 'bg-[#003566]/10',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Maintenance Incluse',
      description: 'Supervision 24/7 et maintenance préventive incluse',
      color: 'text-[#ff6b35]',
      bgColor: 'bg-[#ff6b35]/10',
    },
    {
      icon: 'fas fa-headset',
      title: 'Support Premium',
      description: 'Accompagnement personnalisé de A à Z',
      color: 'text-[#8dc63f]',
      bgColor: 'bg-[#8dc63f]/10',
    },
    {
      icon: 'fas fa-certificate',
      title: 'Certification IRVE',
      description: 'Installations conformes aux normes en vigueur',
      color: 'text-[#003566]',
      bgColor: 'bg-[#003566]/10',
    },
    {
      icon: 'fas fa-chart-line',
      title: 'ROI Optimisé',
      description: 'Retour sur investissement en 18-24 mois',
      color: 'text-[#ff6b35]',
      bgColor: 'bg-[#ff6b35]/10',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-medium mb-6">
            Pourquoi choisir BorneFlix ?
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003566] mb-6 leading-tight">
            L'expertise qui fait la différence
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            BorneFlix se distingue par son approche innovante et son expertise reconnue 
            dans l'installation de bornes de recharge intelligentes pour copropriétés.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="elevated" className="h-full">
                <CardContent className="text-center">
                  <div className={`w-16 h-16 ${feature.bgColor} ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <i className={`${feature.icon} text-2xl`}></i>
                  </div>
                  <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-[#003566] to-[#1a4d85] rounded-2xl p-8 lg:p-12 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">+2500</div>
              <div className="text-[#8dc63f] font-medium">Bornes installées</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">+150</div>
              <div className="text-[#8dc63f] font-medium">Copropriétés équipées</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-[#8dc63f] font-medium">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24h</div>
              <div className="text-[#8dc63f] font-medium">Installation moyenne</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#003566] mb-6">
            Prêt à équiper votre copropriété ?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="secondary" 
              size="lg"
              icon={<i className="fas fa-calculator" />}
              onClick={() => window.location.href = '/devis'}
            >
              Devis gratuit en 2 min
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              icon={<i className="fas fa-phone" />}
              onClick={() => window.location.href = '/contact'}
            >
              Parler à un expert
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyBorneFlix; 