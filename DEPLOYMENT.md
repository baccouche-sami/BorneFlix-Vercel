# Guide de Déploiement Vercel - BorneFlix

## 🚀 Déploiement sur Vercel

### Prérequis

1. **Compte Vercel** : Créez un compte sur [vercel.com](https://vercel.com)
2. **Repository GitHub** : Assurez-vous que votre code est sur GitHub
3. **Variables d'environnement** : Préparez vos variables d'environnement

### Variables d'Environnement Requises

Configurez ces variables dans votre projet Vercel :

```bash
# Database (PostgreSQL)
DATABASE_URL="postgresql://username:password@host:port/database"

# Email (SendGrid)
SENDGRID_API_KEY="your_sendgrid_api_key"
SENDGRID_FROM_EMAIL="contact@borneflix.fr"

# Session
SESSION_SECRET="your_secure_session_secret"

# Environment
NODE_ENV="production"

# Analytics (optionnel)
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
```

### Étapes de Déploiement

#### 1. Connexion à Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login
```

#### 2. Configuration du Projet

```bash
# Dans le répertoire du projet
vercel

# Suivez les instructions :
# - Connectez votre repository GitHub
# - Configurez les variables d'environnement
# - Définissez le framework (Vite)
```

#### 3. Variables d'Environnement

Dans le dashboard Vercel :

1. Allez dans **Settings** > **Environment Variables**
2. Ajoutez chaque variable d'environnement
3. Sélectionnez **Production**, **Preview**, et **Development**

#### 4. Configuration de la Base de Données

**Option 1 : Neon (Recommandé)**
```bash
# Créez une base de données sur neon.tech
# Copiez l'URL de connexion
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/database"
```

**Option 2 : Supabase**
```bash
# Créez un projet sur supabase.com
# Utilisez l'URL de connexion PostgreSQL
DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"
```

#### 5. Configuration Email

**SendGrid :**
1. Créez un compte sur [sendgrid.com](https://sendgrid.com)
2. Générez une API Key
3. Configurez l'email d'expédition

```bash
SENDGRID_API_KEY="SG.xxxxxxxxxxxxxxxxxxxxx"
SENDGRID_FROM_EMAIL="contact@borneflix.fr"
```

### Configuration Vercel

Le fichier `vercel.json` est déjà configuré avec :

- ✅ **Build Command** : `npm run build`
- ✅ **Output Directory** : `dist`
- ✅ **Framework** : Vite
- ✅ **Headers de sécurité**
- ✅ **Cache optimisé**
- ✅ **Routes API**

### Scripts de Build

```bash
# Build complet (client + server)
npm run build

# Build client uniquement
npm run build:client

# Build server uniquement
npm run build:server

# Preview locale
npm run preview
```

### Optimisations de Performance

#### 1. Code Splitting
- ✅ Chunks séparés pour React, UI, Forms, Animations
- ✅ Lazy loading des composants

#### 2. Cache
- ✅ Assets statiques : 1 an
- ✅ Images et fonts : 1 an
- ✅ HTML : pas de cache

#### 3. Compression
- ✅ Gzip automatique
- ✅ Minification avec Terser
- ✅ Tree shaking activé

### Monitoring et Analytics

#### 1. Vercel Analytics
```bash
# Ajoutez dans votre projet
npm install @vercel/analytics
```

#### 2. Google Analytics
```bash
# Variable d'environnement
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
```

### Sécurité

#### Headers Configurés
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `X-XSS-Protection: 1; mode=block`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Déploiement Automatique

1. **Connectez votre repository GitHub**
2. **Configurez les variables d'environnement**
3. **Déployez automatiquement à chaque push**

### Commandes Utiles

```bash
# Déploiement en production
vercel --prod

# Déploiement en preview
vercel

# Voir les logs
vercel logs

# Ouvrir le dashboard
vercel dashboard

# Variables d'environnement
vercel env ls
vercel env add DATABASE_URL
```

### Troubleshooting

#### Erreur de Build
```bash
# Vérifiez les logs
vercel logs

# Build local pour tester
npm run build
```

#### Erreur de Base de Données
```bash
# Vérifiez la connexion
# Testez l'URL de connexion
# Vérifiez les permissions
```

#### Erreur d'Email
```bash
# Vérifiez SendGrid API Key
# Testez l'envoi d'email
# Vérifiez l'email d'expédition
```

### Support

- 📧 **Email** : contact@borneflix.fr
- 📚 **Documentation** : [vercel.com/docs](https://vercel.com/docs)
- 🐛 **Issues** : GitHub Issues

---

**Bonne chance pour votre déploiement ! 🚀** 