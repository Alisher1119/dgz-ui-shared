import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'dgz-ui/dropdown';
import { Button } from 'dgz-ui/button';
import { RiArrowDownSLine, RiFileChartLine } from '@remixicon/react';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import { Spin } from '../loader';

/**
 * Describes a single export option in the ExportData dropdown.
 *
 * - Use `label` to render the visible option content (text or any React node).
 * - Provide `onClick` to trigger the export logic (CSV/XLS/PDF, etc.).
 */
export interface ExportDataInterface {
  /** Visible content for the dropdown item (text, icon, etc.). */
  label: ReactNode;
  /** Callback executed when the export option is selected. */
  onClick: () => void;
}

/**
 * Props for the `ExportData` component.
 *
 * - `options` — A list of export actions displayed in the dropdown.
 * - `loading` — When `true`, shows a small spinner in the button to indicate an export is in progress.
 */
export interface ExportDataProps {
  /** Export actions displayed in the dropdown. */
  options: ExportDataInterface[];
  /** If `true`, renders a spinner icon in the button. */
  loading?: boolean;
}

/**
 * ExportData renders a compact dropdown button for exporting data in various formats.
 *
 * Behavior
 * - Shows a button with an export icon and localized "Export" label.
 * - Clicking opens a dropdown with the provided `options` list.
 * - Each option calls its `onClick` handler when selected.
 *
 * Accessibility
 * - Uses the shared Dropdown primitives and Button which provide keyboard and ARIA support.
 *
 * Internationalization
 * - The button label is translated via `react-i18next` using the `Export` key.
 */
export const ExportData = ({ options, loading = false }: ExportDataProps) => {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size={'sm'}
          className={'ml-auto rounded-lg px-3'}
        >
          {loading ? <Spin /> : <RiFileChartLine />}{' '}
          <span className={'hidden lg:!inline'}>{t('Export')}</span>
          <RiArrowDownSLine />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option, index) => {
          return (
            <DropdownMenuItem key={index} onClick={() => option.onClick()}>
              {option.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
