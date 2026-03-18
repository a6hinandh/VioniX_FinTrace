// FinTrace AI — Mock Data Fixtures
// Deterministic mock data with enriched entity metadata for all scenarios

import type { Alert, InvestigationCase, EvidencePackage, GraphNode, GraphEdge, RiskScoreBreakdown } from '../../types/domain';
import { RiskLevel, AlertStatus, CaseStatus, ScenarioType } from '../../types/domain';
import { minutesAgo, hoursAgo, daysAgo } from '../../utils/dates';

// ─── Graph Nodes (Enriched with Cyber & Financial Metadata) ─────

export const MOCK_GRAPH_NODES: GraphNode[] = [
  {
    id: 'A123', label: 'A123', riskLevel: RiskLevel.LOW, riskScore: 12,
    type: 'corporate', description: 'Origin: Verified Corporate Account',
    details: 'Long-standing corporate entity with clean transaction history. KYC completed Aug 2024.',
    flags: [
      { label: 'KYC Verified', desc: 'Completed Aug 2024', active: false },
      { label: 'No flagged history', desc: 'Clean record', active: false },
    ],
    metadata: {
      geoLocation: 'New York, US', ipAddress: '198.51.100.23', device: 'Desktop — Windows 11',
      channel: 'Web Portal', kycStatus: 'verified', offshoreRisk: false,
      ipAnomalies: [], lastLogin: '2 hours ago', accountAge: '4 years',
    },
  },
  {
    id: 'B456', label: 'B456', riskLevel: RiskLevel.MEDIUM, riskScore: 45,
    type: 'corporate', description: 'Intermediary transfer account',
    details: 'Recently established LLC processing high volume of transfers. Entity age < 90 days.',
    flags: [
      { label: 'High Velocity', desc: 'Unusual transfer speed', active: true, weight: 0.35 },
      { label: 'New Entity', desc: 'Established < 3 months', active: true, weight: 0.25 },
    ],
    metadata: {
      geoLocation: 'Wilmington, DE, US', ipAddress: '203.0.113.45', device: 'API Client — Automated',
      channel: 'API', kycStatus: 'pending', offshoreRisk: false,
      ipAnomalies: ['Datacenter IP', 'Multiple sessions'], lastLogin: '15 minutes ago', accountAge: '78 days',
    },
  },
  {
    id: 'C789', label: 'C789', riskLevel: RiskLevel.HIGH, riskScore: 92,
    type: 'exchange', description: 'Known Mixing Service',
    details: 'Entity demonstrates behaviors strongly correlated with money laundering patterns and obfuscation techniques.',
    flags: [
      { label: 'Layering Activity', desc: 'Rapid hops between accounts', active: true, weight: 0.30 },
      { label: 'Structuring / Smurfing', desc: 'Transactions below reporting threshold', active: true, weight: 0.25 },
      { label: 'Dormant Account Wake-up', desc: 'No activity in past 180 days', active: true, weight: 0.20 },
      { label: 'High-risk Jurisdiction', desc: 'Associated with flagged region', active: false, weight: 0.10 },
    ],
    metadata: {
      geoLocation: 'Tallinn, Estonia', ipAddress: '45.33.32.156', device: 'VPN Tunnel — Unknown OS',
      channel: 'API', kycStatus: 'expired', offshoreRisk: true,
      ipAnomalies: ['TOR exit node', 'VPN detected', 'IP geolocation mismatch'],
      lastLogin: '5 minutes ago', accountAge: '312 days',
    },
  },
  {
    id: 'D222', label: 'D222', riskLevel: RiskLevel.HIGH, riskScore: 88,
    type: 'shell', description: 'Off-shore Destination Account',
    details: 'Final destination for structured funds in non-cooperative jurisdiction. Beneficial ownership obscured.',
    flags: [
      { label: 'Shell Company', desc: 'No physical presence confirmed', active: true, weight: 0.30 },
      { label: 'Sanctioned Region', desc: 'High-risk operating area', active: true, weight: 0.25 },
      { label: 'Complex Ownership', desc: 'Beneficial owner hidden', active: true, weight: 0.20 },
    ],
    metadata: {
      geoLocation: 'George Town, Cayman Islands', ipAddress: '192.0.2.88', device: 'Mobile — iOS 17',
      channel: 'Mobile', kycStatus: 'rejected', offshoreRisk: true,
      ipAnomalies: ['Offshore jurisdiction IP', 'Proxy detected'],
      lastLogin: '1 hour ago', accountAge: '156 days',
    },
  },
  {
    id: 'E551', label: 'E551', riskLevel: RiskLevel.MEDIUM, riskScore: 55,
    type: 'individual', description: 'Domestic intermediary',
    details: 'Personal account used for high-value pass-through transactions. Pattern consistent with smurfing relay.',
    flags: [
      { label: 'Structuring Pattern', desc: 'Multiple sub-threshold transfers', active: true, weight: 0.30 },
      { label: 'New Counterparties', desc: '8 new recipients in 30 days', active: true, weight: 0.20 },
    ],
    metadata: {
      geoLocation: 'Miami, FL, US', ipAddress: '172.16.254.1', device: 'Mobile — Android 14',
      channel: 'Mobile', kycStatus: 'verified', offshoreRisk: false,
      ipAnomalies: ['Frequent location changes'], lastLogin: '30 minutes ago', accountAge: '2 years',
    },
  },
  {
    id: 'F998', label: 'F998', riskLevel: RiskLevel.LOW, riskScore: 8,
    type: 'corporate', description: 'Verified payroll account',
    details: 'Regular corporate payroll disbursement account. All KYC/KYB checks passed.',
    flags: [
      { label: 'KYB Verified', desc: 'Full verification', active: false },
      { label: 'Regular Pattern', desc: 'Consistent monthly activity', active: false },
    ],
    metadata: {
      geoLocation: 'San Francisco, CA, US', ipAddress: '198.51.100.1', device: 'Desktop — macOS 14',
      channel: 'Web Portal', kycStatus: 'verified', offshoreRisk: false,
      ipAnomalies: [], lastLogin: '1 hour ago', accountAge: '6 years',
    },
  },
];

