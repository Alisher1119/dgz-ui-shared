import { RefreshCw } from "lucide-react";
import { Button } from "dgz-ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "dgz-ui/dropdown";
import { MyLimitSelect, MyPagination } from "../pagination";
import { useTranslation } from "react-i18next";
import { RiArrowDownSLine, RiLayoutColumnLine } from "@remixicon/react";
import { useState } from "react";
import { get, isEmpty } from "lodash";
import { MyTable, type MyTableProps } from "./MyTable";
import { useColumns } from "../../hooks";
import { type FilterInterface, FilterWrapper, Search } from "../filters";

export interface PaginationInterface<TData> {
  docs: TData[];
  total: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
}

export interface DataTableProps<TData>
  extends Omit<MyTableProps<TData>, "rows"> {
  dataSource?: PaginationInterface<TData>;
  onParamChange?: (param: Record<string, unknown>) => void;
  hasPagination?: boolean;
  hasSearch?: boolean;
  filters?: FilterInterface[];
  handleFilterChange?: (filters: Record<string, unknown>) => void;
  tableKey: string;
  hasColumnsVisibilityDropdown?: boolean;
}

export const DataTable = <TData,>({
  dataSource,
  columns,
  onRowClick,
  rowKey,
  hasNumbers = false,
  hasSearch = false,
  hasCheckbox = false,
  hasPagination = false,
  onParamChange,
  tableKey,
  filters = [],
  handleFilterChange,
  params,
  hasColumnsVisibilityDropdown = false,
}: DataTableProps<TData>) => {
  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useState<TData[keyof TData][]>([]);
  const { formattedColumns, handleColumnsChange, resetColumns } =
    useColumns<TData>({ key: tableKey, columns });

  return (
    <div
      className={
        "border border-border-light overflow-hidden rounded-xl w-full shadow-xs !max-h-[calc(100vh-var(--spacing)*24)] flex flex-col"
      }
    >
      {(hasSearch ||
        (hasColumnsVisibilityDropdown && tableKey) ||
        !isEmpty(filters)) && (
        <div className="flex items-center justify-between p-4 gap-3 shrink-0">
          <div className={"shrink w-full"}>
            {hasSearch && (
              <Search
                defaultValue={get(params, "search", "") as string}
                onSearchChange={(search) => ({ ...params, search, page: 1 })}
              />
            )}
          </div>
          <div className={"flex shrink-0 items-center justify-end gap-3"}>
            {hasColumnsVisibilityDropdown && tableKey && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size={"sm"}
                    className={"ml-auto px-3 rounded-lg"}
                  >
                    <RiLayoutColumnLine />{" "}
                    <span className={"hidden md:inline"}>
                      {t("Customize columns")}
                    </span>
                    <RiArrowDownSLine />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="capitalize"
                    onClick={resetColumns}
                  >
                    <RefreshCw /> {t("Reset columns")}
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
            {!isEmpty(filters) && (
              <FilterWrapper filters={filters} onFilter={handleFilterChange} />
            )}
          </div>
        </div>
      )}
      <MyTable
        params={params}
        rows={dataSource?.docs}
        rowKey={rowKey}
        columns={formattedColumns}
        hasCheckbox={hasCheckbox}
        hasNumbers={hasNumbers}
        onRowClick={onRowClick}
        onSelectedItemsChange={setSelectedRows}
        onSortOrderChange={({ sortField, sortOrder }) => {
          if (onParamChange) {
            onParamChange({ ...params, sortField, sortOrder });
          }
        }}
      />
      {hasPagination && (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 p-4 shrink-0">
          <div className="text-sm">
            <MyLimitSelect
              onLimitChange={(limit) => {
                if (onParamChange) {
                  onParamChange({ ...params, limit, page: 1 });
                }
              }}
              defaultValue={dataSource?.limit}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {selectedRows.length} of {dataSource?.total || 0} row(s) selected.
          </div>
          <div>
            <MyPagination
              onPageChange={(page) => {
                if (onParamChange) {
                  onParamChange({ ...params, page });
                }
              }}
              currentPage={dataSource?.page}
              totalPages={dataSource?.totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
};
