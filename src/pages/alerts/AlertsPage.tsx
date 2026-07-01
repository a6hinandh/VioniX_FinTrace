// FinTrace AI — Alerts Triage Page
// Full alert queue with filtering, status management, assignment, and undo

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LottiePlayer as Lottie } from '../../components/ui/LottiePlayer';
import { Bell, Filter, Search, ChevronDown, CheckCircle, XCircle, ArrowUpRight, Clock, User } from 'lucide-react';
import { useAppStore } from '../../state/store';
import { AlertStatus } from '../../types/domain';
import { SkeletonTable } from '../../components/ui/Skeleton';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { riskLevelToIntent, alertStatusToIntent } from '../../utils/badgeIntent';
import { Input } from '../../components/ui/Input';
import successCheck from '../../assets/lottie/success-check.json';
import toast from 'react-hot-toast';

type FilterKey = 'all' | 'high' | 'medium' | 'low';
type StatusFilter = 'all' | AlertStatus;

const ANALYSTS = ['Jane Doe', 'John Smith', 'Alex Chen', 'Sarah Ali'];

export default function AlertsPage() {
  const alerts = useAppStore((s) => s.alerts);
  const updateAlertStatus = useAppStore((s) => s.updateAlertStatus);
  const assignAlert = useAppStore((s) => s.assignAlert);
  const [riskFilter, setRiskFilter] = useState<FilterKey>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlerts, setSelectedAlerts] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [assignDropdown, setAssignDropdown] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filteredAlerts = alerts.filter((a) => {
    if (riskFilter !== 'all' && a.riskLevel !== riskFilter) return false;
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (searchQuery && !a.entityId.toLowerCase().includes(searchQuery.toLowerCase()) && !a.type.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selectedAlerts);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedAlerts(next);
  };

  const handleStatusChange = (alertId: string, status: AlertStatus) => {
    const previousAlert = alerts.find((a) => a.id === alertId);
    const prevStatus = previousAlert?.status;
    updateAlertStatus(alertId, status);

    // Undo for dismissals
    if (status === AlertStatus.DISMISSED && prevStatus) {
      toast((t) => (
        <div className="flex items-center gap-3">
          <span>Alert {alertId} dismissed</span>
          <button onClick={() => { updateAlertStatus(alertId, prevStatus); toast.dismiss(t.id); }}
            className="px-2 py-1 rounded text-xs font-bold"
            style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}>
            Undo
          </button>
        </div>
      ));
    } else {
      toast.success(`Alert ${alertId} marked as ${status}`);
    }
  };

  const handleBulkAction = (status: AlertStatus) => {
    selectedAlerts.forEach((id) => updateAlertStatus(id, status));
    toast.success(`${selectedAlerts.size} alerts updated to ${status}`);
    setSelectedAlerts(new Set());
  };

  const handleAssign = (alertId: string, analyst: string) => {
    assignAlert(alertId, analyst);
    toast.success(`Alert ${alertId} assigned to ${analyst}`);
    setAssignDropdown(null);
  };

  const riskCounts = {
    all: alerts.length,
    high: alerts.filter((a) => a.riskLevel === 'high').length,
    medium: alerts.filter((a) => a.riskLevel === 'medium').length,
    low: alerts.filter((a) => a.riskLevel === 'low').length,
  };

  const renderAssignControl = (alert: (typeof alerts)[number]) => (
    alert.assignee || (
      <div className="relative">
        <Button onClick={() => setAssignDropdown(assignDropdown === alert.id ? null : alert.id)}
          size="sm" icon={<User className="w-3 h-3" />}
          style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-border)' }}>
          Assign
        </Button>
        {assignDropdown === alert.id && (
          <div className="absolute top-full left-0 mt-1 py-1 rounded-lg shadow-lg z-50 min-w-[140px]"
            style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
            {ANALYSTS.map((a) => (
              <button key={a} onClick={() => handleAssign(alert.id, a)}
                className="w-full text-left px-3 py-1.5 text-xs transition-colors"
                style={{ color: 'var(--color-text-primary)' }}>{a}</button>
            ))}
          </div>
        )}
      </div>
    )
  );

  const renderRowActions = (alert: (typeof alerts)[number], alwaysVisible = false) => (
    <div className={`flex items-center justify-end gap-1 transition-opacity ${alwaysVisible ? '' : 'opacity-0 group-hover:opacity-100'}`}>
      {alert.status === 'new' && (
        <button onClick={() => handleStatusChange(alert.id, AlertStatus.REVIEWING)} className="p-1.5 rounded-lg transition-all" style={{ color: 'var(--color-warning)' }} title="Start Review">
          <Clock className="w-3.5 h-3.5" /></button>
      )}
      <button onClick={() => handleStatusChange(alert.id, AlertStatus.ESCALATED)} className="p-1.5 rounded-lg transition-all" style={{ color: 'var(--color-risk)' }} title="Escalate">
        <ArrowUpRight className="w-3.5 h-3.5" /></button>
      <button onClick={() => handleStatusChange(alert.id, AlertStatus.RESOLVED)} className="p-1.5 rounded-lg transition-all" style={{ color: 'var(--color-safe)' }} title="Resolve">
        <CheckCircle className="w-3.5 h-3.5" /></button>
      <button onClick={() => handleStatusChange(alert.id, AlertStatus.DISMISSED)} className="p-1.5 rounded-lg transition-all" style={{ color: 'var(--color-text-muted)' }} title="Dismiss">
        <XCircle className="w-3.5 h-3.5" /></button>
    </div>
  );

  if (isLoading) return <div className="animate-fade-in"><div className="mb-8"><div className="skeleton h-8 w-48 mb-2" /><div className="skeleton h-4 w-64" /></div><SkeletonTable rows={6} /></div>;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <Bell className="w-6 h-6" style={{ color: 'var(--color-warning)' }} />
          Alert Triage Queue
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Review, prioritize, and action incoming fraud detection alerts.</p>
      </div>

      {/* Summary Chips */}
      <div className="flex flex-wrap gap-3 mb-6">
        {([
          { key: 'all' as FilterKey, label: 'All Alerts', count: riskCounts.all, color: 'var(--color-accent)', muted: 'var(--color-accent-muted)', border: 'var(--color-accent-border)' },
          { key: 'high' as FilterKey, label: 'High Risk', count: riskCounts.high, color: 'var(--color-risk)', muted: 'var(--color-risk-muted)', border: 'var(--color-risk-border)' },
          { key: 'medium' as FilterKey, label: 'Medium', count: riskCounts.medium, color: 'var(--color-warning)', muted: 'var(--color-warning-muted)', border: 'var(--color-warning-border)' },
          { key: 'low' as FilterKey, label: 'Low', count: riskCounts.low, color: 'var(--color-safe)', muted: 'var(--color-safe-muted)', border: 'var(--color-safe-border)' },
        ]).map((chip) => (
          <button
            key={chip.key}
            onClick={() => setRiskFilter(chip.key)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
            style={{
              background: riskFilter === chip.key ? chip.muted : 'var(--color-surface-2)',
              color: riskFilter === chip.key ? chip.color : 'var(--color-text-secondary)',
              border: `1px solid ${riskFilter === chip.key ? chip.border : 'var(--color-border)'}`,
            }}
          >
            {chip.label}
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold"
              style={{ background: riskFilter === chip.key ? chip.border : 'var(--color-surface-0)' }}>{chip.count}</span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by entity ID or alert type..."
          icon={<Search className="w-4 h-4" />}
          containerClassName="flex-1 max-w-md"
        />
        <Button onClick={() => {
          const statuses: StatusFilter[] = ['all', 'new', 'reviewing', 'escalated', 'dismissed', 'resolved'];
          const idx = statuses.indexOf(statusFilter);
          setStatusFilter(statuses[(idx + 1) % statuses.length]);
        }} icon={<Filter className="w-4 h-4" />}>
          Status: {statusFilter === 'all' ? 'All' : statusFilter}<ChevronDown className="w-3 h-3" />
        </Button>
        {selectedAlerts.size > 0 && (
          <div className="flex items-center gap-2 md:ml-auto">
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{selectedAlerts.size} selected</span>
            <Button onClick={() => handleBulkAction(AlertStatus.REVIEWING)} size="sm"
              style={{ background: 'var(--color-warning-muted)', color: 'var(--color-warning)', border: '1px solid var(--color-warning-border)' }}>Review</Button>
            <Button onClick={() => handleBulkAction(AlertStatus.DISMISSED)} size="sm">Dismiss</Button>
          </div>
        )}
      </div>

      {/* Alerts — mobile card list */}
      <div className="md:hidden space-y-3 mb-6">
        <AnimatePresence initial={false}>
          {filteredAlerts.map((alert) => (
            <motion.div key={alert.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }} className="card p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedAlerts.has(alert.id)} onChange={() => toggleSelect(alert.id)} />
                  <span className="font-mono font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>{alert.entityId}</span>
                </div>
                <Badge intent={riskLevelToIntent(alert.riskLevel)} size="md">{alert.riskScore}</Badge>
              </div>
              <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>{alert.type}</p>
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge intent={alertStatusToIntent(alert.status)}>{alert.status}</Badge>
                {renderAssignControl(alert)}
              </div>
              {renderRowActions(alert, true)}
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredAlerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 -mb-2" aria-hidden="true">
              <Lottie animationData={successCheck} loop={false} autoplay />
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>No alerts match your filters</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Alerts Table — desktop */}
      <div className="hidden md:block card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="text-xs" style={{ color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-0)' }}>
            <tr>
              <th className="px-4 py-4 w-8"><input type="checkbox" onChange={(e) => {
                if (e.target.checked) setSelectedAlerts(new Set(filteredAlerts.map((a) => a.id)));
                else setSelectedAlerts(new Set());
              }} /></th>
              <th className="px-4 py-4 font-semibold">Alert ID</th>
              <th className="px-4 py-4 font-semibold">Entity</th>
              <th className="px-4 py-4 font-semibold">Type</th>
              <th className="px-4 py-4 font-semibold">Risk</th>
              <th className="px-4 py-4 font-semibold">Status</th>
              <th className="px-4 py-4 font-semibold">Assignee</th>
              <th className="px-4 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {filteredAlerts.map((alert) => (
                <motion.tr key={alert.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="transition-colors group" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="px-4 py-4"><input type="checkbox" checked={selectedAlerts.has(alert.id)} onChange={() => toggleSelect(alert.id)} /></td>
                  <td className="px-4 py-4"><span className="font-mono text-xs font-bold" style={{ color: 'var(--color-text-secondary)' }}>{alert.id}</span></td>
                  <td className="px-4 py-4"><span className="font-mono font-bold" style={{ color: 'var(--color-text-primary)' }}>{alert.entityId}</span></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{
                        background: alert.riskLevel === 'high' ? 'var(--color-risk)' : alert.riskLevel === 'medium' ? 'var(--color-warning)' : 'var(--color-safe)',
                      }} />
                      <span style={{ color: 'var(--color-text-secondary)' }}>{alert.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge intent={riskLevelToIntent(alert.riskLevel)} size="md">{alert.riskScore}</Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Badge intent={alertStatusToIntent(alert.status)}>{alert.status}</Badge>
                  </td>
                  <td className="px-4 py-4 text-xs relative" style={{ color: 'var(--color-text-muted)' }}>
                    {renderAssignControl(alert)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    {renderRowActions(alert)}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {filteredAlerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 -mb-2" aria-hidden="true">
              <Lottie animationData={successCheck} loop={false} autoplay />
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>No alerts match your filters</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Try adjusting your search or filter criteria</p>
          </div>
        )}

        <div className="px-6 py-4 flex items-center justify-between text-xs"
          style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-surface-0)', color: 'var(--color-text-muted)' }}>
          <span>Showing {filteredAlerts.length} of {alerts.length} alerts</span>
          <div className="flex gap-1">
            <Button size="sm" style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-border)' }}>1</Button>
            <Button size="sm" variant="ghost">2</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
