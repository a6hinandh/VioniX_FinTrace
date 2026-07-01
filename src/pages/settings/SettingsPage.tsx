// FinTrace AI — Settings Page
// System configuration, feature toggles, and simulation mode control

import { useState, useEffect } from 'react';
import { Settings, ToggleLeft, ToggleRight, Database, Server, Shield, Zap, Activity, Play, Square } from 'lucide-react';
import { useAppStore } from '../../state/store';
import toast from 'react-hot-toast';
import { Button } from '../../components/ui/Button';

export default function SettingsPage() {
  const simulationMode = useAppStore((s) => s.simulationMode);
  const startSimulation = useAppStore((s) => s.startSimulation);
  const stopSimulation = useAppStore((s) => s.stopSimulation);

  const [features, setFeatures] = useState({
    realtimeFeed: true,
    analytics: false,
    notifications: true,
    autoAssignment: false,
    enhancedDetection: true,
  });

  const [detectionParams, setDetectionParams] = useState({
    velocityThreshold: 47,
    amountThreshold: 10000,
    hopDepth: 3,
    dormantDays: 180,
    structuringLimit: 9999,
  });

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 800); return () => clearTimeout(t); }, []);

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures((f) => ({ ...f, [key]: !f[key] }));
    toast.success(`${key} ${features[key] ? 'disabled' : 'enabled'}`);
  };

  const handleSimulationToggle = () => {
    if (simulationMode) {
      stopSimulation();
      toast.success('Simulation stopped');
    } else {
      startSimulation();
      toast.success('Simulation started — live alerts will be injected');
    }
  };

  if (isLoading) return <div className="animate-fade-in"><div className="mb-8"><div className="skeleton h-8 w-48 mb-2" /><div className="skeleton h-4 w-64" /></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><div className="skeleton h-64 rounded-xl" /><div className="skeleton h-64 rounded-xl" /></div></div>;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <Settings className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
          System Configuration
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Configure detection parameters, feature toggles, and system environment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simulation Mode */}
        <div className="card overflow-hidden" style={{
          borderColor: simulationMode ? 'var(--color-safe-border)' : undefined,
          boxShadow: simulationMode ? 'var(--shadow-glow-accent)' : undefined,
        }}>
          <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}>
            <Activity className="w-4 h-4" style={{ color: 'var(--color-safe)' }} />
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Simulation Mode</h3>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Enable simulation mode to inject live alerts, accelerate transaction counters, and demonstrate the platform's real-time capabilities.
            </p>
            <div className="p-4 rounded-xl" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
              <div className="flex flex-col sm:flex-row sm:items-center items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {simulationMode ? (
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center animate-pulse" style={{ background: 'var(--color-safe-muted)', color: 'var(--color-safe)' }}><Play className="w-5 h-5" /></div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-muted)' }}><Square className="w-5 h-5" /></div>
                  )}
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{simulationMode ? 'Simulation Active' : 'Simulation Inactive'}</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{simulationMode ? 'Injecting alerts every 8 seconds' : 'Click to start demo mode'}</p>
                  </div>
                </div>
                <Button
                  onClick={handleSimulationToggle}
                  variant={simulationMode ? 'danger' : 'success'}
                  icon={simulationMode ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                >
                  {simulationMode ? 'Stop' : 'Start Simulation'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}>
            <Zap className="w-4 h-4" style={{ color: 'var(--color-warning)' }} />
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Feature Toggles</h3>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {([
              { key: 'realtimeFeed' as const, label: 'Real-time Feed', desc: 'Stream live transaction data', icon: Activity },
              { key: 'analytics' as const, label: 'Analytics Tracking', desc: 'Send anonymized usage data', icon: Zap },
              { key: 'notifications' as const, label: 'Push Notifications', desc: 'Alert on new high-risk events', icon: Shield },
              { key: 'autoAssignment' as const, label: 'Auto-Assignment', desc: 'Route cases by workload', icon: Server },
              { key: 'enhancedDetection' as const, label: 'Enhanced Detection', desc: 'ML-powered pattern matching', icon: Database },
            ]).map(({ key, label, desc, icon: Icon }) => (
              <div key={key} className="px-5 py-4 flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{label}</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
                  </div>
                </div>
                <button onClick={() => toggleFeature(key)} className="transition-all" style={{ color: features[key] ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
                  {features[key] ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Detection Parameters */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}>
            <Shield className="w-4 h-4" style={{ color: 'var(--color-risk)' }} />
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Detection Parameters</h3>
          </div>
          <div className="p-5 space-y-4">
            {([
              { key: 'velocityThreshold' as const, label: 'Velocity Threshold', unit: 'txn/hour', min: 10, max: 100, step: 1 },
              { key: 'amountThreshold' as const, label: 'Amount Threshold', unit: 'USD', min: 1000, max: 50000, step: 1000 },
              { key: 'hopDepth' as const, label: 'Max Hop Depth', unit: 'hops', min: 1, max: 10, step: 1 },
              { key: 'dormantDays' as const, label: 'Dormant Days Trigger', unit: 'days', min: 30, max: 365, step: 30 },
              { key: 'structuringLimit' as const, label: 'Structuring Limit', unit: 'USD', min: 5000, max: 15000, step: 500 },
            ]).map(({ key, label, unit, min, max, step }) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{label}</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                    {detectionParams[key].toLocaleString()} {unit}
                  </span>
                </div>
                <input type="range" min={min} max={max} step={step} value={detectionParams[key]}
                  onChange={(e) => {
                    setDetectionParams((p) => ({ ...p, [key]: Number(e.target.value) }));
                  }}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ background: 'var(--color-surface-3)', accentColor: 'var(--color-accent)' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}>
            <Server className="w-4 h-4" style={{ color: 'var(--color-safe)' }} />
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>System Status</h3>
          </div>
          <div className="p-5 space-y-3">
            {[
              { label: 'System Health', value: 'Healthy', color: 'var(--color-safe)', bg: 'var(--color-safe-muted)' },
              { label: 'Uptime', value: '99.97%', color: 'var(--color-safe)', bg: 'var(--color-safe-muted)' },
              { label: 'Last Ingestion', value: '< 1 min ago', color: 'var(--color-accent)', bg: 'var(--color-accent-muted)' },
              { label: 'Model Version', value: 'IF_v2.3 + GraphCentrality_v1.4', color: 'var(--color-text-secondary)', bg: 'var(--color-surface-0)' },
              { label: 'Environment', value: 'Production (Mock)', color: 'var(--color-warning)', bg: 'var(--color-warning-muted)' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{s.label}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded" style={{ background: s.bg, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
