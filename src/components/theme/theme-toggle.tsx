import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "dgz-ui/dropdown";
import { useTranslation } from "react-i18next";
import { Button } from "dgz-ui/button";
import { ThemeMode } from "../../enums";
import { useTheme } from "../../hooks";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="tertiary" size="icon" className={className}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme(ThemeMode.LIGHT)}>
          {t("Light")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(ThemeMode.DARK)}>
          {t("Dark")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(ThemeMode.SYSTEM)}>
          {t("System")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
