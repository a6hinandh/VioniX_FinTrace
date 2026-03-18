import { useState } from 'react';
import { Search, Loader2, ShieldCheck, ShieldAlert, Newspaper, Globe, Database, Building2 } from 'lucide-react';

export interface ExternalWatchlistCheckProps {
  className?: string;
}

interface CheckResult {
  status: 'clean' | 'flagged';
  message: string;
  news: string;
  pepStatus: string;
  sourceHits: string[];
}

function buildResult(query: string): CheckResult {
  const normalized = query.toLowerCase();
  const flagged = normalized.includes('999') || normalized.includes('pep') || normalized.includes('alert');

  if (flagged) {
    return {
      status: 'flagged',
      message: 'Potential match found with PEP and sanctions intelligence records.',
      news: 'Adverse media: offshore shell relation mentioned in global investigative feed.',
      pepStatus: 'Confirmed Match - Tier 1 Monitoring',
      sourceHits: ['OFAC', 'World-Check', 'PEP Registry', 'Global Adverse Media'],
    };
  }

  return {
    status: 'clean',
    message: 'No adverse hits across primary sanctions, PEP, and registry sources.',
    news: 'Related company news: no material events in the last 90 days.',
    pepStatus: 'No Match',
    sourceHits: ['OFAC', 'UN List', 'EU Consolidated List', 'Corporate Registry'],
  };
}

export function ExternalWatchlistCheck({ className = '' }: ExternalWatchlistCheckProps) {
  const [accountId, setAccountId] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountId.trim()) return;

    setIsChecking(true);
    setResult(null);

    setTimeout(() => {
      setResult(buildResult(accountId));
      setIsChecking(false);
    }, 1100);
  };

  return (
    <div className={`card p-5 ${className}`}>
      <div className="mb-4">
        <h2 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
          <Globe className="w-4.5 h-4.5" style={{ color: 'var(--color-accent)' }} />
          External Intelligence Lookup
        </h2>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Federated mock check for sanctions, PEP, adverse media, and corporate records.
        </p>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2 mb-2">
        <div className="relative flex-1">
          <Database className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            required
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="Entity ID (try ACC-999)"
            className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm transition-all focus:outline-none"
            style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isChecking || !accountId.trim()}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60 flex items-center gap-2"
          style={{ background: 'var(--color-accent)', boxShadow: 'var(--shadow-glow-accent)' }}
        >
          {isChecking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {isChecking ? 'Querying' : 'Check'}
        </button>
      </form>

      <p className="text-[11px] mb-4" style={{ color: 'var(--color-text-muted)' }}>
        Sources are mocked for demo, but shaped like enterprise integrations.
      </p>

      {result && (
        <div className="rounded-xl p-4 animate-fade-in"
          style={{
            background: result.status === 'flagged' ? 'var(--color-risk-muted)' : 'var(--color-safe-muted)',
            border: `1px solid ${result.status === 'flagged' ? 'var(--color-risk-border)' : 'var(--color-safe-border)'}`,
          }}>
          <div className="flex items-start gap-2 mb-3">
            {result.status === 'flagged' ? (
              <ShieldAlert className="w-5 h-5" style={{ color: 'var(--color-risk)' }} />
            ) : (
              <ShieldCheck className="w-5 h-5" style={{ color: 'var(--color-safe)' }} />
            )}
            <div>
              <h3 className="text-sm font-bold"
                style={{ color: result.status === 'flagged' ? 'var(--color-risk)' : 'var(--color-safe)' }}>
                {result.status === 'flagged' ? 'Potential Match Detected' : 'No Match Detected'}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{result.message}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
              <p className="text-[10px] uppercase font-bold tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>PEP Status</p>
              <p className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>{result.pepStatus}</p>
            </div>
            <div className="p-3 rounded-lg" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
              <p className="text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1"
                style={{ color: 'var(--color-text-muted)' }}>
                <Newspaper className="w-3 h-3" />
                Adverse Media
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{result.news}</p>
            </div>
          </div>

          <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
            <p className="text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center gap-1"
              style={{ color: 'var(--color-text-muted)' }}>
              <Building2 className="w-3 h-3" />
              Source Coverage
            </p>
            <div className="flex flex-wrap gap-2">
              {result.sourceHits.map((source) => (
                <span key={source} className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                  style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-border)' }}>
                  {source}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
