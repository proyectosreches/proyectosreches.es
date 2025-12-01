import React from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'white';

interface BaseProps {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children?: React.ReactNode;
  className?: string;
}

// Props if it's a button
interface ButtonAsButtonProps extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: never;
}

// Props if it's a link
interface ButtonAsLinkProps extends BaseProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> {
  href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-semibold rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer select-none";
  
  const variants = {
    primary: "border-transparent text-white bg-brand-primary hover:bg-amber-700 shadow-lg hover:shadow-xl hover:shadow-amber-500/30 focus:ring-brand-primary",
    secondary: "border-transparent text-white bg-slate-900 hover:bg-slate-800 shadow-md focus:ring-slate-900",
    outline: "border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white focus:ring-brand-primary",
    white: "border-transparent text-brand-primary bg-white hover:bg-gray-50 shadow-md focus:ring-white"
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const combinedClassName = `${baseStyles} ${variants[variant]} ${widthStyle} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.96 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  };

  // If href is present, render as anchor (motion.a)
  if ('href' in props && props.href) {
    return (
      <motion.a 
        className={combinedClassName} 
        {...motionProps}
        {...(props as any)}
      >
        {children}
      </motion.a>
    );
  }

  // Otherwise render as button (motion.button)
  return (
    <motion.button 
      className={combinedClassName} 
      {...motionProps}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};

export default Button;