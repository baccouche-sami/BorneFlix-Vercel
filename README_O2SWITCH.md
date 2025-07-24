# 🚀 BorneFlix - Déploiement O2switch

## 📋 **Vue d'ensemble**

BorneFlix est maintenant configuré pour être déployé sur O2switch avec une architecture optimisée pour l'hébergement mutualisé traditionnel.

## 🏗️ **Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    BORNE FLIX - O2SWITCH                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📱 CLIENT SIDE                    🖥️ SERVER SIDE           │
│  ┌─────────────────┐              ┌─────────────────┐       │
│  │   React App     │              │   Express API   │       │
│  │   (Static)      │              │   (Node.js)     │       │
│  └─────────────────┘              └─────────────────┘       │
│           │                               │                 │
│           │                               │                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              O2SWITCH SERVER                        │    │
│  │  • Apache (Static files)                            │    │
│  │  • Node.js (API)                                    │    │
│  │  • MySQL (Database)                                 │    │
│  │  • PM2 (Process Manager)                            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## ⚡ **Déploiement Rapide**

### **1. Prérequis**
- ✅ Hébergement O2switch avec Node.js
- ✅ Base de données MySQL
- ✅ SSH activé
- ✅ Nom de domaine configuré

### **2. Configuration en 3 étapes**

#### **Étape 1 : Variables d'environnement**
```bash
# Copier le fichier d'exemple
cp env.o2switch.example .env

# Éditer avec vos vraies valeurs
nano .env
```

#### **Étape 2 : Script de déploiement**
```bash
# Éditer le script
nano scripts/deploy-o2switch.sh

# Modifier ces lignes :
REMOTE_HOST="borneflix.com"
REMOTE_USER="votre_username"
REMOTE_PATH="/home/$REMOTE_USER/public_html"
```

#### **Étape 3 : Déploiement**
```bash
# Test du build
./scripts/test-o2switch-build.sh

# Déploiement
./scripts/deploy-o2switch.sh
```

## 📁 **Structure des fichiers**

```
BorneFlix/
├── 📁 client/                    # Frontend React
│   ├── src/                      # Code source
│   ├── public/                   # Fichiers publics
│   └── index.html                # Point d'entrée
├── 📁 server/                    # Serveur de développement
│   ├── index.ts                  # Serveur principal
│   ├── routes.ts                 # Routes API
│   ├── mailService.ts            # Service email
│   └── vite.ts                   # Configuration Vite
├── 📁 api/                       # Serverless Functions (Vercel)
│   └── server.ts                 # Handler Vercel
├── 📁 config/                    # Configuration
│   └── database.ts               # Configuration DB
├── 📁 scripts/                   # Scripts de déploiement
│   ├── deploy-o2switch.sh        # Déploiement O2switch
│   ├── test-o2switch-build.sh    # Test du build
│   └── clean-vercel.sh           # Nettoyage Vercel
├── 📁 public_html/               # Configuration Apache
│   └── .htaccess                 # Configuration Apache
├── 📄 package.json               # Dépendances et scripts
├── 📄 ecosystem.config.js        # Configuration PM2
├── 📄 env.o2switch.example       # Variables d'environnement
├── 📄 vercel.json                # Configuration Vercel
└── 📄 README_O2SWITCH.md         # Ce fichier
```

## 🔧 **Scripts disponibles**

### **Build**
```bash
# Build pour O2switch
npm run build:o2switch

# Build pour Vercel
npm run build:vercel

# Build client seulement
npm run build:client

# Build serveur seulement
npm run build:server
```

### **Déploiement**
```bash
# Test du build O2switch
./scripts/test-o2switch-build.sh

# Déploiement O2switch
./scripts/deploy-o2switch.sh

# Nettoyage Vercel
./scripts/clean-vercel.sh
```

### **Développement**
```bash
# Serveur de développement
npm run dev

# Vérification TypeScript
npm run check

# Preview de production
npm run preview
```

## 📊 **Configuration de la base de données**

### **1. Créer la base de données**
```sql
CREATE DATABASE borneflix_db;
CREATE USER 'borneflix_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON borneflix_db.* TO 'borneflix_user'@'localhost';
FLUSH PRIVILEGES;
```

