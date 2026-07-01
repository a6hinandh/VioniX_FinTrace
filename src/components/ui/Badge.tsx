import type { ReactNode } from 'react';

export type BadgeIntent = 'accent' | 'risk' | 'warning' | 'safe' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  intent?: BadgeIntent;
  size?: BadgeSize;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const intentTokens: Record<BadgeIntent, { color: string; bg: string; border: string }> = {
  accent: { color: 'var(--color-accent)', bg: 'var(--color-accent-muted)', border: 'var(--color-accent-border)' },
  risk: { color: 'var(--color-risk)', bg: 'var(--color-risk-muted)', border: 'var(--color-risk-border)' },
  warning: { color: 'var(--color-warning)', bg: 'var(--color-warning-muted)', border: 'var(--color-warning-border)' },
  safe: { color: 'var(--color-safe)', bg: 'var(--color-safe-muted)', border: 'var(--color-safe-border)' },
  info: { color: 'var(--color-info)', bg: 'var(--color-info-muted)', border: 'var(--color-info-border)' },
  neutral: { color: 'var(--color-text-muted)', bg: 'var(--color-surface-3)', border: 'var(--color-border)' },
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
};

export function Badge({ intent = 'neutral', size = 'sm', icon, children, className = '' }: BadgeProps) {
  const t = intentTokens[intent];
  return (
    <span
      className={`inline-flex items-center rounded-full font-bold uppercase tracking-wide ${sizeClasses[size]} ${className}`}
      style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}` }}
    >
      {icon}
      {children}
    </span>
  );
}
