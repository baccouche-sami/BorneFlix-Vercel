const FAQ = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Questions fréquentes</h2>
          <p className="text-lg">
            Tout ce que vous devez savoir sur l'installation de bornes IRVE intelligentes 
            <span className="text-[#8dc63f] font-medium"> dès 299€ </span> 
            en copropriété.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Comment se déroule le processus d'installation en copropriété ?</h3>
            <p>
              Le processus commence par une étude technique gratuite, suivie d'une proposition adaptée à votre copropriété. Après approbation en assemblée générale, nous procédons à l'installation de l'infrastructure puis des bornes individuelles selon les besoins des résidents.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Quelles sont les aides financières disponibles ?</h3>
            <p>
              Plusieurs dispositifs d'aide existent, notamment le programme ADVENIR qui peut couvrir jusqu'à 50% des coûts d'installation pour l'infrastructure collective. Les particuliers peuvent également bénéficier de crédits d'impôt et d'aides locales. Nous vous accompagnons dans toutes ces démarches.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Comment fonctionne la facturation de l'électricité ?</h3>
            <p>
              Notre système permet une facturation individuelle précise pour chaque utilisateur. Chaque borne est équipée d'un compteur qui mesure la consommation réelle, et les résidents sont facturés en fonction de leur utilisation effective.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Que se passe-t-il en cas de panne ?</h3>
            <p>
              Nous proposons un service de maintenance avec différentes formules selon vos besoins. Notre équipe technique intervient rapidement en cas de dysfonctionnement. De plus, notre système de supervision à distance permet souvent de résoudre les problèmes sans déplacement.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Quelles sont les puissances de charge disponibles ?</h3>
            <p>
              Nous proposons différentes puissances de charge, généralement de 3,7 kW à 22 kW, adaptées aux besoins des utilisateurs et aux contraintes techniques du bâtiment. Notre système de gestion dynamique de puissance optimise la répartition de l'énergie disponible entre les différentes bornes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