### **2. Variables d'environnement**
```bash
# Database
DB_HOST=localhost
DB_USER=borneflix_user
DB_PASSWORD=your_secure_password
DB_NAME=borneflix_db
DB_PORT=3306
DB_SSL=false

# Email (O2switch SMTP)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_USER=contact@borneflix.com
SMTP_PASS=your_email_password
SMTP_SECURE=false

# App
NODE_ENV=production
PORT=3000
SESSION_SECRET=your_session_secret
```

## 🔒 **Sécurité**

### **1. Fichier .htaccess**
- ✅ Proxy API vers Node.js
- ✅ Headers de sécurité
- ✅ Cache des assets
- ✅ Compression Gzip
- ✅ Protection des fichiers sensibles

### **2. Configuration PM2**
- ✅ Redémarrage automatique
- ✅ Gestion des logs
- ✅ Limitation mémoire
- ✅ Variables d'environnement

### **3. Permissions**
```bash
chmod 755 /home/user/public_html/
chmod 644 /home/user/public_html/.env
chown -R user:user /home/user/public_html/
```

## 📈 **Performance**

### **1. Optimisations incluses**
- ✅ **Build optimisé** : Vite + esbuild
- ✅ **Assets minifiés** : CSS, JS, images
- ✅ **Cache configuré** : Headers appropriés
- ✅ **Compression Gzip** : Réduction de la taille
- ✅ **Code splitting** : Chargement optimisé

### **2. Monitoring**
```bash
# Statut PM2
pm2 status

# Logs en temps réel
pm2 logs borneflix

# Monitoring des ressources
pm2 monit
```

## 🚨 **Dépannage**

### **Problèmes courants**

#### **1. Application ne démarre pas**
```bash
# Vérifier les logs
pm2 logs borneflix

# Vérifier les variables d'environnement
cat .env

# Tester manuellement
NODE_ENV=production node dist/index.js
```

#### **2. Base de données inaccessible**
```bash
# Tester la connexion
mysql -u borneflix_user -p borneflix_db

# Vérifier les paramètres
grep DB_ .env
```

#### **3. Emails non envoyés**
```bash
# Tester SMTP
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: 'ssl0.ovh.net',
  port: 587,
  secure: false,
  auth: {
    user: 'contact@borneflix.com',
    pass: 'your_password'
  }
});
transporter.verify(console.log);
"
```

## 📚 **Documentation**

### **Guides détaillés**
- 📖 `O2SWITCH_DEPLOYMENT.md` - Guide complet de déploiement
- ⚡ `O2SWITCH_QUICK_START.md` - Démarrage rapide
- 🔧 `VERCEL_TROUBLESHOOTING.md` - Dépannage Vercel
- 🏗️ `ARCHITECTURE.md` - Architecture complète

### **Configuration**
- 📄 `env.o2switch.example` - Variables d'environnement
- ⚙️ `ecosystem.config.js` - Configuration PM2
- 🌐 `public_html/.htaccess` - Configuration Apache

## ✅ **Checklist de déploiement**

- [ ] **Build testé** avec `./scripts/test-o2switch-build.sh`
- [ ] **Variables d'environnement** configurées dans `.env`
- [ ] **Script de déploiement** modifié avec vos informations
- [ ] **Base de données** créée et accessible
- [ ] **Déploiement effectué** avec `./scripts/deploy-o2switch.sh`
- [ ] **PM2 fonctionne** : `pm2 status`
- [ ] **Site accessible** sur votre domaine
- [ ] **API fonctionnelle** : `/api/health`
- [ ] **Formulaires** envoient des emails
- [ ] **SSL/HTTPS** configuré
- [ ] **Logs surveillés** : `pm2 logs borneflix`

## 🎯 **Résultat final**

Après déploiement, vous aurez :
- ✅ **Site accessible** sur https://borneflix.com
- ✅ **API fonctionnelle** sur /api/*
- ✅ **Formulaires** qui envoient des emails
- ✅ **Base de données** opérationnelle
- ✅ **Performance** optimisée
- ✅ **Sécurité** renforcée
- ✅ **Monitoring** configuré

## 🚀 **Prochaines étapes**

1. **Configurer SSL/HTTPS** avec Let's Encrypt
2. **Configurer les sauvegardes** automatiques
3. **Monitorer les performances** avec PM2
4. **Configurer un CDN** (optionnel)
5. **Mettre en place des alertes** (optionnel)

---

**BorneFlix est prêt pour O2switch ! 🎉**

**Pour toute question, consultez les guides détaillés ou contactez le support.** 