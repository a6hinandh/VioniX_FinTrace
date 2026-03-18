import { useMemo, useState } from 'react';
import { Brain, Sparkles, Play, Pause, Radar, ShieldCheck, Activity, TrendingUp, Clock3, Gauge } from 'lucide-react';
import { useAppStore } from '../../state/store';
import { ScenarioType } from '../../types/domain';
import toast from 'react-hot-toast';

const scenarioCards = [
  {
    id: ScenarioType.LAYERING,
    title: 'Layering Mesh',
    subtitle: 'Multi-hop obfuscation network',
    expectedImpact: '+2 to +4 high-risk alerts',
  },
  {
    id: ScenarioType.ROUND_TRIPPING,
    title: 'Circular Funds Loop',
    subtitle: 'A-B-C-D-A pattern in compressed window',
    expectedImpact: '+1 escalated case candidate',
  },
  {
    id: ScenarioType.SMURFING,
    title: 'Structured Burst',
    subtitle: 'Sub-threshold deposits across branches',
    expectedImpact: '+3 medium alerts, +1 high',
  },
  {
    id: ScenarioType.DORMANT_ACTIVATION,
    title: 'Dormant Wake-Up',
    subtitle: 'Long idle account reactivation',
    expectedImpact: '+1 investigation trigger',
  },
];

const modelRegistry = [
  { name: 'GraphCentrality_v1.4', role: 'Champion', drift: 1.8, precision: 95.4, recall: 92.7, latency: 42 },
  { name: 'IF_v2.3', role: 'Champion', drift: 2.3, precision: 93.8, recall: 90.9, latency: 38 },
  { name: 'TemporalAnomaly_v0.9', role: 'Challenger', drift: 4.2, precision: 91.3, recall: 89.1, latency: 57 },
];

