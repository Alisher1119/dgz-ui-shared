import { useCallback, useEffect, useMemo } from 'react';
import { get, isEmpty, set } from 'lodash';
import type { ColumnType } from '../types';
import { useColumnsStore } from '../stores';

export interface UseColumnsProps<TData> {
  key: string;
  columns: ColumnType<TData>[];
}

/**
 * useColumns manages visibility of table columns using a persisted store.
 * Returns formatted columns and helpers to toggle/reset visibility.
 *
 * @template TData - Row data type.
 * @param props.key - Unique key for storing visibility per table.
 * @param props.columns - Original column definitions.
 */
export const useColumns = <TData>({
  key,
  columns = [],
}: UseColumnsProps<TData>) => {
  const { storedColumns, setColumns } = useColumnsStore();

  useEffect(() => {
    if (isEmpty(get(storedColumns, key)) && !isEmpty(columns)) {
      const columnsObj = {};
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

    return columns
      .filter((column) => column.type !== 'action')
      .map((column) => {
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
