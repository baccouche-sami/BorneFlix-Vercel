// Design System BorneFlix - Système de design unifié
export const designSystem = {
  // Couleurs principales
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#003566', // Couleur principale BorneFlix
      600: '#00264d',
      700: '#001f3f',
      800: '#001a35',
      900: '#001529',
    },
    secondary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#8dc63f', // Vert BorneFlix
      600: '#7db52f',
      700: '#6ca42e',
      800: '#5a932d',
      900: '#4a822c',
    },
    accent: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#ff6b35', // Orange BorneFlix
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    }
  },

  // Typographie
  typography: {
    fonts: {
      heading: 'Montserrat, sans-serif',
      body: 'Raleway, sans-serif',
    },
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    }
  },

  // Espacements
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
  },

  // Bordures
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    full: '9999px',
  },

  // Ombres
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
};

// Composants de base
export const components = {
  // Boutons
  button: {
    base: 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    sizes: {
      sm: 'px-3 py-2 text-sm rounded-lg',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
      xl: 'px-8 py-4 text-xl rounded-xl',
    },
    variants: {
      primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5',
      secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5',
      outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 hover:border-primary-600',
      ghost: 'text-primary-500 hover:bg-primary-50',
    }
  },

  // Cards
  card: {
    base: 'bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300',
    sizes: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }
  },

  // Inputs
  input: {
    base: 'w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-200',
  },

  // Sections
  section: {
    base: 'py-16 lg:py-24',
    container: 'container mx-auto px-4 lg:px-8',
  }
};

// Classes utilitaires
export const utilityClasses = {
  // Textes
  heading1: 'text-4xl md:text-5xl lg:text-6xl font-bold text-primary-500 leading-tight',
  heading2: 'text-3xl md:text-4xl font-bold text-primary-500 leading-tight',
  heading3: 'text-2xl md:text-3xl font-semibold text-primary-500 leading-tight',
  body: 'text-base md:text-lg text-neutral-700 leading-relaxed',
  
  // Gradients
  gradientPrimary: 'bg-gradient-to-r from-primary-500 to-primary-600',
  gradientSecondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600',
  gradientAccent: 'bg-gradient-to-r from-accent-500 to-accent-600',
  
  // Animations
  hoverScale: 'transition-transform duration-300 hover:scale-105',
  hoverLift: 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
  
  // Layout
  readableText: 'max-w-4xl mx-auto',
  centered: 'flex items-center justify-center',
}; 