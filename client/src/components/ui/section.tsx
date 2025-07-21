import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { components, config } from '@/lib/design-system';

interface SectionProps {
  children: ReactNode;
  className?: string;
  spacing?: 'small' | 'medium' | 'large';
  containerSize?: 'small' | 'medium' | 'large' | 'full';
  background?: 'white' | 'gray' | 'primary' | 'gradient';
  id?: string;
  animate?: boolean;
  delay?: number;
}

const Section = ({ 
  children, 
  className = '', 
  spacing = 'medium',
  containerSize = 'large',
  background = 'white',
  id,
  animate = true,
  delay = 0
}: SectionProps) => {
  const spacingClasses = config.sectionSpacing[spacing];
  const containerClasses = config.containerSizes[containerSize];
  
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-[#003566] text-white',
    gradient: 'bg-gradient-to-br from-[#003566] to-[#1a4d85] text-white',
  };

  const MotionComponent = animate ? motion.section : 'section';
  const motionProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay }
  } : {};

  return (
    <MotionComponent
      id={id}
      className={`${spacingClasses} ${backgroundClasses[background]} ${className}`}
      {...motionProps}
    >
      <div className={`container mx-auto px-4 lg:px-8 ${containerClasses}`}>
        {children}
      </div>
    </MotionComponent>
  );
};

// Composant pour les en-têtes de section
interface SectionHeaderProps {
  children: ReactNode;
  className?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  animate?: boolean;
  delay?: number;
}

export const SectionHeader = ({ 
  children, 
  className = '',
  badge,
  title,
  subtitle,
  animate = true,
  delay = 0
}: SectionHeaderProps) => {
  const MotionComponent = animate ? motion.div : 'div';
  const motionProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay }
  } : {};

  return (
    <MotionComponent
      className={`text-center mb-12 lg:mb-16 ${className}`}
      {...motionProps}
    >
      {badge && (
        <div className="inline-flex items-center bg-[#8dc63f]/10 text-[#8dc63f] px-4 py-2 rounded-full text-sm font-medium mb-4 lg:mb-6">
          {badge}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003566] mb-4 lg:mb-6 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </MotionComponent>
  );
};

// Composant pour les grilles de contenu
interface SectionGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SectionGrid = ({ 
  children, 
  cols = 3, 
  gap = 'lg',
  className = ''
}: SectionGridProps) => {
  const gridClasses = components.grid.cols[cols];
  const gapClasses = {
    sm: 'gap-4 lg:gap-6',
    md: 'gap-6 lg:gap-8',
    lg: 'gap-8 lg:gap-12',
  };

  return (
    <div className={`${gridClasses} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

export default Section; 