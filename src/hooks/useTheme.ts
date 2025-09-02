import { useContext } from 'react';
import { ThemeProviderContext } from '../contexts';

/**
 * useTheme returns the theme context with current theme and setter.
 * Must be used within a ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
