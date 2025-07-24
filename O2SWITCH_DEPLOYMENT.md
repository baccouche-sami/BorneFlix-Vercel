# Déploiement BorneFlix sur O2switch

## 🏗️ **Architecture pour O2switch**

O2switch utilise un hébergement web traditionnel avec Node.js, donc nous devons adapter l'architecture :

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
│  │  • Apache/Nginx (Static files)                      │    │
│  │  • Node.js (API)                                    │    │
│  │  • MySQL/PostgreSQL (Database)                      │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 📋 **Prérequis O2switch**

### **1. Hébergement requis :**
- ✅ **Hébergement mutualisé** avec Node.js
- ✅ **Base de données** MySQL ou PostgreSQL
- ✅ **SSH** activé
- ✅ **Git** disponible

### **2. Informations nécessaires :**
- 🌐 **Nom de domaine** (ex: borneflix.com)
- 🔑 **Identifiants FTP/SSH**
- 🗄️ **Base de données** (host, user, password, database)
- 📧 **Email SMTP** (pour les formulaires)

## 🔧 **Configuration pour O2switch**

### **1. Script de build O2switch**

Créer `package.json` avec les scripts adaptés :

```json
{
  "scripts": {
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build",
    "build:server": "esbuild server/index.ts --platform=node --packages=external --bundle --format=cjs --outdir=dist --minify",
    "start": "NODE_ENV=production node dist/index.js",
    "dev": "tsx server/index.ts"
  }
}
```

### **2. Serveur adapté pour O2switch**

Modifier `server/index.ts` pour O2switch :

```typescript
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handling
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    
    // Serve React app for all non-API routes
    app.get("*", (req, res) => {
      if (!req.path.startsWith("/api")) {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
      }
    });
  } else {
    // Development: setup Vite
    await setupVite(app, server);
  }

  // Start server
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    log(`🚀 BorneFlix server running on port ${port}`);
    log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
})();
```

### **3. Configuration de base de données**

Créer `config/database.ts` :

```typescript
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'borneflix',
});

export const db = drizzle(connection);
```

### **4. Variables d'environnement**

Créer `.env.production` :

```bash
# Database
DB_HOST=localhost
DB_USER=borneflix_user
DB_PASSWORD=your_secure_password
DB_NAME=borneflix_db

# Email (O2switch SMTP)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_USER=contact@borneflix.com
SMTP_PASS=your_email_password

# App
NODE_ENV=production
PORT=3000
SESSION_SECRET=your_session_secret

# External APIs
SENDGRID_API_KEY=your_sendgrid_key
```

## 🚀 **Processus de déploiement**

### **Étape 1 : Préparation locale**

```bash
# 1. Build pour production
npm run build

# 2. Vérifier la structure
ls -la dist/
# Doit contenir :
# - index.js (serveur)
# - client/ (fichiers statiques)
```

### **Étape 2 : Upload sur O2switch**

#### **Option A : Via FTP/SFTP**
```bash
# Connexion FTP
ftp your-domain.com
# Upload des fichiers
put -r dist/* /public_html/
put package.json /public_html/
put .env.production /public_html/.env
```

#### **Option B : Via Git (recommandé)**
```bash
# 1. Créer un repository Git sur O2switch
git init --bare /home/user/repos/borneflix.git

# 2. Ajouter le remote
git remote add o2switch user@your-domain.com:/home/user/repos/borneflix.git

# 3. Push
git push o2switch main
```

### **Étape 3 : Configuration serveur**

#### **1. Installer les dépendances**
```bash
cd /home/user/public_html
npm install --production
```

#### **2. Configurer la base de données**
```sql
-- Créer la base de données
CREATE DATABASE borneflix_db;
CREATE USER 'borneflix_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON borneflix_db.* TO 'borneflix_user'@'localhost';
FLUSH PRIVILEGES;
```

#### **3. Configurer le processus PM2**
```bash
# Installer PM2
npm install -g pm2

# Créer ecosystem.config.js
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'borneflix',
    script: 'dist/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOF

# Démarrer l'application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### **Étape 4 : Configuration Apache/Nginx**

#### **Apache (.htaccess)**
```apache
RewriteEngine On

# Proxy API requests to Node.js
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^api/(.*) http://localhost:3000/api/$1 [P,L]

# Serve static files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

#### **Nginx (nginx.conf)**
```nginx
server {
    listen 80;
    server_name borneflix.com www.borneflix.com;
    root /home/user/public_html/client/dist;
    index index.html;

    # API proxy
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

## 📊 **Monitoring et maintenance**

### **1. Logs**
```bash
# Voir les logs PM2
pm2 logs borneflix

# Voir les logs Apache
tail -f /var/log/apache2/error.log

# Voir les logs Nginx
tail -f /var/log/nginx/error.log
```

### **2. Mise à jour**
```bash
# 1. Pull des changements
git pull origin main

# 2. Build
npm run build

# 3. Redémarrer
pm2 restart borneflix
```

### **3. Sauvegarde**
```bash
# Base de données
mysqldump -u borneflix_user -p borneflix_db > backup_$(date +%Y%m%d).sql

# Fichiers
tar -czf backup_$(date +%Y%m%d).tar.gz /home/user/public_html/
```

## 🔒 **Sécurité**

### **1. SSL/HTTPS**
```bash
# Installer Let's Encrypt
certbot --apache -d borneflix.com -d www.borneflix.com
```

### **2. Firewall**
```bash
# Autoriser seulement les ports nécessaires
ufw allow 80
ufw allow 443
ufw allow 22
ufw enable
```

### **3. Variables d'environnement**
```bash
# Changer les mots de passe par défaut
# Utiliser des clés sécurisées
# Limiter les permissions de base de données
```

## 📈 **Performance**

### **1. Cache**
```bash
# Cache Redis (optionnel)
npm install redis
```

### **2. Compression**
```bash
# Gzip dans Apache/Nginx
# Compression des assets statiques
```

### **3. CDN**
```bash
# Cloudflare pour les assets statiques
# Cache des images et CSS/JS
```

## 🚨 **Dépannage**

### **Problèmes courants :**

#### **1. Port déjà utilisé**
```bash
# Vérifier les processus
netstat -tulpn | grep :3000
# Tuer le processus
kill -9 PID
```

#### **2. Permissions**
```bash
# Corriger les permissions
chmod 755 /home/user/public_html/
chown -R user:user /home/user/public_html/
```

#### **3. Base de données**
```bash
# Tester la connexion
mysql -u borneflix_user -p borneflix_db
# Vérifier les tables
SHOW TABLES;
```

## ✅ **Checklist de déploiement**

- [ ] **Build local** réussi
- [ ] **Base de données** créée et configurée
- [ ] **Variables d'environnement** configurées
- [ ] **Fichiers uploadés** sur O2switch
- [ ] **Dépendances installées** (`npm install --production`)
- [ ] **PM2 configuré** et démarré
- [ ] **Apache/Nginx** configuré
- [ ] **SSL/HTTPS** activé
- [ ] **Domain** pointé vers O2switch
- [ ] **Tests** des API endpoints
- [ ] **Monitoring** configuré
- [ ] **Sauvegarde** mise en place

## 🎯 **Résultat attendu**

Après déploiement, vous devriez avoir :
- ✅ **Site accessible** sur https://borneflix.com
- ✅ **API fonctionnelle** sur /api/*
- ✅ **Formulaires** qui envoient des emails
- ✅ **Base de données** opérationnelle
- ✅ **Performance** optimisée
- ✅ **Sécurité** renforcée

---

**BorneFlix sera déployé avec succès sur O2switch ! 🚀** 