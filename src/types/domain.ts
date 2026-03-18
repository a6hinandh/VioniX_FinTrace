// FinTrace AI — Domain Models
// Strict TypeScript types for all core domain entities

// ─── Constants (used as enum replacements for erasableSyntaxOnly) ─────

export const RiskLevel = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;
export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel];

export const AlertStatus = {
  NEW: 'new',
  REVIEWING: 'reviewing',
  ESCALATED: 'escalated',
  DISMISSED: 'dismissed',
  RESOLVED: 'resolved',
} as const;
export type AlertStatus = (typeof AlertStatus)[keyof typeof AlertStatus];

export const CaseStatus = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  PENDING_REVIEW: 'pending_review',
  ESCALATED: 'escalated',
  CLOSED: 'closed',
} as const;
export type CaseStatus = (typeof CaseStatus)[keyof typeof CaseStatus];

export const Channel = {
  WEB: 'web',
  MOBILE: 'mobile',
  BRANCH: 'branch',
  API: 'api',
  ATM: 'atm',
} as const;
export type Channel = (typeof Channel)[keyof typeof Channel];

export const ScenarioType = {
  LAYERING: 'layering',
  ROUND_TRIPPING: 'round-tripping',
  SMURFING: 'smurfing',
  DORMANT_ACTIVATION: 'dormant-activation',
} as const;
export type ScenarioType = (typeof ScenarioType)[keyof typeof ScenarioType];

// ─── Core Entities ──────────────────────────────────────

export interface Account {
  id: string;
  name: string;
  type: 'individual' | 'corporate' | 'shell' | 'exchange';
  riskLevel: RiskLevel;
  riskScore: number;
  kycVerified: boolean;
  jurisdiction: string;
  createdAt: string;
  lastActivity: string;
  channel: Channel;
  tags: string[];
  // Enriched fields
  geoLocation?: { country: string; city: string; lat: number; lng: number };
  deviceInfo?: { type: string; os: string; browser: string };
  ipAddress?: string;
  offshoreRiskTags?: string[];
  ipAnomalies?: string[];
}

export interface Transaction {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  currency: string;
  timestamp: string;
  channel: Channel;
  description: string;
  flagged: boolean;
  riskScore: number;
}

export interface AlertFlag {
  label: string;
  desc: string;
  active: boolean;
  weight?: number;
}

export interface Alert {
  id: string;
  entityId: string;
  type: string;
  riskScore: number;
  riskLevel: RiskLevel;
  status: AlertStatus;
  timestamp: string;
  description: string;
  assignee?: string;
  scenario?: ScenarioType;
  flags: AlertFlag[];
}

export interface RiskScoreBreakdown {
  overall: number;
  layeringScore: number;
  structuringScore: number;
  velocityScore: number;
  profileMismatchScore: number;
  geographicRisk: number;
  modelVersion: string;
  confidence: number;
  lastUpdated: string;
}

export interface AuditEntry {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  details: string;
}

export interface InvestigationCase {
  id: string;
  alertIds: string[];
  entityIds: string[];
  status: CaseStatus;
  priority: RiskLevel;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  slaDeadline: string;
  summary: string;
  nextAction: string;
  auditTrail: AuditEntry[];
  riskBreakdown: RiskScoreBreakdown;
}

export interface EvidencePackage {
  id: string;
  caseId: string;
  generatedAt: string;
  generatedBy: string;
  format: 'pdf' | 'json';
  title: string;
  summary: string;
  entityCount: number;
  transactionCount: number;
  totalAmount: number;
  currency: string;
  status: 'generating' | 'ready' | 'exported';
}

// ─── Graph Types ────────────────────────────────────────

export interface EntityMetadata {
  geoLocation: string;
  ipAddress: string;
  device: string;
  channel: string;
  kycStatus: 'verified' | 'pending' | 'expired' | 'rejected';
  offshoreRisk: boolean;
  ipAnomalies: string[];
  lastLogin: string;
  accountAge: string;
}

export interface GraphNode {
  id: string;
  label: string;
  riskLevel: RiskLevel;
  riskScore: number;
  type: Account['type'];
  description: string;
  details: string;
  flags: AlertFlag[];
  metadata?: EntityMetadata;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  amount: number;
  currency: string;
  label: string;
  suspicious: boolean;
  timestamp: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// ─── KPI / Dashboard Types ──────────────────────────────

export interface KpiMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  sparklineData?: number[];
}

export interface SystemStatus {
  health: 'healthy' | 'degraded' | 'incident';
  uptime: string;
  lastIngestion: string;
  throughput: number;
  entityCount: number;
}
