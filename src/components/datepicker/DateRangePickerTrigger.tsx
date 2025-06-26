import { type ReactNode } from "react";
import { type DateRange } from "react-day-picker";
import { Button } from "dgz-ui/button";
import { Calendar1 } from "lucide-react";
import { cn } from "dgz-ui";
import dayjs from "dayjs";

/**
 * Props for DateRangePickerTrigger component
 */
interface DateRangePickerTriggerProps {
  /**
   * Currently selected date range
   */
  date?: DateRange;
  /**
   * Format for displaying dates
   */
  format: string;
  /**
   * Placeholder text when no date is selected
   */
  placeholder?: string;
  /**
   * Additional class names
   */
  className?: string;
}

/**
 * Trigger button for the DateRangePicker
 */
export const DateRangePickerTrigger = ({
  date,
  format,
  placeholder,
  className,
}: DateRangePickerTriggerProps) => {
  /**
   * Renders the date display content
   */
  const renderDateContent = (): ReactNode => {
    if (date?.from) {
      if (date.to) {
        return (
          <>
            {dayjs(date.from).format(format)} - {dayjs(date.to).format(format)}
          </>
        );
      }
      return dayjs(date.from).format(format);
    }
    return <span className={"text-secondary"}>{placeholder}</span>;
  };

  return (
    <Button
      id="date"
      size={"sm"}
      variant={"secondary"}
      className={cn(
        "min-w-[170px] text-body-xs-regular justify-between",
        !date && "text-primary",
        className,
      )}
    >
      {renderDateContent()}
      <Calendar1 className={"text-secondary"} />
    </Button>
  );
};
