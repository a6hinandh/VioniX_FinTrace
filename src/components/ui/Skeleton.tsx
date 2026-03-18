// FinTrace AI — Skeleton Loader Component

export function Skeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`skeleton ${className}`} style={style} />;
}

export function SkeletonCard() {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <Skeleton className="h-8 w-20" />
      <div className="flex gap-1 h-6">
        {Array.from({ length: 12 }, (_, i) => (
          <Skeleton key={i} className="w-[3px] rounded-full" style={{ height: `${30 + Math.random() * 40}%` }} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <Skeleton className="h-5 w-40" />
      </div>
      <div className="p-4 space-y-3">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-24 h-4" />
            <Skeleton className="flex-1 h-4" />
            <Skeleton className="w-16 h-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonGraph() {
  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-4 flex justify-between" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="h-[350px] flex items-center justify-center gap-8 p-8">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="w-14 h-14 rounded-full" />
            {i < 3 && <Skeleton className="w-20 h-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}