// ─── Graph Edges ────────────────────────────────────────

export const MOCK_GRAPH_EDGES: GraphEdge[] = [
  { id: 'e1', source: 'A123', target: 'B456', amount: 45000, currency: 'USD', label: '$45K', suspicious: false, timestamp: minutesAgo(15) },
  { id: 'e2', source: 'B456', target: 'C789', amount: 44500, currency: 'USD', label: '$44.5K', suspicious: true, timestamp: minutesAgo(10) },
  { id: 'e3', source: 'C789', target: 'D222', amount: 44000, currency: 'USD', label: '$44K', suspicious: true, timestamp: minutesAgo(5) },
  { id: 'e4', source: 'B456', target: 'E551', amount: 12000, currency: 'USD', label: '$12K', suspicious: true, timestamp: minutesAgo(12) },
  { id: 'e5', source: 'E551', target: 'D222', amount: 11500, currency: 'USD', label: '$11.5K', suspicious: true, timestamp: minutesAgo(7) },
  { id: 'e6', source: 'F998', target: 'A123', amount: 125000, currency: 'USD', label: '$125K', suspicious: false, timestamp: hoursAgo(2) },
];

// ─── Alerts ─────────────────────────────────────────────

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'ALT-001', entityId: 'C789', type: 'Layering Detected', riskScore: 92,
    riskLevel: RiskLevel.HIGH, status: AlertStatus.NEW, timestamp: minutesAgo(2),
    description: 'Multi-hop layering pattern detected. Funds passed through 3 intermediaries with near-matching amounts.',
    scenario: ScenarioType.LAYERING,
    flags: [
      { label: 'Layering Activity', desc: 'Rapid hops between accounts', active: true },
      { label: 'Amount Matching', desc: 'Near-identical amounts across hops', active: true },
    ],
  },
  {
    id: 'ALT-002', entityId: 'D222', type: 'Off-shore Destination', riskScore: 88,
    riskLevel: RiskLevel.HIGH, status: AlertStatus.NEW, timestamp: minutesAgo(3),
    description: 'Funds routed to shell company in non-cooperative jurisdiction. Beneficial ownership unknown.',
    scenario: ScenarioType.LAYERING,
    flags: [
      { label: 'Shell Entity', desc: 'No physical presence', active: true },
      { label: 'Sanctioned Region', desc: 'High-risk area', active: true },
    ],
  },
  {
    id: 'ALT-003', entityId: 'X442', type: 'Velocity Limit Exceeded', riskScore: 85,
    riskLevel: RiskLevel.HIGH, status: AlertStatus.REVIEWING, timestamp: minutesAgo(14),
    description: 'Transaction velocity exceeded system thresholds. 47 transactions in 1-hour window.',
    assignee: 'Jane Doe',
    scenario: ScenarioType.SMURFING,
    flags: [
      { label: 'Velocity Breach', desc: '47 txns in 60 min', active: true },
      { label: 'Sub-threshold', desc: 'All under $10K', active: true },
    ],
  },
  {
    id: 'ALT-004', entityId: 'E551', type: 'Structuring Pattern', riskScore: 55,
    riskLevel: RiskLevel.MEDIUM, status: AlertStatus.NEW, timestamp: minutesAgo(28),
    description: 'Multiple transactions structured below CTR reporting threshold.',
    scenario: ScenarioType.SMURFING,
    flags: [
      { label: 'Structuring', desc: 'Sub-$10K pattern', active: true },
      { label: 'New Recipients', desc: '8 new in 30 days', active: true },
    ],
  },
  {
    id: 'ALT-005', entityId: 'B456', type: 'High Transfer Volume', riskScore: 45,
    riskLevel: RiskLevel.MEDIUM, status: AlertStatus.REVIEWING, timestamp: hoursAgo(1),
    description: 'Newly established entity processing abnormally high transfer volumes.',
    assignee: 'John Smith',
    flags: [
      { label: 'Volume Spike', desc: '3x normal flow', active: true },
    ],
  },
  {
    id: 'ALT-006', entityId: 'K334', type: 'Unusual IP Login', riskScore: 22,
    riskLevel: RiskLevel.LOW, status: AlertStatus.DISMISSED, timestamp: hoursAgo(3),
    description: 'Login from unrecognized IP address. No anomalous transaction activity followed.',
    flags: [
      { label: 'Geo Mismatch', desc: 'VPN detected', active: false },
    ],
  },
  {
    id: 'ALT-007', entityId: 'M887', type: 'Dormant Reactivation', riskScore: 78,
    riskLevel: RiskLevel.HIGH, status: AlertStatus.NEW, timestamp: minutesAgo(45),
    description: 'Account dormant for 210 days suddenly received $95K in wire transfers.',
    scenario: ScenarioType.DORMANT_ACTIVATION,
    flags: [
      { label: 'Dormant Wake-up', desc: '210 days inactive', active: true },
      { label: 'Large Inflow', desc: '$95K received', active: true },
    ],
  },
  {
    id: 'ALT-008', entityId: 'R119', type: 'Round-Trip Detection', riskScore: 71,
    riskLevel: RiskLevel.HIGH, status: AlertStatus.ESCALATED, timestamp: hoursAgo(2),
    description: 'Funds returned to originator through 4-entity circular path within 48 hours.',
    assignee: 'Jane Doe',
    scenario: ScenarioType.ROUND_TRIPPING,
    flags: [
      { label: 'Circular Flow', desc: 'A→B→C→D→A pattern', active: true },
      { label: 'Rapid Cycle', desc: 'Under 48 hours', active: true },
    ],
  },
];

