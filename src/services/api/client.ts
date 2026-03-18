// FinTrace AI — Mock API Client
// Simulates real API calls with latency and error simulation

const SIMULATED_LATENCY_MS = 400;
const ERROR_RATE = 0.02; // 2% of calls "fail"

/**
 * Simulated API call wrapper — adds realistic latency and occasional errors
 */
export async function mockApiCall<T>(data: T, customLatency?: number): Promise<T> {
  const latency = customLatency ?? SIMULATED_LATENCY_MS + Math.random() * 200;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < ERROR_RATE) {
        reject(new Error('Network error: Failed to reach server'));
      } else {
        resolve(data);
      }
    }, latency);
  });
}

/**
 * Retry wrapper with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 500
): Promise<T> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries - 1) {
        await new Promise((r) => setTimeout(r, baseDelay * Math.pow(2, attempt)));
      }
    }
  }
  throw lastError;
}

/**
 * API base URL from environment
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
