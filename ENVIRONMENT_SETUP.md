# Configuration des Variables d'Environnement

## Variables d'environnement requises

Pour que l'application fonctionne correctement, vous devez configurer les variables d'environnement suivantes :

### Variables Brevo (pour l'envoi d'emails)

```bash
VITE_BREVO_API_KEY=your_brevo_api_key_here
VITE_BREVO_SENDER_EMAIL=noreply@borneflix.fr
VITE_BREVO_SENDER_NAME=BorneFlix
VITE_BREVO_RECIPIENT_EMAIL=your_email@example.com
```

## Configuration locale

1. Créez un fichier `.env` dans le répertoire `client/`
2. Ajoutez les variables ci-dessus avec vos vraies valeurs
3. Redémarrez l'application

## Configuration sur Render

1. Allez dans votre dashboard Render
2. Sélectionnez votre service web
3. Allez dans l'onglet "Environment"
4. Ajoutez chaque variable d'environnement :
   - `VITE_BREVO_API_KEY` : Votre clé API Brevo
   - `VITE_BREVO_SENDER_EMAIL` : noreply@borneflix.fr
   - `VITE_BREVO_SENDER_NAME` : BorneFlix
   - `VITE_BREVO_RECIPIENT_EMAIL` : Votre email de réception

## Sécurité

⚠️ **Important** : 
- Ne commitez jamais vos fichiers `.env` 
- Les variables `VITE_*` sont exposées côté client
- Assurez-vous que votre API key Brevo a les bonnes permissions
- Surveillez l'utilisation de votre API Brevo

## Test

Une fois configuré, testez les formulaires :
- Formulaire de contact : `/contact`
- Formulaire de devis : `/devis`

Les emails devraient être envoyés à l'adresse configurée dans `VITE_BREVO_RECIPIENT_EMAIL`.
