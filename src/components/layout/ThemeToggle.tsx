import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'default';
}

export function ThemeToggle({ className, size = 'default' }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        'relative overflow-hidden rounded-xl transition-all duration-300',
        'hover:bg-muted/80 active:scale-95',
        size === 'sm' && 'h-8 w-8',
        className
      )}
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun icon */}
      <Sun 
        className={cn(
          'h-5 w-5 transition-all duration-500',
          resolvedTheme === 'dark' 
            ? 'rotate-0 scale-100 text-secondary' 
            : 'rotate-90 scale-0 absolute'
        )} 
      />
      
      {/* Moon icon */}
      <Moon 
        className={cn(
          'h-5 w-5 transition-all duration-500',
          resolvedTheme === 'dark' 
            ? '-rotate-90 scale-0 absolute' 
            : 'rotate-0 scale-100 text-primary'
        )} 
      />
    </Button>
  );
}

export default ThemeToggle;
