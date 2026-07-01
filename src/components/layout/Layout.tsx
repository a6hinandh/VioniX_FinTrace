import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import SoftAurora from '../ui/SoftAurora';
import { pageFade } from '../../lib/motion';

export function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden relative"
      style={{ background: 'var(--color-base-bg)', color: 'var(--color-text-secondary)' }}>
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

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute top-0 inset-x-0 h-64 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, var(--color-accent-muted), transparent)' }} />
          <div className="relative max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageFade}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
