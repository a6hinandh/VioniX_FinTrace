import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutDashboard, Bell, Settings, PieChart, ShieldAlert, FileText, BrainCircuit, FlaskConical } from 'lucide-react';
import { backdropFade, slideFromLeft } from '../../lib/motion';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard/alerts', label: 'Alerts', icon: Bell },
  { to: '/dashboard/investigations', label: 'Investigations', icon: ShieldAlert },
  { to: '/dashboard/reports', label: 'Reports', icon: FileText },
  { to: '/dashboard/intelligence', label: 'Intelligence Lab', icon: BrainCircuit },
  { to: '/dashboard/simulation', label: 'Simulation Lab', icon: FlaskConical },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="h-16 flex items-center px-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <NavLink to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
            style={{ background: 'var(--gradient-accent)', boxShadow: 'var(--shadow-glow-accent)' }}>
            <PieChart className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>FinTrace AI</span>
        </NavLink>
      </div>

      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="text-xs font-semibold uppercase tracking-wider mb-4 px-2"
          style={{ color: 'var(--color-text-muted)' }}>
          Overview
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                isActive
                  ? 'shadow-sm'
                  : 'border border-transparent'
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? 'var(--color-accent-muted)' : undefined,
              color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              border: isActive ? '1px solid var(--color-accent-border)' : undefined,
            })}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="p-4 mt-auto" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="pill px-3 py-2 flex items-center justify-between mb-3 text-[11px]"
          style={{ color: 'var(--color-text-secondary)' }}>
          <span>Compliance Posture</span>
          <span className="font-mono" style={{ color: 'var(--color-accent)' }}>92/100</span>
        </div>

        <NavLink
          to="/dashboard/settings"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
          style={({ isActive }) => ({
            background: isActive ? 'var(--color-accent-muted)' : undefined,
            color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            border: isActive ? '1px solid var(--color-accent-border)' : '1px solid transparent',
          })}
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          onClick={onNavigate}
          className="mt-4 flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors"
          style={({ isActive }) => ({
            background: isActive ? 'var(--color-accent-muted)' : undefined,
          })}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold text-white shadow-md"
            style={{ background: 'var(--gradient-accent)' }}>
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>Jane Doe</p>
            <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>Senior Analyst</p>
          </div>
        </NavLink>
      </div>
    </>
  );
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop — always-visible static sidebar */}
      <aside
        className="hidden lg:flex w-64 h-screen flex-col shrink-0 glass"
        style={{ borderRight: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile — animated drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            variants={backdropFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed inset-y-0 left-0 z-40 w-64 h-screen flex flex-col shrink-0 glass lg:hidden"
            style={{ borderRight: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}
            variants={slideFromLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <SidebarContent onNavigate={onClose} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
