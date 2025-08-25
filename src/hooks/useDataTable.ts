import { useCallback, useEffect, useState } from 'react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { isEqual } from 'lodash';

export interface UseDataTableProps<TData> {
  rows?: TData[];
  defaultSelectedRows?: TData[keyof TData][];
}

/**
 * useDataTable manages row selection state for data tables.
 * Provides helpers to select all on current page, select one, and query selection.
 *
 * @template TData - Row data type.
 * @param props.rows - Current rows rendered on the page.
 * @param props.defaultSelectedRows - Pre-selected row keys.
 */
export const useDataTable = <TData>({
  rows = [],
  defaultSelectedRows = [],
}: UseDataTableProps<TData>) => {
  const [selectedRows, setSelectedRows] = useState<TData[keyof TData][]>([]);

  const handleSelectAllRows = useCallback(
    (rowKey: keyof TData, checked: boolean) => {
      setSelectedRows((oldSelectedRows) => {
        const currentPageRowKeys = rows.map((item) => item[rowKey]) || [];
        const otherPagesSelected = oldSelectedRows.filter(
          (key) => !currentPageRowKeys.includes(key)
        );

        if (checked) {
          return [...otherPagesSelected, ...currentPageRowKeys];
        } else {
          return otherPagesSelected;
        }
      });
    },
    [rows]
  );

  useEffect(() => {
    if (defaultSelectedRows) {
      setSelectedRows((prevSelectedRows) =>
        isEqual(prevSelectedRows, defaultSelectedRows)
          ? prevSelectedRows
          : defaultSelectedRows
      );
    }
  }, [defaultSelectedRows]);

  const handleSelectRow = useCallback(
    (key: TData[keyof TData], checked: boolean) => {
      setSelectedRows((oldSelectedRows) => {
        if (checked) {
          return [...oldSelectedRows, key];
        } else {
          return oldSelectedRows.filter((rowKey) => rowKey !== key);
        }
      });
    },
    []
  );

  const isRowSelected = useCallback(
    (key: TData[keyof TData]) => {
      return selectedRows.includes(key);
    },
    [selectedRows]
  );

  const isAllRowsSelected = useCallback(
    (rowKey: keyof TData): CheckedState => {
      const currentPageRowKeys = rows.map((item) => item[rowKey]) || [];
      let selectedRowsCountInPage = 0;
      for (const key of currentPageRowKeys) {
        if (selectedRows.includes(key)) {
          selectedRowsCountInPage++;
        }
      }
      return currentPageRowKeys.length === selectedRowsCountInPage
        ? true
        : selectedRowsCountInPage
          ? 'indeterminate'
          : false;
    },
    [selectedRows, rows]
  );

  return {
    selectedRows,
    isRowSelected,
    isAllRowsSelected,
    handleSelectAllRows,
    handleSelectRow,
  };
};
