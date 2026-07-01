// FinTrace AI — Landing Page
// Premium fintech landing with hero, features, testimonial, architecture flow, use cases, and CTAs

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../app/ThemeProvider';
import {
  Activity, Shield, Brain, FileText, ArrowRight, ArrowUpRight, Play,
  Sun, Moon, ChevronRight, Network, Zap,
  Building2, Landmark, Wallet, Globe, Eye,
  PieChart, Quote, DollarSign, AlertTriangle, ShieldAlert,
  Github, Linkedin, Mail, Bell, Briefcase, TrendingUp, TrendingDown,
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import SoftAurora from '../../components/ui/SoftAurora';
import { staggerContainer, staggerItem } from '../../lib/motion';

type Intent = 'accent' | 'safe';

const intentTokens: Record<Intent, { color: string; bg: string; gradient: string }> = {
  accent: { color: 'var(--color-accent)', bg: 'var(--color-accent-muted)', gradient: 'var(--gradient-accent)' },
  safe: { color: 'var(--color-safe)', bg: 'var(--color-safe-muted)', gradient: 'var(--gradient-safe)' },
};

const features = [
  {
    icon: Network,
    title: 'Graph-Based Detection',
    desc: 'Map entity relationships across millions of transactions. Detect layering, round-tripping, and shell company networks invisible to rule-based systems.',
    intent: 'accent' as Intent,
  },
  {
    icon: Zap,
    title: 'Real-Time Risk Scoring',
    desc: 'Score every entity and transaction in under 50ms. Continuous risk recalculation as new data flows through the system.',
    intent: 'accent' as Intent,
  },
  {
    icon: Brain,
    title: 'Explainable AI',
    desc: 'Every alert comes with a complete explanation — layering score, velocity analysis, profile mismatch, and geographic risk breakdown.',
    intent: 'safe' as Intent,
  },
  {
    icon: FileText,
    title: 'Automated Reports',
    desc: 'Generate regulatory-ready evidence packages in one click. Export to PDF or JSON for SAR filing, audit trails, and compliance documentation.',
    intent: 'accent' as Intent,
  },
];

const architectureSteps = [
  { label: 'Ingest', desc: 'Transaction streams', icon: Activity, color: 'var(--color-accent)', bg: 'var(--color-accent-muted)' },
  { label: 'Detect', desc: 'Pattern matching', icon: Shield, color: 'var(--color-accent)', bg: 'var(--color-accent-muted)' },
  { label: 'Investigate', desc: 'Graph analysis', icon: Eye, color: 'var(--color-risk)', bg: 'var(--color-risk-muted)' },
  { label: 'Report', desc: 'Evidence export', icon: FileText, color: 'var(--color-safe)', bg: 'var(--color-safe-muted)' },
];

const kpiPreview = [
  { label: 'Transactions', value: '2.4M', icon: Activity, color: 'var(--color-accent)', bg: 'var(--color-accent-muted)', delta: '+12.4%', trend: 'up' as const },
  { label: 'Alerts', value: '3,452', icon: Bell, color: 'var(--color-warning)', bg: 'var(--color-warning-muted)', delta: '+8.1%', trend: 'up' as const },
  { label: 'High Risk', value: '842', icon: ShieldAlert, color: 'var(--color-risk)', bg: 'var(--color-risk-muted)', delta: '-3.2%', trend: 'down' as const },
  { label: 'Cases', value: '156', icon: Briefcase, color: 'var(--color-safe)', bg: 'var(--color-safe-muted)', delta: '+5.6%', trend: 'up' as const },
];

const useCases = [
  { icon: Building2, title: 'Banks & Financial Institutions', desc: 'Enterprise AML compliance with full audit trails and regulatory reporting.' },
  { icon: Landmark, title: 'Regulators & FIUs', desc: 'Real-time oversight of cross-border fund flows and suspicious activity monitoring.' },
  { icon: Wallet, title: 'Fintech & Payments', desc: 'Embedded fraud detection for payment processors, neobanks, and crypto platforms.' },
];

const impactStats = [
  { icon: DollarSign, value: '$3.1T', label: 'Laundered through the global financial system every year' },
  { icon: AlertTriangle, value: '2–5%', label: 'Of global GDP is estimated to be tied to money laundering' },
  { icon: ShieldAlert, value: '800K+', label: 'Suspicious Activity Reports filed annually in the US alone' },
];

const footerColumns = [
  {
    heading: 'Platform',
    href: '#features',
    links: [
      { label: 'Graph Detection', href: '#features' },
      { label: 'Risk Scoring', href: '#features' },
      { label: 'Explainable AI', href: '#features' },
      { label: 'Automated Reports', href: '#features' },
    ],
  },
  {
    heading: 'Operate',
    href: '#architecture',
    links: [
      { label: 'Investigations', href: '/dashboard/investigations' },
      { label: 'Alerts', href: '/dashboard/alerts' },
      { label: 'Reports', href: '/dashboard/reports' },
      { label: 'Simulation Lab', href: '/dashboard/simulation' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Use Cases', href: '#use-cases' },
      { label: 'Architecture', href: '#architecture' },
      { label: 'GitHub', href: 'https://github.com/a6hinandh/VioniX_FinTrace' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Documentation', href: 'https://github.com/a6hinandh/VioniX_FinTrace' },
      { label: 'Service Status', href: '#architecture' },
    ],
  },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'var(--color-base-bg)', color: 'var(--color-text-primary)' }}>
      {/* Global Background Aurora */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <SoftAurora
          speed={0.4}
          scale={1.2}
          brightness={0.8}
          color1="#2f6feb" // Theme sapphire
          color2="#111111" // Dark
          noiseFrequency={2.0}
          noiseAmplitude={0.8}
          bandHeight={0.6}
          bandSpread={1.2}
          octaveDecay={0.2}
          layerOffset={0.1}
          colorSpeed={0.8}
          enableMouseInteraction={true}
          mouseInfluence={0.1}
        />
      </div>

      {/* ─── Navbar ─────────────────────────────────────── */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
              style={{ background: 'var(--gradient-accent)', boxShadow: 'var(--shadow-glow-accent)' }}>
              <PieChart className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>FinTrace AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Features</a>
            <a href="#architecture" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Architecture</a>
            <a href="#use-cases" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Use Cases</a>
            <a href="#impact" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Why FinTrace</a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted hover:text-primary transition-colors"
              style={{ background: 'var(--color-surface-3)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href="https://github.com/a6hinandh/VioniX_FinTrace"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Docs
            </a>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
              style={{
                background: 'var(--color-accent)',
                color: '#fff',
                boxShadow: 'var(--shadow-glow-accent)',
              }}
            >
              <div className="w-4 h-4 rounded-[4px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <PieChart className="w-2.5 h-2.5 text-white" />
              </div>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ───────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 landing-grid pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, var(--color-accent-muted) 0%, transparent 70%)`
        }} />

        {/* Floating decorative nodes */}
        <div className="absolute top-40 left-[10%] w-3 h-3 rounded-full animate-float opacity-30" style={{ background: 'var(--color-accent)', animationDelay: '0s' }} />
        <div className="absolute top-60 right-[15%] w-2 h-2 rounded-full animate-float opacity-20" style={{ background: 'var(--color-safe)', animationDelay: '1s' }} />
        <div className="absolute top-48 right-[30%] w-4 h-4 rounded-full animate-float opacity-15" style={{ background: 'var(--color-warning)', animationDelay: '2s' }} />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up stagger-1 leading-[1.1]"
            style={{ color: 'var(--color-text-primary)' }}>
            Trace Money.{' '}
            <span style={{ color: 'var(--color-accent)' }}>Detect Fraud.</span>
            <br />
            Act in Real Time.
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2"
            style={{ color: 'var(--color-text-secondary)' }}>
            FinTrace AI uses graph-based machine learning to detect money laundering, fraud, and suspicious
            transaction patterns—giving investigators a complete decision cockpit with explainable evidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-xl text-base font-bold text-white flex items-center gap-2 transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: 'var(--gradient-accent)',
                boxShadow: 'var(--shadow-glow-accent)',
              }}
            >
              <Play className="w-4 h-4" />
              Start Demo
            </Link>
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-xl text-base font-semibold flex items-center gap-2 transition-all hover:scale-[1.02]"
              style={{
                background: 'var(--color-surface-2)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border)',
              }}
            >
              View Dashboard
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 animate-fade-in-up stagger-4">
            {[
              { value: '2.4M+', label: 'Transactions / Day' },
              { value: '<50ms', label: 'Risk Scoring' },
              { value: '99.7%', label: 'Detection Accuracy' },
              { value: '4', label: 'AML Scenarios' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{s.value}</p>
                <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Demo Preview ───────────────────────────────── */}
      <section className="px-6 pb-24 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent)' }}>Live preview</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              One cockpit for every investigation
            </h2>
            <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Real-time KPIs, live alerts, and the full transaction graph — all in a single pane of glass.
            </p>
          </div>

          <div className="card p-2 animate-fade-in-up stagger-5" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-surface-1)' }}>
              {/* Mock dashboard preview */}
              <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'color-mix(in srgb, var(--color-risk) 60%, transparent)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'color-mix(in srgb, var(--color-warning) 60%, transparent)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'color-mix(in srgb, var(--color-safe) 60%, transparent)' }} />
                </div>
                <div className="flex-1 h-6 rounded-md mx-16" style={{ background: 'var(--color-surface-3)' }}>
                  <div className="h-full flex items-center px-3">
                    <span className="text-[10px] text-muted font-mono">app.fintrace.ai/dashboard</span>
                  </div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Mini KPI cards */}
                {kpiPreview.map((kpi, i) => (
                  <div key={kpi.label} className="card p-4"
                    style={{ background: 'var(--color-surface-2)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: kpi.bg }}>
                        <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
                      </div>
                      <span className="text-[10px] font-bold flex items-center gap-0.5"
                        style={{ color: kpi.trend === 'up' ? 'var(--color-safe)' : 'var(--color-risk)' }}>
                        {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {kpi.delta}
                      </span>
                    </div>
                    <p className="text-[11px] mb-1" style={{ color: 'var(--color-text-muted)' }}>{kpi.label}</p>
                    <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{kpi.value}</p>
                    <div className="flex gap-[2px] mt-3 h-4 items-end">
                      {Array.from({ length: 12 }, (_, j) => (
                        <div key={j} className="w-[3px] rounded-full" style={{
                          height: `${30 + Math.sin(j * 0.8 + i) * 25 + Math.random() * 20}%`,
                          background: kpi.color,
                          opacity: 0.4,
                        }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Mini graph preview */}
              <div className="px-6 pb-6">
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
                  <div className="flex items-center justify-between px-4 py-2.5" style={{ background: 'var(--color-surface-2)', borderBottom: '1px solid var(--color-border)' }}>
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>Live fund flow graph</span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--color-safe-muted)', color: 'var(--color-safe)' }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-safe)' }} />
                      Real-time
                    </span>
                  </div>
                  <div className="h-32 flex items-center justify-center relative" style={{ background: 'var(--color-surface-0)' }}>
                    <div className="flex items-center gap-0">
                      {['A123', 'B456', 'C789', 'D222'].map((id, i) => {
                        const nodeColor = i >= 2 ? 'var(--color-risk)' : i === 1 ? 'var(--color-warning)' : 'var(--color-safe)';
                        return (
                        <div key={id} className="flex items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border-2"
                            style={{ background: 'var(--color-surface-2)', borderColor: `color-mix(in srgb, ${nodeColor} 60%, transparent)`, color: nodeColor }}>
                            {id}
                          </div>
                          {i < 3 && (
                            <div className="w-16 h-px relative" style={{ background: i >= 1 ? 'var(--color-risk)' : 'var(--color-border)', opacity: i >= 1 ? 0.5 : 0.3 }}>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-mono px-1 rounded" style={{ background: 'var(--color-surface-0)', color: 'var(--color-text-muted)' }}>
                                {['$45K', '$44.5K', '$44K'][i]}
                              </div>
                            </div>
                          )}
                        </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why FinTrace / Testimonial + Impact ────────── */}
      <section id="impact" className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Quote card */}
          <motion.div
            className="card p-8 flex flex-col justify-between relative overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="inline-flex self-start items-center px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest mb-6"
              style={{ background: 'var(--color-text-primary)', color: 'var(--color-text-inverse)' }}>
              Why_FinTrace
            </div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-5"
              style={{ background: 'var(--color-accent-muted)' }}>
              <Quote className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
            </div>
            <p className="text-xl md:text-2xl font-medium leading-snug mb-8" style={{ color: 'var(--color-text-primary)' }}>
              &ldquo;FinTrace AI cut our alert triage time by more than half. Investigators finally get the full
              transaction graph, not just a flat list of flagged rows.&rdquo;
            </p>
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Priya Nandan</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Head of Financial Crime Compliance (demo persona)</p>
            </div>
          </motion.div>

          {/* Stats card */}
          <motion.div
            className="card p-8 flex flex-col"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
              Global financial crime is scaling faster than manual review can keep up with&hellip;
            </p>
            <div className="flex-1 flex flex-col divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {impactStats.map((s) => (
                <div key={s.label} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  style={{ borderColor: 'var(--color-border)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-accent-muted)' }}>
                    <s.icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-display" style={{ color: 'var(--color-text-primary)' }}>{s.value}</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Features ───────────────────────────────────── */}
      <section id="features" className="px-6 py-24" style={{ background: 'var(--color-surface-1)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-md"
                style={{ color: 'var(--color-accent)', background: 'var(--color-accent-muted)' }}>
                <PieChart className="w-3 h-3" />
                The FinTrace Platform
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-md" style={{ color: 'var(--color-text-primary)' }}>
                Built for financial crime investigation
              </h2>
            </div>
            <p className="text-base max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
              FinTrace AI deeply understands transaction behavior, delivering graph-native detection and an
              explainable AI toolkit that lets investigators build cases and close them — fast.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={staggerItem} className="card p-6 flex flex-col group">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--color-surface-3)' }}>
                    <f.icon className="w-5 h-5" style={{ color: intentTokens[f.intent].color }} />
                  </div>
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-text-secondary)' }}>{f.desc}</p>
                <a href="#architecture" className="mt-5 inline-flex items-center justify-center w-8 h-8 rounded-full self-end transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-primary)' }}
                  aria-label={`Learn more about ${f.title}`}>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Architecture Flow ──────────────────────────── */}
      <section id="architecture" className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent)' }}>How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Pipeline Architecture
            </h2>
            <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              Every transaction flows through a four-stage pipeline for detection, investigation, and reporting.
            </p>
          </div>

          <motion.div
            className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {architectureSteps.map((step, i) => (
              <div key={step.label} className="flex items-center flex-1">
                <motion.div variants={staggerItem} className="card p-6 w-full text-center group relative">
                  <span className="absolute top-4 right-4 text-[10px] font-mono font-bold" style={{ color: 'var(--color-text-muted)' }}>
                    0{i + 1}
                  </span>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                    style={{ background: step.bg }}>
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  <h4 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{step.label}</h4>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{step.desc}</p>
                </motion.div>
                {i < architectureSteps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-8 shrink-0">
                    <ChevronRight className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Use Cases ──────────────────────────────────── */}
      <section id="use-cases" className="px-6 py-24" style={{ background: 'var(--color-surface-1)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent)' }}>Use cases</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Built for regulated industries
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((uc) => (
              <div key={uc.title} className="card p-6 text-center group hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'var(--color-accent-muted)' }}>
                  <uc.icon className="w-7 h-7" style={{ color: 'var(--color-accent)' }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{uc.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ────────────────────────────────── */}
      <section className="px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 70% at 50% 100%, var(--color-accent-muted) 0%, transparent 70%)`
        }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Ready to detect what others can't?
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Start exploring FinTrace AI's graph-powered detection engine with our interactive demo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-xl text-base font-bold text-white flex items-center gap-2 transition-all hover:scale-[1.03]"
              style={{
                background: 'var(--gradient-accent)',
                boxShadow: 'var(--shadow-glow-accent)',
              }}
            >
              <Play className="w-4 h-4" />
              Start Demo
            </Link>
            <a
              href="https://github.com/a6hinandh/VioniX_FinTrace"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl text-base font-semibold flex items-center gap-2"
              style={{
                background: 'var(--color-surface-2)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border)',
              }}
            >
              <Globe className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────── */}
      <footer className="px-6 pt-16 pb-8" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                {col.href ? (
                  <a href={col.href} className="inline-flex items-center gap-1 text-sm font-bold mb-4 hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--color-text-primary)' }}>
                    {col.heading}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <p className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>{col.heading}</p>
                )}
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith('http') ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer"
                          className="text-sm hover:text-primary transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                          {l.label}
                        </a>
                      ) : l.href.startsWith('#') ? (
                        <a href={l.href} className="text-sm hover:text-primary transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                          {l.label}
                        </a>
                      ) : (
                        <Link to={l.href} className="text-sm hover:text-primary transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div className="col-span-2">
              <p className="text-sm font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Stay up to date</p>
              {subscribed ? (
                <p className="text-sm" style={{ color: 'var(--color-safe)' }}>You're on the list — thanks for subscribing.</p>
              ) : (
                <form
                  className="flex items-center gap-2"
                  onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                >
                  <Input
                    type="email"
                    required
                    icon={<Mail className="w-3.5 h-3.5" />}
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    containerClassName="flex-1"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap flex items-center gap-1.5 transition-all hover:brightness-110"
                    style={{ background: 'var(--color-accent)', color: '#fff' }}
                  >
                    Signup
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
              <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                By submitting this form you acknowledge FinTrace AI is a demo project — no data is stored.
              </p>
            </div>
          </div>

          <div className="premium-divider mb-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-accent)' }}>
                <PieChart className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>FinTrace AI</span>
            </div>

            <div className="flex items-center gap-3">
              <a href="https://github.com/a6hinandh/VioniX_FinTrace" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-muted)' }} aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-muted)' }} aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              © {new Date().getFullYear()} FinTrace AI. Built for demo purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
