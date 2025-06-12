import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { DateRange } from "react-day-picker";

export type DateRangeStoreState = {
  storedRanges: Record<string, DateRange>;
  setStoredRange: (storedRanges: DateRangeStoreState["storedRanges"]) => void;
};

export const useDateRangeStore = create<DateRangeStoreState>()(
  persist(
    (set) => ({
      setStoredRange: (storedRanges) => {
        set({ storedRanges });
      },
      storedRanges: {},
    }),
    {
      name: "dateRangesStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
