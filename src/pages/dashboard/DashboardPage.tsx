// FinTrace AI — Dashboard Page
// Main command center: KPI cards, interactive graph with filters, investigation panel, alerts table

import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Activity, Bell, AlertTriangle, ShieldAlert, Loader2, Zap, TrendingUp, Eye, EyeOff, Play, MapPin, Globe, Monitor, Shield, BrainCircuit } from 'lucide-react';
import { useAppStore } from '../../state/store';
import { useRealtimeFeed } from '../../hooks/useRealtimeFeed';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { formatCompactNumber } from '../../utils/formatters';
import { MOCK_GRAPH_NODES, MOCK_RISK_BREAKDOWNS } from '../../mocks/fixtures/data';
import type { GraphNode, RiskScoreBreakdown } from '../../types/domain';
import { motion } from 'framer-motion';
import { SkeletonCard, SkeletonGraph } from '../../components/ui/Skeleton';
import { TransactionFeed } from '../../components/TransactionFeed';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { riskLevelToIntent, alertStatusToIntent } from '../../utils/badgeIntent';
import { staggerContainer, staggerItem } from '../../lib/motion';
import toast from 'react-hot-toast';

const nodesMap: Record<string, GraphNode> = {};
MOCK_GRAPH_NODES.forEach((n) => { nodesMap[n.id] = n; });

