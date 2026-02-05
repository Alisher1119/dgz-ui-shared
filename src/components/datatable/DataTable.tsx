import { RiArrowDownSLine, RiLayoutColumnLine } from '@remixicon/react';
import { Button } from 'dgz-ui/button';
import {
  type DropdownContainerProps,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'dgz-ui/dropdown';
import { cn } from 'dgz-ui/utils';
import { get, isEmpty } from 'lodash';
import { RefreshCw } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useColumns } from '../../hooks';
import type { ColumnType } from '../../types';
import { type ActionInterface, Actions, type ActionsProps } from '../actions';
import {
  ExportData,
  type ExportDataInterface,
  type ExportDataProps,
} from '../export';
import {
  type FilterInterface,
  FilterWrapper,
  type FilterWrapperProps,
  Search,
  type SearchProps,
} from '../filters';
import { Loader } from '../loader';
import { MyLimitSelect, MyPagination } from '../pagination';
import type { MyPaginationProps } from '../pagination/MyPagination.tsx';
import { MyTable, type MyTableProps } from './MyTable';

/**
 * Minimal pagination wrapper contract used by `DataTable`.
 *
 * Notes
 * - Only `page`, `limit`, and `totalPages` are required. Other fields are optional and
 *   may be provided by your API for convenience.
 * - The actual rows array can be stored in any key, controlled via `dataKey` prop
 *   (defaults to `"docs"`).
 */
export interface PaginationInterface<TData> {
  /** Array of rows for the current page. Used when `dataKey` is set to `"docs"`. */
  docs?: TData[];
  /** Zero-based index of the first item on the current page (if provided by API). */
  offset?: number;
  /** Page size (items per page). */
  limit: number;
  /** Total number of pages available. */
  totalPages: number;
  /** Total number of items across all pages (if available). */
  total?: number;
  /** Current page number (1-based). */
  page: number;
  /** Convenience counter for the first item index on the page (if provided). */
  pagingCounter?: number;
  /** Whether a previous page exists. */
  hasPrevPage?: boolean;
  /** Whether a next page exists. */
  hasNextPage?: boolean;
  /** Previous page number, if available. */
  prevPage?: number;
  /** Next page number, if available. */
  nextPage?: number;
}

/**
 * Props for the DataTable component.
 *
 * @template TData - Row data type.
 * @template TPaginationData - Pagination wrapper type.
 */
export interface DataTableProps<
  TData,
  TPaginationData extends PaginationInterface<TData>,
> extends Omit<MyTableProps<TData>, 'rows'> {
  /** Pagination data source. */
  dataSource?: TPaginationData;
  /** Callback for parameter changes (pagination, sorting, filtering). */
  onParamChange?: (param: Record<string, unknown>) => void;
  /** Whether to enable pagination. */
  hasPagination?: true;
  /** Options for the export data dropdown. */
  exportOptions?: ExportDataInterface[];
  /** Whether to enable search functionality. */
  hasSearch?: true;
  /** Whether the table data is loading. */
  loading?: boolean;
  /** Array of filters to display. */
  filters?: FilterInterface[];
  /** Array of actions to display. */
  actions?: ActionInterface[];
  /** Callback for filter changes. */
  handleFilterChange?: (filters: Record<string, unknown>) => void;
  /** Unique key for the table, used for column persistence. */
  tableKey: string;
  /** The key in dataSource where the data array is located. Defaults to "docs". */
  dataKey?: keyof TPaginationData;
  /** Whether to show the columns visibility dropdown. */
  hasColumnsVisibilityDropdown?: true;
  /** Callback when columns are updated (e.g., visibility toggled). */
  onColumnsUpdate?: (columns: ColumnType<TData>[]) => void;
  /** Whether the export action is loading. */
  exportLoading?: boolean;
  /** Props for the Actions component. */
  actionProps?: Partial<ActionsProps>;
  /** Props for the FilterWrapper component. */
  filterWrapperProps?: Partial<FilterWrapperProps>;
  /** Props for the ExportData component. */
  exportOptionsProps?: Partial<ExportDataProps>;
  searchProps?: Partial<SearchProps>;
  paginationProps?: Partial<MyPaginationProps>;
  /** Props for the columns visibility dropdown. */
  columnsVisibilityProps?: DropdownContainerProps & {
    title?: ReactNode;
    resetText?: ReactNode;
  };
}

