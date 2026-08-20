import React from 'react';
import { cn } from '../../lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  count = 1,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={cn(
            'animate-pulse rounded-md bg-slate-800/60 border border-slate-700/30',
            className
          )}
        />
      ))}
    </>
  );
};
