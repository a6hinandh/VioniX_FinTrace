import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import SoftAurora from '../ui/SoftAurora';

export function Layout() {
  return (
    <div className="flex h-screen overflow-hidden font-sans selection:bg-amber-500/30 relative"
      style={{ background: 'var(--color-base-bg)', color: 'var(--color-text-secondary)' }}>
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

      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute top-0 inset-x-0 h-64 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, var(--color-accent-muted), transparent)' }} />
          <div className="relative max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
