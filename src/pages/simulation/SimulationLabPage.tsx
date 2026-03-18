import { useState } from 'react';
import { Beaker, Play, CheckCircle2, RefreshCw, Sparkles, Radar } from 'lucide-react';
import { useAppStore } from '../../state/store';

export default function SimulationLabPage() {
  const injectSimulationAlert = useAppStore((s) => s.injectSimulationAlert);

  const [scenarioName, setScenarioName] = useState('Offshore Layering Chain');
  const [accountIds, setAccountIds] = useState('A123, B456, C789, D222');
  const [transactionPattern, setTransactionPattern] = useState(`{
  "window": "2h",
  "hops": 4,
  "belowThresholdSplit": true,
  "jurisdiction": "offshore"
}`);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scenarioName.trim() || !accountIds.trim() || !transactionPattern.trim()) return;

    setIsSimulating(true);
    setShowSuccess(false);

    setTimeout(() => {
      for (let i = 0; i < 4; i += 1) {
        setTimeout(() => injectSimulationAlert(), i * 280);
      }
      setIsSimulating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4500);
    }, 1200);
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="mb-8 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <Beaker className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
            Simulation Studio
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Design and inject synthetic fraud scenarios to stress-test detection and triage workflows.
          </p>
        </div>
        <div className="pill px-3 py-1.5 text-xs font-semibold flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
          <Radar className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
          Sandbox Mode
        </div>
      </div>

      <form onSubmit={handleSimulate} className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Scenario Name</label>
            <input
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              className="mt-1 w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Account IDs</label>
            <input
              value={accountIds}
              onChange={(e) => setAccountIds(e.target.value)}
              className="mt-1 w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Pattern Definition</label>
          <textarea
            value={transactionPattern}
            onChange={(e) => setTransactionPattern(e.target.value)}
            rows={8}
            className="mt-1 w-full rounded-lg px-3 py-2 text-xs font-mono focus:outline-none"
            style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
            required
          />
        </div>

        {showSuccess && (
          <div className="mt-4 p-3 rounded-lg flex items-start gap-2 animate-fade-in"
            style={{ background: 'var(--color-safe-muted)', border: '1px solid var(--color-safe-border)', color: 'var(--color-safe)' }}>
            <CheckCircle2 className="w-4 h-4 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Simulation injected successfully</p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Scenario {scenarioName} is now streaming into the mock detection pipeline.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSimulating}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-60"
            style={{ background: 'var(--color-accent)', boxShadow: 'var(--shadow-glow-accent)' }}
          >
            {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            {isSimulating ? 'Executing' : 'Run Simulation'}
          </button>
        </div>
      </form>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Pattern Engine', desc: 'Topology-aware synthetic flow generation' },
          { title: 'Alert Injection', desc: 'Rule + model blended anomaly creation' },
          { title: 'Outcome Replay', desc: 'Observe triage and escalation behavior' },
        ].map((item) => (
          <div key={item.title} className="card p-4">
            <p className="text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--color-text-primary)' }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
              {item.title}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
