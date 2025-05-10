import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 ${className}`}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';