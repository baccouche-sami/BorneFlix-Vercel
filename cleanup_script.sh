#!/bin/bash

# Script de nettoyage pour le projet BorneFlix
echo "🧹 Début du nettoyage du projet BorneFlix..."

# Créer le dossier de sauvegarde
mkdir -p _to_delete/images_unused
mkdir -p _to_delete/duplicates
mkdir -p _to_delete/public_unused

# 1. Déplacer les images non utilisées (captures d'écran)
echo "📸 Déplacement des captures d'écran non utilisées..."
find . -path "./node_modules" -prune -o -path "./.yarn" -prune -o -path "./_to_delete" -prune -o -name "*Capture*" -print | while read file; do
    if [ -f "$file" ]; then
        mv "$file" _to_delete/images_unused/
        echo "  → Déplacé: $file"
    fi
done

find . -path "./node_modules" -prune -o -path "./.yarn" -prune -o -path "./_to_delete" -prune -o -name "*screencapture*" -print | while read file; do
    if [ -f "$file" ]; then
        mv "$file" _to_delete/images_unused/
        echo "  → Déplacé: $file"
    fi
done

find . -path "./node_modules" -prune -o -path "./.yarn" -prune -o -path "./_to_delete" -prune -o -name "*screenshot*" -print | while read file; do
    if [ -f "$file" ]; then
        mv "$file" _to_delete/images_unused/
        echo "  → Déplacé: $file"
    fi
done

# 2. Déplacer les images dupliquées du dossier public
echo "🔄 Déplacement des images dupliquées du dossier public..."
if [ -f "public/station-solaire.jpg" ]; then mv "public/station-solaire.jpg" _to_delete/duplicates/; fi
if [ -f "public/user.png" ]; then mv "public/user.png" _to_delete/duplicates/; fi
if [ -f "public/installation.jpg" ]; then mv "public/installation.jpg" _to_delete/duplicates/; fi
if [ -f "public/logo.svg" ]; then mv "public/logo.svg" _to_delete/duplicates/; fi
if [ -f "public/readytoplug.svg" ]; then mv "public/readytoplug.svg" _to_delete/duplicates/; fi
if [ -f "public/signature-contrat.jpg" ]; then mv "public/signature-contrat.jpg" _to_delete/duplicates/; fi
if [ -f "public/borne-recharge.jpg" ]; then mv "public/borne-recharge.jpg" _to_delete/duplicates/; fi
if [ -f "public/circular-image.svg" ]; then mv "public/circular-image.svg" _to_delete/duplicates/; fi
if [ -f "public/evcharging.svg" ]; then mv "public/evcharging.svg" _to_delete/duplicates/; fi
if [ -f "public/features-grid.svg" ]; then mv "public/features-grid.svg" _to_delete/duplicates/; fi
if [ -f "public/hero.svg" ]; then mv "public/hero.svg" _to_delete/duplicates/; fi

# 3. Déplacer les images dupliquées dans client/src/public
echo "📁 Déplacement des images dupliquées dans client/src/public..."
if [ -d "client/src/public" ]; then
    mv client/src/public/* _to_delete/public_unused/ 2>/dev/null || true
fi

# 4. Déplacer les images dupliquées dans public/images
echo "🖼️ Déplacement des images dupliquées dans public/images..."
if [ -d "public/images" ]; then
    mv public/images/* _to_delete/public_unused/ 2>/dev/null || true
fi

# 5. Supprimer les dossiers vides
echo "🗑️ Suppression des dossiers vides..."
find . -type d -empty -delete 2>/dev/null || true

echo "✅ Nettoyage terminé !"
echo "📊 Fichiers déplacés vers _to_delete/"
echo "   - images_unused/: Images non utilisées"
echo "   - duplicates/: Images dupliquées"
echo "   - public_unused/: Images du dossier public" 