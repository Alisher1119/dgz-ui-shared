import { useQueryParams } from "./useQueryParams.ts";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { get } from "lodash";
import { useDateRangeStore } from "../stores";
import * as dayjs from "dayjs";

export const useDateRange = (key: string) => {
  const { params } = useQueryParams();
  const { storedRanges, setStoredRange } = useDateRangeStore();
  const [range, setRange] = useState<DateRange | undefined>();

  useEffect(() => {
    const start =
      (get(params, "start") as string) ||
      dayjs().subtract(2, "week").startOf("day");
    const end = (get(params, "end") as string) || dayjs().endOf("day");
    if (start && end) {
      setRange({
        from: dayjs(start).toDate(),
        to: dayjs(end).toDate(),
      });
    }
  }, [params]);

  useEffect(() => {
    let newStoredRanges = { ...storedRanges };
    if (range) {
      newStoredRanges = { ...newStoredRanges, [key]: range };
    } else if (Object.prototype.hasOwnProperty.call(newStoredRanges, key)) {
      delete newStoredRanges[key];
    }
    setStoredRange({ ...newStoredRanges });
  }, [range, JSON.stringify(storedRanges), key]);

  const handleRangeSelected = (selected?: DateRange) => {
    setRange(selected);
  };

  return {
    range,
    handleRangeSelected,
  };
};
