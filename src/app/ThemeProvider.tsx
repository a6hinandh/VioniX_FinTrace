// FinTrace AI — Theme Provider
// Dark/Light theme context with localStorage persistence

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components -- hook is intentionally co-located with its Provider/Context
export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('fintrace-theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // localStorage unavailable (privacy mode, SSR, etc.)
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fintrace-theme', theme);
  }, [theme]);

  const toggleTheme = () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark'));
  const setTheme = (t: Theme) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
