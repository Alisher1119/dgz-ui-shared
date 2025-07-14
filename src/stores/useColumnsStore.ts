import { persist } from 'zustand/middleware';
import { create } from 'zustand';

export type ColumnsStoreState = {
  storedColumns: Record<string, Record<string, boolean>>;
  setColumns: (storedColumns: ColumnsStoreState['storedColumns']) => void;
};
export const useColumnsStore = create<ColumnsStoreState>()(
  persist(
    (set) => ({
      setColumns: (storedColumns) => {
        set({ storedColumns });
      },
      storedColumns: {},
    }),
    {
      name: 'columnsStore',
    }
  )
);
