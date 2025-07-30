import { type ReactNode, useEffect, useState } from 'react';
import { ThemeMode } from '../enums';
import { ThemeProviderContext } from '../contexts';

export type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = ThemeMode.SYSTEM,
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(
    () => (localStorage.getItem(storageKey) as ThemeMode) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(ThemeMode.LIGHT, ThemeMode.DARK);
    if (theme === ThemeMode.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? ThemeMode.DARK
        : ThemeMode.LIGHT;

      root.classList.add(systemTheme);
      setTheme(systemTheme);
      return;
    }

    root.style.colorScheme = theme;
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: ThemeMode) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext {...props} value={value}>
      {children}
    </ThemeProviderContext>
  );
}
