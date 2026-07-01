import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { icon, className = '', containerClassName = '', style, ...rest },
  ref,
) {
  if (!icon) {
    return (
      <input
        ref={ref}
        className={`rounded-lg px-3 py-2 text-sm outline-none transition-colors ${className}`}
        style={{
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-primary)',
          ...style,
        }}
        {...rest}
      />
    );
  }

  return (
    <div className={`relative ${containerClassName}`}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-text-muted)' }}>
        {icon}
      </span>
      <input
        ref={ref}
        className={`w-full rounded-lg pl-9 pr-3 py-2 text-sm outline-none transition-colors ${className}`}
        style={{
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-primary)',
          ...style,
        }}
        {...rest}
      />
    </div>
  );
});