export default function IntelligencePage() {
  const alerts = useAppStore((s) => s.alerts);
  const cases = useAppStore((s) => s.cases);
  const reports = useAppStore((s) => s.reports);
  const simulationMode = useAppStore((s) => s.simulationMode);
  const startSimulation = useAppStore((s) => s.startSimulation);
  const stopSimulation = useAppStore((s) => s.stopSimulation);
  const injectSimulationAlert = useAppStore((s) => s.injectSimulationAlert);

  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>(ScenarioType.LAYERING);
  const [isBursting, setIsBursting] = useState(false);

  const quality = useMemo(() => {
    const highRisk = alerts.filter((a) => a.riskLevel === 'high').length;
    const resolved = alerts.filter((a) => a.status === 'resolved').length;
    const escalatedCases = cases.filter((c) => c.status === 'escalated').length;
    const readyReports = reports.filter((r) => r.status === 'ready' || r.status === 'exported').length;

    const signalToNoise = Math.max(20, Math.min(99, Math.round(((highRisk + escalatedCases) / Math.max(alerts.length, 1)) * 100 + 38)));
    const triageVelocity = Math.max(12, Math.min(97, Math.round((resolved / Math.max(alerts.length, 1)) * 100 + 34)));
    const auditReadiness = Math.max(35, Math.min(99, Math.round((readyReports / Math.max(cases.length, 1)) * 100 + 40)));
    const governanceScore = Math.round((signalToNoise + triageVelocity + auditReadiness) / 3);

    return { signalToNoise, triageVelocity, auditReadiness, governanceScore };
  }, [alerts, cases, reports]);

  const handleBurstInjection = () => {
    if (isBursting) return;
    setIsBursting(true);

    const pulses = [0, 450, 900, 1350];
    pulses.forEach((delay, idx) => {
      setTimeout(() => {
        injectSimulationAlert();
        if (idx === pulses.length - 1) {
          setIsBursting(false);
          toast.success('Scenario burst injected into live mock feed');
        }
      }, delay);
    });
  };

  const toggleSimulation = () => {
    if (simulationMode) {
      stopSimulation();
      toast.success('Simulation paused');
      return;
    }
    startSimulation();
    toast.success('Simulation resumed');
  };

  const readinessRows = [
    { label: 'Signal-to-noise quality', value: quality.signalToNoise },
    { label: 'Triage velocity', value: quality.triageVelocity },
    { label: 'Audit evidence readiness', value: quality.auditReadiness },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <Brain className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
            Intelligence Lab
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Mock model governance, scenario stress testing, and operational quality signals.
          </p>
        </div>
        <button
          onClick={toggleSimulation}
          className="px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="card p-5 lg:col-span-2">
          <h2 className="text-sm font-bold flex items-center gap-2 mb-4" style={{ color: 'var(--color-text-primary)' }}>
            <Sparkles className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
            Scenario Composer (Mock)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scenarioCards.map((scenario) => {
              const active = selectedScenario === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario.id)}
                  className="text-left p-4 rounded-xl transition-all"
                  style={{
                    background: active ? 'var(--color-accent-muted)' : 'var(--color-surface-0)',
                    border: `1px solid ${active ? 'var(--color-accent-border)' : 'var(--color-border)'}`,
                    boxShadow: active ? 'var(--shadow-glow-accent)' : 'none',
                  }}
                >
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{scenario.title}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{scenario.subtitle}</p>
                  <p className="text-[11px] mt-2" style={{ color: 'var(--color-accent)' }}>{scenario.expectedImpact}</p>
                </button>
              );
            })}
          </div>
          <div className="premium-divider my-4" />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              Selected scenario: <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{selectedScenario}</span>
            </p>
            <button
              onClick={handleBurstInjection}
              disabled={isBursting}
              className="px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 text-white transition-all disabled:opacity-60"
              style={{ background: 'var(--color-accent)', boxShadow: 'var(--shadow-glow-accent)' }}
            >
              <Radar className="w-4 h-4" />
              {isBursting ? 'Injecting...' : 'Inject Pattern Burst'}
            </button>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-bold flex items-center gap-2 mb-4" style={{ color: 'var(--color-text-primary)' }}>
            <Gauge className="w-4 h-4" style={{ color: 'var(--color-safe)' }} />
            Governance Score
          </h2>
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
            <p className="text-4xl font-extrabold" style={{ color: 'var(--color-text-primary)' }}>{quality.governanceScore}</p>
            <p className="text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-muted)' }}>Platform readiness</p>
          </div>
          <div className="mt-4 space-y-3">
            {readinessRows.map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{row.label}</p>
                  <p className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>{row.value}</p>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'var(--color-surface-3)' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${row.value}%`, background: row.value >= 75 ? 'var(--color-safe)' : 'var(--color-warning)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}>
          <h2 className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <ShieldCheck className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
            Model Registry (Mock)
          </h2>
          <div className="pill px-3 py-1 text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
            Champion-Challenger Strategy
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ background: 'var(--color-surface-0)', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Model</th>
                <th className="px-5 py-3 text-left font-semibold">Role</th>
                <th className="px-5 py-3 text-left font-semibold">Drift</th>
                <th className="px-5 py-3 text-left font-semibold">Precision</th>
                <th className="px-5 py-3 text-left font-semibold">Recall</th>
                <th className="px-5 py-3 text-left font-semibold">Latency</th>
              </tr>
            </thead>
            <tbody>
              {modelRegistry.map((model) => (
                <tr key={model.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="px-5 py-4 font-mono text-xs" style={{ color: 'var(--color-text-primary)' }}>{model.name}</td>
                  <td className="px-5 py-4">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                      style={{
                        background: model.role === 'Champion' ? 'var(--color-safe-muted)' : 'var(--color-warning-muted)',
                        color: model.role === 'Champion' ? 'var(--color-safe)' : 'var(--color-warning)',
                        border: `1px solid ${model.role === 'Champion' ? 'var(--color-safe-border)' : 'var(--color-warning-border)'}`,
                      }}
                    >
                      {model.role}
                    </span>
                  </td>
                  <td className="px-5 py-4" style={{ color: 'var(--color-text-secondary)' }}>{model.drift}%</td>
                  <td className="px-5 py-4" style={{ color: 'var(--color-text-secondary)' }}>{model.precision}%</td>
                  <td className="px-5 py-4" style={{ color: 'var(--color-text-secondary)' }}>{model.recall}%</td>
                  <td className="px-5 py-4" style={{ color: 'var(--color-text-secondary)' }}>{model.latency}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[
          { icon: Activity, label: 'Active alerts', value: alerts.length },
          { icon: TrendingUp, label: 'Open investigations', value: cases.filter((c) => c.status !== 'closed').length },
          { icon: Clock3, label: 'Reports in queue', value: reports.filter((r) => r.status === 'generating').length },
        ].map((metric) => (
          <div key={metric.label} className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}>
              <metric.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{metric.value}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{metric.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
