import { useMemo, useRef, useState, useEffect } from 'react';
import { Activity, AlertTriangle, Pause, Play, Radar } from 'lucide-react';

export interface Transaction {
  id: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  timestamp: number;
}

export interface Alert {
  id: string;
  transactionId: string;
  reason: string;
  severity: 'high' | 'medium';
  timestamp: number;
}

type VelocityWindow = Record<string, number[]>;

const AMOUNT_THRESHOLD = 400000;

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function accountId() {
  return `ACC-${randomBetween(1000, 9999)}`;
}

function transactionId() {
  return `TXN-${randomBetween(100000, 999999)}`;
}

export function TransactionFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [cadenceMs, setCadenceMs] = useState(1400);
  const velocityRef = useRef<VelocityWindow>({});

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const from = accountId();
      const to = accountId();

      // Create occasional large-value and structured patterns for realism.
      const burstMode = Math.random() > 0.82;
      const amount = burstMode
        ? randomBetween(380000, 520000)
        : randomBetween(70000, 290000);

      const tx: Transaction = {
        id: transactionId(),
        fromAccount: from,
        toAccount: to,
        amount,
        timestamp: now,
      };

      setTransactions((prev) => [tx, ...prev].slice(0, 70));

      const velocity = velocityRef.current[from] ?? [];
      const activeWindow = [...velocity.filter((t) => now - t < 120000), now];
      velocityRef.current[from] = activeWindow;

      const detectionReasons: Array<{ reason: string; severity: 'high' | 'medium' }> = [];

      if (amount > AMOUNT_THRESHOLD) {
        detectionReasons.push({
          reason: `Amount threshold breached: ₹${amount.toLocaleString('en-IN')} > ₹${AMOUNT_THRESHOLD.toLocaleString('en-IN')}`,
          severity: 'high',
        });
      }

      // Velocity heuristic: more than 4 tx in 2-minute rolling window.
      if (activeWindow.length >= 5) {
        detectionReasons.push({
          reason: `Velocity spike: ${activeWindow.length} transactions from ${from} in 2 minutes`,
          severity: 'high',
        });
      }

      // Structuring heuristic: range close to threshold.
      if (amount >= 355000 && amount < AMOUNT_THRESHOLD) {
        detectionReasons.push({
          reason: `Potential structuring: repeated near-threshold amount ₹${amount.toLocaleString('en-IN')}`,
          severity: 'medium',
        });
      }

      if (detectionReasons.length > 0) {
        setAlerts((prev) => {
          const next = [...prev];
          detectionReasons.forEach((item) => {
            next.unshift({
              id: `ALT-${randomBetween(10000, 99999)}`,
              transactionId: tx.id,
              reason: item.reason,
              severity: item.severity,
              timestamp: now,
            });
          });
          return next.slice(0, 25);
        });
      }
    }, cadenceMs);

    return () => clearInterval(interval);
  }, [cadenceMs, isPaused]);

  const alertStats = useMemo(() => {
    const high = alerts.filter((a) => a.severity === 'high').length;
    const medium = alerts.filter((a) => a.severity === 'medium').length;
    return { high, medium };
  }, [alerts]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8 animate-fade-in-up">
      <div className="xl:col-span-2 card flex flex-col overflow-hidden">
        <div className="p-5 flex items-center justify-between"
          style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}>
          <div>
            <h2 className="text-lg font-bold tracking-tight flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
              <Activity className="w-5 h-5" style={{ color: 'var(--color-safe)' }} />
              Real-Time Transaction Stream
            </h2>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Synthetic feed with explainable detection rules
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCadenceMs((prev) => (prev === 1400 ? 900 : prev === 900 ? 1800 : 1400))}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-border)' }}
            >
              {cadenceMs === 900 ? 'Fast' : cadenceMs === 1400 ? 'Normal' : 'Calm'} cadence
            </button>
            <button
              onClick={() => setIsPaused((p) => !p)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              style={{
                background: isPaused ? 'var(--color-safe-muted)' : 'var(--color-surface-2)',
                color: isPaused ? 'var(--color-safe)' : 'var(--color-text-secondary)',
                border: `1px solid ${isPaused ? 'var(--color-safe-border)' : 'var(--color-border)'}`,
              }}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[23rem] p-4 space-y-3 custom-scrollbar" style={{ background: 'var(--color-surface-0)' }}>
          {transactions.map((tx) => (
            <div key={tx.id} className="p-3 rounded-xl flex items-center justify-between"
              style={{ background: 'var(--color-surface-1)', border: '1px solid var(--color-border)' }}>
              <div>
                <p className="text-sm font-bold font-mono" style={{ color: 'var(--color-text-primary)' }}>{tx.id}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{tx.fromAccount} to {tx.toAccount}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: tx.amount > AMOUNT_THRESHOLD ? 'var(--color-risk)' : 'var(--color-text-primary)' }}>
                  ₹{tx.amount.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                  {new Date(tx.timestamp).toLocaleTimeString('en-US', { hour12: false })}
                </p>
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <p className="text-sm text-center py-8" style={{ color: 'var(--color-text-muted)' }}>Waiting for transaction stream...</p>
          )}
        </div>
      </div>

      <div className="card flex flex-col overflow-hidden">
        <div className="p-5" style={{ borderBottom: '1px solid var(--color-risk-border)', background: 'var(--color-risk-muted)' }}>
          <h2 className="text-lg font-bold tracking-tight flex items-center gap-2" style={{ color: 'var(--color-risk)' }}>
            <AlertTriangle className="w-5 h-5" />
            Detection Queue
          </h2>
          <div className="mt-3 flex items-center gap-2 text-[11px]">
            <span className="px-2 py-0.5 rounded-full" style={{ background: 'var(--color-risk)', color: '#fff' }}>High: {alertStats.high}</span>
            <span className="px-2 py-0.5 rounded-full" style={{ background: 'var(--color-warning)', color: '#fff' }}>Medium: {alertStats.medium}</span>
          </div>
        </div>

        <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-0)' }}>
          <div className="pill px-3 py-2 text-xs flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
            <Radar className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
            Rules: amount threshold, velocity spike, near-threshold structuring
          </div>
        </div>

        <div className="overflow-y-auto max-h-[19.5rem] p-4 space-y-3 custom-scrollbar" style={{ background: 'var(--color-surface-0)' }}>
          {alerts.map((alert) => (
            <div key={alert.id} className="p-3 rounded-lg"
              style={{
                background: alert.severity === 'high' ? 'var(--color-risk-muted)' : 'var(--color-warning-muted)',
                border: `1px solid ${alert.severity === 'high' ? 'var(--color-risk-border)' : 'var(--color-warning-border)'}`,
              }}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: alert.severity === 'high' ? 'var(--color-risk)' : 'var(--color-warning)' }}>
                  {alert.severity === 'high' ? 'High Risk' : 'Monitored'} · {alert.transactionId}
                </p>
                <p className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>
                  {new Date(alert.timestamp).toLocaleTimeString('en-US', { hour12: false })}
                </p>
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{alert.reason}</p>
            </div>
          ))}
          {alerts.length === 0 && (
            <p className="text-sm text-center py-8" style={{ color: 'var(--color-text-muted)' }}>No suspicious patterns detected yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
