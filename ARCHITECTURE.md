# Architecture BorneFlix - Côté Serveur et Client

## 🏗️ **Vue d'ensemble de l'architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    BORNE FLIX ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   CLIENT SIDE   │    │   SERVER SIDE   │                │
│  │   (Frontend)    │    │   (Backend)     │                │
│  └─────────────────┘    └─────────────────┘                │
│           │                       │                        │
│           │                       │                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              VERCEL DEPLOYMENT                      │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 🖥️ **CÔTÉ CLIENT (Frontend)**

### **Structure des dossiers :**
```
client/
├── src/
│   ├── components/          # Composants React réutilisables
│   ├── pages/              # Pages de l'application
│   ├── hooks/              # Hooks personnalisés
│   ├── lib/                # Utilitaires et configurations
│   ├── config/             # Configuration SEO
│   ├── assets/             # Images et ressources statiques
│   ├── App.tsx             # Composant racine
│   ├── main.tsx            # Point d'entrée
│   └── index.css           # Styles globaux
├── public/                 # Fichiers publics
│   ├── robots.txt          # Configuration SEO
│   ├── sitemap.xml         # Sitemap
│   ├── site.webmanifest    # PWA manifest
│   └── index.html          # Template HTML
└── index.html              # Point d'entrée HTML
```

### **Technologies utilisées :**

#### **Framework et Librairies :**
- ✅ **React 18** - Framework UI
- ✅ **TypeScript** - Typage statique
- ✅ **Vite** - Build tool et dev server
- ✅ **Wouter** - Router léger
- ✅ **Tailwind CSS** - Framework CSS
- ✅ **Framer Motion** - Animations
- ✅ **Lucide React** - Icônes
- ✅ **React Hook Form** - Gestion des formulaires
- ✅ **Zod** - Validation des données

#### **Composants UI :**
- ✅ **Radix UI** - Composants accessibles
- ✅ **Shadcn/ui** - Design system
- ✅ **React Query** - Gestion d'état serveur

### **Architecture des composants :**

```typescript
// Point d'entrée
main.tsx → App.tsx → Router → Pages → Components

// Structure des composants
App.tsx
├── QueryClientProvider (React Query)
├── TooltipProvider (UI)
├── Header (Navigation)
├── Router (Wouter)
│   ├── Home
│   ├── Solutions
│   ├── Avantages
│   ├── Réalisations
│   ├── FAQ
│   ├── Devis
│   ├── Contact
│   └── Pages légales
├── Footer
├── ChatbotFAQ
├── CookieConsent
├── ScrollToTop
└── BackToTopButton
```

### **Gestion d'état :**

#### **React Query (TanStack Query) :**
```typescript
// Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});
```

#### **Hooks personnalisés :**
- ✅ `useCookies` - Gestion des cookies
- ✅ `useMobile` - Détection mobile
- ✅ `useToast` - Notifications

### **Routing avec Wouter :**
```typescript
<Switch>
  <Route path="/" component={Home} />
  <Route path="/solutions" component={SolutionsPage} />
  <Route path="/avantages" component={AvantagesPage} />
  <Route path="/realisations" component={RealisationsPage} />
  <Route path="/faq" component={FAQPage} />
  <Route path="/devis" component={DevisPage} />
  <Route path="/contact" component={ContactPage} />
  <Route component={NotFound} />
</Switch>
```

## 🖥️ **CÔTÉ SERVEUR (Backend)**

### **Structure des dossiers :**
```
server/
├── index.ts           # Point d'entrée serveur
├── routes.ts          # Routes API
├── mailService.ts     # Service d'envoi d'emails
├── storage.ts         # Gestion des données
└── vite.ts           # Configuration Vite serveur
```

### **Technologies utilisées :**

#### **Framework et Librairies :**
- ✅ **Express.js** - Framework web
- ✅ **TypeScript** - Typage statique
- ✅ **Nodemailer** - Envoi d'emails
- ✅ **Drizzle ORM** - Base de données
- ✅ **Zod** - Validation des données

### **Architecture du serveur :**

```typescript
// Point d'entrée
server/index.ts
├── Express app setup
├── Middleware configuration
├── Route registration
├── Error handling
├── Static file serving
└── Server startup
```

### **Routes API :**

#### **Endpoints disponibles :**
```typescript
// Contact
POST /api/contact
Body: { name, email, phone, message }

// Newsletter
POST /api/newsletter
Body: { email }

// Devis
POST /api/devis
Body: { nom, prenom, email, telephone, ... }

// Health check
GET /api/health
Response: { status: "ok", timestamp: "..." }
```

#### **Exemple de route :**
```typescript
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Champs obligatoires manquants"
      });
    }
    
    // Envoi d'email
    await sendEmail({
      to: 'contact@borneflix.fr',
      subject: `Nouveau contact - ${name}`,
      html: generateContactEmailHtml({ name, email, phone, message })
    });
    
    res.json({ success: true, message: "Message envoyé" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});
```

