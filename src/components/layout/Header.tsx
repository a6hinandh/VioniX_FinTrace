import { useState, useEffect, useMemo } from 'react';
import { Search, Bell, Keyboard, Sun, Moon, Command, Activity, ChevronRight, X } from 'lucide-react';
import { useTheme } from '../../app/ThemeProvider';
import { useAppStore } from '../../state/store';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const alerts = useAppStore((s) => s.alerts);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const criticalAlerts = useMemo(
    () => alerts.filter((a) => a.riskLevel === 'high' && (a.status === 'new' || a.status === 'reviewing')),
    [alerts],
  );

  const notificationItems = useMemo(
    () => criticalAlerts.slice(0, 5).map((alert) => ({
      id: alert.id,
      title: `${alert.type} · ${alert.entityId}`,
      subtitle: `Risk ${alert.riskScore} · ${alert.status}`,
      time: new Date(alert.timestamp).toLocaleTimeString('en-US', { hour12: false }),
    })),
    [criticalAlerts],
  );

  return (
    <header className="h-16 glass flex items-center justify-between px-8 sticky top-0 z-20 transition-colors relative"
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
            {criticalAlerts.length} High Risk Live
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
        <button
          onClick={() => setNotificationsOpen((prev) => !prev)}
          className="relative p-2 rounded-full transition-colors focus:outline-none group"
          style={{ color: 'var(--color-text-secondary)' }}
          title={`${criticalAlerts.length} new alerts`}
        >
          <Bell className="w-5 h-5 group-hover:text-white transition-colors" />
          {criticalAlerts.length > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold text-white shadow-lg border-2 animate-pulse"
              style={{ background: 'var(--color-risk)', borderColor: 'var(--color-surface-1)' }}>
              {criticalAlerts.length > 9 ? '9+' : criticalAlerts.length}
            </span>
          )}
        </button>
      </div>

      {notificationsOpen && (
        <div className="absolute right-6 top-[4.2rem] w-[380px] rounded-2xl overflow-hidden animate-scale-in"
          style={{ background: 'var(--color-surface-1)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
          <div className="px-4 py-3 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-0)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Live Notifications</p>
            <button
              onClick={() => setNotificationsOpen(false)}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label="Close notifications"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto custom-scrollbar">
            {notificationItems.length > 0 ? (
              notificationItems.map((item) => (
                <div key={item.id} className="px-4 py-3 flex items-start gap-3 transition-colors"
                  style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <span className="mt-1 w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-risk)' }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{item.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{item.subtitle}</p>
                  </div>
                  <p className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>{item.time}</p>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No critical notifications right now</p>
              </div>
            )}
          </div>

          <a
            href="/dashboard/alerts"
            className="px-4 py-3 text-xs font-semibold flex items-center justify-between"
            style={{ color: 'var(--color-accent)', background: 'var(--color-accent-muted)' }}
          >
            Open full triage queue
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </header>
  );
}
