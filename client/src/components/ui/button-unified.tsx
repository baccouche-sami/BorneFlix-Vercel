import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    icon, 
    iconPosition = 'left',
    loading = false,
    fullWidth = false,
    children, 
    disabled,
    ...props 
  }, ref) => {
    
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm rounded-lg',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
      xl: 'px-8 py-4 text-xl rounded-xl',
    };
    
    const variantClasses = {
      primary: 'bg-[#003566] hover:bg-[#00264d] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-[#003566]/20',
      secondary: 'bg-[#8dc63f] hover:bg-[#7db52f] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-[#8dc63f]/20',
      accent: 'bg-[#ff6b35] hover:bg-[#ea580c] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-[#ff6b35]/20',
      outline: 'border-2 border-[#003566] text-[#003566] hover:bg-[#003566]/5 hover:border-[#00264d] focus:ring-[#003566]/20',
      ghost: 'text-[#003566] hover:bg-[#003566]/5 focus:ring-[#003566]/20',
    };
    
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          widthClass,
          className
        )}
        disabled={disabled || loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
        
        {/* Content */}
        <div className={cn(
          'flex items-center gap-2',
          loading ? 'opacity-0' : 'opacity-100'
        )}>
          {icon && iconPosition === 'left' && (
            <span className="flex-shrink-0">{icon}</span>
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="flex-shrink-0">{icon}</span>
          )}
        </div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-inherit overflow-hidden">
          <div className="absolute inset-0 bg-white/20 scale-0 rounded-full transition-transform duration-300 group-hover:scale-100" />
        </div>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps }; 