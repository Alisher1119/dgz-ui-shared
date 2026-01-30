import dayjs from 'dayjs';
import { Button } from 'dgz-ui/button';
import { Calendar, type CalendarProps, DATE } from 'dgz-ui/calendar';
import { Input, type InputProps } from 'dgz-ui/form';
import { Popover, PopoverContent, PopoverTrigger } from 'dgz-ui/popover';
import { cn } from 'dgz-ui/utils';
import { Calendar1, XIcon } from 'lucide-react';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';

/**
 * Props for the DateRangePicker component.
 */
export type DateRangePickerProps = Omit<
  CalendarProps,
  'mode' | 'disabled' | 'selected'
> & {
  /** The date format string (e.g., 'YYYY-MM-DD'). */
  format?: string;
  /** Placeholder text when no date is selected. */
  placeholder?: string;
  /** The currently selected date range. */
  selected?: DateRange;
  /** Timezone for date calculations. */
  timezone?: string;
  /** Error message to display (modifies styling). */
  error?: string;
  /** Callback function when a date range is selected. */
  onRangeSelected?: (value?: DateRange) => void;
  inputProps?: InputProps;
  disabled?: boolean;
};

/**
 * Type definition for a date range preset configuration.
 */
type PresetType = DateRange & {
  /** Label for the preset (e.g., "Last 7 days"). */
  label: ReactNode;
  isActive?: boolean;
};

/**
 * DateRangePicker displays a two-month range picker with helpful presets.
 *
 * @param props.format - Display date format.
 * @param props.selected - Currently selected date range.
 * @param props.timezone - Time zone for date calculations.
 * @param props.onRangeSelected - Callback when a full range is selected.
 * @param props.placeholder - Placeholder when no date selected.
 * @param props.error - Optional error message that adjusts styling.
 * @param props.inputProps - Props passed to the underlying Input component.
 * @param props.disabled - Whether the date range picker is disabled.
 * @returns A date range picker component.
 */
export const DateRangePicker = ({
  className,
  format = DATE,
  selected,
  timezone,
  onRangeSelected = () => {},
  placeholder,
  disabled,
  error,
  inputProps,
  ...props
}: DateRangePickerProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();

  useEffect(() => {
    setDate(selected);
  }, [selected]);

  const presets: PresetType[] = useMemo(() => {
    const today = dayjs().endOf('day');
    return [
      {
        from: today.startOf('week').toDate(),
        to: today.endOf('week').toDate(),
        label: t('This week'),
      },
      {
        from: today.startOf('month').toDate(),
        to: today.endOf('month').toDate(),
        label: t('This month'),
      },
      {
        from: today.startOf('year').toDate(),
        to: today.endOf('year').toDate(),
        label: t('This year'),
      },
      {
        from: today.subtract(7, 'day').startOf('day').toDate(),
        to: today.toDate(),
        label: t('Last 7 days'),
      },
      {
        from: today.subtract(30, 'day').startOf('day').toDate(),
        to: today.toDate(),
        label: t('Last 30 days'),
      },
      {
        from: today.subtract(3, 'month').startOf('day').toDate(),
        to: today.toDate(),
        label: t('Last 3 months'),
      },
      {
        from: today.subtract(6, 'month').startOf('day').toDate(),
        to: today.toDate(),
        label: t('Last 6 months'),
      },
      {
        from: today.subtract(12, 'month').startOf('day').toDate(),
        to: today.toDate(),
        label: t('Last 12 months'),
      },
    ].map((item) => ({
      ...item,
      isActive:
        selected?.from?.getTime() === item.from.getTime() &&
        selected?.to?.getTime() === item.to.getTime(),
    }));
  }, [t, selected]);

  const handleRangeSelect = (range: DateRange) => {
    setDate(range);
    if (range?.from && range?.to) {
      onRangeSelected(range);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={'m-0!'} disabled={disabled}>
        <div className={'relative'}>
          <Input
            variant={error ? 'failure' : 'default'}
            {...inputProps}
            readOnly
            value={
              date?.from
                ? date.to
                  ? `${dayjs(date.from).format(format)}-${dayjs(date.to).format(format)}`
                  : dayjs(date.from).format(format)
                : ''
            }
            placeholder={placeholder}
            disabled={disabled}
            className={cn(className)}
          />
          {date && (
            <XIcon
              onClick={() => {
                setDate(undefined);
                onRangeSelected?.(undefined);
              }}
              className={cn(
                'text-secondary absolute top-3 right-8 size-4 cursor-pointer',
                disabled && 'pointer-events-none opacity-50'
              )}
            />
          )}
          <Calendar1
            className={cn(
              'text-secondary absolute top-2.5 right-2 size-5',
              disabled && 'pointer-events-none opacity-50'
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto p-0" align="end" side={'bottom'}>
        <div
          className={
            'border-border-alpha-light flex flex-col space-y-1 border-e p-2'
          }
        >
          {presets.map((preset, index) => (
            <Button
              size={'xs'}
              key={index}
              variant={preset.isActive ? 'default' : 'ghost'}
              className={'justify-start'}
              onClick={() => handleRangeSelect(preset)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
        <Calendar
          {...props}
          className={'border-border-alpha-light border-e'}
          mode="single"
          endMonth={date?.to}
          selected={date?.from}
          selectedToDate={date?.to}
          selectedFromDate={date?.from}
          timeZone={timezone}
          disabled={
            date?.to
              ? {
                  after: date.to,
                }
              : undefined
          }
          onSelect={(from) => {
            setDate({ ...date, from: from as Date | undefined });
          }}
        />
        <Calendar
          {...props}
          mode="single"
          startMonth={date?.from}
          selected={date?.to}
          timeZone={timezone}
          disabled={
            date?.from
              ? {
                  before: date.from,
                }
              : undefined
          }
          selectedToDate={date?.to}
          selectedFromDate={date?.from}
          onSelect={(to) => {
            if (date) {
              handleRangeSelect({ ...date, to: to as Date | undefined });
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
