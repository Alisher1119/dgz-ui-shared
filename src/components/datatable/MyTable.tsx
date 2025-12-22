import {
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpWideNarrow,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'dgz-ui/table';
import { get } from 'lodash';
import { useEffect } from 'react';
import type { ColumnType } from '../../types';
import { DEFAULT_LIMIT } from '../pagination/MyLimitSelect';
import { useDataTable, useSortable, type UseSortableProps } from '../../hooks';
import { Checkbox } from 'dgz-ui/form';
import { cn } from 'dgz-ui/utils';
import { SortOrder } from '../../enums';
import { Empty } from '../empty';

export interface MyTableProps<TData> {
  rows?: TData[];
  columns: ColumnType<TData>[];
  onRowClick?: (row: TData) => void;
  hasNumbers?: boolean;
  hasCheckbox?: boolean;
  rowKey: keyof TData;
  params?: Record<string, unknown>;
  total?: number;
  selectedItems?: TData[keyof TData][];
  onSelectedItemsChange?: (selectedItems: TData[keyof TData][]) => void;
  onSortOrderChange?: (
    params: Omit<UseSortableProps<TData>, 'onSortOrderChange'>
  ) => void;
  isStickyHeader?: true;
}

/**
 * MyTable renders a generic data table with optional numbering, selection checkboxes,
 * sortable columns and sticky header. It is a presentational component and delegates
 * sorting/selection state via hooks and callbacks.
 *
 * @template TData - The row data type.
 * @param props - Component props.
 * @returns React element containing the table.
 */
export const MyTable = <TData,>({
  rows = [],
  columns,
  onRowClick,
  rowKey,
  params = {
    page: 1,
    limit: DEFAULT_LIMIT,
  },
  hasNumbers = false,
  hasCheckbox = false,
  selectedItems,
  onSelectedItemsChange,
  onSortOrderChange,
  isStickyHeader,
}: MyTableProps<TData>) => {
  const { sortObject, handleSort } = useSortable<TData>({
    sortField: params?.sortField as keyof TData | undefined,
    sortOrder: params?.sortOrder as SortOrder | undefined,
    onSortOrderChange,
  });
  const {
    selectedRows,
    isRowSelected,
    isAllRowsSelected,
    handleSelectAllRows,
    handleSelectRow,
  } = useDataTable<TData>({ rows, defaultSelectedRows: selectedItems });

  useEffect(() => {
    if (JSON.stringify(selectedItems) !== JSON.stringify(selectedRows)) {
      onSelectedItemsChange?.(selectedRows);
    }
  }, [selectedRows, selectedItems, onSelectedItemsChange]);

  return (
    <Table className={'relative'}>
      <TableHeader
        className={cn('bg-bg', isStickyHeader && 'sticky top-0 z-10')}
      >
        <TableRow>
          {hasCheckbox && (
            <TableHead className={'w-12 p-3'}>
              <Checkbox
                className={'mt-1'}
                checked={isAllRowsSelected(rowKey)}
                onCheckedChange={(value) =>
                  handleSelectAllRows(rowKey, !!value)
                }
                aria-label="Select all"
              />
            </TableHead>
          )}
          {hasNumbers && <TableHead className={'w-12 p-2'}>#</TableHead>}
          {columns
            .filter((column) => !column.hidden)
            .map((column) => (
              <TableHead
                key={column.key}
                style={column.styles}
                className={cn('p-2', column.sortable && 'cursor-pointer')}
                onClick={() => column.sortable && handleSort(column.dataIndex)}
              >
                <div className={'flex items-center gap-2'}>
                  {column.name}{' '}
                  {column.sortable &&
                    (sortObject?.sortField === column.key ? (
                      <>
                        {sortObject?.sortOrder === SortOrder.DESC && (
                          <ArrowDownWideNarrow size={15} />
                        )}
                        {sortObject?.sortOrder === SortOrder.ASC && (
                          <ArrowUpWideNarrow size={15} />
                        )}
                      </>
                    ) : (
                      <ArrowUpDown size={15} />
                    ))}
                </div>
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody className={'[&>tr:nth-child(even)]:bg-bg-secondary'}>
        {rows.length ? (
          rows.map((row, index) => (
            <TableRow
              key={`${row[rowKey]}`}
              onClick={() => onRowClick?.(row)}
              className={cn(onRowClick && 'cursor-pointer')}
              data-state={isRowSelected(row[rowKey]) && 'selected'}
            >
              {hasCheckbox && (
                <TableCell
                  className={'w-12 p-3'}
                  onClick={(evt) => evt.stopPropagation()}
                >
                  <Checkbox
                    className={'mt-1'}
                    checked={isRowSelected(row[rowKey])}
                    onCheckedChange={(value) =>
                      handleSelectRow(row[rowKey], !!value)
                    }
                    aria-label="Select row"
                  />
                </TableCell>
              )}
              {hasNumbers && (
                <TableCell className={'w-12 p-2'}>
                  {((params.page as number) - 1) *
                    ((params.limit || DEFAULT_LIMIT) as number) +
                    index +
                    1}
                </TableCell>
              )}
              {columns
                .filter((column) => !column.hidden)
                .map((column) => (
                  <TableCell
                    className={'text-body-xs-medium max-w-xs p-2'}
                    style={column.styles}
                    key={`${index}-${column.key}`}
                  >
                    {column.render
                      ? column.render(get(row, column.dataIndex), row)
                      : get(row, column.dataIndex, '')}
                  </TableCell>
                ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={
                hasNumbers
                  ? hasCheckbox
                    ? columns.length + 2
                    : columns.length + 1
                  : columns.length
              }
            >
              <Empty />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
