import { createContext } from 'react';
import { ThemeMode } from '../enums';

type ThemeProviderState = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

/**
 * React context holding the current theme and a setter to update it.
 *
 * Use together with useTheme() hook. Defaults to system theme.
 */
export const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: ThemeMode.SYSTEM,
  setTheme: () => null,
});
