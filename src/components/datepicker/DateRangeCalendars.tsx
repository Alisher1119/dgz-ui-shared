import { type DateRange } from "react-day-picker";
import { Calendar } from "dgz-ui/calendar";

/**
 * Props for DateRangeCalendars component
 */
interface DateRangeCalendarsProps {
  /**
   * Currently selected date range
   */
  date?: DateRange;
  /**
   * Timezone for the calendars
   */
  timezone?: string;
  /**
   * Callback when the from date is selected
   */
  onFromDateSelect: (from: Date | undefined) => void;
  /**
   * Callback when the to date is selected
   */
  onToDateSelect: (to: Date | undefined) => void;
}

/**
 * Component for displaying the from and to date calendars
 */
export const DateRangeCalendars = ({
  date,
  timezone,
  onFromDateSelect,
  onToDateSelect,
}: DateRangeCalendarsProps) => {
  return (
    <>
      <Calendar
        className={"border-e border-border-alpha-light"}
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
        onSelect={onFromDateSelect}
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
        onSelect={onToDateSelect}
      />
    </>
  );
};
