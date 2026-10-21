import React from 'react';

type SkeletonProps = {className?: string;};

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded-md bg-slate-800/80 ${className}`} aria-hidden="true" />;
}

export function SkeletonRows({ rows = 4 }: {rows?: number;}) {
  return (
    <div className="space-y-3" role="status" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) =>
      <div key={i} className="flex items-center gap-3 rounded-lg border border-slate-800 p-3">
          <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <Skeleton className="h-7 w-16" />
        </div>
      )}
    </div>);

}

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6" role="status" aria-label="Loading page">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-3 h-8 w-80 max-w-full" />
      <Skeleton className="mt-2 h-4 w-96 max-w-full" />
      <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr_1fr]">
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="glass-card p-4">
          <SkeletonRows rows={4} />
        </div>
        <Skeleton className="h-72 rounded-xl" />
      </div>
    </div>);

}