// ─── Risk Breakdowns ────────────────────────────────────

export const MOCK_RISK_BREAKDOWNS: Record<string, RiskScoreBreakdown> = {
  'C789': {
    overall: 92, layeringScore: 95, structuringScore: 88, velocityScore: 91,
    profileMismatchScore: 82, geographicRisk: 76, modelVersion: 'IF_v2.3 + GraphCentrality_v1.4',
    confidence: 0.94, lastUpdated: minutesAgo(2),
  },
  'D222': {
    overall: 88, layeringScore: 72, structuringScore: 81, velocityScore: 65,
    profileMismatchScore: 95, geographicRisk: 98, modelVersion: 'IF_v2.3 + GeoRisk_v3.1',
    confidence: 0.91, lastUpdated: minutesAgo(3),
  },
  'B456': {
    overall: 45, layeringScore: 30, structuringScore: 40, velocityScore: 72,
    profileMismatchScore: 45, geographicRisk: 15, modelVersion: 'IF_v2.3',
    confidence: 0.78, lastUpdated: hoursAgo(1),
  },
  'A123': {
    overall: 12, layeringScore: 5, structuringScore: 8, velocityScore: 15,
    profileMismatchScore: 10, geographicRisk: 5, modelVersion: 'IF_v2.3',
    confidence: 0.96, lastUpdated: hoursAgo(4),
  },
};

