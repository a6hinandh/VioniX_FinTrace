// FinTrace AI — Keyboard Shortcuts Hook

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Global keyboard shortcuts:
 * / — Focus search
 * g then d — Go to Dashboard
 * g then a — Go to Alerts
 * g then i — Go to Investigations
 * g then r — Go to Reports
 */
export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    let gPressed = false;
    let gTimeout: ReturnType<typeof setTimeout>;

    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (isInput) return;

      // / to focus search
      if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector('header input[type="text"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
        return;
      }

      // g + key navigation
      if (e.key === 'g') {
        gPressed = true;
        clearTimeout(gTimeout);
        gTimeout = setTimeout(() => { gPressed = false; }, 1000);
        return;
      }

      if (gPressed) {
        gPressed = false;
        clearTimeout(gTimeout);
        switch (e.key) {
          case 'd': navigate('/'); break;
          case 'a': navigate('/alerts'); break;
          case 'i': navigate('/investigations'); break;
          case 'r': navigate('/reports'); break;
          case 's': navigate('/settings'); break;
          case 'p': navigate('/profile'); break;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      clearTimeout(gTimeout);
    };
  }, [navigate]);
}
