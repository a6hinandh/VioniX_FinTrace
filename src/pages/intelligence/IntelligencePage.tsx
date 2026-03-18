import { useMemo, useState } from 'react';
import { Brain, Radar, Play, Pause, Gauge, Wand2, Activity } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppStore } from '../../state/store';
import { ScenarioType } from '../../types/domain';
import { RiskBreakdown } from '../../components/RiskBreakdown';
import { ExternalWatchlistCheck } from '../../components/ExternalWatchlistCheck';
import FundFlowDemo from '../../components/FundFlowGraph';

const scenarios = [
  { id: ScenarioType.LAYERING, title: 'Layering Mesh', subtitle: 'Multi-hop laundering web', impact: 'Expected +4 high-risk alerts' },
  { id: ScenarioType.ROUND_TRIPPING, title: 'Circular Loop', subtitle: 'A-B-C-D-A return path', impact: 'Expected +1 escalated case' },
  { id: ScenarioType.SMURFING, title: 'Structured Burst', subtitle: 'Below-threshold fragmentation', impact: 'Expected +3 medium alerts' },
  { id: ScenarioType.DORMANT_ACTIVATION, title: 'Dormant Wake-Up', subtitle: 'Reactivation with large inflow', impact: 'Expected +1 investigation trigger' },
];

export default function IntelligencePage() {
  const alerts = useAppStore((s) => s.alerts);
  const cases = useAppStore((s) => s.cases);
  const reports = useAppStore((s) => s.reports);
  const simulationMode = useAppStore((s) => s.simulationMode);
  const startSimulation = useAppStore((s) => s.startSimulation);
  const stopSimulation = useAppStore((s) => s.stopSimulation);
  const injectSimulationAlert = useAppStore((s) => s.injectSimulationAlert);

  const [scenario, setScenario] = useState<ScenarioType>(ScenarioType.LAYERING);
  const [scenarioName, setScenarioName] = useState('Layering Mesh');
  const [accountIds, setAccountIds] = useState('A123, B456, C789, D222');
  const [pattern, setPattern] = useState('{"window":"2h","minHops":3,"splitPattern":true}');

  const quality = useMemo(() => {
    const high = alerts.filter((a) => a.riskLevel === 'high').length;
    const escalated = cases.filter((c) => c.status === 'escalated').length;
    const ready = reports.filter((r) => r.status !== 'generating').length;

    const signal = Math.min(99, Math.round((high / Math.max(alerts.length, 1)) * 100 + 40));
    const triage = Math.min(99, Math.round((escalated / Math.max(cases.length, 1)) * 100 + 48));
    const evidence = Math.min(99, Math.round((ready / Math.max(reports.length, 1)) * 100 + 42));

    return {
      signal,
      triage,
      evidence,
      governance: Math.round((signal + triage + evidence) / 3),
    };
  }, [alerts, cases, reports]);

  const handleToggleSimulation = () => {
    if (simulationMode) {
      stopSimulation();
      toast.success('Simulation paused');
      return;
    }
    startSimulation();
    toast.success('Simulation resumed');
  };

  const handleInjectScenario = () => {
    for (let i = 0; i < 3; i += 1) {
      setTimeout(() => injectSimulationAlert(), i * 350);
    }
    toast.success(`${scenarioName} scenario burst injected`);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <Brain className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
            Intelligence Hub
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Scenario simulation, explainability diagnostics, and external intelligence checks.
          </p>
        </div>

        <button
          onClick={handleToggleSimulation}
          className="px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
          style={{
            background: simulationMode ? 'var(--color-risk-muted)' : 'var(--color-safe-muted)',
            color: simulationMode ? 'var(--color-risk)' : 'var(--color-safe)',
            border: `1px solid ${simulationMode ? 'var(--color-risk-border)' : 'var(--color-safe-border)'}`,
          }}
        >
          {simulationMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {simulationMode ? 'Pause Simulation' : 'Resume Simulation'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-8 card p-5">
          <div className="flex items-center justify-between gap-3 mb-4">
            <p className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
              <Wand2 className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
              Scenario Composer
            </p>
            <button
              onClick={handleInjectScenario}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5"
              style={{ background: 'var(--color-accent)' }}
            >
              <Radar className="w-3.5 h-3.5" />
              Inject Pattern Burst
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            {scenarios.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setScenario(item.id);
                  setScenarioName(item.title);
                }}
                className="text-left rounded-xl p-3"
                style={{
                  background: scenario === item.id ? 'var(--color-accent-muted)' : 'var(--color-surface-0)',
                  border: `1px solid ${scenario === item.id ? 'var(--color-accent-border)' : 'var(--color-border)'}`,
                }}
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{item.title}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{item.subtitle}</p>
                <p className="text-[11px] mt-1" style={{ color: 'var(--color-accent)' }}>{item.impact}</p>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Scenario Name</label>
              <input
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                className="mt-1 w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
                style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Account IDs</label>
              <input
                value={accountIds}
                onChange={(e) => setAccountIds(e.target.value)}
                className="mt-1 w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
                style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Pattern JSON</label>
            <textarea
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-lg px-3 py-2 text-xs font-mono focus:outline-none"
              style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
            />
          </div>
        </div>

        <div className="lg:col-span-4 card p-5">
          <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <Gauge className="w-4 h-4" style={{ color: 'var(--color-safe)' }} />
            Governance Quality
          </p>
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
            <p className="text-4xl font-extrabold" style={{ color: 'var(--color-text-primary)' }}>{quality.governance}</p>
            <p className="text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-muted)' }}>Readiness</p>
          </div>

          <div className="mt-4 space-y-3">
            {[
              { label: 'Signal quality', value: quality.signal },
              { label: 'Triage velocity', value: quality.triage },
              { label: 'Evidence readiness', value: quality.evidence },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span style={{ color: 'var(--color-text-secondary)' }}>{metric.label}</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>{metric.value}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'var(--color-surface-3)' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${metric.value}%`, background: metric.value > 80 ? 'var(--color-safe)' : 'var(--color-warning)' }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg p-3" style={{ background: 'var(--color-accent-muted)', border: '1px solid var(--color-accent-border)' }}>
            <p className="text-xs font-medium flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
              <Activity className="w-3.5 h-3.5" />
              Active alerts: {alerts.length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-6">
          <FundFlowDemo />
        </div>
        <div className="xl:col-span-6">
          <RiskBreakdown />
        </div>
      </div>

      <div className="mt-6">
        <ExternalWatchlistCheck />
      </div>

      <div className="mt-6 card p-4">
        <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>Scenario Input Snapshot</p>
        <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
          Scenario: <span style={{ color: 'var(--color-text-primary)' }}>{scenarioName}</span> | Accounts: <span style={{ color: 'var(--color-text-primary)' }}>{accountIds}</span>
        </p>
      </div>
    </div>
  );
}
