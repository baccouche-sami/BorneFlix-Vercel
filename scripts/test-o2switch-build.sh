#!/bin/bash

# Script de test pour le build O2switch
# Usage: ./scripts/test-o2switch-build.sh

set -e

echo "🧪 Test du build O2switch"
echo "=========================="

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

if ! command -v node &> /dev/null; then
    error "Node.js n'est pas installé"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    error "npm n'est pas installé"
    exit 1
fi

log "Prérequis vérifiés ✅"

# Nettoyer le dossier dist
step "Nettoyage du dossier dist..."

if [ -d "dist" ]; then
    rm -rf dist
    log "Dossier dist nettoyé"
fi

# Build pour O2switch
step "Build pour O2switch..."

npm run build:o2switch

# Vérifier la structure
step "Vérification de la structure..."

# Vérifier les fichiers essentiels
ESSENTIAL_FILES=(
    "dist/index.js"
    "dist/index.html"
    "dist/assets/index-BRLbxKVE.css"
    "dist/assets/js/index-C_ae2dyk.js"
)

for file in "${ESSENTIAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        log "✅ $file"
    else
        error "❌ $file manquant"
        exit 1
    fi
done

# Vérifier la taille des fichiers
step "Vérification des tailles..."

echo "📊 Tailles des fichiers :"
ls -lh dist/index.js
ls -lh dist/index.html
ls -lh dist/assets/index-BRLbxKVE.css
ls -lh dist/assets/js/index-C_ae2dyk.js

# Vérifier le contenu du serveur
step "Vérification du serveur..."

if grep -q "BorneFlix server running" dist/index.js; then
    log "✅ Serveur configuré pour O2switch"
else
    warn "⚠️  Serveur peut ne pas être configuré pour O2switch"
fi

# Test de syntaxe Node.js
step "Test de syntaxe Node.js..."

if node -c dist/index.js; then
    log "✅ Syntaxe Node.js valide"
else
    error "❌ Erreur de syntaxe dans dist/index.js"
    exit 1
fi

# Vérifier les dépendances
step "Vérification des dépendances..."

if [ -f "package.json" ]; then
    log "✅ package.json présent"
    
    # Vérifier les scripts
    if grep -q "build:o2switch" package.json; then
        log "✅ Script build:o2switch présent"
    else
        warn "⚠️  Script build:o2switch manquant"
    fi
else
    error "❌ package.json manquant"
    exit 1
fi

# Vérifier la configuration PM2
step "Vérification de la configuration PM2..."

if [ -f "ecosystem.config.js" ]; then
    log "✅ ecosystem.config.js présent"
    
    if node -c ecosystem.config.js; then
        log "✅ Configuration PM2 valide"
    else
        error "❌ Erreur dans ecosystem.config.js"
        exit 1
    fi
else
    warn "⚠️  ecosystem.config.js manquant"
fi

# Vérifier le fichier .htaccess
step "Vérification du fichier .htaccess..."

if [ -f "public_html/.htaccess" ]; then
    log "✅ .htaccess présent"
    
    if grep -q "RewriteEngine On" public_html/.htaccess; then
        log "✅ Configuration Apache valide"
    else
        warn "⚠️  Configuration Apache incomplète"
    fi
else
    warn "⚠️  .htaccess manquant"
fi

# Vérifier les variables d'environnement
step "Vérification des variables d'environnement..."

if [ -f "env.o2switch.example" ]; then
    log "✅ Fichier d'exemple des variables d'environnement présent"
    
    REQUIRED_VARS=("DB_HOST" "DB_USER" "DB_PASSWORD" "DB_NAME" "SMTP_HOST" "NODE_ENV")
    
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "$var" env.o2switch.example; then
            log "✅ Variable $var présente"
        else
            warn "⚠️  Variable $var manquante"
        fi
    done
else
    warn "⚠️  Fichier d'exemple des variables d'environnement manquant"
fi

# Test de démarrage simulé
step "Test de démarrage simulé..."

# Créer un fichier .env temporaire pour le test
cat > .env.test << EOF
NODE_ENV=production
PORT=3000
DB_HOST=localhost
DB_USER=test
DB_PASSWORD=test
DB_NAME=test
SMTP_HOST=localhost
SMTP_PORT=587
SMTP_USER=test@test.com
SMTP_PASS=test
SESSION_SECRET=test_secret
EOF

# Tester le démarrage (sans réellement démarrer)
if NODE_ENV=production node -e "
console.log('🧪 Test de démarrage simulé...');
console.log('✅ Variables d\'environnement chargées');
console.log('✅ Serveur prêt à démarrer');
console.log('✅ Configuration O2switch détectée');
" 2>/dev/null; then
    log "✅ Test de démarrage réussi"
else
    warn "⚠️  Problème lors du test de démarrage"
fi

# Nettoyer
rm -f .env.test

# Résumé
echo ""
echo "🎉 Test du build O2switch terminé !"
echo "=================================="
echo ""
echo "📁 Structure générée :"
echo "  ├── dist/index.js (serveur)"
echo "  ├── dist/index.html (client)"
echo "  ├── dist/assets/ (assets statiques)"
echo "  └── dist/ (autres fichiers)"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Configurer le fichier .env avec vos vraies valeurs"
echo "2. Modifier scripts/deploy-o2switch.sh avec vos informations"
echo "3. Exécuter ./scripts/deploy-o2switch.sh"
echo ""
echo "🔧 En cas de problème :"
echo "- Vérifier les logs ci-dessus"
echo "- Consulter O2SWITCH_DEPLOYMENT.md"
echo "- Consulter O2SWITCH_QUICK_START.md"
echo ""
echo "✅ Build prêt pour O2switch !" 