import { ReactNode } from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useParallax } from '@/hooks/use-parallax';

interface PageHeroProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  align?: 'center' | 'start';
}

const sizeClasses = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-20',
  lg: 'py-20 md:py-28',
};

export function PageHero({
  badge,
  badgeIcon: BadgeIcon = Sparkles,
  title,
  subtitle,
  children,
  size = 'md',
  align = 'center',
}: PageHeroProps) {
  const bgOffset = useParallax({ speed: 0.2, direction: 'down' });
  const contentOffset = useParallax({ speed: 0.1, direction: 'up' });

  return (
    <section className={cn('relative overflow-hidden', sizeClasses[size])}>
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/85"
        style={{ transform: `translateY(${bgOffset * 0.3}px)` }}
      />
      
      {/* Animated blobs */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${bgOffset * 0.2}px)` }}
      >
        <div className="absolute top-0 start-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[100px] animate-pulse-soft" />
        <div className="absolute bottom-0 end-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[80px] animate-pulse-soft delay-300" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-foreground/5 rounded-full blur-[60px]" />
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-modern opacity-[0.02]" />
      
      {/* Glass edge effect */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background/5 to-transparent backdrop-blur-[1px]" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/10 to-transparent backdrop-blur-[1px]" />

      {/* Content */}
      <div 
        className="container relative z-10"
        style={{ transform: `translateY(${contentOffset}px)` }}
      >
        <div className={cn(
          'max-w-3xl',
          align === 'center' ? 'mx-auto text-center' : 'text-start'
        )}>
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-sm font-medium mb-6 animate-fade-in">
              <BadgeIcon className="h-4 w-4 text-secondary" />
              <span className="text-primary-foreground/90">{badge}</span>
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground mb-4 animate-slide-up leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed animate-slide-up delay-100">
              {subtitle}
            </p>
          )}
          
          {children && (
            <div className="mt-8 animate-slide-up delay-200">
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full h-8 md:h-12 fill-background" preserveAspectRatio="none">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,30 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}

export default PageHero;
