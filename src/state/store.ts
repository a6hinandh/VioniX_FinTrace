// FinTrace AI — Zustand Global Store

import { create } from 'zustand';
import type { Alert, InvestigationCase, EvidencePackage } from '../types/domain';
import { AlertStatus, CaseStatus } from '../types/domain';
import { MOCK_ALERTS, MOCK_CASES, MOCK_REPORTS, SIMULATION_ALERT_TEMPLATES } from '../mocks/fixtures/data';

interface LiveFeedState {
  transactionsToday: number;
  throughputPerSec: number;
  alertQueueSize: number;
  investigationQueueSize: number;
  isStreaming: boolean;
}

interface AppState {
  // ─── Alerts ───────────────────────────
  alerts: Alert[];
  selectedAlertId: string | null;
  selectAlert: (id: string | null) => void;
  updateAlertStatus: (id: string, status: AlertStatus) => void;
  assignAlert: (id: string, assignee: string) => void;

  // ─── Cases ────────────────────────────
  cases: InvestigationCase[];
  selectedCaseId: string | null;
  selectCase: (id: string | null) => void;
  updateCaseStatus: (id: string, status: CaseStatus) => void;
  addCaseAuditEntry: (caseId: string, action: string, actor: string, details: string) => void;

  // ─── Reports ──────────────────────────
  reports: EvidencePackage[];
  generateReport: (caseId: string) => void;

  // ─── Live Feed ────────────────────────
  liveFeed: LiveFeedState;
  incrementFeed: () => void;
  setStreaming: (val: boolean) => void;

  // ─── UI State ─────────────────────────
  selectedGraphNode: string;
  setSelectedGraphNode: (id: string) => void;
  isGraphHighlighted: boolean;
  toggleGraphHighlight: () => void;

  // ─── Simulation ───────────────────────
  simulationMode: boolean;
  simulationAlertCounter: number;
  startSimulation: () => void;
  stopSimulation: () => void;
  injectSimulationAlert: () => void;

  // ─── Toast / Notifications ────────────
  toasts: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // ─── Undo Stack ───────────────────────
  undoStack: Array<{ description: string; undo: () => void }>;
  pushUndo: (description: string, undo: () => void) => void;
  popUndo: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // ─── Alerts ─────────────────────────────
  alerts: MOCK_ALERTS,
  selectedAlertId: null,
  selectAlert: (id) => set({ selectedAlertId: id }),
  updateAlertStatus: (id, status) =>
    set((s) => ({
      alerts: s.alerts.map((a) => (a.id === id ? { ...a, status } : a)),
    })),
  assignAlert: (id, assignee) =>
    set((s) => ({
      alerts: s.alerts.map((a) => (a.id === id ? { ...a, assignee, status: AlertStatus.REVIEWING } : a)),
    })),

  // ─── Cases ──────────────────────────────
  cases: MOCK_CASES,
  selectedCaseId: null,
  selectCase: (id) => set({ selectedCaseId: id }),
  updateCaseStatus: (id, status) =>
    set((s) => ({
      cases: s.cases.map((c) => (c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c)),
    })),
  addCaseAuditEntry: (caseId, action, actor, details) =>
    set((s) => ({
      cases: s.cases.map((c) =>
        c.id === caseId
          ? {
              ...c,
              updatedAt: new Date().toISOString(),
              auditTrail: [
                ...c.auditTrail,
                { id: `at-${Date.now()}`, action, actor, timestamp: new Date().toISOString(), details },
              ],
            }
          : c
      ),
    })),

  // ─── Reports ────────────────────────────
  reports: MOCK_REPORTS,
  generateReport: (caseId) => {
    const c = get().cases.find((c) => c.id === caseId);
    if (!c) return;
    const newReport: EvidencePackage = {
      id: `RPT-${Date.now()}`,
      caseId,
      generatedAt: new Date().toISOString(),
      generatedBy: 'Jane Doe',
      format: 'pdf',
      title: `Evidence Package — ${c.summary.slice(0, 40)}...`,
      summary: 'Regulatory-ready evidence package generated from investigation findings.',
      entityCount: c.entityIds.length,
      transactionCount: Math.floor(Math.random() * 30) + 5,
      totalAmount: Math.floor(Math.random() * 500000) + 50000,
      currency: 'USD',
      status: 'generating',
    };
    set((s) => ({ reports: [newReport, ...s.reports] }));
    setTimeout(() => {
      set((s) => ({
        reports: s.reports.map((r) => (r.id === newReport.id ? { ...r, status: 'ready' as const } : r)),
      }));
    }, 3000);
  },

  // ─── Live Feed ──────────────────────────
  liveFeed: {
    transactionsToday: 2_412_847,
    throughputPerSec: 1247,
    alertQueueSize: 3452,
    investigationQueueSize: 156,
    isStreaming: true,
  },
  incrementFeed: () => {
    const sim = get().simulationMode;
    const multiplier = sim ? 3 : 1;
    set((s) => ({
      liveFeed: {
        ...s.liveFeed,
        transactionsToday: s.liveFeed.transactionsToday + (Math.floor(Math.random() * 50) + 10) * multiplier,
        throughputPerSec: 1100 + Math.floor(Math.random() * 300) * multiplier,
        alertQueueSize: s.liveFeed.alertQueueSize + (Math.random() > (sim ? 0.4 : 0.7) ? 1 : 0),
        investigationQueueSize: s.liveFeed.investigationQueueSize + (Math.random() > 0.9 ? 1 : 0),
      },
    }));
  },
  setStreaming: (val) =>
    set((s) => ({ liveFeed: { ...s.liveFeed, isStreaming: val } })),

  // ─── UI State ───────────────────────────
  selectedGraphNode: 'C789',
  setSelectedGraphNode: (id) => set({ selectedGraphNode: id }),
  isGraphHighlighted: true,
  toggleGraphHighlight: () => set((s) => ({ isGraphHighlighted: !s.isGraphHighlighted })),

  // ─── Simulation ─────────────────────────
  simulationMode: false,
  simulationAlertCounter: 0,
  startSimulation: () => set({ simulationMode: true }),
  stopSimulation: () => set({ simulationMode: false }),
  injectSimulationAlert: () => {
    const counter = get().simulationAlertCounter;
    const template = SIMULATION_ALERT_TEMPLATES[counter % SIMULATION_ALERT_TEMPLATES.length];
    const newAlert: Alert = {
      ...template,
      id: `ALT-SIM-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    set((s) => ({
      alerts: [newAlert, ...s.alerts],
      simulationAlertCounter: s.simulationAlertCounter + 1,
      liveFeed: {
        ...s.liveFeed,
        alertQueueSize: s.liveFeed.alertQueueSize + 1,
      },
    }));
  },

  // ─── Toasts ─────────────────────────────
  toasts: [],
  addToast: (message, type) => {
    const id = `toast-${Date.now()}`;
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  // ─── Undo Stack ─────────────────────────
  undoStack: [],
  pushUndo: (description, undo) =>
    set((s) => ({ undoStack: [...s.undoStack.slice(-9), { description, undo }] })),
  popUndo: () => {
    const stack = get().undoStack;
    if (stack.length === 0) return;
    const last = stack[stack.length - 1];
    last.undo();
    set((s) => ({ undoStack: s.undoStack.slice(0, -1) }));
  },
}));
