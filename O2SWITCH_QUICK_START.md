# 🚀 Déploiement Rapide BorneFlix sur O2switch

## 📋 **Prérequis**

### **1. Hébergement O2switch**
- ✅ **Hébergement mutualisé** avec Node.js
- ✅ **Base de données** MySQL
- ✅ **SSH** activé
- ✅ **Nom de domaine** configuré

### **2. Informations nécessaires**
- 🌐 **Nom de domaine** (ex: borneflix.com)
- 🔑 **Identifiants SSH** (username, password/key)
- 🗄️ **Base de données** (host, user, password, database)
- 📧 **Email SMTP** (pour les formulaires)

## ⚡ **Déploiement en 5 étapes**

### **Étape 1 : Préparation locale**

```bash
# 1. Cloner le projet (si pas déjà fait)
git clone https://github.com/votre-username/BorneFlix.git
cd BorneFlix

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp env.o2switch.example .env
# Éditer .env avec vos vraies valeurs
nano .env
```

### **Étape 2 : Configuration du fichier .env**

```bash
# Exemple de configuration
DB_HOST=localhost
DB_USER=borneflix_user
DB_PASSWORD=votre_mot_de_passe_securise
DB_NAME=borneflix_db

SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_USER=contact@borneflix.com
SMTP_PASS=votre_mot_de_passe_email

NODE_ENV=production
PORT=3000
SESSION_SECRET=votre_cle_secrete_tres_longue
```

### **Étape 3 : Configuration du script de déploiement**

```bash
# Éditer le script de déploiement
nano scripts/deploy-o2switch.sh

# Modifier ces lignes avec vos informations :
REMOTE_HOST="borneflix.com"
REMOTE_USER="votre_username_o2switch"
REMOTE_PATH="/home/$REMOTE_USER/public_html"
```

### **Étape 4 : Build et déploiement**

```bash
# 1. Build pour O2switch
npm run build:o2switch

# 2. Déployer
./scripts/deploy-o2switch.sh
```

### **Étape 5 : Configuration finale**

```bash
# Se connecter au serveur O2switch
ssh votre_username@borneflix.com

# Vérifier que tout fonctionne
pm2 status
pm2 logs borneflix

# Tester l'application
curl http://borneflix.com
curl http://borneflix.com/api/health
```

## 🔧 **Configuration de la base de données**

### **1. Créer la base de données**

```sql
-- Se connecter à MySQL
mysql -u root -p

-- Créer la base de données
CREATE DATABASE borneflix_db;

-- Créer l'utilisateur
CREATE USER 'borneflix_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe_securise';

-- Donner les permissions
GRANT ALL PRIVILEGES ON borneflix_db.* TO 'borneflix_user'@'localhost';
FLUSH PRIVILEGES;

-- Vérifier
SHOW DATABASES;
SELECT User, Host FROM mysql.user WHERE User = 'borneflix_user';
```

### **2. Tester la connexion**

```bash
# Sur le serveur O2switch
mysql -u borneflix_user -p borneflix_db
# Entrer le mot de passe

# Tester une requête simple
SELECT 1;
```

## 📧 **Configuration email**

### **1. Paramètres SMTP O2switch**

```bash
# Dans le fichier .env
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_USER=contact@borneflix.com
SMTP_PASS=votre_mot_de_passe_email
SMTP_SECURE=false
```

### **2. Tester l'envoi d'email**

```bash
# Sur le serveur, tester l'envoi
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: 'ssl0.ovh.net',
  port: 587,
  secure: false,
  auth: {
    user: 'contact@borneflix.com',
    pass: 'votre_mot_de_passe'
  }
});

transporter.sendMail({
  from: 'contact@borneflix.com',
  to: 'test@example.com',
  subject: 'Test BorneFlix',
  text: 'Email de test'
}).then(info => console.log('Email envoyé:', info.messageId));
"
```

## 🔒 **Sécurité**

### **1. SSL/HTTPS**

```bash
# Installer Let's Encrypt (si disponible)
certbot --apache -d borneflix.com -d www.borneflix.com

# Ou configurer manuellement dans le panneau O2switch
```

### **2. Permissions des fichiers**

