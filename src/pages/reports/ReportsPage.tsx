import { useMemo, useState } from 'react';
import { FileText, Calendar, Eye, Download, X, Sparkles, PlusCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../../state/store';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { alertStatusToIntent } from '../../utils/badgeIntent';
import { backdropFade, scaleFade, staggerContainer, staggerItem } from '../../lib/motion';

export default function ReportsPage() {
  const reports = useAppStore((s) => s.reports);
  const cases = useAppStore((s) => s.cases);
  const generateReport = useAppStore((s) => s.generateReport);

  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const selectedReport = useMemo(
    () => reports.find((report) => report.id === selectedReportId) ?? null,
    [reports, selectedReportId],
  );

  const handleGenerate = () => {
    const candidate = cases.find((item) => item.status !== 'closed') ?? cases[0];
    if (!candidate) return;
    generateReport(candidate.id);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <FileText className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
            Evidence Report Center
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Regulatory-ready evidence packages with chain summaries and explainable findings.
          </p>
        </div>

        <Button onClick={handleGenerate} variant="primary" icon={<PlusCircle className="w-4 h-4" />}>
          Generate Report
        </Button>
      </div>

      <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6" variants={staggerContainer} initial="hidden" animate="visible">
        {[
          { label: 'Total Reports', value: reports.length, color: 'var(--color-accent)' },
          { label: 'Ready / Exported', value: reports.filter((r) => r.status !== 'generating').length, color: 'var(--color-safe)' },
          { label: 'In Generation', value: reports.filter((r) => r.status === 'generating').length, color: 'var(--color-warning)' },
        ].map((metric) => (
          <motion.div key={metric.label} variants={staggerItem} className="card p-4">
            <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{metric.label}</p>
            <p className="text-3xl font-extrabold mt-1" style={{ color: metric.color }}>{metric.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="card p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{report.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  <span className="font-mono">{report.id}</span>
                  <span className="font-mono">Case {report.caseId}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(report.generatedAt).toLocaleString()}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{report.summary}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge intent={alertStatusToIntent(report.status)}>{report.status}</Badge>

              <Button onClick={() => setSelectedReportId(report.id)} size="sm" icon={<Eye className="w-3.5 h-3.5" />}>
                View
              </Button>

              <Button variant="primary" size="sm" icon={<Download className="w-3.5 h-3.5" />}
                style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-border)', boxShadow: 'none' }}>
                Export
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
      {selectedReport && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          variants={backdropFade}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="w-full max-w-3xl overflow-hidden"
            variants={scaleFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ background: 'var(--color-surface-1)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)', borderRadius: '1.1rem' }}>
            <div className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-0)' }}>
              <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                <Sparkles className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                {selectedReport.title}
              </h2>
              <button
                onClick={() => setSelectedReportId(null)}
                className="p-1.5 rounded-lg"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="rounded-xl p-5" style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>
                <h3 className="text-xl font-extrabold tracking-tight">Financial Intelligence Evidence Report</h3>
                <p className="text-xs mt-1 uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>Confidential Compliance Artifact</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>Report ID</p>
                    <p className="font-mono font-semibold">{selectedReport.id}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>Case ID</p>
                    <p className="font-mono font-semibold">{selectedReport.caseId}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>Entities</p>
                    <p className="font-semibold">{selectedReport.entityCount}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>Transactions</p>
                    <p className="font-semibold">{selectedReport.transactionCount}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--color-text-muted)' }}>Narrative Summary</p>
                  <p className="text-sm leading-relaxed">{selectedReport.summary}</p>
                </div>

                <div className="mt-6 rounded-lg border p-3" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-3)' }}>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Recommended Action</p>
                  <p className="text-sm mt-1">Escalate to compliance officer, freeze high-risk nodes, and attach this package to SAR filing workflow.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
