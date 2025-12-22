import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'frosted' | 'bordered';
  hover?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantClasses = {
  light: 'bg-card/70 backdrop-blur-xl border border-border/40',
  dark: 'bg-primary/20 backdrop-blur-xl border border-primary-foreground/10',
  frosted: 'bg-background/60 backdrop-blur-2xl border border-border/30',
  bordered: 'bg-card/80 backdrop-blur-lg border-2 border-border/50',
};

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function GlassCard({
  children,
  className,
  variant = 'light',
  hover = true,
  glow = false,
  padding = 'md',
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-500',
        variantClasses[variant],
        paddingClasses[padding],
        hover && 'hover:-translate-y-1 hover:shadow-elevated',
        glow && 'hover:shadow-glow',
        className
      )}
    >
      {/* Shine effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default GlassCard;
