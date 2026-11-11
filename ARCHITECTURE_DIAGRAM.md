# Diagramme d'Architecture BorneFlix

## 🏗️ **Architecture Complète**

```mermaid
graph TB
    subgraph "🌐 INTERNET"
        USER[👤 Utilisateur]
        CDN[🌍 CDN Vercel]
    end

    subgraph "🚀 VERCEL PLATFORM"
        subgraph "📱 CLIENT SIDE"
            HTML[index.html]
            CSS[assets/*.css]
            JS[assets/*.js]
            REACT[React App]
            ROUTER[Wouter Router]
            PAGES[Pages Components]
            UI[UI Components]
            HOOKS[Custom Hooks]
        end

        subgraph "🖥️ SERVER SIDE"
            API[API Routes]
            EXPRESS[Express Server]
            MAIL[Email Service]
            STORAGE[Data Storage]
            VALIDATION[Zod Validation]
        end

        subgraph "🗄️ EXTERNAL SERVICES"
            DB[(PostgreSQL Database)]
            EMAIL[SendGrid/Nodemailer]
            ANALYTICS[Vercel Analytics]
        end
    end

    USER --> CDN
    CDN --> HTML
    CDN --> CSS
    CDN --> JS
    
    HTML --> REACT
    REACT --> ROUTER
    ROUTER --> PAGES
    PAGES --> UI
    UI --> HOOKS
    
    USER --> API
    API --> EXPRESS
    EXPRESS --> MAIL
    EXPRESS --> STORAGE
    EXPRESS --> VALIDATION
    
    MAIL --> EMAIL
    STORAGE --> DB
    REACT --> ANALYTICS
```

## 🔄 **Flux de Données**

```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant C as Client (React)
    participant S as Serveur (Express)
    participant E as Email Service
    participant D as Database

    Note over U,D: Flux de contact
    U->>C: Remplit formulaire
    C->>C: Validation Zod
    C->>S: POST /api/contact
    S->>S: Validation serveur
    S->>E: Envoi email
    E-->>S: Confirmation
    S-->>C: Success response
    C-->>U: Message de succès

    Note over U,D: Flux de devis
    U->>C: Remplit devis
    C->>C: Validation multi-étapes
    C->>S: POST /api/devis
    S->>S: Validation complète
    S->>D: Sauvegarde données
    S->>E: Email devis
    E-->>S: Confirmation
    S-->>C: Devis créé
    C-->>U: Confirmation devis
```

## 📁 **Structure des Fichiers**

```mermaid
graph LR
    subgraph "📦 ROOT"
        PKG[package.json]
        VERCEL[vercel.json]
        VITE[vite.config.ts]
        ENV[env.example]
    end

    subgraph "🖥️ CLIENT"
        C_HTML[index.html]
        C_PUBLIC[public/]
        C_SRC[src/]
        
        subgraph "📂 SRC"
            C_APP[App.tsx]
            C_MAIN[main.tsx]
            C_CSS[index.css]
            C_COMP[components/]
            C_PAGES[pages/]
            C_HOOKS[hooks/]
            C_LIB[lib/]
            C_CONFIG[config/]
            C_ASSETS[assets/]
        end
    end

    subgraph "🖥️ SERVER"
        S_INDEX[index.ts]
        S_ROUTES[routes.ts]
        S_MAIL[mailService.ts]
        S_STORAGE[storage.ts]
        S_VITE[vite.ts]
    end

    subgraph "📚 SHARED"
        SH_SCHEMA[schema.ts]
    end

    PKG --> C_SRC
    PKG --> S_INDEX
    VITE --> C_SRC
    VERCEL --> S_INDEX
```

## 🚀 **Processus de Build**

