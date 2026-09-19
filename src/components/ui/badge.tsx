import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'pill';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center text-xs font-medium transition-colors max-w-full',
        variant === 'default' && 'px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
        variant === 'outline' && 'px-2 py-0.5 rounded border border-editorial-border text-neutral-600',
        variant === 'pill' && 'px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-800 shadow-2xs',
        className
      )}
    >
      <span className="truncate">{children}</span>
    </span>
  );
}
