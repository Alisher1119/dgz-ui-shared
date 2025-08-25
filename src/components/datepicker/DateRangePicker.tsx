import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { Calendar, DATE } from 'dgz-ui/calendar';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { cn } from 'dgz-ui';
import { Popover, PopoverContent, PopoverTrigger } from 'dgz-ui/popover';
import { Button, type ButtonProps } from 'dgz-ui/button';
import { Calendar1 } from 'lucide-react';

type DateRangePickerProps = ButtonProps & {
  format?: string;
  placeholder?: string;
  selected?: DateRange;
  timezone?: string;
  error?: string;
  onRangeSelected?: (value?: DateRange) => void;
};

type PresetType = DateRange & { label: ReactNode };

/**
 * DateRangePicker displays a two-month range picker with helpful presets.
 *
 * @param props.format - Display date format.
 * @param props.selected - Currently selected date range.
 * @param props.timezone - Time zone for date calculations.
 * @param props.onRangeSelected - Callback when a full range is selected.
 * @param props.placeholder - Placeholder when no date selected.
 * @param props.error - Optional error message that adjusts styling.
 */
export const DateRangePicker = ({
  className,
  format = DATE,
  selected,
  timezone,
  onRangeSelected = () => {},
  placeholder,
  error,
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
    ];
  }, [t]);

  const handleRangeSelect = (range: DateRange) => {
    const { from, to } = range;
    setDate({ from, to });
    if (from && to) {
      onRangeSelected({ from, to });
      setOpen(false);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            size={'sm'}
            variant={'secondary'}
            className={cn(
              'text-secondary !text-body-sm-regular border-border-alpha-strong focus:ring-item-primary mb-0 min-w-[170px] justify-between bg-transparent pl-3 text-left font-normal hover:bg-transparent',
              error &&
                'focus:ring-item-destructive border-item-destructive bg-item-destructive-focus text-item-destructive hover:bg-item-destructive-focus dark:bg-transparent',
              !date && 'text-primary'
            )}
            {...props}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from).format(format)} -{' '}
                  {dayjs(date.to).format(format)}
                </>
              ) : (
                dayjs(date.from).format(format)
              )
            ) : (
              <span className={'text-secondary'}>{placeholder}</span>
            )}
            <Calendar1 className={'text-secondary'} />
          </Button>
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
                variant={'ghost'}
                className={'justify-start'}
                onClick={() => handleRangeSelect(preset)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
          <Calendar
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
    </div>
  );
};
