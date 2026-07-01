import { useMemo, useState } from 'react';
import { ShieldAlert, Clock3, MessageSquare, UserRound, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../state/store';
import { CaseStatus, type InvestigationCase } from '../../types/domain';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { caseStatusToIntent } from '../../utils/badgeIntent';
import { Input } from '../../components/ui/Input';

const ANALYSTS = ['Jane Doe', 'John Smith', 'Alex Chen', 'Sarah Ali', 'Marcus Ray'];

function statusLabel(status: string) {
  return status.replace(/_/g, ' ');
}

export default function InvestigationsPage() {
  const cases = useAppStore((s) => s.cases);
  const addCaseAuditEntry = useAppStore((s) => s.addCaseAuditEntry);
  const updateCaseStatus = useAppStore((s) => s.updateCaseStatus);

  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id ?? null);
  const [comment, setComment] = useState('');
  const [assigneeOverrides, setAssigneeOverrides] = useState<Record<string, string>>({});

  const activeCase = useMemo(
    () => cases.find((c) => c.id === selectedCaseId) ?? null,
    [cases, selectedCaseId],
  );

  const effectiveAssignee = activeCase
    ? assigneeOverrides[activeCase.id] ?? activeCase.assignee
    : 'Unassigned';

  const openCases = cases.filter((item) => item.status !== CaseStatus.CLOSED);

  const handleAddComment = () => {
    if (!activeCase || !comment.trim()) return;
    addCaseAuditEntry(activeCase.id, 'Comment Added', 'Analyst', comment.trim());
    setComment('');
  };

  const handleSetAssignee = (caseItem: InvestigationCase, assignee: string) => {
    setAssigneeOverrides((prev) => ({ ...prev, [caseItem.id]: assignee }));
    addCaseAuditEntry(caseItem.id, 'Assignee Updated', 'Supervisor', `Assigned to ${assignee}`);
  };

  const handleEscalate = () => {
    if (!activeCase) return;
    updateCaseStatus(activeCase.id, CaseStatus.ESCALATED);
    addCaseAuditEntry(activeCase.id, 'Case Escalated', 'Analyst', 'Escalated to compliance lead for immediate action.');
  };

  const handleClose = () => {
    if (!activeCase) return;
    updateCaseStatus(activeCase.id, CaseStatus.CLOSED);
    addCaseAuditEntry(activeCase.id, 'Case Closed', 'Analyst', 'Investigation complete and evidence archived.');
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
          <ShieldAlert className="w-6 h-6" style={{ color: 'var(--color-risk)' }} />
          Investigation Command Center
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Case triage, collaboration, assignment, and full audit trail timeline.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 card overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Open Cases</p>
            <Badge intent="accent">{openCases.length}</Badge>
          </div>

          <div className="p-3 space-y-2 max-h-[60vh] md:max-h-[34rem] overflow-y-auto custom-scrollbar" style={{ background: 'var(--color-surface-0)' }}>
            {cases.map((caseItem) => {
              const selected = caseItem.id === selectedCaseId;
              return (
                <button
                  key={caseItem.id}
                  onClick={() => setSelectedCaseId(caseItem.id)}
                  className="w-full text-left rounded-xl p-3 transition-all"
                  style={{
                    background: selected ? 'var(--color-surface-2)' : 'var(--color-surface-1)',
                    border: `1px solid ${selected ? 'var(--color-accent-border)' : 'var(--color-border)'}`,
                    boxShadow: selected ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="font-mono text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>{caseItem.id}</p>
                    <Badge intent={caseStatusToIntent(caseItem.status)}>{statusLabel(caseItem.status)}</Badge>
                  </div>
                  <p className="text-xs line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{caseItem.summary}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                    <span>{caseItem.assignee}</span>
                    <span>{new Date(caseItem.updatedAt).toLocaleTimeString('en-US', { hour12: false })}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="xl:col-span-8 card overflow-hidden">
          {activeCase ? (
            <>
              <div className="px-5 py-4 flex items-start justify-between gap-4"
                style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>Case Detail</p>
                  <h2 className="text-xl font-bold mt-1" style={{ color: 'var(--color-text-primary)' }}>{activeCase.id}</h2>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{activeCase.summary}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Risk Score</p>
                  <p className="text-4xl font-extrabold" style={{ color: 'var(--color-risk)' }}>{activeCase.riskBreakdown.overall}</p>
                </div>
              </div>

              <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="rounded-xl p-4" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
                    <p className="text-xs uppercase font-semibold tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>Collaboration</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Assigned Analyst</p>
                        <div className="flex items-center gap-2">
                          <UserRound className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                          <select
                            value={effectiveAssignee}
                            onChange={(e) => handleSetAssignee(activeCase, e.target.value)}
                            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
                            style={{
                              background: 'var(--color-surface-2)',
                              border: '1px solid var(--color-border)',
                              color: 'var(--color-text-primary)',
                            }}
                          >
                            {ANALYSTS.map((name) => (
                              <option key={name} value={name}>{name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Analyst Comment</p>
                        <div className="flex gap-2">
                          <Input
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add investigation note..."
                            className="w-full"
                          />
                          <Button onClick={handleAddComment} variant="primary" size="sm">
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl p-4" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
                    <p className="text-xs uppercase font-semibold tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>
                      Related Entities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeCase.entityIds.map((entity) => (
                        <Badge key={entity} intent="accent" size="md">{entity}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={handleEscalate} variant="danger" icon={<ArrowUpRight className="w-4 h-4" />}>
                      Escalate
                    </Button>
                    <Button onClick={handleClose} variant="success" icon={<CheckCircle2 className="w-4 h-4" />}>
                      Close Case
                    </Button>
                  </div>
                </div>

                <div className="rounded-xl p-4" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
                  <p className="text-xs uppercase font-semibold tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: 'var(--color-text-muted)' }}>
                    <Clock3 className="w-3.5 h-3.5" />
                    Audit Trail
                  </p>
                  <div className="space-y-2 max-h-[40vh] md:max-h-[25rem] overflow-y-auto custom-scrollbar pr-1">
                    {activeCase.auditTrail.slice().reverse().map((entry) => (
                      <div key={entry.id} className="rounded-lg p-3"
                        style={{ background: 'var(--color-surface-1)', border: '1px solid var(--color-border)' }}>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{entry.action}</p>
                          <p className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>
                            {new Date(entry.timestamp).toLocaleTimeString('en-US', { hour12: false })}
                          </p>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{entry.details}</p>
                        <p className="text-[10px] mt-1 font-semibold flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                          <MessageSquare className="w-3 h-3" />
                          {entry.actor}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center">
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Select a case to open investigation details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
