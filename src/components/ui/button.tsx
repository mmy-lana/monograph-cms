import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900',
          variant === 'primary' && 'bg-editorial-accent text-white hover:bg-black shadow-xs',
          variant === 'secondary' && 'bg-editorial-green text-white hover:bg-editorial-green-hover',
          variant === 'ghost' && 'bg-transparent text-neutral-600 hover:text-black hover:bg-neutral-100',
          variant === 'outline' && 'border border-neutral-300 bg-transparent text-neutral-800 hover:border-black',
          size === 'sm' && 'text-xs min-h-[36px] px-3.5',
          size === 'md' && 'text-sm min-h-[44px] px-5',
          size === 'lg' && 'text-base min-h-[48px] px-7',
          size === 'icon' && 'h-11 w-11 min-h-[44px] min-w-[44px] p-0 rounded-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
