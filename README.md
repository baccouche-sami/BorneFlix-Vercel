# BorneFlix - Solutions de Recharge Intelligentes

Application web moderne pour BorneFlix, spécialisée dans les solutions de recharge pour véhicules électriques.

## 🚀 Technologies

- **React 18** - Interface utilisateur
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Wouter** - Routing
- **Radix UI** - Composants accessibles
- **Brevo** - Service d'email
- **Vercel Functions** - API serverless pour l'envoi d'emails

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/baccouche-sami/BorneFlix.git
cd BorneFlix

# Installer les dépendances
npm install

# Créer le fichier d'environnement
cp client/.env.example client/.env

# Éditer les variables d'environnement
nano client/.env
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes (pour Vercel) :

```bash
BREVO_SENDER_EMAIL=noreply@borneflix.fr
BREVO_SENDER_NAME=BorneFlix
BREVO_RECIPIENT_EMAIL=your_email@example.com
```

**Important** : Ces variables sont maintenant sécurisées côté serveur et ne sont plus exposées dans le navigateur.

## 🏗️ Architecture

### API Serverless
L'application utilise maintenant des fonctions serverless Vercel pour l'envoi d'emails :

- `/api/send-contact` - Envoi des emails de contact
- `/api/send-devis` - Envoi des emails de devis

### Sécurité
- Les clés API Brevo sont maintenant stockées côté serveur
- Aucune donnée sensible n'est exposée dans le navigateur
- Validation des données côté serveur

## 🛠️ Scripts

```bash
# Développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview

# Vérification TypeScript
npm run check
```

## 📁 Structure

```
BorneFlix/
├── client/                 # Application React
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/          # Pages de l'application
│   │   ├── lib/            # Utilitaires et services
│   │   ├── hooks/          # Hooks personnalisés
│   │   └── assets/         # Images et ressources
│   ├── public/             # Fichiers statiques
│   └── .env.example        # Exemple de configuration
├── vercel.json             # Configuration Vercel
├── vite.config.ts          # Configuration Vite
└── package.json            # Dépendances et scripts
```

## 🌐 Déploiement

### Vercel (Recommandé)

1. Connectez-vous à [vercel.com](https://vercel.com)
2. Importez votre repository GitHub
3. Configurez les variables d'environnement
4. Déployez automatiquement

Voir [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) pour plus de détails.

## ✨ Fonctionnalités

- 🏠 **Page d'accueil** - Présentation des services
- 📋 **Formulaire de devis** - Demande de devis multi-étapes
- 📞 **Formulaire de contact** - Contact direct
- 🎨 **Design responsive** - Optimisé mobile/desktop
- 📧 **Emails automatiques** - Templates HTML via Brevo
- ⚡ **Performance** - Optimisé pour la vitesse
- 🔒 **Sécurisé** - Variables d'environnement

## 📧 Service Email

L'application utilise Brevo pour l'envoi d'emails :
- Templates HTML élégants
- Envoi automatique des formulaires
- Gestion des erreurs
- Configuration sécurisée

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

- **Email** : contact@borneflix.fr
- **Téléphone** : 01 80 91 90 80
- **Site web** : https://borneflix.fr

---

Développé avec ❤️ pour BorneFlix