```mermaid
graph TD
    A[Source Code] --> B[npm run build]
    
    subgraph "🔨 BUILD PROCESS"
        B --> C[Vite Build Client]
        B --> D[esbuild Build Server]
        
        C --> E[Bundle React]
        C --> F[Optimize Assets]
        C --> G[Generate Static Files]
        
        D --> H[Bundle Express]
        D --> I[Minify Code]
        D --> J[External Dependencies]
    end
    
    subgraph "📦 OUTPUT"
        E --> K[dist/index.html]
        F --> L[dist/assets/]
        G --> M[dist/public/]
        H --> N[dist/index.js]
    end
    
    subgraph "🚀 DEPLOYMENT"
        K --> O[Vercel CDN]
        L --> O
        M --> O
        N --> P[Vercel Functions]
    end
```

## 🔧 **Technologies Stack**

```mermaid
graph TB
    subgraph "🎨 FRONTEND"
        REACT[React 18]
        TS[TypeScript]
        VITE[Vite]
        TAILWIND[Tailwind CSS]
        FRAMER[Framer Motion]
        WOUTER[Wouter]
        RHF[React Hook Form]
        ZOD[Zod]
        RADIX[Radix UI]
        QUERY[React Query]
    end

    subgraph "⚙️ BACKEND"
        EXPRESS[Express.js]
        NODE[Node.js]
        NODEMAILER[Nodemailer]
        DRIZZLE[Drizzle ORM]
        VALIDATION[Zod Validation]
    end

    subgraph "🌐 DEPLOYMENT"
        VERCEL[Vercel Platform]
        CDN[Edge Network]
        FUNCTIONS[Serverless Functions]
        ANALYTICS[Vercel Analytics]
    end

    subgraph "🗄️ EXTERNAL"
        POSTGRES[PostgreSQL]
        SENDGRID[SendGrid]
        NEON[Neon Database]
    end

    REACT --> TS
    TS --> VITE
    VITE --> TAILWIND
    TAILWIND --> FRAMER
    FRAMER --> WOUTER
    WOUTER --> RHF
    RHF --> ZOD
    ZOD --> RADIX
    RADIX --> QUERY

    EXPRESS --> NODE
    NODE --> NODEMAILER
    NODEMAILER --> DRIZZLE
    DRIZZLE --> VALIDATION

    VERCEL --> CDN
    CDN --> FUNCTIONS
    FUNCTIONS --> ANALYTICS

    POSTGRES --> NEON
    SENDGRID --> NODEMAILER
```

## 🔒 **Sécurité et Performance**

```mermaid
graph LR
    subgraph "🔒 SECURITY"
        HEADERS[Security Headers]
        VALIDATION[Input Validation]
        CORS[CORS Policy]
        HTTPS[HTTPS Only]
    end

    subgraph "⚡ PERFORMANCE"
        SPLIT[Code Splitting]
        LAZY[Lazy Loading]
        CACHE[Cache Headers]
        COMPRESS[Gzip Compression]
    end

    subgraph "📊 MONITORING"
        LOGS[Error Logging]
        METRICS[Performance Metrics]
        ANALYTICS[User Analytics]
        HEALTH[Health Checks]
    end

    HEADERS --> VALIDATION
    VALIDATION --> CORS
    CORS --> HTTPS

    SPLIT --> LAZY
    LAZY --> CACHE
    CACHE --> COMPRESS

    LOGS --> METRICS
    METRICS --> ANALYTICS
    ANALYTICS --> HEALTH
```

## 🎯 **Points Clés de l'Architecture**

### **✅ Avantages :**
- **Performance** : Code splitting + Lazy loading
- **Sécurité** : Headers + Validation stricte
- **Scalabilité** : Serverless + CDN global
- **Maintenance** : TypeScript + Modularité
- **SEO** : SSR-ready + Métadonnées complètes
- **Monitoring** : Analytics + Logs intégrés

### **🔄 Flux de données :**
1. **Client** → Validation locale → API Request
2. **Serveur** → Validation serveur → Traitement → Response
3. **Client** → Mise à jour UI → Feedback utilisateur

### **🚀 Déploiement :**
- **Build** : Vite + esbuild optimisé
- **Deploy** : Vercel automatique
- **CDN** : Edge Network global
- **Functions** : Serverless API

**L'architecture est moderne, performante et prête pour la production ! 🎉** 