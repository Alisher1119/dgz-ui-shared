import { type ReactNode, useEffect, useState } from 'react';
import { ThemeMode } from '../enums';
import { ThemeProviderContext } from '../contexts';

/**
 * Props for the ThemeProvider component.
 */
export type ThemeProviderProps = {
  /** The content to be wrapped by the provider. */
  children: ReactNode;
  /** The default theme to use if no preferred theme is stored. Defaults to SYSTEM. */
  defaultTheme?: ThemeMode;
  /** The key used to store the theme preference in localStorage. Defaults to "theme". */
  storageKey?: string;
};

/**
 * ThemeProvider manages the application's theme state.
 * It syncs the theme with localStorage and applies the corresponding CSS class to the document root.
 *
 * @param props.children - Child components.
 * @param props.defaultTheme - Default theme mode.
 * @param props.storageKey - Local storage key for persistence.
 */
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
