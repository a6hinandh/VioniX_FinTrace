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
 * Get the display color class for a risk level
 */
export function riskLevelColor(level: RiskLevel | string): { text: string; bg: string; border: string; dot: string } {
  switch (level) {
    case RiskLevel.CRITICAL:
    case 'critical':
      return { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-500' };
    case RiskLevel.HIGH:
    case 'high':
      return { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', dot: 'bg-rose-500' };
    case RiskLevel.MEDIUM:
    case 'medium':
      return { text: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500' };
    case RiskLevel.LOW:
    case 'low':
    default:
      return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' };
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
