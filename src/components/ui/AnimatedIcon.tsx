import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'glow' | 'pulse' | 'bounce' | 'spin';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

const containerSizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

const colorClasses = {
  primary: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground',
  secondary: 'bg-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground',
  accent: 'bg-accent/20 text-accent group-hover:bg-accent group-hover:text-accent-foreground',
  success: 'bg-success/20 text-success group-hover:bg-success group-hover:text-success-foreground',
  warning: 'bg-warning/20 text-warning group-hover:bg-warning group-hover:text-warning-foreground',
};

const animationClasses = {
  default: 'transition-all duration-300',
  glow: 'animate-pulse-glow transition-all duration-300',
  pulse: 'animate-pulse-soft transition-all duration-300',
  bounce: 'hover:animate-bounce transition-all duration-300',
  spin: 'hover:animate-spin transition-all duration-300',
};

export function AnimatedIcon({
  icon: Icon,
  className,
  size = 'md',
  variant = 'default',
  color = 'primary',
}: AnimatedIconProps) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl',
        containerSizeClasses[size],
        colorClasses[color],
        animationClasses[variant],
        'group-hover:scale-110',
        className
      )}
    >
      <Icon className={cn(sizeClasses[size], 'transition-transform duration-300')} />
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-current opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
    </div>
  );
}

export default AnimatedIcon;
