// FinTrace AI — Investigations Page
// Case board with assignee, SLA, actions, audit trail, and theme support

import { useState, useEffect } from 'react';
import { ShieldAlert, Clock, User, FileText, ChevronRight, Snowflake, ArrowUpRight, Plus } from 'lucide-react';
import { useAppStore } from '../../state/store';
import { CaseStatus } from '../../types/domain';
import { SkeletonTable } from '../../components/ui/Skeleton';
import toast from 'react-hot-toast';

export default function InvestigationsPage() {
  const cases = useAppStore((s) => s.cases);
  const updateCaseStatus = useAppStore((s) => s.updateCaseStatus);
  const addCaseAuditEntry = useAppStore((s) => s.addCaseAuditEntry);
  const generateReport = useAppStore((s) => s.generateReport);
  const [expandedCase, setExpandedCase] = useState<string | null>(cases[0]?.id || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 800); return () => clearTimeout(t); }, []);

  const handleAction = (caseId: string, action: string, newStatus?: CaseStatus) => {
    if (newStatus) updateCaseStatus(caseId, newStatus);
    addCaseAuditEntry(caseId, action, 'Jane Doe', `${action} performed by analyst`);
    toast.success(`${action} — Case ${caseId}`);
  };

  const handleGenerateReport = (caseId: string) => {
    generateReport(caseId);
    toast.success('Generating evidence package...');
  };

  const statusColors: Record<string, { bg: string; color: string; border: string }> = {
    [CaseStatus.OPEN]: { bg: 'var(--color-info-muted)', color: 'var(--color-info)', border: 'var(--color-info-border)' },
    [CaseStatus.IN_PROGRESS]: { bg: 'var(--color-warning-muted)', color: 'var(--color-warning)', border: 'var(--color-warning-border)' },
    [CaseStatus.PENDING_REVIEW]: { bg: 'var(--color-accent-muted)', color: 'var(--color-accent)', border: 'var(--color-accent-border)' },
    [CaseStatus.ESCALATED]: { bg: 'var(--color-risk-muted)', color: 'var(--color-risk)', border: 'var(--color-risk-border)' },
    [CaseStatus.CLOSED]: { bg: 'var(--color-safe-muted)', color: 'var(--color-safe)', border: 'var(--color-safe-border)' },
  };

  const getSlaStatus = (deadline: string) => {
    const remaining = new Date(deadline).getTime() - Date.now();
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    if (hours < 0) return { label: 'OVERDUE', color: 'var(--color-risk)', bg: 'var(--color-risk-muted)', urgent: true };
    if (hours < 12) return { label: `${hours}h remaining`, color: 'var(--color-warning)', bg: 'var(--color-warning-muted)', urgent: true };
    return { label: `${hours}h remaining`, color: 'var(--color-text-muted)', bg: 'var(--color-surface-0)', urgent: false };
  };

  if (isLoading) return <div className="animate-fade-in"><div className="mb-8"><div className="skeleton h-8 w-48 mb-2" /><div className="skeleton h-4 w-80" /></div><SkeletonTable rows={4} /></div>;

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
            <ShieldAlert className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
            Investigation Cases
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Manage active investigations, assign cases, and track compliance workflows.</p>
        </div>
        <div className="flex gap-3">
          {[
            { label: 'Active', count: cases.filter((c) => c.status !== CaseStatus.CLOSED).length, ...statusColors[CaseStatus.IN_PROGRESS] },
            { label: 'Escalated', count: cases.filter((c) => c.status === CaseStatus.ESCALATED).length, ...statusColors[CaseStatus.ESCALATED] },
          ].map((s) => (
            <div key={s.label} className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
              {s.label}: {s.count}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {cases.map((c) => {
          const sla = getSlaStatus(c.slaDeadline);
          const isExpanded = expandedCase === c.id;
          const sc = statusColors[c.status] || statusColors[CaseStatus.OPEN];

          return (
            <div key={c.id} className="card overflow-hidden transition-all" style={{
              borderColor: isExpanded ? 'var(--color-accent-border)' : undefined,
              boxShadow: isExpanded ? 'var(--shadow-glow-accent)' : undefined,
            }}>
              {/* Case Header */}
              <div className="p-5 flex items-center gap-4 cursor-pointer" onClick={() => setExpandedCase(isExpanded ? null : c.id)}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: c.priority === 'high' ? 'var(--color-risk-muted)' : 'var(--color-warning-muted)', color: c.priority === 'high' ? 'var(--color-risk)' : 'var(--color-warning)' }}>
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{c.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase" style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>{c.status.replace('_', ' ')}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${sla.urgent ? 'animate-pulse' : ''}`}
                      style={{ background: sla.bg, color: sla.color }}>
                      <Clock className="w-3 h-3 inline mr-1" />{sla.label}
                    </span>
                  </div>
                  <p className="text-sm truncate" style={{ color: 'var(--color-text-secondary)' }}>{c.summary}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Assignee</p>
                    <p className="text-sm font-medium flex items-center gap-1.5" style={{ color: 'var(--color-text-primary)' }}><User className="w-3 h-3" style={{ color: 'var(--color-text-muted)' }} />{c.assignee}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Entities</p>
                    <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{c.entityIds.length}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} style={{ color: 'var(--color-text-muted)' }} />
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--color-border)' }}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0" style={{ ['--tw-divide-opacity' as string]: 1 }}>
                    {/* Left: Details & Actions */}
                    <div className="lg:col-span-1 p-5 space-y-4" style={{ borderRight: '1px solid var(--color-border)' }}>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Next Action</p>
                        <p className="text-sm p-3 rounded-lg" style={{ color: 'var(--color-text-secondary)', background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>{c.nextAction}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Entities Under Investigation</p>
                        <div className="flex flex-wrap gap-2">
                          {c.entityIds.map((eid) => (
                            <span key={eid} className="font-mono text-xs px-2 py-1 rounded" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>{eid}</span>
                          ))}
                        </div>
                      </div>

                      {/* Risk Breakdown */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Risk Breakdown</p>
                        <div className="space-y-2">
                          {[
                            { label: 'Layering', value: c.riskBreakdown.layeringScore },
                            { label: 'Structuring', value: c.riskBreakdown.structuringScore },
                            { label: 'Velocity', value: c.riskBreakdown.velocityScore },
                            { label: 'Profile Mismatch', value: c.riskBreakdown.profileMismatchScore },
                            { label: 'Geographic', value: c.riskBreakdown.geographicRisk },
                          ].map((f) => (
                            <div key={f.label} className="flex items-center gap-3">
                              <span className="text-[11px] w-28" style={{ color: 'var(--color-text-muted)' }}>{f.label}</span>
                              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-0)' }}>
                                <div className="h-full rounded-full transition-all" style={{
                                  width: `${f.value}%`,
                                  background: f.value >= 80 ? 'var(--color-risk)' : f.value >= 50 ? 'var(--color-warning)' : 'var(--color-safe)',
                                }} />
                              </div>
                              <span className="text-[11px] font-mono w-8 text-right" style={{ color: 'var(--color-text-muted)' }}>{f.value}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-[10px] font-mono mt-2" style={{ color: 'var(--color-text-muted)' }}>Model: {c.riskBreakdown.modelVersion} · Confidence: {Math.round(c.riskBreakdown.confidence * 100)}%</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button onClick={() => handleAction(c.id, 'Assigned to Jane Doe', CaseStatus.IN_PROGRESS)}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                          <User className="w-3.5 h-3.5" /> Assign Case
                        </button>
                        <button onClick={() => handleAction(c.id, 'Documents requested')}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                          <FileText className="w-3.5 h-3.5" /> Request Docs
                        </button>
                        <button onClick={() => handleAction(c.id, 'Account frozen', CaseStatus.ESCALATED)}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: 'var(--color-risk-muted)', border: '1px solid var(--color-risk-border)', color: 'var(--color-risk)' }}>
                          <Snowflake className="w-3.5 h-3.5" /> Freeze Account
                        </button>
                        <button onClick={() => handleAction(c.id, 'Escalated to FIU', CaseStatus.ESCALATED)}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: 'var(--color-warning-muted)', border: '1px solid var(--color-warning-border)', color: 'var(--color-warning)' }}>
                          <ArrowUpRight className="w-3.5 h-3.5" /> Escalate to FIU
                        </button>
                      </div>

                      <button onClick={() => handleGenerateReport(c.id)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
                        style={{ background: 'var(--color-accent)', boxShadow: 'var(--shadow-glow-accent)' }}>
                        <Plus className="w-4 h-4" /> Generate Evidence Package
                      </button>
                    </div>

                    {/* Right: Audit Trail */}
                    <div className="lg:col-span-2 p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)' }}>Audit Trail Timeline</p>
                      <div className="relative">
                        <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: 'var(--color-border)' }} />
                        <div className="space-y-4">
                          {c.auditTrail.map((entry, idx) => (
                            <div key={entry.id} className="flex gap-4 relative animate-fade-in">
                              <div className="w-4 h-4 rounded-full border-2 shrink-0 z-10 mt-0.5" style={{
                                background: idx === c.auditTrail.length - 1 ? 'var(--color-accent)' : 'var(--color-surface-2)',
                                borderColor: idx === c.auditTrail.length - 1 ? 'var(--color-accent)' : 'var(--color-border)',
                                boxShadow: idx === c.auditTrail.length - 1 ? 'var(--shadow-glow-accent)' : 'none',
                              }} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{entry.action}</span>
                                  <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                                </div>
                                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{entry.details}</p>
                                <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>by {entry.actor}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
