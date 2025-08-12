import { RefreshCw } from 'lucide-react';
import { Button } from 'dgz-ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'dgz-ui/dropdown';
import { MyLimitSelect, MyPagination } from '../pagination';
import { useTranslation } from 'react-i18next';
import { RiArrowDownSLine, RiLayoutColumnLine } from '@remixicon/react';
import { useState } from 'react';
import { get, isEmpty } from 'lodash';
import { MyTable, type MyTableProps } from './MyTable';
import { useColumns } from '../../hooks';
import { type FilterInterface, FilterWrapper, Search } from '../filters';
import { Loader } from '../loader';
import { type ActionInterface, Actions } from '../actions';

export interface PaginationInterface<TData> {
  docs?: TData[];
  offset?: number;
  limit: number;
  totalPages: number;
  total?: number;
  page: number;
  pagingCounter?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: number;
  nextPage?: number;
}

export interface DataTableProps<
  TData,
  TPaginationData extends PaginationInterface<TData>,
> extends Omit<MyTableProps<TData>, 'rows'> {
  dataSource?: TPaginationData;
  onParamChange?: (param: Record<string, unknown>) => void;
  hasPagination?: true;
  hasSearch?: true;
  loading?: boolean;
  filters?: FilterInterface[];
  actions?: ActionInterface[];
  handleFilterChange?: (filters: Record<string, unknown>) => void;
  tableKey: string;
  dataKey?: keyof TPaginationData;
  hasColumnsVisibilityDropdown?: true;
}

export const DataTable = <
  TData,
  TPaginationData extends
    PaginationInterface<TData> = PaginationInterface<TData>,
>({
  dataSource,
  columns,
  onRowClick,
  rowKey,
  hasNumbers,
  hasSearch,
  hasCheckbox,
  hasPagination,
  isStickyHeader,
  onParamChange,
  dataKey = 'docs',
  loading,
  tableKey,
  filters = [],
  actions = [],
  handleFilterChange,
  params,
  hasColumnsVisibilityDropdown,
}: DataTableProps<TData, TPaginationData>) => {
  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useState<TData[keyof TData][]>([]);
  const { formattedColumns, handleColumnsChange, resetColumns } =
    useColumns<TData>({ key: tableKey, columns });

  return (
    <div
      className={
        'border-border-alpha-light flex grow flex-col overflow-auto rounded-xl border shadow-xs'
      }
    >
      {(hasSearch ||
        (hasColumnsVisibilityDropdown && tableKey) ||
        !isEmpty(filters)) && (
        <div className="flex shrink-0 flex-col items-center justify-between gap-3 p-4 lg:flex-row">
          <div className={'w-full shrink'}>
            {hasSearch && (
              <Search
                defaultValue={get(params, 'search', '') as string}
                onSearchChange={(search) =>
                  onParamChange?.({ ...params, search, page: 1 })
                }
              />
            )}
          </div>
          <div className={'flex shrink-0 items-center justify-end gap-3'}>
            {hasColumnsVisibilityDropdown && tableKey && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size={'sm'}
                    className={'ml-auto rounded-lg px-3'}
                  >
                    <RiLayoutColumnLine />{' '}
                    <span className={'hidden lg:!inline'}>
                      {t('Customize columns')}
                    </span>
                    <RiArrowDownSLine />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="capitalize"
                    onClick={resetColumns}
                  >
                    <RefreshCw /> {t('Reset columns')}
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
            {!isEmpty(actions) && <Actions actions={actions} />}
            {!isEmpty(filters) && (
              <FilterWrapper
                filters={filters}
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
            params={params}
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
            {selectedRows.length} of {dataSource?.total || 0} row(s) selected.
          </div>
          <div>
            <MyPagination
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