// ─── Investigation Cases ────────────────────────────────

export const MOCK_CASES: InvestigationCase[] = [
  {
    id: 'CASE-2024-001',
    alertIds: ['ALT-001', 'ALT-002'],
    entityIds: ['C789', 'D222', 'B456'],
    status: CaseStatus.IN_PROGRESS,
    priority: RiskLevel.HIGH,
    assignee: 'Jane Doe',
    createdAt: hoursAgo(1),
    updatedAt: minutesAgo(5),
    slaDeadline: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
    summary: 'Multi-entity layering scheme routing funds through mixing service to offshore shell company.',
    nextAction: 'Request enhanced due diligence documentation from intermediary B456.',
    auditTrail: [
      { id: 'at1', action: 'Case Created', actor: 'System', timestamp: hoursAgo(1), details: 'Auto-generated from correlated alerts ALT-001, ALT-002' },
      { id: 'at2', action: 'Assigned to Analyst', actor: 'System', timestamp: minutesAgo(55), details: 'Assigned to Jane Doe based on workload balancing' },
      { id: 'at3', action: 'Graph Analysis Started', actor: 'Jane Doe', timestamp: minutesAgo(45), details: 'Initiated 3-hop graph traversal from C789' },
      { id: 'at4', action: 'Risk Score Updated', actor: 'ML Pipeline', timestamp: minutesAgo(30), details: 'Score increased from 87 to 92 after new pattern match' },
      { id: 'at5', action: 'Entity B456 Added', actor: 'Jane Doe', timestamp: minutesAgo(15), details: 'Added intermediary B456 to investigation scope' },
    ],
    riskBreakdown: MOCK_RISK_BREAKDOWNS['C789'],
  },
  {
    id: 'CASE-2024-002',
    alertIds: ['ALT-003'],
    entityIds: ['X442'],
    status: CaseStatus.OPEN,
    priority: RiskLevel.HIGH,
    assignee: 'John Smith',
    createdAt: hoursAgo(2),
    updatedAt: minutesAgo(14),
    slaDeadline: new Date(Date.now() + 46 * 60 * 60 * 1000).toISOString(),
    summary: 'Smurfing pattern with 47 sub-threshold transactions within single hour window.',
    nextAction: 'Review transaction details and identify beneficiary network.',
    auditTrail: [
      { id: 'at6', action: 'Case Created', actor: 'System', timestamp: hoursAgo(2), details: 'Generated from velocity breach alert' },
      { id: 'at7', action: 'Assigned to Analyst', actor: 'System', timestamp: hoursAgo(2), details: 'Assigned to John Smith' },
    ],
    riskBreakdown: MOCK_RISK_BREAKDOWNS['C789'],
  },
  {
    id: 'CASE-2024-003',
    alertIds: ['ALT-008'],
    entityIds: ['R119'],
    status: CaseStatus.ESCALATED,
    priority: RiskLevel.HIGH,
    assignee: 'Jane Doe',
    createdAt: daysAgo(1),
    updatedAt: hoursAgo(2),
    slaDeadline: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    summary: 'Round-trip scheme with funds returning to originator through 4-entity circular path.',
    nextAction: 'Pending FIU review. Regulatory filing under preparation.',
    auditTrail: [
      { id: 'at8', action: 'Case Created', actor: 'System', timestamp: daysAgo(1), details: 'Round-trip pattern detected by graph engine' },
      { id: 'at9', action: 'Escalated to FIU', actor: 'Jane Doe', timestamp: hoursAgo(2), details: 'Escalated for regulatory assessment' },
    ],
    riskBreakdown: MOCK_RISK_BREAKDOWNS['D222'],
  },
  {
    id: 'CASE-2024-004',
    alertIds: ['ALT-004'],
    entityIds: ['E551'],
    status: CaseStatus.PENDING_REVIEW,
    priority: RiskLevel.MEDIUM,
    assignee: 'Alex Chen',
    createdAt: daysAgo(2),
    updatedAt: daysAgo(1),
    slaDeadline: new Date(Date.now() + 70 * 60 * 60 * 1000).toISOString(),
    summary: 'Structuring activity through personal account acting as relay for smurfing network.',
    nextAction: 'Awaiting supervisor review of preliminary findings.',
    auditTrail: [
      { id: 'at10', action: 'Case Created', actor: 'System', timestamp: daysAgo(2), details: 'Generated from structuring pattern alert' },
      { id: 'at11', action: 'Investigation Completed', actor: 'Alex Chen', timestamp: daysAgo(1), details: 'Preliminary analysis complete, sent for review' },
    ],
    riskBreakdown: MOCK_RISK_BREAKDOWNS['B456'],
  },
];

