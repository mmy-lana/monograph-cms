import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg'
};

const dimensionMap = {
  sm: 24,
  md: 36,
  lg: 48,
  xl: 64
};

export function Avatar({ src, alt, size = 'md', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden bg-neutral-100 ring-1 ring-black/5 shrink-0 select-none',
        sizeMap[size],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={dimensionMap[size]}
          height={dimensionMap[size]}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center font-medium text-neutral-600 bg-neutral-200">
          {alt.slice(0, 1).toUpperCase()}
        </div>
      )}
    </div>
  );
}
