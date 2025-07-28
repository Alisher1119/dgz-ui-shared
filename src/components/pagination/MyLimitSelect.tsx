import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'dgz-ui';
import type { Option } from 'dgz-ui/form';

export const DEFAULT_LIMIT = 50;
export const DEFAULT_ITEMS_LIMIT = 12;

export const DEFAULT_OPTIONS: Option[] = [
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 100,
    label: '100',
  },
];

export interface MyLimitSelectProps {
  defaultValue?: number;
  options?: Option[];
  onLimitChange: (limit: string) => void;
}

export const MyLimitSelect = ({
  defaultValue = DEFAULT_LIMIT,
  options = DEFAULT_OPTIONS,
  onLimitChange,
}: MyLimitSelectProps) => {
  const { t } = useTranslation();

  return (
    <div className={'flex items-center gap-3'}>
      <span className={'font-semibold'}>{t('Rows per page')}:</span>
      <Select onValueChange={onLimitChange} value={`${defaultValue}`}>
        <SelectTrigger className="h-8.5 w-17">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={`${option.value}`}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