// ─── Evidence Packages ──────────────────────────────────

export const MOCK_REPORTS: EvidencePackage[] = [
  {
    id: 'RPT-001', caseId: 'CASE-2024-003', generatedAt: hoursAgo(1), generatedBy: 'Jane Doe',
    format: 'pdf', title: 'Round-Trip Scheme Investigation — R119 Network',
    summary: 'Complete evidence package for round-tripping scheme including transaction graphs, entity profiles, and timeline analysis.',
    entityCount: 4, transactionCount: 23, totalAmount: 340000, currency: 'USD', status: 'ready',
  },
  {
    id: 'RPT-002', caseId: 'CASE-2024-001', generatedAt: minutesAgo(10), generatedBy: 'System',
    format: 'json', title: 'Layering Network — C789/D222 Entity Cluster',
    summary: 'Machine-generated evidence export for ongoing layering investigation. Includes graph topology and risk scoring breakdown.',
    entityCount: 3, transactionCount: 15, totalAmount: 156000, currency: 'USD', status: 'ready',
  },
  {
    id: 'RPT-003', caseId: 'CASE-2024-002', generatedAt: minutesAgo(2), generatedBy: 'System',
    format: 'pdf', title: 'Smurfing Analysis — X442 Velocity Breach',
    summary: 'Automated report on sub-threshold transaction patterns. 47 transactions across 12 recipient accounts.',
    entityCount: 13, transactionCount: 47, totalAmount: 425000, currency: 'USD', status: 'generating',
  },
  {
    id: 'RPT-004', caseId: 'CASE-2024-004', generatedAt: daysAgo(1), generatedBy: 'Alex Chen',
    format: 'pdf', title: 'Structuring Pattern — E551 Personal Relay',
    summary: 'Investigation report on structured deposits and transfers through personal account.',
    entityCount: 6, transactionCount: 34, totalAmount: 89000, currency: 'USD', status: 'exported',
  },
];

// ─── Simulation New Alert Templates ─────────────────────

export const SIMULATION_ALERT_TEMPLATES: Omit<Alert, 'id' | 'timestamp'>[] = [
  {
    entityId: 'Q771', type: 'Rapid Fund Movement', riskScore: 83, riskLevel: RiskLevel.HIGH,
    status: AlertStatus.NEW, description: 'Funds moved through 5 accounts in under 90 minutes.',
    scenario: ScenarioType.LAYERING,
    flags: [{ label: 'Rapid Movement', desc: '5 hops in 90 min', active: true }],
  },
  {
    entityId: 'W229', type: 'Unusual Deposit Pattern', riskScore: 67, riskLevel: RiskLevel.HIGH,
    status: AlertStatus.NEW, description: 'Multiple cash deposits just below $10K threshold at different branches.',
    scenario: ScenarioType.SMURFING,
    flags: [{ label: 'Branch Hopping', desc: '4 branches in 1 day', active: true }],
  },
  {
    entityId: 'P443', type: 'Circular Transaction', riskScore: 74, riskLevel: RiskLevel.HIGH,
    status: AlertStatus.NEW, description: 'Funds returned to source account via 3 intermediaries.',
    scenario: ScenarioType.ROUND_TRIPPING,
    flags: [{ label: 'Circular Path', desc: 'Return in 24h', active: true }],
  },
  {
    entityId: 'T556', type: 'Dormant Account Activity', riskScore: 61, riskLevel: RiskLevel.MEDIUM,
    status: AlertStatus.NEW, description: 'Previously inactive account received large wire transfer.',
    scenario: ScenarioType.DORMANT_ACTIVATION,
    flags: [{ label: 'Dormant 180d', desc: 'Sudden $120K inflow', active: true }],
  },
];
