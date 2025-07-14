import { useDateRange } from '../../hooks';
import { DateRangePicker } from '../datepicker';

export const DEFAULT_DATE_RANGE_KEY = 'date';
export type DateRangePickerProps = {
  dateKey?: string;
};

export const DateRangeFilter = ({
  dateKey = DEFAULT_DATE_RANGE_KEY,
}: DateRangePickerProps) => {
  const { range, handleRangeSelected } = useDateRange(dateKey);
  return (
    <DateRangePicker selected={range} onRangeSelected={handleRangeSelected} />
  );
};
