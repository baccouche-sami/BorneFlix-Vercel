#!/bin/bash

# Script de déploiement BorneFlix sur O2switch
# Usage: ./scripts/deploy-o2switch.sh

set -e

echo "🚀 Déploiement BorneFlix sur O2switch"
echo "======================================"

# Variables
REMOTE_HOST="your-domain.com"
REMOTE_USER="your-username"
REMOTE_PATH="/home/$REMOTE_USER/public_html"
LOCAL_DIST="dist"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Vérifier les prérequis
step "Vérification des prérequis..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    error "Node.js n'est pas installé"
    exit 1
fi

# Vérifier npm
if ! command -v npm &> /dev/null; then
    error "npm n'est pas installé"
    exit 1
fi

# Vérifier les dépendances
if [ ! -f "package.json" ]; then
    error "package.json non trouvé"
    exit 1
fi

log "Prérequis vérifiés ✅"

# Build de l'application
step "Build de l'application..."

# Nettoyer le dossier dist
if [ -d "$LOCAL_DIST" ]; then
    rm -rf "$LOCAL_DIST"
    log "Dossier dist nettoyé"
fi

# Installer les dépendances
log "Installation des dépendances..."
npm install

# Build pour O2switch
log "Build pour O2switch..."
npm run build:o2switch

# Vérifier que le build a réussi
if [ ! -f "$LOCAL_DIST/index.js" ]; then
    error "Build échoué - index.js non trouvé"
    exit 1
fi

if [ ! -f "$LOCAL_DIST/client/dist/index.html" ]; then
    error "Build échoué - index.html non trouvé"
    exit 1
fi

log "Build réussi ✅"

# Préparer les fichiers pour upload
step "Préparation des fichiers..."

# Créer un dossier temporaire pour l'upload
TEMP_DIR="temp_deploy"
if [ -d "$TEMP_DIR" ]; then
    rm -rf "$TEMP_DIR"
fi
mkdir -p "$TEMP_DIR"

# Copier les fichiers nécessaires
cp -r "$LOCAL_DIST"/* "$TEMP_DIR/"
cp package.json "$TEMP_DIR/"
cp ecosystem.config.js "$TEMP_DIR/"
cp public_html/.htaccess "$TEMP_DIR/"

# Créer le fichier .env de production (à personnaliser)
cat > "$TEMP_DIR/.env" << EOF
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
EOF

warn "⚠️  N'oubliez pas de personnaliser le fichier .env avec vos vraies valeurs !"

log "Fichiers préparés ✅"

# Upload sur O2switch
step "Upload sur O2switch..."

# Vérifier la connexion SSH
if ! ssh -o ConnectTimeout=10 "$REMOTE_USER@$REMOTE_HOST" "echo 'Connexion SSH OK'" 2>/dev/null; then
    error "Impossible de se connecter à $REMOTE_HOST"
    error "Vérifiez vos identifiants SSH et la connectivité"
    exit 1
fi

# Créer une sauvegarde sur le serveur
log "Création d'une sauvegarde..."
ssh "$REMOTE_USER@$REMOTE_HOST" "cd $REMOTE_PATH && tar -czf backup_$(date +%Y%m%d_%H%M%S).tar.gz . 2>/dev/null || true"

# Upload des fichiers
log "Upload des fichiers..."
rsync -avz --delete "$TEMP_DIR/" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

log "Upload terminé ✅"

# Configuration sur le serveur
step "Configuration sur le serveur..."

# Script de configuration à exécuter sur le serveur
ssh "$REMOTE_USER@$REMOTE_HOST" << 'EOF'
cd /home/$USER/public_html

echo "📦 Installation des dépendances..."
npm install --production

echo "🗄️  Test de la base de données..."
# Tester la connexion à la base de données
if node -e "
const mysql = require('mysql2/promise');
async function test() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'borneflix'
    });
    await connection.ping();
    console.log('✅ Database connection successful');
    await connection.end();
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}
test();
"; then
  echo "✅ Base de données OK"
else
  echo "❌ Problème avec la base de données"
  echo "Vérifiez vos paramètres dans le fichier .env"
fi

echo "🚀 Configuration PM2..."
# Installer PM2 si pas déjà installé
npm install -g pm2 2>/dev/null || true

# Arrêter l'ancienne instance si elle existe
pm2 stop borneflix 2>/dev/null || true
pm2 delete borneflix 2>/dev/null || true

# Démarrer la nouvelle instance
pm2 start ecosystem.config.js --env production

# Sauvegarder la configuration PM2
pm2 save

# Configurer le démarrage automatique
pm2 startup 2>/dev/null || true

echo "📊 Statut PM2 :"
pm2 status

echo "📝 Logs récents :"
pm2 logs borneflix --lines 10
EOF

# Nettoyage local
step "Nettoyage..."

rm -rf "$TEMP_DIR"
log "Nettoyage terminé ✅"

# Test de l'application
step "Test de l'application..."

echo "🧪 Test de l'application..."
sleep 5

# Tester l'API
if curl -s "http://$REMOTE_HOST/api/health" > /dev/null 2>&1; then
    log "✅ API fonctionnelle"
else
    warn "⚠️  API non accessible - vérifiez les logs PM2"
fi

# Tester la page d'accueil
if curl -s "http://$REMOTE_HOST" > /dev/null 2>&1; then
    log "✅ Page d'accueil accessible"
else
    warn "⚠️  Page d'accueil non accessible"
fi

echo ""
echo "🎉 Déploiement terminé !"
echo "========================"
echo "🌐 Site: http://$REMOTE_HOST"
echo "🔧 API: http://$REMOTE_HOST/api"
echo "📊 PM2: pm2 status (sur le serveur)"
echo "📝 Logs: pm2 logs borneflix (sur le serveur)"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Configurer SSL/HTTPS"
echo "2. Configurer le domaine"
echo "3. Tester tous les formulaires"
echo "4. Configurer les sauvegardes"
echo "5. Monitorer les performances"
echo ""
echo "🔧 En cas de problème :"
echo "- Vérifier les logs: pm2 logs borneflix"
echo "- Redémarrer: pm2 restart borneflix"
echo "- Vérifier la base de données"
echo "- Vérifier les permissions des fichiers" 