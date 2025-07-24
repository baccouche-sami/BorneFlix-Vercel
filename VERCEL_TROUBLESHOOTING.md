# Guide de Dépannage Vercel - BorneFlix

## 🚨 **Problème : Installation répétée de fichiers**

### **Symptômes :**
- Vercel installe un fichier à chaque déploiement
- Builds lents et répétitifs
- Cache non respecté
- Déploiements qui échouent

### **Solutions :**

## 🔧 **Solution 1 : Nettoyage complet**

```bash
# Exécuter le script de nettoyage
./scripts/clean-vercel.sh

# Ou nettoyage manuel
rm -rf dist/ build/ .vite/ .cache/ node_modules/.cache/
npm cache clean --force
```

## 🔧 **Solution 2 : Vérifier la configuration**

### **1. vercel.json optimisé :**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "functions": {
    "server/index.ts": {
      "runtime": "nodejs18.x",
      "maxDuration": 30
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### **2. .vercelignore :**
```bash
# Créer le fichier .vercelignore
node_modules/
dist/
build/
.vite/
.cache/
*.log
.env*
```

## 🔧 **Solution 3 : Scripts de build optimisés**

### **package.json :**
```json
{
  "scripts": {
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build",
    "build:server": "esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --minify --sourcemap=false",
    "vercel-build": "npm run build"
  }
}
```

## 🔧 **Solution 4 : Configuration Vite optimisée**

### **vite.config.ts :**
```typescript
export default defineConfig({
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    sourcemap: false,
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'lucide-react'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          animations: ['@react-three/fiber', '@react-three/drei', 'three'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    exclude: ['@replit/vite-plugin-runtime-error-modal']
  }
});
```

## 🔧 **Solution 5 : Variables d'environnement**

### **Vérifier dans le dashboard Vercel :**
1. Allez dans **Settings** > **Environment Variables**
2. Assurez-vous que toutes les variables sont configurées :
   - `DATABASE_URL`
   - `SENDGRID_API_KEY`
   - `SENDGRID_FROM_EMAIL`
   - `SESSION_SECRET`
   - `NODE_ENV=production`

## 🔧 **Solution 6 : Déploiement manuel**

```bash
# 1. Nettoyer
./scripts/clean-vercel.sh

# 2. Commiter les changements
git add .
git commit -m "Fix Vercel deployment issues"
git push

# 3. Déployer
vercel --prod
```

## 🔧 **Solution 7 : Vérifier les logs**

```bash
# Installer Vercel CLI
npm install -g vercel

# Voir les logs
vercel logs --limit=20

# Voir les logs d'un déploiement spécifique
vercel logs --deployment-url=https://your-app.vercel.app
```

## 🔧 **Solution 8 : Cache Vercel**

### **Forcer un nouveau déploiement :**
```bash
# Ajouter un commentaire pour forcer le rebuild
vercel --prod --force

# Ou via le dashboard Vercel
# Settings > General > Build & Development Settings > Clear Build Cache
```

## 🔧 **Solution 9 : Optimisations avancées**

### **1. Exclure les fichiers inutiles :**
```bash
# .vercelignore
_to_delete/
cleanup_script.sh
scripts/
*.md
!README.md
!DEPLOYMENT.md
```

### **2. Optimiser les dépendances :**
```json
{
  "dependencies": {
    // Garder seulement les dépendances de production
  },
  "devDependencies": {
    // Déplacer les outils de build ici
  }
}
```

### **3. Configuration esbuild optimisée :**
```bash
esbuild server/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outdir=dist \
  --minify \
  --sourcemap=false \
  --target=node18
```

## 🔧 **Solution 10 : Monitoring et Debug**

### **1. Vérifier les métriques :**
- **Build Time** : Doit être < 2 minutes
- **Bundle Size** : Doit être < 5MB
- **Cache Hit Rate** : Doit être > 80%

### **2. Debug des erreurs :**
```bash
# Voir les erreurs de build
vercel logs --error

# Voir les erreurs de runtime
vercel logs --function=server/index.ts
```

## 🚨 **Erreurs courantes et solutions**

### **Erreur : "Build command failed"**
```bash
# Solution : Vérifier les scripts
npm run build:client
npm run build:server
```

### **Erreur : "Function timeout"**
```json
{
  "functions": {
    "server/index.ts": {
      "maxDuration": 30
    }
  }
}
```

### **Erreur : "Module not found"**
```bash
# Solution : Vérifier les alias
# vite.config.ts
resolve: {
  alias: {
    "@": path.resolve(import.meta.dirname, "client", "src"),
    "@shared": path.resolve(import.meta.dirname, "shared"),
  }
}
```

### **Erreur : "Environment variables missing"**
```bash
# Solution : Configurer dans Vercel dashboard
# Settings > Environment Variables
```

## 📊 **Checklist de résolution**

- [ ] **Nettoyage** : Exécuter `./scripts/clean-vercel.sh`
- [ ] **Configuration** : Vérifier `vercel.json`
- [ ] **Scripts** : Tester `npm run build`
- [ ] **Variables** : Configurer les env vars
- [ ] **Cache** : Vider le cache Vercel
- [ ] **Logs** : Vérifier les erreurs
- [ ] **Déploiement** : `vercel --prod`

## 🎯 **Prévention**

### **1. Git hooks :**
```bash
# .git/hooks/pre-commit
npm run check
npm run build:client --silent
```

### **2. CI/CD :**
```yaml
# .github/workflows/deploy.yml
- name: Build
  run: npm run build
- name: Deploy
  run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### **3. Monitoring :**
- **Vercel Analytics** : Activer pour surveiller les performances
- **Error Tracking** : Configurer pour capturer les erreurs
- **Health Checks** : Ajouter des endpoints de santé

## 📞 **Support**

Si les problèmes persistent :

1. **Vercel Support** : https://vercel.com/support
2. **Documentation** : https://vercel.com/docs
3. **Community** : https://github.com/vercel/vercel/discussions

---

**Avec ces solutions, les problèmes de déploiement Vercel devraient être résolus ! 🎉** 