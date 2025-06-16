import { createContext } from "react";
import { ThemeMode } from "../enums";

type ThemeProviderState = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

export const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: ThemeMode.SYSTEM,
  setTheme: () => null,
});
