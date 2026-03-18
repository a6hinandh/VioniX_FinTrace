import { useState, useEffect } from 'react';
import { Search, Bell, Keyboard, Sun, Moon, Command, Activity } from 'lucide-react';
import { useTheme } from '../../app/ThemeProvider';
import { useAppStore } from '../../state/store';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const alerts = useAppStore((s) => s.alerts);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 glass flex items-center justify-between px-8 sticky top-0 z-10 transition-colors"
      style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors"
            style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search entities, transactions, or alerts..."
            className="w-full rounded-xl pl-10 pr-16 py-2 text-sm transition-all focus:outline-none"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded"
            style={{ color: 'var(--color-text-muted)', background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
            /
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: 'var(--color-risk-muted)', border: '1px solid var(--color-risk-border)' }}>
          <Activity className="w-3.5 h-3.5" style={{ color: 'var(--color-risk)' }} />
          <span className="text-[11px] font-semibold" style={{ color: 'var(--color-risk)' }}>
            {alerts.filter((a) => a.riskLevel === 'high').length} High Risk Live
          </span>
        </div>

        {/* Environment Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: 'var(--color-warning-muted)', border: '1px solid var(--color-warning-border)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-warning)' }} />
          <span className="text-[11px] font-semibold" style={{ color: 'var(--color-warning)' }}>Mock Feed</span>
        </div>

        {/* Live Clock */}
        <div className="text-xs font-mono tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
          {currentTime.toLocaleTimeString('en-US', { hour12: false })}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors"
          style={{ color: 'var(--color-text-muted)' }}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Keyboard shortcut hint */}
        <button className="p-2 rounded-lg transition-colors"
          style={{ color: 'var(--color-text-muted)' }}
          title="Keyboard Shortcuts">
          <Keyboard className="w-4 h-4" />
        </button>

        <button className="hidden md:flex items-center gap-1.5 p-2 rounded-lg transition-colors"
          style={{ color: 'var(--color-text-muted)' }}
          title="Command Menu (Mock)">
          <Command className="w-4 h-4" />
          <span className="text-[10px] font-semibold">K</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-full transition-colors focus:outline-none"
          style={{ color: 'var(--color-text-secondary)' }}>
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse"
            style={{ background: 'var(--color-risk)', boxShadow: '0 0 0 2px var(--color-surface-0)' }} />
        </button>
      </div>
    </header>
  );
}
