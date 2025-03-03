
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedElementProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  children: React.ReactNode;
}

export const FadeIn: React.FC<AnimatedElementProps> = ({ 
  children, 
  className, 
  delay = 0,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "animate-fadeIn opacity-0", 
        className
      )} 
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards"
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const SlideUp: React.FC<AnimatedElementProps> = ({ 
  children, 
  className, 
  delay = 0,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "animate-slideUp opacity-0", 
        className
      )} 
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards"
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const SlideIn: React.FC<AnimatedElementProps> = ({ 
  children, 
  className,
  delay = 0, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "animate-slideIn opacity-0", 
        className
      )} 
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards"
      }}
      {...props}
    >
      {children}
    </div>
  );
};
