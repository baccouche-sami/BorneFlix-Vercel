# Guide de Configuration Calendly pour BorneFlix

## 🚀 Configuration Calendly

### 1. Créer un compte Calendly (Gratuit)
1. Aller sur [calendly.com](https://calendly.com)
2. Créer un compte gratuit avec votre email professionnel
3. Choisir le plan "Free" (suffisant pour commencer)

### 2. Configurer Google Calendar
1. Connecter votre Google Calendar à Calendly
2. Aller dans Settings > Connected Calendars
3. Ajouter votre Google Calendar
4. Configurer les horaires de disponibilité

### 3. Créer les types d'événements

#### Consultation gratuite (30 min)
- **Nom** : Consultation gratuite
- **Durée** : 30 minutes
- **Description** : Échange initial pour comprendre vos besoins et votre projet de borne de recharge
- **URL** : `https://calendly.com/borneflix/consultation-gratuite`

#### Étude technique (60 min)
- **Nom** : Étude technique
- **Durée** : 60 minutes
- **Description** : Visite sur site pour évaluer l'infrastructure et établir un devis détaillé
- **URL** : `https://calendly.com/borneflix/etude-technique`

#### Installation (Variable)
- **Nom** : Installation
- **Durée** : Variable (selon le projet)
- **Description** : Installation et mise en service de votre borne de recharge
- **URL** : `https://calendly.com/borneflix/installation`

#### Maintenance (45 min)
- **Nom** : Maintenance
- **Durée** : 45 minutes
- **Description** : Maintenance préventive et dépannage de votre installation
- **URL** : `https://calendly.com/borneflix/maintenance`

### 4. Configuration des horaires

#### Horaires de disponibilité
- **Lundi - Vendredi** : 9h00 - 18h00
- **Samedi** : 9h00 - 12h00
- **Dimanche** : Fermé

#### Pause déjeuner
- **Lundi - Vendredi** : 12h00 - 13h00

### 5. Personnalisation

#### Questions personnalisées
Ajouter ces questions pour chaque type d'événement :

1. **Nom complet** (obligatoire)
2. **Email** (obligatoire)
3. **Téléphone** (obligatoire)
4. **Adresse de la copropriété** (obligatoire)
5. **Nombre de logements** (optionnel)
6. **Type de projet** (optionnel)
   - Installation collective
   - Installation individuelle
   - Maintenance
   - Autre

#### Messages automatiques
- **Confirmation** : "Merci pour votre rendez-vous. Nous vous contacterons dans les 24h pour confirmer les détails."
- **Rappel** : "Rappel : Votre rendez-vous BorneFlix dans 24h. Contact : 01 86 04 18 02"

### 6. Intégration avec le site

#### URLs à utiliser dans le code
```javascript
const appointmentTypes = [
  {
    id: "consultation",
    calendlyUrl: "https://calendly.com/borneflix/consultation-gratuite"
  },
  {
    id: "etude-technique", 
    calendlyUrl: "https://calendly.com/borneflix/etude-technique"
  },
  {
    id: "installation",
    calendlyUrl: "https://calendly.com/borneflix/installation"
  },
  {
    id: "maintenance",
    calendlyUrl: "https://calendly.com/borneflix/maintenance"
  }
];
```

### 7. Fonctionnalités avancées (Plan Pro - Optionnel)

#### Analytics
- Suivi des conversions
- Statistiques de prise de rendez-vous
- Intégration Google Analytics

#### Automatisation
- Envoi automatique de devis
- Rappels personnalisés
- Intégration CRM

#### Personnalisation avancée
- Logo personnalisé
- Couleurs de la marque
- Domaines personnalisés

### 8. Maintenance

#### Tâches régulières
- Vérifier les disponibilités hebdomadaires
- Mettre à jour les horaires selon les congés
- Analyser les statistiques de prise de RDV

#### Sauvegarde
- Exporter régulièrement les données
- Sauvegarder les configurations

## 🔧 Configuration technique

### Variables d'environnement
```env
CALENDLY_API_KEY=your_api_key_here
CALENDLY_WEBHOOK_SECRET=your_webhook_secret_here
```

### Webhooks (optionnel)
Pour une intégration avancée, configurer des webhooks pour :
- Notifications de nouveaux rendez-vous
- Mise à jour automatique du CRM
- Envoi d'emails personnalisés

## 📱 Utilisation mobile

### Application Calendly
- Télécharger l'app Calendly
- Recevoir des notifications push
- Gérer les rendez-vous en déplacement

### Intégration calendrier
- Synchronisation automatique avec Google Calendar
- Notifications sur mobile
- Gestion des conflits

## 🎯 Bonnes pratiques

1. **Réactivité** : Répondre dans les 24h aux demandes
2. **Flexibilité** : Proposer des créneaux en dehors des heures de bureau
3. **Suivi** : Envoyer un email de confirmation avec les détails
4. **Personnalisation** : Adapter les questions selon le type de projet
5. **Maintenance** : Vérifier régulièrement les disponibilités

## 📞 Support

- **Calendly Support** : [help.calendly.com](https://help.calendly.com)
- **Documentation API** : [developer.calendly.com](https://developer.calendly.com)
- **BorneFlix Contact** : contact@borneflix.fr / 01 86 04 18 02