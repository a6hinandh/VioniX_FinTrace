// FinTrace AI — Risk Calculation Helpers

import { RiskLevel } from '../types/domain';

/**
 * Convert a numeric risk score (0-100) to a RiskLevel enum
 */
export function scoreToRiskLevel(score: number): RiskLevel {
  if (score >= 80) return RiskLevel.CRITICAL;
  if (score >= 60) return RiskLevel.HIGH;
  if (score >= 35) return RiskLevel.MEDIUM;
  return RiskLevel.LOW;
}

/**
 * Get the themed CSS-variable tokens for a risk level (for inline `style`, not Tailwind classes)
 */
export function riskLevelColor(level: RiskLevel | string): { text: string; bg: string; border: string; dot: string } {
  switch (level) {
    case RiskLevel.CRITICAL:
    case 'critical':
    case RiskLevel.HIGH:
    case 'high':
      return { text: 'var(--color-risk)', bg: 'var(--color-risk-muted)', border: 'var(--color-risk-border)', dot: 'var(--color-risk)' };
    case RiskLevel.MEDIUM:
    case 'medium':
      return { text: 'var(--color-warning)', bg: 'var(--color-warning-muted)', border: 'var(--color-warning-border)', dot: 'var(--color-warning)' };
    case RiskLevel.LOW:
    case 'low':
    default:
      return { text: 'var(--color-safe)', bg: 'var(--color-safe-muted)', border: 'var(--color-safe-border)', dot: 'var(--color-safe)' };
  }
}

/**
 * Calculate a weighted risk score from individual factors
 */
export function calculateWeightedRisk(factors: {
  layering: number;
  structuring: number;
  velocity: number;
  profileMismatch: number;
  geographic: number;
}): number {
  const weights = {
    layering: 0.25,
    structuring: 0.25,
    velocity: 0.20,
    profileMismatch: 0.15,
    geographic: 0.15,
  };

  const weighted =
    factors.layering * weights.layering +
    factors.structuring * weights.structuring +
    factors.velocity * weights.velocity +
    factors.profileMismatch * weights.profileMismatch +
    factors.geographic * weights.geographic;

  return Math.round(Math.min(100, Math.max(0, weighted)));
}

/**
 * Get a human-readable risk label
 */
export function riskLevelLabel(level: RiskLevel | string): string {
  switch (level) {
    case RiskLevel.CRITICAL:
    case 'critical':
      return 'Critical';
    case RiskLevel.HIGH:
    case 'high':
      return 'High Risk';
    case RiskLevel.MEDIUM:
    case 'medium':
      return 'Monitored';
    case RiskLevel.LOW:
    case 'low':
    default:
      return 'Verified';
  }
}

/**
 * Generate a seeded random number for deterministic mock data
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Generate sparkline data points for KPI cards
 */
export function generateSparkline(length: number, base: number, variance: number, seed: number): number[] {
  return Array.from({ length }, (_, i) => {
    const r = seededRandom(seed + i);
    return Math.round(base + (r - 0.5) * variance * 2);
  });
}