```bash
# Sur le serveur O2switch
chmod 755 /home/votre_username/public_html/
chmod 644 /home/votre_username/public_html/.env
chown -R votre_username:votre_username /home/votre_username/public_html/
```

### **3. Firewall**

```bash
# Autoriser seulement les ports nécessaires
ufw allow 80
ufw allow 443
ufw allow 22
ufw enable
```

## 📊 **Monitoring**

### **1. Logs PM2**

```bash
# Voir les logs en temps réel
pm2 logs borneflix

# Voir les logs des erreurs
pm2 logs borneflix --err

# Voir les logs des 100 dernières lignes
pm2 logs borneflix --lines 100
```

### **2. Statut de l'application**

```bash
# Voir le statut PM2
pm2 status

# Redémarrer l'application
pm2 restart borneflix

# Arrêter l'application
pm2 stop borneflix

# Démarrer l'application
pm2 start borneflix
```

### **3. Utilisation des ressources**

```bash
# Voir l'utilisation CPU/Mémoire
pm2 monit

# Voir les informations détaillées
pm2 show borneflix
```

## 🚨 **Dépannage**

### **Problème 1 : Application ne démarre pas**

```bash
# Vérifier les logs
pm2 logs borneflix

# Vérifier les variables d'environnement
cat .env

# Tester manuellement
NODE_ENV=production node dist/index.js
```

### **Problème 2 : Base de données inaccessible**

```bash
# Tester la connexion MySQL
mysql -u borneflix_user -p borneflix_db

# Vérifier les paramètres dans .env
grep DB_ .env

# Tester avec Node.js
node -e "
const mysql = require('mysql2/promise');
async function test() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'borneflix_user',
      password: 'votre_mot_de_passe',
      database: 'borneflix_db'
    });
    await connection.ping();
    console.log('✅ Connexion OK');
    await connection.end();
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}
test();
"
```

### **Problème 3 : Emails non envoyés**

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
    pass: 'votre_mot_de_passe'
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log('❌ Erreur SMTP:', error);
  } else {
    console.log('✅ Serveur SMTP prêt');
  }
});
"
```

### **Problème 4 : Site inaccessible**

```bash
# Vérifier que PM2 fonctionne
pm2 status

# Vérifier le port
netstat -tulpn | grep :3000

# Vérifier les logs Apache/Nginx
tail -f /var/log/apache2/error.log
tail -f /var/log/nginx/error.log

# Tester localement sur le serveur
curl http://localhost:3000
```

## 📈 **Optimisation**

### **1. Performance**

```bash
# Activer la compression Gzip
# Configuré dans .htaccess

# Optimiser les images
# Utiliser des formats WebP

# Minifier les assets
# Déjà fait par Vite
```

### **2. Cache**

```bash
# Cache des assets statiques
# Configuré dans .htaccess

# Cache Redis (optionnel)
npm install redis
```

### **3. Monitoring avancé**

```bash
# Installer des outils de monitoring
npm install -g pm2-logrotate
pm2 install pm2-logrotate

# Configurer la rotation des logs
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

## ✅ **Checklist finale**

- [ ] **Build** réussi localement
- [ ] **Variables d'environnement** configurées
- [ ] **Base de données** créée et accessible
- [ ] **Déploiement** effectué
- [ ] **PM2** fonctionne
- [ ] **Site accessible** sur le domaine
- [ ] **API fonctionnelle** (/api/health)
- [ ] **Formulaires** envoient des emails
- [ ] **SSL/HTTPS** configuré
- [ ] **Logs** surveillés
- [ ] **Sauvegarde** configurée

## 🎯 **Résultat attendu**

Après déploiement, vous devriez avoir :
- ✅ **Site accessible** sur https://borneflix.com
- ✅ **API fonctionnelle** sur /api/*
- ✅ **Formulaires** qui envoient des emails
- ✅ **Base de données** opérationnelle
- ✅ **Performance** optimisée
- ✅ **Sécurité** renforcée

---

**BorneFlix est maintenant déployé sur O2switch ! 🚀**

**Pour toute question ou problème, consultez le guide complet : `O2SWITCH_DEPLOYMENT.md`** 