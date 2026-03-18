// FinTrace AI — Real-time Feed Hook
// Simulates a WebSocket-like data stream with simulation mode support

import { useEffect, useRef } from 'react';
import { useAppStore } from '../state/store';

/**
 * Hook to simulate real-time transaction feed data
 * In simulation mode: faster intervals, periodic alert injection
 */
export function useRealtimeFeed(intervalMs = 2000) {
  const incrementFeed = useAppStore((s) => s.incrementFeed);
  const isStreaming = useAppStore((s) => s.liveFeed.isStreaming);
  const simulationMode = useAppStore((s) => s.simulationMode);
  const injectSimulationAlert = useAppStore((s) => s.injectSimulationAlert);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const simAlertRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isStreaming) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const actualInterval = simulationMode ? Math.max(500, intervalMs / 3) : intervalMs;

    intervalRef.current = setInterval(() => {
      incrementFeed();
    }, actualInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isStreaming, intervalMs, incrementFeed, simulationMode]);

  // Simulation mode: inject new alerts periodically
  useEffect(() => {
    if (!simulationMode) {
      if (simAlertRef.current) clearInterval(simAlertRef.current);
      return;
    }

    simAlertRef.current = setInterval(() => {
      injectSimulationAlert();
    }, 8000);

    return () => {
      if (simAlertRef.current) clearInterval(simAlertRef.current);
    };
  }, [simulationMode, injectSimulationAlert]);
}
