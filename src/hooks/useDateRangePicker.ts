import { useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";

/**
 * Props for useDateRangePicker hook
 */
interface UseDateRangePickerProps {
  /**
   * Initially selected date range
   */
  selected?: DateRange;
  /**
   * Callback when a date range is selected
   */
  onRangeSelected?: (value?: DateRange) => void;
}

/**
 * Custom hook for managing date range picker state and logic
 */
export const useDateRangePicker = ({
  selected,
  onRangeSelected = () => {},
}: UseDateRangePickerProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();

  // Sync with external selected value
  useEffect(() => {
    setDate(selected);
  }, [selected]);

  /**
   * Handle date range selection
   */
  const handleRangeSelect = (range: DateRange) => {
    const { from, to } = range;
    setDate({ from, to });
    if (from && to) {
      onRangeSelected({ from, to });
      setOpen(false);
    }
  };

  /**
   * Handle from date selection
   */
  const handleFromDateSelect = (from: Date | undefined) => {
    setDate({ ...date, from });
  };

  /**
   * Handle to date selection
   */
  const handleToDateSelect = (to: Date | undefined) => {
    if (date) {
      handleRangeSelect({ ...date, to });
    }
  };

  return {
    open,
    setOpen,
    date,
    handleRangeSelect,
    handleFromDateSelect,
    handleToDateSelect,
  };
};
