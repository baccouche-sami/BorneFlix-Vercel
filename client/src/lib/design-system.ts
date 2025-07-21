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

  // Espacements unifiés
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

// Composants de base unifiés
export const components = {
  // Sections unifiées
  section: {
    base: 'py-16 lg:py-24',
    container: 'container mx-auto px-4 lg:px-8 max-w-7xl',
    header: {
      base: 'text-center mb-12 lg:mb-16',
      badge: 'inline-flex items-center bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-medium mb-4 lg:mb-6',
      title: 'text-3xl md:text-4xl lg:text-5xl font-bold text-[#003566] mb-4 lg:mb-6 leading-tight',
      subtitle: 'text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed',
    }
  },

  // Boutons unifiés
  button: {
    base: 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    sizes: {
      sm: 'px-3 py-2 text-sm rounded-lg',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
      xl: 'px-8 py-4 text-xl rounded-xl',
    },
    variants: {
      primary: 'bg-[#003566] hover:bg-[#00264d] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-[#003566]/20',
      secondary: 'bg-[#8dc63f] hover:bg-[#7db52f] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-[#8dc63f]/20',
      accent: 'bg-[#ff6b35] hover:bg-[#ea580c] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-[#ff6b35]/20',
      outline: 'border-2 border-[#003566] text-[#003566] hover:bg-[#003566]/5 hover:border-[#00264d] focus:ring-[#003566]/20',
      ghost: 'text-[#003566] hover:bg-[#003566]/5 focus:ring-[#003566]/20',
    }
  },

  // Cards unifiées
  card: {
    base: 'bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100',
    sizes: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    variants: {
      default: 'bg-white',
      elevated: 'bg-white shadow-xl',
      outlined: 'bg-white border-2 border-gray-200',
      gradient: 'bg-gradient-to-br from-white to-gray-50',
    }
  },

  // Inputs unifiés
  input: {
    base: 'w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#003566] focus:ring-2 focus:ring-[#003566]/20 transition-all duration-300',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-200',
  },

  // Grilles unifiées
  grid: {
    container: 'grid gap-6 lg:gap-8',
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }
  },

  // Animations unifiées
  animations: {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 }
    },
    slideIn: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6 }
    }
  }
};

// Classes utilitaires unifiées
export const utilities = {
  // Espacements
  spacing: {
    section: 'py-16 lg:py-24',
    container: 'container mx-auto px-4 lg:px-8 max-w-7xl',
    content: 'mb-12 lg:mb-16',
  },
  
  // Typographie
  text: {
    heading: 'text-3xl md:text-4xl lg:text-5xl font-bold text-[#003566] leading-tight',
    subheading: 'text-xl md:text-2xl font-semibold text-[#003566]',
    body: 'text-base lg:text-lg text-gray-600 leading-relaxed',
    caption: 'text-sm text-gray-500',
  },
  
  // Couleurs
  colors: {
    primary: 'text-[#003566]',
    secondary: 'text-[#8dc63f]',
    accent: 'text-[#ff6b35]',
    muted: 'text-gray-600',
  },
  
  // Bordures
  borders: {
    default: 'border border-gray-200',
    rounded: 'rounded-xl',
    roundedLg: 'rounded-2xl',
  },
  
  // Ombres
  shadows: {
    default: 'shadow-lg',
    hover: 'hover:shadow-xl',
    large: 'shadow-2xl',
  }
};

// Configuration globale
export const config = {
  // Espacements de section cohérents
  sectionSpacing: {
    small: 'py-12 lg:py-16',
    medium: 'py-16 lg:py-24',
    large: 'py-20 lg:py-32',
  },
  
  // Marges de contenu cohérentes
  contentSpacing: {
    small: 'mb-8 lg:mb-12',
    medium: 'mb-12 lg:mb-16',
    large: 'mb-16 lg:mb-24',
  },
  
  // Tailles de conteneur cohérentes
  containerSizes: {
    small: 'max-w-4xl',
    medium: 'max-w-6xl',
    large: 'max-w-7xl',
    full: 'max-w-none',
  }
}; 