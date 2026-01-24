import React from 'react';
import { cn } from '../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enable frosted glass effect */
  glass?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, glass, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse rounded-lg',
          glass
            ? 'bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm'
            : 'bg-black/10 dark:bg-white/10',
          className
        )}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';
