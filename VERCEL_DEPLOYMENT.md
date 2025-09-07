# Déploiement sur Vercel - BorneFlix

## Configuration requise

### Variables d'environnement

Configurez les variables d'environnement suivantes dans votre dashboard Vercel :

1. **VITE_BREVO_API_KEY**
   - Valeur : `***REMOVED***`
   - Description : Clé API Brevo pour l'envoi d'emails

2. **VITE_BREVO_SENDER_EMAIL**
   - Valeur : `noreply@borneflix.fr`
   - Description : Email expéditeur des emails

3. **VITE_BREVO_SENDER_NAME**
   - Valeur : `BorneFlix`
   - Description : Nom de l'expéditeur

4. **VITE_BREVO_RECIPIENT_EMAIL**
   - Valeur : `sami.baccouche1998@gmail.com`
   - Description : Email destinataire des formulaires

## Étapes de déploiement

### 1. Connexion à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur "New Project"

### 2. Import du projet

1. Sélectionnez votre repository `BorneFlix`
2. Vercel détectera automatiquement que c'est une application Vite
3. Les paramètres suivants seront automatiquement configurés :
   - **Framework Preset** : Vite
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

### 3. Configuration des variables d'environnement

1. Dans la section "Environment Variables"
2. Ajoutez chaque variable d'environnement :
   - Cliquez sur "Add"
   - Saisissez le nom (ex: `VITE_BREVO_API_KEY`)
   - Saisissez la valeur correspondante
   - Sélectionnez "Production", "Preview", et "Development"
   - Cliquez sur "Save"

### 4. Déploiement

1. Cliquez sur "Deploy"
2. Attendez que le build se termine
3. Votre application sera disponible à l'URL fournie par Vercel

## Configuration automatique

Le fichier `vercel.json` est déjà configuré avec :
- Redirection de toutes les routes vers `index.html` (SPA)
- Configuration des variables d'environnement
- Optimisations pour Vite

## Test après déploiement

1. Visitez votre URL Vercel
2. Testez le formulaire de contact : `/contact`
3. Testez le formulaire de devis : `/devis`
4. Vérifiez que les emails arrivent à `sami.baccouche1998@gmail.com`

## Domaine personnalisé (optionnel)

1. Dans votre dashboard Vercel
2. Allez dans "Settings" > "Domains"
3. Ajoutez votre domaine personnalisé
4. Configurez les DNS selon les instructions Vercel

## Avantages de Vercel

- ✅ Déploiement automatique à chaque push
- ✅ CDN global pour des performances optimales
- ✅ HTTPS automatique
- ✅ Preview deployments pour les PR
- ✅ Analytics intégrés
- ✅ Optimisations automatiques

## Support

En cas de problème :
1. Vérifiez les logs de build dans Vercel
2. Assurez-vous que toutes les variables d'environnement sont configurées
3. Testez localement avec `npm run dev`
