// FinTrace AI — API Response Types

import type { Alert, InvestigationCase, EvidencePackage, Transaction, Account, SystemStatus } from './domain';

// ─── Generic API Envelope ───────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  timestamp: string;
}

// ─── Endpoint Response Types ────────────────────────────

export type AlertsResponse = PaginatedResponse<Alert>;
export type CasesResponse = PaginatedResponse<InvestigationCase>;
export type TransactionsResponse = PaginatedResponse<Transaction>;
export type AccountsResponse = PaginatedResponse<Account>;
export type ReportsResponse = PaginatedResponse<EvidencePackage>;

export type AlertDetailResponse = ApiResponse<Alert>;
export type CaseDetailResponse = ApiResponse<InvestigationCase>;
export type ReportDetailResponse = ApiResponse<EvidencePackage>;
export type SystemStatusResponse = ApiResponse<SystemStatus>;

// ─── Request Types ──────────────────────────────────────

export interface AlertFilterParams {
  riskLevel?: string;
  status?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  pageSize?: number;
}

export interface CaseActionRequest {
  caseId: string;
  action: 'assign' | 'escalate' | 'freeze' | 'request_docs' | 'close';
  actor: string;
  details?: string;
}

export interface GenerateReportRequest {
  caseId: string;
  format: 'pdf' | 'json';
  includeTransactions: boolean;
  includeGraph: boolean;
}
