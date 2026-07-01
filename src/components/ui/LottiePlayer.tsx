import type { ComponentType } from 'react';
import * as LottieModule from 'lottie-react';
import type { LottieComponentProps } from 'lottie-react';

// `lottie-react`'s CJS/ESM interop double-wraps its default export under Vite's
// dependency pre-bundling — unwrap it once here instead of at every call site.
const LottieImpl = (
  (LottieModule as unknown as { default?: { default?: unknown } }).default?.default ??
  (LottieModule as unknown as { default: unknown }).default
) as ComponentType<LottieComponentProps>;

export function LottiePlayer(props: LottieComponentProps) {
  return <LottieImpl {...props} />;
}
