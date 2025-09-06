# Configuration Render pour BorneFlix

## Variables d'environnement à configurer sur Render

Pour déployer l'application sur Render, vous devez configurer les variables d'environnement suivantes dans votre dashboard Render :

### Variables d'environnement requises

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

## Comment configurer sur Render

1. Connectez-vous à votre dashboard Render
2. Sélectionnez votre service web
3. Allez dans l'onglet "Environment"
4. Ajoutez chaque variable d'environnement :
   - Cliquez sur "Add Environment Variable"
   - Saisissez le nom de la variable (ex: `VITE_BREVO_API_KEY`)
   - Saisissez la valeur correspondante
   - Cliquez sur "Save Changes"

## Redéploiement

Après avoir ajouté les variables d'environnement :
1. Allez dans l'onglet "Manual Deploy"
2. Cliquez sur "Deploy latest commit"
3. Attendez que le déploiement se termine

## Vérification

Une fois déployé, testez les formulaires :
- Formulaire de contact : `/contact`
- Formulaire de devis : `/devis`

Les emails devraient être envoyés à `sami.baccouche1998@gmail.com` avec les templates HTML configurés.

## Sécurité

⚠️ **Important** : Les variables d'environnement avec le préfixe `VITE_` sont exposées côté client. Assurez-vous que :
- L'API key Brevo a les bonnes permissions
- Vous surveillez l'utilisation de l'API
- Vous avez configuré les limites de taux sur Brevo si nécessaire
