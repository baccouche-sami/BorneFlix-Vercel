#!/bin/bash

# Script de test de build pour BorneFlix
# Vérifie que le projet peut être construit correctement avant déploiement

set -e

echo "🚀 Test de build BorneFlix - Préparation au déploiement Vercel"
echo "================================================================"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier que Node.js est installé
print_status "Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js version: $NODE_VERSION"

# Vérifier que npm est installé
print_status "Vérification de npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi

NPM_VERSION=$(npm --version)
print_success "npm version: $NPM_VERSION"

# Vérifier que les dépendances sont installées
print_status "Vérification des dépendances..."
if [ ! -d "node_modules" ]; then
    print_warning "node_modules n'existe pas, installation des dépendances..."
    npm install
else
    print_success "Dépendances déjà installées"
fi

# Vérifier TypeScript
print_status "Vérification TypeScript..."
if ! npx tsc --noEmit; then
    print_error "Erreurs TypeScript détectées"
    exit 1
fi
print_success "TypeScript OK"

# Nettoyer le dossier dist
print_status "Nettoyage du dossier dist..."
rm -rf dist
print_success "Dossier dist nettoyé"

# Test de build client
print_status "Test de build client (Vite)..."
if ! npm run build:client; then
    print_error "Échec du build client"
    exit 1
fi
print_success "Build client réussi"

# Test de build serveur
print_status "Test de build serveur..."
if ! npm run build:server; then
    print_error "Échec du build serveur"
    exit 1
fi
print_success "Build serveur réussi"

# Test de build complet
print_status "Test de build complet..."
if ! npm run build; then
    print_error "Échec du build complet"
    exit 1
fi
print_success "Build complet réussi"

# Vérifier que les fichiers de build existent
print_status "Vérification des fichiers de build..."
if [ ! -f "dist/index.html" ]; then
    print_error "index.html manquant dans dist/"
    exit 1
fi

if [ ! -f "dist/index.js" ]; then
    print_error "index.js manquant dans dist/"
    exit 1
fi

print_success "Fichiers de build présents"

# Vérifier la taille du build
print_status "Analyse de la taille du build..."
BUILD_SIZE=$(du -sh dist | cut -f1)
print_success "Taille du build: $BUILD_SIZE"

# Vérifier les fichiers critiques
print_status "Vérification des fichiers critiques..."
CRITICAL_FILES=(
    "dist/index.html"
    "dist/index.js"
    "dist/assets/"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -e "$file" ]; then
        print_success "✓ $file"
    else
        print_warning "⚠ $file manquant"
    fi
done

# Test de linting (si disponible)
if [ -f "package.json" ] && grep -q "lint" package.json; then
    print_status "Test de linting..."
    if npm run lint; then
        print_success "Linting OK"
    else
        print_warning "Problèmes de linting détectés"
    fi
fi

# Vérification des variables d'environnement
print_status "Vérification des variables d'environnement..."
if [ -f ".env" ]; then
    print_success "Fichier .env présent"
else
    print_warning "Fichier .env manquant (normal pour la production)"
fi

# Vérification de la configuration Vercel
print_status "Vérification de la configuration Vercel..."
if [ -f "vercel.json" ]; then
    print_success "vercel.json présent"
else
    print_error "vercel.json manquant"
    exit 1
fi

# Test de preview (optionnel)
if [ "$1" = "--preview" ]; then
    print_status "Test de preview..."
    if npm run preview &> /dev/null & then
        PREVIEW_PID=$!
        sleep 5
        if curl -s http://localhost:4173 > /dev/null; then
            print_success "Preview fonctionne"
        else
            print_warning "Preview ne répond pas"
        fi
        kill $PREVIEW_PID 2>/dev/null || true
    fi
fi

echo ""
echo "================================================================"
print_success "🎉 Test de build terminé avec succès !"
print_success "Le projet est prêt pour le déploiement sur Vercel"
echo ""
print_status "Prochaines étapes :"
echo "1. Commitez vos changements"
echo "2. Poussez vers GitHub"
echo "3. Déployez sur Vercel : vercel --prod"
echo ""
print_status "Variables d'environnement à configurer sur Vercel :"
echo "- DATABASE_URL"
echo "- SENDGRID_API_KEY"
echo "- SENDGRID_FROM_EMAIL"
echo "- SESSION_SECRET"
echo "- NODE_ENV=production"
echo "================================================================" 