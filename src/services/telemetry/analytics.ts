// FinTrace AI — Analytics & Telemetry Service (Placeholder)

type EventProperties = Record<string, string | number | boolean>;

const ANALYTICS_ENABLED = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';

/**
 * Track an analytics event
 */
export function trackEvent(name: string, properties?: EventProperties): void {
  if (!ANALYTICS_ENABLED) return;
  // In production, this would send to an analytics service
  console.log(`[Analytics] ${name}`, properties || {});
}

/**
 * Track a page view
 */
export function trackPageView(pageName: string): void {
  trackEvent('page_view', { page: pageName });
}

/**
 * Track a user action
 */
export function trackAction(action: string, target: string, metadata?: EventProperties): void {
  trackEvent('user_action', { action, target, ...metadata });
}