/**
 * DataTable is a composable, high-level table that brings together search, filters,
 * column visibility management, header actions, exporting, and pagination.
 * It renders `MyTable` for rows and, when enabled, shows header controls and a footer with pagination.
 *
 * Generic Types
 * - `TData` — Row data shape (type of each item in the rows array).
 * - `TPaginationData` — Pagination wrapper type containing rows and pagination meta; defaults to
 *   `PaginationInterface<TData>`.
 *
 * Key Behaviors
 * - Emits `onParamChange` when search text, filters, page, limit, or sort order change.
 * - Persists column visibility per `tableKey` via `useColumns` and informs parent with `onColumnsUpdate`.
 * - Renders header controls only when the related feature is enabled/has content.
 *
 * Props Overview
 * - `dataSource` — Paginated data source object that contains rows (see `dataKey`) and pagination metadata.
 * - `columns` — Column definitions passed to `MyTable`.
 * - `onRowClick` — Callback when a row is clicked.
 * - `rowKey` — Property name used as a unique row key.
 * - `hasNumbers` — Whether to show the row numbers column.
 * - `hasSearch` — Set to `true` to display the search input in the header.
 * - `exportOptions` — Export menu options shown by `ExportData` (see `ExportDataInterface[]`).
 * - `exportLoading` — When `true`, shows a spinner in the Export button to indicate an export action is in progress.
 * - `hasCheckbox` — Whether to show the selection checkbox column.
 * - `hasPagination` — Set to `true` to render the pagination footer.
 * - `isStickyHeader` — Whether to keep the table header sticky.
 * - `onParamChange` — Emits parameter changes for pagination/sorting/search/filters.
 * - `dataKey` — Key within `dataSource` that contains the row array. Defaults to `"docs"`.
 * - `loading` — If `true`, shows a loading state instead of the table rows.
 * - `tableKey` — Unique key for persisting column visibility state.
 * - `filters` — Filter configurations to render in the header.
 * - `actions` — Header actions independent of selected rows.
 * - `handleFilterChange` — Callback executed when filter values change.
 * - `params` — Current list parameters (pagination, sort, search, filters).
 * - `hasColumnsVisibilityDropdown` — Set to `true` to show the columns customize dropdown.
 * - `onColumnsUpdate` — Notifies parent whenever the internal columns state changes (after formatting/visibility).
 * - `actionProps` — Props passed to the `Actions` component.
 * - `filterWrapperProps` — Props passed to the `FilterWrapper` component.
 * - `exportOptionsProps` — Props passed to the `ExportData` component.
 * - `columnsVisibilityProps` — Props passed to the columns visibility dropdown.
 * - `onSelectedItemsChange` — Callback when selected rows change (requires `hasCheckbox`).
 *
 * Accessibility
 * - Header controls and dropdowns reuse shared primitives that include keyboard and ARIA support.
 *
 * Internationalization
 * - Text such as "Export", "Customize columns", and "Reset columns" are resolved via `react-i18next`.
 *
 * Usage Examples
 * 1) Minimal paginated table (uses default `dataKey = "docs"`)
 * ```tsx
 * type User = { id: string; name: string };
 * const data = { docs: [{ id: '1', name: 'Ada' }], page: 1, limit: 10, totalPages: 1 };
 *
 * <DataTable<User>
 *   tableKey="users-table"
 *   columns={[{ key: 'name', name: 'Name' }]}
 *   rowKey="id"
 *   dataSource={data}
 *   hasPagination
 * />
 * ```
 *
 * 2) Custom `dataKey` and column visibility persistence
 * ```tsx
 * type Row = { id: number; title: string };
 * const payload = { items: [{ id: 1, title: 'Hello' }], page: 1, limit: 20, totalPages: 1 };
 *
 * <DataTable<Row>
 *   tableKey="posts"
 *   columns={[{ key: 'title', name: 'Title' }]}
 *   rowKey="id"
 *   dataSource={payload}
 *   dataKey="items"
 *   hasColumnsVisibilityDropdown
 * />
 * ```
 *
 * 3) Responding to user interactions via `onParamChange`
 * ```tsx
 * const [params, setParams] = useState({ page: 1, limit: 10 });
 *
 * <DataTable
 *   tableKey="logs"
 *   columns={[{ key: 'message', name: 'Message' }]}
 *   rowKey="id"
 *   params={params}
 *   onParamChange={setParams}
 *   hasSearch
 *   hasPagination
 * />
 * ```
 *
 * Notes and Best Practices
 * - Ensure `rowKey` points to a stable unique field in `TData` to avoid key collisions.
 * - When arrays like `exportOptions`, `filters`, or `actions` are empty, their sections are not rendered.
 * - Sorting emits `{ sortField, sortOrder }` through `onParamChange` when the user toggles a column sort.
 *
 * Returns
 * - React element that renders a complete data table experience.
 */
export const DataTable = <
  TData,
  TPaginationData extends PaginationInterface<TData> =
    PaginationInterface<TData>,
