// FinTrace AI — Landing Page
// Premium fintech landing with hero, features, architecture flow, use cases, and CTAs

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../app/ThemeProvider';
import {
  Activity, Shield, Brain, FileText, ArrowRight, Play,
  Sun, Moon, ChevronRight, Network, Zap,
  Building2, Landmark, Wallet, Globe, Lock, Eye,
  PieChart
} from 'lucide-react';
import SoftAurora from '../../components/ui/SoftAurora';

const features = [
  {
    icon: Network,
    title: 'Graph-Based Detection',
    desc: 'Map entity relationships across millions of transactions. Detect layering, round-tripping, and shell company networks invisible to rule-based systems.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Zap,
    title: 'Real-Time Risk Scoring',
    desc: 'Score every entity and transaction in under 50ms. Continuous risk recalculation as new data flows through the system.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Brain,
    title: 'Explainable AI',
    desc: 'Every alert comes with a complete explanation — layering score, velocity analysis, profile mismatch, and geographic risk breakdown.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: FileText,
    title: 'Automated Reports',
    desc: 'Generate regulatory-ready evidence packages in one click. Export to PDF or JSON for SAR filing, audit trails, and compliance documentation.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
];

const architectureSteps = [
  { label: 'Ingest', desc: 'Transaction streams', icon: Activity, color: 'from-amber-500 to-amber-600' },
  { label: 'Detect', desc: 'Pattern matching', icon: Shield, color: 'from-amber-500 to-amber-600' },
  { label: 'Investigate', desc: 'Graph analysis', icon: Eye, color: 'from-rose-500 to-rose-600' },
  { label: 'Report', desc: 'Evidence export', icon: FileText, color: 'from-emerald-500 to-emerald-600' },
];

const useCases = [
  { icon: Building2, title: 'Banks & Financial Institutions', desc: 'Enterprise AML compliance with full audit trails and regulatory reporting.' },
  { icon: Landmark, title: 'Regulators & FIUs', desc: 'Real-time oversight of cross-border fund flows and suspicious activity monitoring.' },
  { icon: Wallet, title: 'Fintech & Payments', desc: 'Embedded fraud detection for payment processors, neobanks, and crypto platforms.' },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

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
          color1="#D4930D" // Theme gold
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
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <PieChart className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>FinTrace AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Features</a>
            <a href="#architecture" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Architecture</a>
            <a href="#use-cases" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Use Cases</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted hover:text-primary transition-colors"
              style={{ background: 'var(--color-surface-3)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
              style={{
                background: 'var(--color-accent)',
                color: '#fff',
                boxShadow: 'var(--shadow-glow-accent)',
              }}
            >
              View Dashboard
              <ArrowRight className="w-3.5 h-3.5" />
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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 animate-fade-in-up"
            style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-border)' }}>
            <Lock className="w-3 h-3" />
            Enterprise-Grade AML Intelligence Platform
          </div>

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
                background: 'linear-gradient(135deg, var(--color-accent), #A16800)',
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
          <div className="card p-2 animate-fade-in-up stagger-5" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-surface-1)' }}>
              {/* Mock dashboard preview */}
              <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex-1 h-6 rounded-md mx-16" style={{ background: 'var(--color-surface-3)' }}>
                  <div className="h-full flex items-center px-3">
                    <span className="text-[10px] text-muted font-mono">app.fintrace.ai/dashboard</span>
                  </div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-4 gap-4">
                {/* Mini KPI cards */}
                {['Transactions', 'Alerts', 'High Risk', 'Cases'].map((label, i) => (
                  <div key={label} className="p-4 rounded-lg" style={{ background: 'var(--color-surface-3)' }}>
                    <p className="text-[10px] text-muted mb-1">{label}</p>
                    <p className="text-lg font-bold text-primary">{['2.4M', '3,452', '842', '156'][i]}</p>
                    <div className="flex gap-[2px] mt-2 h-4 items-end">
                      {Array.from({ length: 12 }, (_, j) => (
                        <div key={j} className="w-[3px] rounded-full" style={{
                          height: `${30 + Math.sin(j * 0.8 + i) * 25 + Math.random() * 20}%`,
                          background: i === 2 ? 'var(--color-risk)' : i === 1 ? 'var(--color-warning)' : 'var(--color-accent)',
                          opacity: 0.4,
                        }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Mini graph preview */}
              <div className="px-6 pb-6">
                <div className="h-32 rounded-lg flex items-center justify-center relative" style={{ background: 'var(--color-surface-0)' }}>
                  <div className="flex items-center gap-0">
                    {['A123', 'B456', 'C789', 'D222'].map((id, i) => (
                      <div key={id} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border-2 ${
                          i >= 2 ? 'border-red-500/60 text-red-400' : i === 1 ? 'border-amber-500/60 text-amber-400' : 'border-emerald-500/60 text-emerald-400'
                        }`} style={{ background: 'var(--color-surface-2)' }}>
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ───────────────────────────────────── */}
      <section id="features" className="px-6 py-24" style={{ background: 'var(--color-surface-1)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent)' }}>Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Everything you need to fight financial crime
            </h2>
            <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              From real-time detection to regulatory reporting, FinTrace AI provides a complete investigation toolkit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className={`card p-6 group animate-fade-in-up stagger-${i + 1}`}>
                <div className={`w-12 h-12 rounded-xl ${f.bgColor} flex items-center justify-center mb-4`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
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

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {architectureSteps.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center text-center group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{step.label}</h4>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{step.desc}</p>
                </div>
                {i < architectureSteps.length - 1 && (
                  <div className="hidden md:flex items-center mx-6">
                    <div className="w-12 h-px" style={{ background: 'var(--color-border)' }} />
                    <ChevronRight className="w-4 h-4 text-muted -ml-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
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
                background: 'linear-gradient(135deg, var(--color-accent), #A16800)',
                boxShadow: 'var(--shadow-glow-accent)',
              }}
            >
              <Play className="w-4 h-4" />
              Start Demo
            </Link>
            <a
              href="https://github.com/fintrace-ai"
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
      <footer className="px-6 py-12" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <PieChart className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>FinTrace AI</span>
          </div>
          <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#architecture" className="hover:text-primary transition-colors">Architecture</a>
            <a href="#use-cases" className="hover:text-primary transition-colors">Use Cases</a>
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} FinTrace AI. Built for demo purposes.
          </p>
        </div>
      </footer>
    </div>
  );
}