export default function DashboardPage() {
  const liveFeed = useAppStore((s) => s.liveFeed);
  const selectedGraphNode = useAppStore((s) => s.selectedGraphNode);
  const setSelectedGraphNode = useAppStore((s) => s.setSelectedGraphNode);
  const isGraphHighlighted = useAppStore((s) => s.isGraphHighlighted);
  const toggleGraphHighlight = useAppStore((s) => s.toggleGraphHighlight);
  const alerts = useAppStore((s) => s.alerts);
  const updateAlertStatus = useAppStore((s) => s.updateAlertStatus);
  const simulationMode = useAppStore((s) => s.simulationMode);
  const injectSimulationAlert = useAppStore((s) => s.injectSimulationAlert);

  const [isLoading, setIsLoading] = useState(true);
  const [panelLoading, setPanelLoading] = useState(false);
  const [blinkingHeader, setBlinkingHeader] = useState(true);
  const [flowReplay, setFlowReplay] = useState(false);

  // Graph filters
  const [hopDepth, setHopDepth] = useState(3);
  const [amountThreshold, setAmountThreshold] = useState(10000);
  const [timeWindow, setTimeWindow] = useState<'1D' | '1W' | '1M' | 'ALL'>('1D');

  useRealtimeFeed(2000);
  useKeyboardShortcuts();

  // Initial skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleNodeClick = (nodeId: string) => {
    if (selectedGraphNode === nodeId) return;
    setPanelLoading(true);
    setSelectedGraphNode(nodeId);
    setTimeout(() => setPanelLoading(false), 600);
  };

  const handleDismissAlert = () => {
    const activeData = nodesMap[selectedGraphNode];
    if (!activeData) return;
    const alert = alerts.find((a) => a.entityId === activeData.id);
    if (alert) {
      updateAlertStatus(alert.id, 'dismissed');
      toast.success(`Alert for ${activeData.id} dismissed`);
    } else {
      toast.success(`Activity for ${activeData.id} logged`);
    }
  };

  const handleFreezeAccount = () => {
    const activeData = nodesMap[selectedGraphNode];
    if (!activeData) return;
    toast.success(`Account ${activeData.id} frozen — escalated to compliance team`);
  };

  const handleHighlightToggle = () => {
    toggleGraphHighlight();
    if (!isGraphHighlighted) {
      setFlowReplay(true);
      setTimeout(() => setFlowReplay(false), 3000);
    }
  };

  const handleThreatPulse = () => {
    injectSimulationAlert();
    toast.success('Threat pulse injected into mock feed');
  };

  useEffect(() => {
    const interval = setInterval(() => setBlinkingHeader((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  const activeData = nodesMap[selectedGraphNode] || MOCK_GRAPH_NODES[2];
  const riskBreakdown: RiskScoreBreakdown | undefined = MOCK_RISK_BREAKDOWNS[selectedGraphNode];

  const stats = [
    {
      label: 'Transactions Today', value: formatCompactNumber(liveFeed.transactionsToday),
      change: '+12.5%', isPositive: true, icon: Activity,
      color: 'var(--color-safe)', mutedBg: 'var(--color-safe-muted)',
    },
    {
      label: 'Suspicious Alerts', value: formatCompactNumber(liveFeed.alertQueueSize),
      change: '+24.1%', isPositive: false, icon: Bell,
      color: 'var(--color-warning)', mutedBg: 'var(--color-warning-muted)',
    },
    {
      label: 'High Risk Accounts', value: '842',
      change: '+4.2%', isPositive: false, icon: AlertTriangle,
      color: 'var(--color-risk)', mutedBg: 'var(--color-risk-muted)',
    },
    {
      label: 'Active Investigations', value: liveFeed.investigationQueueSize.toString(),
      change: '-12.5%', isPositive: true, icon: ShieldAlert,
      color: 'var(--color-accent)', mutedBg: 'var(--color-accent-muted)',
    },
  ];

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8"><div className="skeleton h-8 w-48 mb-2" /><div className="skeleton h-4 w-64" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }, (_, i) => <SkeletonCard key={i} />)}
        </div>
        <SkeletonGraph />
      </div>
    );
  }

  return (
    <div className="animate-fade-in relative min-h-full">
      {/* Header Row */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
            Dashboard Overview
            {blinkingHeader && (
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--color-risk)' }} />
                <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: 'var(--color-risk)' }} />
              </span>
            )}
            {simulationMode && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase animate-pulse"
                style={{ background: 'var(--color-safe-muted)', color: 'var(--color-safe)', border: '1px solid var(--color-safe-border)' }}>
                <Play className="w-3 h-3 inline mr-1" />Simulation Active
              </span>
            )}
          </h1>
          <p className="text-sm flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
            <Zap className="w-3.5 h-3.5" style={{ color: 'var(--color-safe)' }} />
            Monitoring {formatCompactNumber(liveFeed.transactionsToday)} entities · {liveFeed.throughputPerSec.toLocaleString()} txn/s
          </p>
        </div>
        <Button
          onClick={handleHighlightToggle}
          icon={isGraphHighlighted ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          style={isGraphHighlighted ? {
            background: 'var(--color-risk-muted)', color: 'var(--color-risk)',
            border: '1px solid var(--color-risk-border)', boxShadow: 'var(--shadow-glow-risk)',
          } : undefined}
        >
          {isGraphHighlighted ? 'Disable Highlight' : 'Highlight Suspicious Path'}
        </Button>
      </div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={staggerItem} className="card p-6 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-10 pointer-events-none transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity"
              style={{ background: stat.color }} />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: stat.mutedBg, color: stat.color }}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-full`}
                style={{
                  color: stat.isPositive ? 'var(--color-safe)' : 'var(--color-risk)',
                  background: stat.isPositive ? 'var(--color-safe-muted)' : 'var(--color-risk-muted)',
                  border: `1px solid ${stat.isPositive ? 'var(--color-safe-border)' : 'var(--color-risk-border)'}`,
                }}>
                {stat.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.change}
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</p>
              <h3 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</h3>
              <div className="flex items-end gap-[2px] mt-3 h-6">
                {Array.from({ length: 20 }, (_, j) => {
                  const h = 30 + Math.sin(j * 0.5 + i) * 25 + Math.random() * 20;
                  return <div key={j} className="w-[3px] rounded-full" style={{ height: `${h}%`, background: stat.color, opacity: 0.3 }} />;
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="card p-5 mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>
            Command Deck
          </p>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <BrainCircuit className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
            Threat Pulse Injection
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Trigger a controlled mock anomaly to test downstream alerting and triage responsiveness.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="pill px-3 py-1.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            {simulationMode ? 'Simulation mode active' : 'Simulation mode idle'}
          </span>
          <Button onClick={handleThreatPulse} variant="primary" icon={<Zap className="w-4 h-4" />}>
            Inject Threat Pulse
          </Button>
        </div>
      </div>

      {/* Main Content: Graph & Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Graph Panel */}
        <div className="lg:col-span-2 card flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}>
            <h2 className="text-lg font-bold tracking-tight flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
              <Activity className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
              Transaction Network
              <span className="text-xs font-normal ml-2" style={{ color: 'var(--color-text-muted)' }}>6 entities · 6 edges</span>
            </h2>
            <div className="flex gap-1.5 p-1 rounded-lg" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
              {(['1D', '1W', '1M', 'ALL'] as const).map((period) => (
                <button key={period} onClick={() => setTimeWindow(period)} className="px-3 py-1 text-xs font-semibold rounded-md transition-all"
                  style={{
                    background: timeWindow === period ? 'var(--color-accent)' : 'transparent',
                    color: timeWindow === period ? '#fff' : 'var(--color-text-muted)',
                    boxShadow: timeWindow === period ? 'var(--shadow-glow-accent)' : 'none',
                  }}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 relative min-h-[350px] flex items-center justify-center p-4 sm:p-8 overflow-x-auto" style={{ background: 'var(--color-surface-0)' }}>
            {/* Grid background */}
            <div className="absolute inset-0 landing-grid opacity-30 pointer-events-none" style={{ maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 70%, transparent 100%)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top-right, var(--color-accent-muted), transparent, var(--color-safe-muted))' }} />

            {/* Legend */}
            <div className="absolute top-4 right-4 flex gap-4 text-xs font-medium glass p-3 rounded-xl shadow-xl z-20">
              {[
                { label: 'Verified', color: 'var(--color-safe)' },
                { label: 'Monitored', color: 'var(--color-warning)' },
                { label: 'High Risk', color: 'var(--color-risk)' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color, boxShadow: `0 0 8px ${l.color}` }} />
                  <span style={{ color: 'var(--color-text-secondary)' }}>{l.label}</span>
                </div>
              ))}
            </div>

            {/* Graph Filter Controls */}
            <div className="absolute bottom-4 left-4 flex gap-2 z-20">
              <button onClick={() => setHopDepth((h) => h === 3 ? 2 : h === 2 ? 1 : 3)}
                className="px-2.5 py-1 text-[10px] font-semibold rounded-lg transition-all"
                style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-border)' }}>
                Hop Depth: {hopDepth}
              </button>
              <button onClick={() => setAmountThreshold((t) => t === 10000 ? 25000 : t === 25000 ? 50000 : 10000)}
                className="px-2.5 py-1 text-[10px] font-semibold rounded-lg transition-all"
                style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-border)' }}>
                &gt; ${(amountThreshold / 1000).toFixed(0)}K
              </button>
              <button
                onClick={() => { setFlowReplay(true); setTimeout(() => setFlowReplay(false), 3000); }}
                className="px-2.5 py-1 text-[10px] font-semibold rounded-lg transition-all flex items-center gap-1"
                style={{ background: 'var(--color-warning-muted)', color: 'var(--color-warning)', border: '1px solid var(--color-warning-border)' }}>
                <Play className="w-3 h-3" />Replay Flow
              </button>
            </div>

            {/* Graph Nodes */}
            <div className="relative w-full max-w-2xl min-w-[500px] h-64 flex items-center justify-between px-8 z-10">
              <GraphNodeComponent node={nodesMap['A123']} selectedId={selectedGraphNode} onClick={handleNodeClick} color="var(--color-safe)" />
              <GraphEdgeComponent amount="$45K" suspicious={false} isHighlighted={isGraphHighlighted} flowReplay={flowReplay} />
              <GraphNodeComponent node={nodesMap['B456']} selectedId={selectedGraphNode} onClick={handleNodeClick} color="var(--color-warning)" />
              <GraphEdgeComponent amount="$44.5K" suspicious={true} isHighlighted={isGraphHighlighted} flowReplay={flowReplay} />
              <GraphNodeComponent node={nodesMap['C789']} selectedId={selectedGraphNode} onClick={handleNodeClick} color="var(--color-risk)" isLargeNode />
              <GraphEdgeComponent amount="$44K" suspicious={true} isHighlighted={isGraphHighlighted} flowReplay={flowReplay} />
              <GraphNodeComponent node={nodesMap['D222']} selectedId={selectedGraphNode} onClick={handleNodeClick} color="var(--color-risk)" />
            </div>
          </div>
        </div>

        {/* Investigation Side Panel */}
        <div className="card flex flex-col overflow-hidden relative transition-colors duration-500">
          {activeData.riskLevel === 'high' && (
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[100px] pointer-events-none transition-opacity duration-500"
              style={{ background: 'var(--color-risk)', opacity: panelLoading ? 0 : 0.08 }} />
          )}

          <div className="p-5 flex items-center justify-between z-10" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}>
            <h2 className="text-lg font-bold tracking-tight flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
              <ShieldAlert className="w-5 h-5" style={{
                color: activeData.riskLevel === 'high' ? 'var(--color-risk)' :
                  activeData.riskLevel === 'medium' ? 'var(--color-warning)' : 'var(--color-safe)'
              }} />
              Investigation Details
            </h2>
            {panelLoading && <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--color-accent)' }} />}
          </div>

          <div className={`p-6 flex-1 flex flex-col z-10 transition-opacity duration-300 ${panelLoading ? 'opacity-30' : 'opacity-100'}`}>
            {/* Entity Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Selected Entity</p>
                <div className="flex items-center gap-2">
                  <div className="font-mono text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>{activeData.id}</div>
                  <Badge intent={riskLevelToIntent(activeData.riskLevel)}>
                    {activeData.riskLevel === 'high' ? 'High Risk' : activeData.riskLevel === 'medium' ? 'Monitored' : 'Verified'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Risk Score Circle */}
            <div className="rounded-xl p-4 mb-5 flex items-center gap-5" style={{
              background: 'var(--color-surface-0)',
              border: `1px solid ${activeData.riskLevel === 'high' ? 'var(--color-risk-border)' : activeData.riskLevel === 'medium' ? 'var(--color-warning-border)' : 'var(--color-safe-border)'}`,
            }}>
              <div className="w-14 h-14 rounded-full border-4 flex items-center justify-center relative" style={{
                borderColor: activeData.riskLevel === 'high' ? 'var(--color-risk-border)' : activeData.riskLevel === 'medium' ? 'var(--color-warning-border)' : 'var(--color-safe-border)',
              }}>
                <span className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{activeData.riskScore}</span>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{activeData.description}</p>
                <p className="text-xs mt-0.5 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>{activeData.details}</p>
              </div>
            </div>

            {/* Entity Metadata */}
            {activeData.metadata && (
              <div className="grid grid-cols-2 gap-2 mb-5">
                {[
                  { icon: MapPin, label: activeData.metadata.geoLocation, sub: 'Location' },
                  { icon: Globe, label: activeData.metadata.ipAddress, sub: 'IP Address' },
                  { icon: Monitor, label: activeData.metadata.device, sub: 'Device' },
                  { icon: Shield, label: activeData.metadata.kycStatus.toUpperCase(), sub: 'KYC Status' },
                ].map((m) => (
                  <div key={m.sub} className="p-2 rounded-lg text-[10px]" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-1 mb-0.5" style={{ color: 'var(--color-text-muted)' }}>
                      <m.icon className="w-3 h-3" />{m.sub}
                    </div>
                    <p className="font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{m.label}</p>
                  </div>
                ))}
                {activeData.metadata.offshoreRisk && (
                  <div className="col-span-2 px-2 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1"
                    style={{ background: 'var(--color-risk-muted)', color: 'var(--color-risk)', border: '1px solid var(--color-risk-border)' }}>
                    <AlertTriangle className="w-3 h-3" />Offshore Risk Flag · {activeData.metadata.ipAnomalies.join(' · ')}
                  </div>
                )}
              </div>
            )}

            {/* Why Flagged — Risk Breakdown */}
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
              <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
              Why Flagged?
            </h3>
            {riskBreakdown ? (
              <div className="space-y-2 mb-4">
                {[
                  { label: 'Layering', value: riskBreakdown.layeringScore },
                  { label: 'Structuring', value: riskBreakdown.structuringScore },
                  { label: 'Velocity', value: riskBreakdown.velocityScore },
                  { label: 'Profile Mismatch', value: riskBreakdown.profileMismatchScore },
                  { label: 'Geographic', value: riskBreakdown.geographicRisk },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <span className="text-[11px] w-24" style={{ color: 'var(--color-text-muted)' }}>{f.label}</span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-0)' }}>
                      <div className="h-full rounded-full transition-all duration-1000" style={{
                        width: `${f.value}%`,
                        background: f.value >= 80 ? 'var(--color-risk)' : f.value >= 50 ? 'var(--color-warning)' : 'var(--color-safe)',
                      }} />
                    </div>
                    <span className="text-[11px] font-mono w-8 text-right" style={{ color: 'var(--color-text-muted)' }}>{f.value}</span>
                  </div>
                ))}
                <p className="text-[10px] font-mono mt-2 p-2 rounded" style={{
                  color: 'var(--color-text-muted)', background: 'var(--color-surface-0)', border: '1px solid var(--color-border)'
                }}>
                  Model: {riskBreakdown.modelVersion} · Confidence: {Math.round(riskBreakdown.confidence * 100)}%
                </p>
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                {activeData.flags.map((flag, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg transition-all duration-500"
                    style={{
                      background: flag.active ? (activeData.riskLevel === 'high' ? 'var(--color-risk-muted)' : 'var(--color-warning-muted)') : 'var(--color-surface-0)',
                      border: `1px solid ${flag.active ? (activeData.riskLevel === 'high' ? 'var(--color-risk-border)' : 'var(--color-warning-border)') : 'var(--color-border)'}`,
                      opacity: flag.active ? 1 : 0.6,
                    }}>
                    <div className="mt-0.5 w-2 h-2 rounded-full shrink-0" style={{
                      background: flag.active ? (activeData.riskLevel === 'high' ? 'var(--color-risk)' : 'var(--color-warning)') : 'var(--color-safe)',
                    }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{flag.label}</p>
                        {flag.weight && <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>{Math.round(flag.weight * 100)}%</span>}
                      </div>
                      <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{flag.desc}</p>
                    </div>
                  </div>
                ))}
                <p className="text-[10px] font-mono p-2 rounded" style={{
                  color: 'var(--color-text-muted)', background: 'var(--color-surface-0)', border: '1px solid var(--color-border)'
                }}>
                  Model: IF_v2.3 + GraphCentrality_v1.4 · Confidence: 94%
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-auto grid grid-cols-2 gap-3">
              <Button onClick={handleDismissAlert}
                style={{ background: 'var(--color-surface-0)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                {activeData.riskLevel === 'high' ? 'Dismiss Alert' : 'Log Details'}
              </Button>
              <Button onClick={handleFreezeAccount}
                style={{
                  background: activeData.riskLevel === 'high' ? 'var(--color-risk)' : 'var(--color-accent)',
                  color: '#fff',
                  boxShadow: activeData.riskLevel === 'high' ? 'var(--shadow-glow-risk)' : 'var(--shadow-glow-accent)',
                }}>
                {activeData.riskLevel === 'high' ? 'Freeze Account' : 'Monitor Target'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts Table */}
      <div className="card flex flex-col overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        <div className="p-5 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-1)' }}>
          <h2 className="text-lg font-bold tracking-tight flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <Bell className="w-5 h-5" style={{ color: 'var(--color-warning)' }} />
            Recent Fraud Alerts
            <span className="text-xs font-normal ml-2" style={{ color: 'var(--color-text-muted)' }}>{alerts.length} active</span>
          </h2>
          <a href="/dashboard/alerts" className="text-xs font-semibold transition-colors px-3 py-1.5 rounded-md"
            style={{ color: 'var(--color-accent)' }}>
            View All Alerts →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-xs" style={{ color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-0)' }}>
              <tr>
                <th className="px-6 py-4 font-semibold">Entity ID</th>
                <th className="px-6 py-4 font-semibold">Alert Type</th>
                <th className="px-6 py-4 font-semibold">Risk Score</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {alerts.slice(0, 6).map((alert) => (
                <tr
                  key={alert.id}
                  onClick={() => nodesMap[alert.entityId] && handleNodeClick(alert.entityId)}
                  className="cursor-pointer transition-colors group"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <td className="px-6 py-4">
                    <div className="font-mono font-bold" style={{ color: 'var(--color-text-primary)' }}>{alert.entityId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{
                        background: alert.riskLevel === 'high' ? 'var(--color-risk)' : alert.riskLevel === 'medium' ? 'var(--color-warning)' : 'var(--color-safe)',
                      }} />
                      <span style={{ color: 'var(--color-text-secondary)' }}>{alert.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge intent={riskLevelToIntent(alert.riskLevel)} size="md">{alert.riskScore}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge intent={alertStatusToIntent(alert.status)}>{alert.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right font-medium" style={{ color: 'var(--color-text-muted)' }}>
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Realtime Transaction Feed */}
      <TransactionFeed />
    </div>
  );
}

// ─── Sub-components ────────────────────────────────

function GraphNodeComponent({ node, selectedId, onClick, color, isLargeNode }: {
  node: GraphNode; selectedId: string; onClick: (id: string) => void; color: string; isLargeNode?: boolean;
}) {
  const isSelected = selectedId === node.id;
  const size = isLargeNode ? 'w-16 h-16' : 'w-14 h-14';

  return (
    <div className="relative group cursor-pointer hover:-translate-y-1 transition-transform" onClick={() => onClick(node.id)}>
      {isSelected && <div className="absolute inset-[-8px] rounded-full border-2 border-dashed animate-[spin_4s_linear_infinite]"
        style={{ borderColor: color, opacity: 0.4 }} />}
      <div className={`${size} rounded-full border-2 flex items-center justify-center relative z-10 group-hover:scale-105 transition-all`}
        style={{
          background: isLargeNode ? 'var(--color-risk-muted)' : 'var(--color-surface-2)',
          borderColor: color,
          boxShadow: isSelected ? `0 0 30px ${color}` : `0 0 15px ${color}33`,
        }}>
        <span className={`font-mono ${isLargeNode ? 'text-base' : 'text-sm'} font-bold`} style={{ color }}>{node.id}</span>
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity px-2 py-0.5 rounded glass"
        style={{ color: 'var(--color-text-secondary)' }}>
        {node.description.split(':')[0] || node.id}
      </div>
    </div>
  );
}

function GraphEdgeComponent({ amount, suspicious, isHighlighted, flowReplay }: {
  amount: string; suspicious: boolean; isHighlighted: boolean; flowReplay: boolean;
}) {
  const active = suspicious && isHighlighted;
  return (
    <div className="flex-1 h-px relative transition-colors duration-500"
      style={{
        background: active
          ? 'linear-gradient(to right, var(--color-warning), var(--color-risk))'
          : suspicious ? 'var(--color-border)' : 'var(--color-safe-border)',
        boxShadow: active ? 'var(--shadow-glow-risk)' : 'none',
        opacity: active ? 1 : 0.5,
      }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-[10px] font-bold font-mono flex items-center gap-1 rounded transition-colors"
        style={{
          background: 'var(--color-surface-0)',
          color: active ? 'var(--color-risk)' : 'var(--color-text-muted)',
          border: `1px solid ${active ? 'var(--color-risk-border)' : 'var(--color-border)'}`,
        }}>
        {active && <AlertTriangle className="w-3 h-3" />}
        {amount}
      </div>
      {/* Flow replay animation dot */}
      {active && flowReplay && (
        <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full flow-dot"
          style={{ background: 'var(--color-risk)', boxShadow: '0 0 6px var(--color-risk)' }} />
      )}
      {active && !flowReplay && (
        <div className="absolute top-1/2 left-[40%] w-2 h-2 rounded-full -translate-y-1/2 blur-[2px] animate-pulse"
          style={{ background: 'var(--color-risk)' }} />
      )}
    </div>
  );
}
