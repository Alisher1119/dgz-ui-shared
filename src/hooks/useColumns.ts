import { useCallback, useEffect, useMemo } from 'react';
import { get, isEmpty, set } from 'lodash';
import type { ColumnType } from '../types';
import { useColumnsStore } from '../stores';

export interface UseColumnsProps<TData> {
  key: string;
  columns: ColumnType<TData>[];
}

export const useColumns = <TData>({
  key,
  columns = [],
}: UseColumnsProps<TData>) => {
  const { storedColumns, setColumns } = useColumnsStore();

  useEffect(() => {
    if (isEmpty(get(storedColumns, key))) {
      const columnsObj = get(storedColumns, key, {});
      columns.forEach((column) => {
        set(columnsObj, column.key, !!column.hidden);
      });
      setColumns({
        ...storedColumns,
        [key]: columnsObj,
      });
    }
  }, [key, columns, storedColumns, setColumns]);

  const formattedColumns = useMemo(() => {
    const columnsObj = get(storedColumns, key, {});

    return columns.map((column) => {
      const { hidden, ...rest } = column;
      return {
        ...rest,
        hidden: get(columnsObj, column.key, !!hidden),
      };
    });
  }, [key, storedColumns, columns]);

  const handleColumnsChange = useCallback(
    (column: ColumnType<TData>, value: boolean) => {
      const columnsObj = get(storedColumns, key, {});
      set(columnsObj, column.key, value);

      setColumns({
        ...storedColumns,
        [key]: columnsObj,
      });
    },
    [key, setColumns, storedColumns]
  );

  const resetColumns = useCallback(() => {
    const columnsObj: Record<string, boolean> = {};
    columns.forEach((column) => {
      set(columnsObj, column.key, !!column.hidden);
    });

    setColumns({
      ...storedColumns,
      [key]: columnsObj,
    });
  }, [key, setColumns, storedColumns, columns]);

  return {
    formattedColumns,
    handleColumnsChange,
    resetColumns,
  };
};