### **Services :**

#### **MailService :**
```typescript
// Configuration SMTP
const transporter = nodemailer.createTransporter({
  host: 'mail.gh-solutions.fr',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Fonctions
- sendEmail(options)     // Envoi d'email
- verifyEmailConfig()    // Vérification config
```

#### **Storage :**
```typescript
// Interface de stockage
interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

// Implémentation mémoire (pour développement)
class MemStorage implements IStorage {
  // Méthodes CRUD
}
```

## 🔄 **INTERACTION CLIENT-SERVEUR**

### **Flux de données :**

```
1. Client (React) → API Request → Server (Express)
2. Server → Validation → Database/Email → Response
3. Server → Response → Client → UI Update
```

### **Exemple de communication :**

#### **Côté Client :**
```typescript
// Hook personnalisé pour les formulaires
const useContactForm = () => {
  const mutation = useMutation({
    mutationFn: (data) => 
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json()),
    onSuccess: () => {
      toast.success('Message envoyé avec succès !');
    },
    onError: () => {
      toast.error('Erreur lors de l\'envoi');
    }
  });
  
  return mutation;
};
```

#### **Côté Serveur :**
```typescript
// Validation et traitement
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  
  // Validation Zod
  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10)
  });
  
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error });
  }
  
  // Traitement
  await sendEmail({ ...result.data });
  res.json({ success: true });
});
```

## 🚀 **DÉPLOIEMENT VERCEL**

### **Configuration Vercel :**

#### **vercel.json :**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
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

### **Processus de build :**

#### **1. Build Client (Vite) :**
```bash
vite build
├── Bundle React components
├── Optimize assets
├── Generate static files
└── Output to dist/
```

#### **2. Build Server (esbuild) :**
```bash
esbuild server/index.ts
├── Bundle Express server
├── Minify code
└── Output to dist/index.js
```

#### **3. Structure finale :**
```
dist/
├── index.html          # Client SPA
├── index.js           # Server bundle
├── assets/            # Static assets
│   ├── js/
│   ├── css/
│   └── images/
└── public/            # Public files
```

### **Variables d'environnement :**

#### **Production :**
```bash
# Database
DATABASE_URL="postgresql://..."

# Email
SENDGRID_API_KEY="SG..."
SENDGRID_FROM_EMAIL="contact@borneflix.fr"

# Session
SESSION_SECRET="secure-secret"

# Environment
NODE_ENV="production"
```

## 📊 **PERFORMANCE ET OPTIMISATIONS**

### **Client Side :**

#### **Code Splitting :**
```typescript
// Vite config
manualChunks: {
  vendor: ['react', 'react-dom'],
  ui: ['framer-motion', 'lucide-react'],
  forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
  animations: ['@react-three/fiber', '@react-three/drei', 'three']
}
```

#### **Lazy Loading :**
```typescript
// Composants chargés à la demande
const LazyComponent = lazy(() => import('./LazyComponent'));
```

### **Server Side :**

#### **Caching :**
```typescript
// Cache headers
app.use(express.static('dist', {
  maxAge: '1y',
  immutable: true
}));
```

#### **Compression :**
```typescript
// Gzip automatique par Vercel
// Minification avec esbuild
```

## 🔒 **SÉCURITÉ**

### **Headers de sécurité :**
```typescript
// Vercel headers
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin"
}
```

### **Validation des données :**
```typescript
// Zod schemas
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000)
});
```

## 📈 **MONITORING ET ANALYTICS**

### **Vercel Analytics :**
```typescript
// Intégration automatique
import { Analytics } from '@vercel/analytics/react';

<Analytics />
```

### **Error Tracking :**
```typescript
// Logs automatiques
console.error('Error:', error);
// Vercel logs dashboard
```

---

## 🎯 **RÉSUMÉ**

### **Architecture moderne :**
- ✅ **Frontend** : React + TypeScript + Vite
- ✅ **Backend** : Express + TypeScript + Node.js
- ✅ **Deployment** : Vercel (Serverless Functions)
- ✅ **Database** : PostgreSQL (Neon/Supabase)
- ✅ **Email** : SendGrid/Nodemailer
- ✅ **Performance** : Code splitting + Lazy loading
- ✅ **SEO** : Métadonnées complètes + Sitemap
- ✅ **Security** : Headers + Validation

### **Avantages :**
- 🚀 **Performance** : Build optimisé + CDN global
- 🔒 **Sécurité** : Headers + Validation
- 📱 **Responsive** : Design mobile-first
- 🔍 **SEO** : Optimisé pour les moteurs de recherche
- 🛠️ **Maintenance** : Code modulaire + TypeScript
- 📊 **Monitoring** : Analytics + Logs

**L'architecture est prête pour la production ! 🎉** 