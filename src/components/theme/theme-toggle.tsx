import { Button } from 'dgz-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'dgz-ui/dropdown';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ThemeMode } from '../../enums';
import { useTheme } from '../../hooks';

/**
 * ThemeToggle provides a dropdown to switch between Light, Dark, and System themes.
 *
 * @param props.className - Optional className passed to the trigger button.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="tertiary" size="icon" className={className}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme(ThemeMode.LIGHT)}>
          {t('Light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(ThemeMode.DARK)}>
          {t('Dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(ThemeMode.SYSTEM)}>
          {t('System')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
