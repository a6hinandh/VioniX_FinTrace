// FinTrace AI — Profile Page
// User profile with activity stats, recent activity, and preferences

import { motion } from 'framer-motion';
import { useTheme } from '../../app/ThemeProvider';
import { User, Shield, FileText, Bell, Clock, Sun, Moon, TrendingUp, Award, CheckCircle, Activity } from 'lucide-react';
import { useAppStore } from '../../state/store';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { staggerContainer, staggerItem } from '../../lib/motion';

export default function ProfilePage() {
  const { theme, toggleTheme } = useTheme();
  const alerts = useAppStore((s) => s.alerts);
  const cases = useAppStore((s) => s.cases);
  const reports = useAppStore((s) => s.reports);

  const resolvedAlerts = alerts.filter((a) => a.status === 'resolved' || a.status === 'dismissed').length;
  const readyReports = reports.filter((r) => r.status === 'ready' || r.status === 'exported').length;

  const stats = [
    { icon: Bell, label: 'Alerts Triaged', value: resolvedAlerts || 12, color: 'var(--color-accent)', bg: 'var(--color-accent-muted)' },
    { icon: Shield, label: 'Cases Reviewed', value: cases.length, color: 'var(--color-accent)', bg: 'var(--color-accent-muted)' },
    { icon: FileText, label: 'Reports Generated', value: readyReports || 8, color: 'var(--color-safe)', bg: 'var(--color-safe-muted)' },
    { icon: TrendingUp, label: 'Risk Assessments', value: 47, color: 'var(--color-accent)', bg: 'var(--color-accent-muted)' },
  ];

  const recentActivity = [
    { action: 'Escalated case CASE-2024-003 to FIU', time: '2 hours ago', type: 'escalation' },
    { action: 'Generated evidence package for round-trip scheme', time: '2 hours ago', type: 'report' },
    { action: 'Updated risk score for entity C789', time: '3 hours ago', type: 'risk' },
    { action: 'Assigned CASE-2024-001 for investigation', time: '4 hours ago', type: 'assignment' },
    { action: 'Reviewed and dismissed alert ALT-006 (false positive)', time: '5 hours ago', type: 'alert' },
    { action: 'Completed graph analysis for B456 network', time: '6 hours ago', type: 'analysis' },
    { action: 'Submitted SAR filing for R119 round-trip scheme', time: '1 day ago', type: 'report' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <User className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
          Profile
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Manage your account, view activity, and update preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card + Preferences */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="card p-6 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white shadow-lg" style={{ background: 'var(--gradient-accent)' }}>
              JD
            </div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>Jane Doe</h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Senior Financial Crime Analyst</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Badge intent="safe" icon={<CheckCircle className="w-3 h-3" />}>Active</Badge>
              <Badge intent="accent" icon={<Award className="w-3 h-3" />}>Level 3 Clearance</Badge>
            </div>

            {/* Info Grid */}
            <div className="mt-6 space-y-3 text-left">
              {[
                { label: 'Department', value: 'AML Investigations' },
                { label: 'Region', value: 'US-East' },
                { label: 'Team', value: 'Alpha Squad' },
                { label: 'Joined', value: 'Mar 2024' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="card p-6">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
              Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Theme</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Toggle dark / light mode</p>
                </div>
                <Button
                  onClick={toggleTheme}
                  size="sm"
                  icon={theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                >
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stats + Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={staggerContainer} initial="hidden" animate="visible">
            {stats.map((s) => (
              <motion.div key={s.label} variants={staggerItem} className="card p-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{s.value}</p>
                <p className="text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Activity */}
          <div className="card overflow-hidden">
            <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}>
              <Activity className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Recent Activity</h3>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {recentActivity.map((entry, i) => (
                <div key={i} className="px-5 py-4 flex items-start gap-4 transition-colors hover:bg-[var(--color-surface-3)]" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{
                    background: entry.type === 'escalation' ? 'var(--color-risk-muted)' :
                      entry.type === 'report' ? 'var(--color-accent-muted)' :
                      entry.type === 'risk' ? 'var(--color-warning-muted)' :
                      'var(--color-safe-muted)',
                  }}>
                    {entry.type === 'escalation' && <Shield className="w-3.5 h-3.5" style={{ color: 'var(--color-risk)' }} />}
                    {entry.type === 'report' && <FileText className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />}
                    {entry.type === 'risk' && <TrendingUp className="w-3.5 h-3.5" style={{ color: 'var(--color-warning)' }} />}
                    {entry.type === 'assignment' && <User className="w-3.5 h-3.5" style={{ color: 'var(--color-safe)' }} />}
                    {entry.type === 'alert' && <Bell className="w-3.5 h-3.5" style={{ color: 'var(--color-warning)' }} />}
                    {entry.type === 'analysis' && <Activity className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{entry.action}</p>
                    <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                      <Clock className="w-3 h-3" />{entry.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
