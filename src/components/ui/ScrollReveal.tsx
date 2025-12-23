import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

type AnimationType = 
  | 'fade-in' 
  | 'slide-up' 
  | 'slide-down' 
  | 'slide-left' 
  | 'slide-right' 
  | 'scale-in' 
  | 'rotate-in';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

const animationClasses: Record<AnimationType, { initial: string; visible: string }> = {
  'fade-in': {
    initial: 'opacity-0 translate-y-4',
    visible: 'opacity-100 translate-y-0',
  },
  'slide-up': {
    initial: 'opacity-0 translate-y-12',
    visible: 'opacity-100 translate-y-0',
  },
  'slide-down': {
    initial: 'opacity-0 -translate-y-12',
    visible: 'opacity-100 translate-y-0',
  },
  'slide-left': {
    initial: 'opacity-0 translate-x-12',
    visible: 'opacity-100 translate-x-0',
  },
  'slide-right': {
    initial: 'opacity-0 -translate-x-12',
    visible: 'opacity-100 translate-x-0',
  },
  'scale-in': {
    initial: 'opacity-0 scale-90',
    visible: 'opacity-100 scale-100',
  },
  'rotate-in': {
    initial: 'opacity-0 rotate-[-6deg] scale-95',
    visible: 'opacity-100 rotate-0 scale-100',
  },
};

export function ScrollReveal({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 600,
  threshold = 0.2,
  triggerOnce = true,
  className,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });
  const { initial, visible } = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all will-change-transform',
        isVisible ? visible : initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
    </div>
  );
}

// Staggered children wrapper
interface ScrollRevealGroupProps {
  children: ReactNode[];
  animation?: AnimationType;
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  itemClassName?: string;
}

export function ScrollRevealGroup({
  children,
  animation = 'slide-up',
  staggerDelay = 100,
  duration = 600,
  threshold = 0.15,
  className,
  itemClassName,
}: ScrollRevealGroupProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce: true });
  const { initial, visible } = animationClasses[animation];

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            'transition-all will-change-transform',
            isVisible ? visible : initial,
            itemClassName
          )}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: `${index * staggerDelay}ms`,
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
