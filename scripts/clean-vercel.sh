#!/bin/bash

# Script de nettoyage pour résoudre les problèmes de déploiement Vercel
# Supprime les caches et fichiers temporaires qui peuvent causer des problèmes

set -e

echo "🧹 Nettoyage pour déploiement Vercel"
echo "===================================="

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# 1. Nettoyer les dossiers de build
print_status "Nettoyage des dossiers de build..."
rm -rf dist/
rm -rf build/
rm -rf .next/
rm -rf out/
print_success "Dossiers de build nettoyés"

# 2. Nettoyer les caches
print_status "Nettoyage des caches..."
rm -rf .vite/
rm -rf .cache/
rm -rf .parcel-cache/
rm -rf node_modules/.cache/
print_success "Caches nettoyés"

# 3. Nettoyer les fichiers temporaires
print_status "Nettoyage des fichiers temporaires..."
rm -rf tmp/
rm -rf temp/
rm -f *.log
rm -f *.pid
rm -f *.tsbuildinfo
print_success "Fichiers temporaires nettoyés"

# 4. Nettoyer les caches npm/yarn
print_status "Nettoyage des caches de packages..."
npm cache clean --force 2>/dev/null || true
rm -rf .npm/
rm -f .yarn-integrity
print_success "Caches de packages nettoyés"

# 5. Nettoyer les fichiers de développement
print_status "Nettoyage des fichiers de développement..."
rm -rf _to_delete/
rm -f cleanup_script.sh
print_success "Fichiers de développement nettoyés"

# 6. Vérifier les fichiers critiques
print_status "Vérification des fichiers critiques..."
CRITICAL_FILES=(
    "package.json"
    "vercel.json"
    "vite.config.ts"
    "client/index.html"
    "server/index.ts"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_success "✓ $file"
    else
        print_error "✗ $file manquant"
        exit 1
    fi
done

# 7. Vérifier la configuration Vercel
print_status "Vérification de la configuration Vercel..."
if [ -f "vercel.json" ]; then
    if jq empty vercel.json 2>/dev/null; then
        print_success "vercel.json est valide"
    else
        print_error "vercel.json contient des erreurs JSON"
        exit 1
    fi
else
    print_error "vercel.json manquant"
    exit 1
fi

# 8. Nettoyer les variables d'environnement locales
print_status "Nettoyage des variables d'environnement locales..."
if [ -f ".env" ]; then
    print_warning "Fichier .env détecté - sera ignoré par Vercel"
fi

# 9. Vérifier les dépendances
print_status "Vérification des dépendances..."
if [ ! -d "node_modules" ]; then
    print_warning "node_modules manquant - installation..."
    npm install
else
    print_success "Dépendances présentes"
fi

# 10. Test de build rapide
print_status "Test de build rapide..."
if npm run build:client --silent; then
    print_success "Build client réussi"
else
    print_error "Échec du build client"
    exit 1
fi

# 11. Nettoyer après le test
rm -rf dist/

echo ""
echo "===================================="
print_success "🎉 Nettoyage terminé avec succès !"
echo ""
print_status "Prochaines étapes :"
echo "1. Commitez les changements : git add . && git commit -m 'Fix Vercel deployment'"
echo "2. Poussez vers GitHub : git push"
echo "3. Déployez sur Vercel : vercel --prod"
echo ""
print_status "Les problèmes de cache et d'installation répétée devraient être résolus."
echo "====================================" 