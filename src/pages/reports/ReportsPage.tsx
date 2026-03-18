// FinTrace AI — Reports Page
// Evidence package management, export, and download functionality

import { useState, useEffect } from 'react';
import { FileText, Download, FileJson, Loader2, CheckCircle, PackageOpen, Clock, Calendar, Users, DollarSign } from 'lucide-react';
import { useAppStore } from '../../state/store';
import { SkeletonTable } from '../../components/ui/Skeleton';
import toast from 'react-hot-toast';

export default function ReportsPage() {
  const reports = useAppStore((s) => s.reports);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 800); return () => clearTimeout(t); }, []);

  const handleDownload = (reportId: string, format: 'pdf' | 'json') => {
    const report = reports.find((r) => r.id === reportId);
    if (!report) return;

    if (format === 'json') {
      const data = JSON.stringify({
        id: report.id, caseId: report.caseId, title: report.title, summary: report.summary,
        generatedAt: report.generatedAt, generatedBy: report.generatedBy,
        entities: report.entityCount, transactions: report.transactionCount,
        totalAmount: report.totalAmount, currency: report.currency, status: report.status,
        evidence: { riskScores: 'included', transactionGraph: 'included', auditTrail: 'included', entityProfiles: 'included' },
      }, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${report.id}-evidence-package.json`; a.click();
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${report.id} as JSON`);
    } else {
      // Simulate PDF download
      const pdfContent = `%PDF-1.4 FINTRACE AI - Evidence Package\n\nReport: ${report.title}\nCase: ${report.caseId}\nGenerated: ${new Date(report.generatedAt).toLocaleString()}\nBy: ${report.generatedBy}\n\nSummary: ${report.summary}\n\nEntities: ${report.entityCount}\nTransactions: ${report.transactionCount}\nTotal Amount: $${report.totalAmount.toLocaleString()}\n\nThis is a simulated evidence package for demonstration purposes.\n`;
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${report.id}-evidence-package.pdf`; a.click();
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${report.id} as PDF`);
    }
  };

  const statusInfo: Record<string, { icon: typeof CheckCircle; color: string; bg: string; label: string }> = {
    'ready': { icon: CheckCircle, color: 'var(--color-safe)', bg: 'var(--color-safe-muted)', label: 'Ready' },
    'generating': { icon: Loader2, color: 'var(--color-warning)', bg: 'var(--color-warning-muted)', label: 'Generating' },
    'exported': { icon: PackageOpen, color: 'var(--color-accent)', bg: 'var(--color-accent-muted)', label: 'Exported' },
  };

  if (isLoading) return <div className="animate-fade-in"><div className="mb-8"><div className="skeleton h-8 w-48 mb-2" /><div className="skeleton h-4 w-64" /></div><SkeletonTable rows={4} /></div>;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <FileText className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
          Evidence Reports
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Generated evidence packages and regulatory reports for compliance filing.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Reports', value: reports.length, icon: FileText, color: 'var(--color-accent)', bg: 'var(--color-accent-muted)' },
          { label: 'Ready for Export', value: reports.filter((r) => r.status === 'ready').length, icon: CheckCircle, color: 'var(--color-safe)', bg: 'var(--color-safe-muted)' },
          { label: 'Generating', value: reports.filter((r) => r.status === 'generating').length, icon: Clock, color: 'var(--color-warning)', bg: 'var(--color-warning-muted)' },
        ].map((s) => (
          <div key={s.label} className="card p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg, color: s.color }}><s.icon className="w-5 h-5" /></div>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{s.value}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => {
          const si = statusInfo[report.status] || statusInfo['ready'];
          const StatusIcon = si.icon;

          return (
            <div key={report.id} className="card overflow-hidden group">
              <div className="p-5 flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: report.format === 'pdf' ? 'var(--color-risk-muted)' : 'var(--color-accent-muted)', color: report.format === 'pdf' ? 'var(--color-risk)' : 'var(--color-accent)' }}>
                  {report.format === 'pdf' ? <FileText className="w-6 h-6" /> : <FileJson className="w-6 h-6" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-sm font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>{report.title}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shrink-0" style={{ background: si.bg, color: si.color }}>
                      <StatusIcon className={`w-3 h-3 ${report.status === 'generating' ? 'animate-spin' : ''}`} />{si.label}
                    </span>
                  </div>
                  <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{report.summary}</p>

                  <div className="flex flex-wrap gap-4 text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(report.generatedAt).toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{report.entityCount} entities</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />${report.totalAmount.toLocaleString()}</span>
                    <span className="flex items-center gap-1">{report.transactionCount} transactions</span>
                    <span className="font-mono uppercase text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>{report.format}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {report.status !== 'generating' && (
                    <>
                      <button onClick={() => handleDownload(report.id, 'json')}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                        style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                        <FileJson className="w-3.5 h-3.5" /> JSON
                      </button>
                      <button onClick={() => handleDownload(report.id, 'pdf')}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white transition-all"
                        style={{ background: 'var(--color-accent)', boxShadow: 'var(--shadow-glow-accent)' }}>
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </>
                  )}
                  {report.status === 'generating' && (
                    <div className="px-4 py-2 text-xs font-medium flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                      <Loader2 className="w-4 h-4 animate-spin" />Processing...
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
