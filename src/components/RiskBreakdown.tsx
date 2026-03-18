import { Info, TrendingUp, TrendingDown, ShieldAlert } from 'lucide-react';

export interface RiskFactor {
  id: string;
  name: string;
  value: string;
  impactPts: number;
}

export interface RiskBreakdownProps {
  score?: number;
  factors?: RiskFactor[];
  className?: string;
  title?: string;
}

const DEFAULT_FACTORS: RiskFactor[] = [
  { id: '1', name: 'Transaction velocity', value: 'High over trailing 2h', impactPts: 30 },
  { id: '2', name: 'Account age', value: 'Low tenure profile', impactPts: -5 },
  { id: '3', name: 'Structuring pattern', value: 'Below-threshold splitting detected', impactPts: 40 },
  { id: '4', name: 'Multi-hop topology', value: '4-hop chain with amount preservation', impactPts: 18 },
];

export function RiskBreakdown({
  score = 95,
  factors = DEFAULT_FACTORS,
  className = '',
  title = 'Risk Explainability',
}: RiskBreakdownProps) {
  return (
    <div className={`card p-5 ${className}`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5"
            style={{ color: 'var(--color-text-muted)' }}>
            <Info className="w-3.5 h-3.5" />
            {title}
          </p>
          <h3 className="text-base font-bold mt-1" style={{ color: 'var(--color-text-primary)' }}>
            Factorized Score Decomposition
          </h3>
        </div>
        <div className="text-right">
          <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Risk Score</p>
          <p className="text-4xl font-extrabold leading-none"
            style={{ color: score >= 80 ? 'var(--color-risk)' : score >= 55 ? 'var(--color-warning)' : 'var(--color-safe)' }}>
            {score}
          </p>
        </div>
      </div>

      <div className="premium-divider mb-4" />

      <div className="space-y-3">
        {factors.map((factor) => {
          const positive = factor.impactPts > 0;
          return (
            <div key={factor.id} className="rounded-xl p-3"
              style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{factor.name}</p>
                <p className="text-xs font-bold flex items-center gap-1"
                  style={{ color: positive ? 'var(--color-risk)' : 'var(--color-safe)' }}>
                  {positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {positive ? '+' : ''}{factor.impactPts} pts
                </p>
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{factor.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 px-3 py-2 rounded-lg flex items-center gap-2"
        style={{ background: 'var(--color-risk-muted)', border: '1px solid var(--color-risk-border)', color: 'var(--color-risk)' }}>
        <ShieldAlert className="w-4 h-4" />
        <p className="text-xs font-medium">Escalation recommended when score exceeds 85 with 2 or more high-impact signals.</p>
      </div>
    </div>
  );
}
