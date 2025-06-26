import { type HTMLAttributes } from "react";
import { type DateRange } from "react-day-picker";
import { DATE } from "dgz-ui/calendar";
import { cn } from "dgz-ui";
import { Popover, PopoverContent, PopoverTrigger } from "dgz-ui/popover";

import { DateRangePresets } from "./DateRangePresets";
import { DateRangePickerTrigger } from "./DateRangePickerTrigger";
import { DateRangeCalendars } from "./DateRangeCalendars";
import { useDateRangePicker } from "../../hooks/useDateRangePicker";

/**
 * Props for DateRangePicker component
 */
type DateRangePickerProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Format for displaying dates
   * @default DATE
   */
  format?: string;
  /**
   * Placeholder text when no date is selected
   */
  placeholder?: string;
  /**
   * Initially selected date range
   */
  selected?: DateRange;
  /**
   * Timezone for the calendars
   */
  timezone?: string;
  /**
   * Callback when a date range is selected
   */
  onRangeSelected?: (value?: DateRange) => void;
};

/**
 * DateRangePicker component for selecting a date range
 */
export const DateRangePicker = ({
  className,
  format = DATE,
  selected,
  timezone,
  onRangeSelected = () => {},
  placeholder,
}: DateRangePickerProps) => {
  const {
    open,
    setOpen,
    date,
    handleRangeSelect,
    handleFromDateSelect,
    handleToDateSelect,
  } = useDateRangePicker({ selected, onRangeSelected });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <DateRangePickerTrigger
            date={date}
            format={format}
            placeholder={placeholder}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex" align="end" side={"bottom"}>
          <DateRangePresets onPresetSelect={handleRangeSelect} />
          <DateRangeCalendars
            date={date}
            timezone={timezone}
            onFromDateSelect={handleFromDateSelect}
            onToDateSelect={handleToDateSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