>({
  dataSource,
  columns,
  onRowClick,
  rowKey,
  hasNumbers,
  hasSearch,
  exportOptions,
  hasCheckbox,
  hasPagination,
  isStickyHeader,
  onParamChange,
  dataKey = 'docs',
  loading,
  tableKey,
  filters,
  actions,
  handleFilterChange,
  params,
  exportLoading = false,
  onColumnsUpdate,
  hasColumnsVisibilityDropdown,
  onSelectedItemsChange,
  actionProps,
  filterWrapperProps,
  exportOptionsProps,
  columnsVisibilityProps,
  paginationProps,
  searchProps,
  ...props
}: DataTableProps<TData, TPaginationData>) => {
  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useState<TData[keyof TData][]>([]);
  const { formattedColumns, handleColumnsChange, resetColumns } =
    useColumns<TData>({ key: tableKey, columns });

  useEffect(() => {
    onColumnsUpdate?.(formattedColumns);
  }, [formattedColumns, onColumnsUpdate]);

  useEffect(() => {
    onSelectedItemsChange?.(selectedRows);
  }, [selectedRows, onSelectedItemsChange]);

  return (
    <div
      className={
        'border-border-alpha-light flex grow flex-col overflow-auto rounded-xl border shadow-xs'
      }
    >
      {(hasSearch ||
        (hasColumnsVisibilityDropdown && tableKey) ||
        !isEmpty(exportOptions) ||
        !isEmpty(filters)) && (
        <div className="flex shrink-0 flex-col items-center justify-between gap-3 p-4 lg:flex-row">
          <div className={'w-full shrink'}>
            {hasSearch && (
              <Search
                {...searchProps}
                inputProps={{
                  ...searchProps?.inputProps,
                  className: cn('h-8', searchProps?.inputProps?.className),
                }}
                className={cn(
                  'max-w-64 [&_button]:-top-1',
                  searchProps?.className
                )}
                defaultValue={get(params, 'search', '') as string}
                onSearchChange={(search) =>
                  onParamChange?.({ ...params, search, page: 1 })
                }
              />
            )}
          </div>
          <div className={'flex shrink-0 items-center justify-end gap-3'}>
            {exportOptions && (
              <ExportData
                {...exportOptionsProps}
                options={exportOptions}
                loading={exportLoading}
              />
            )}
            {hasColumnsVisibilityDropdown && tableKey && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  {...columnsVisibilityProps?.triggerProps}
                >
                  <Button
                    variant="secondary"
                    size={'sm'}
                    className={'ml-auto rounded-lg px-3'}
                  >
                    {columnsVisibilityProps?.title || (
                      <>
                        <RiLayoutColumnLine />{' '}
                        <span className={'hidden lg:inline!'}>
                          {t('Customize columns')}
                        </span>
                        <RiArrowDownSLine />
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  {...columnsVisibilityProps?.contentProps}
                >
                  <DropdownMenuItem
                    className="capitalize"
                    onClick={resetColumns}
                  >
                    <RefreshCw />{' '}
                    {columnsVisibilityProps?.resetText || t('Reset columns')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {formattedColumns.map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.key}
                        className="capitalize"
                        checked={!column.hidden}
                        onCheckedChange={(value) =>
                          handleColumnsChange(column, !value)
                        }
                      >
                        {column.name}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {actions && <Actions {...actionProps} actions={actions} />}
            {filters && (
              <FilterWrapper
                {...filterWrapperProps}
                filters={filters}
                params={params}
                onChange={handleFilterChange}
                onFilter={(filter) => {
                  onParamChange?.({ ...params, ...filter, page: 1 });
                  handleFilterChange?.(filter);
                }}
              />
            )}
          </div>
        </div>
      )}
      <div className={'flex flex-col overflow-auto border-y'}>
        {!loading ? (
          <MyTable<TData>
            {...props}
            params={{
              page: dataSource?.page || 1,
              limit: dataSource?.limit,
              ...params,
            }}
            rows={get(dataSource, dataKey, []) as TData[]}
            rowKey={rowKey}
            selectedItems={selectedRows}
            isStickyHeader={isStickyHeader}
            columns={formattedColumns}
            hasCheckbox={hasCheckbox}
            hasNumbers={hasNumbers}
            onRowClick={onRowClick}
            onSelectedItemsChange={setSelectedRows}
            onSortOrderChange={({ sortField, sortOrder }) => {
              onParamChange?.({ ...params, sortField, sortOrder });
            }}
          />
        ) : (
          <Loader />
        )}
      </div>
      {hasPagination && (
        <div className="flex shrink-0 flex-col items-center justify-between gap-3 p-4 lg:flex-row">
          <div className="text-sm">
            <MyLimitSelect
              onLimitChange={(limit) =>
                onParamChange?.({ ...params, limit, page: 1 })
              }
              defaultValue={dataSource?.limit}
            />
          </div>
          <div className="text-muted-foreground text-sm">
            {t('{{selectedCount}} of {{total}} row(s) selected', {
              selectedCount: selectedRows.length,
              total: dataSource?.total || 0,
            })}
          </div>
          <div>
            <MyPagination
              {...paginationProps}
              onPageChange={(page) => onParamChange?.({ ...params, page })}
              currentPage={dataSource?.page}
              totalPages={dataSource?.totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
};
