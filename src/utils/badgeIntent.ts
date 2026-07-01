import { RiskLevel } from '../types/domain';
import type { BadgeIntent } from '../components/ui/Badge';

/** Maps a domain risk level to the semantic Badge intent used across the app. */
export function riskLevelToIntent(level: RiskLevel | string): BadgeIntent {
  switch (level) {
    case RiskLevel.CRITICAL:
    case 'critical':
    case RiskLevel.HIGH:
    case 'high':
      return 'risk';
    case RiskLevel.MEDIUM:
    case 'medium':
      return 'warning';
    case RiskLevel.LOW:
    case 'low':
    default:
      return 'safe';
  }
}

/** Maps an investigation CaseStatus string to a Badge intent. */
export function caseStatusToIntent(status: string): BadgeIntent {
  switch (status) {
    case 'escalated':
      return 'risk';
    case 'in_progress':
      return 'warning';
    case 'closed':
      return 'safe';
    case 'open':
    case 'pending_review':
    default:
      return 'accent';
  }
}

/** Maps common alert/case/report status strings to a Badge intent. */
export function alertStatusToIntent(status: string): BadgeIntent {
  switch (status) {
    case 'new':
      return 'info';
    case 'reviewing':
    case 'generating':
      return 'warning';
    case 'escalated':
      return 'risk';
    case 'resolved':
    case 'ready':
    case 'closed':
      return 'safe';
    case 'exported':
      return 'accent';
    case 'dismissed':
      return 'neutral';
    default:
      return 'neutral';
  }
}
