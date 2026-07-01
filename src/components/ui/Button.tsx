import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  loading?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-8 py-3.5 text-base gap-2',
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: { background: 'var(--color-accent)', color: '#fff', boxShadow: 'var(--shadow-glow-accent)' },
  secondary: { background: 'var(--color-surface-2)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' },
  ghost: { background: 'transparent', color: 'var(--color-text-muted)' },
  danger: { background: 'var(--color-risk-muted)', color: 'var(--color-risk)', border: '1px solid var(--color-risk-border)' },
  success: { background: 'var(--color-safe-muted)', color: 'var(--color-safe)', border: '1px solid var(--color-safe-border)' },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', icon, loading, disabled, className = '', children, style, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`rounded-xl font-semibold inline-flex items-center justify-center transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${className}`}
      style={{ ...variantStyles[variant], ...style }}
      {...rest}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {children}
    </button>
  );
});
