import { memo, type ReactNode, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import type { FieldValues } from "react-hook-form";
import { ChevronDown, ListFilterIcon, ListFilterPlusIcon } from "lucide-react";
import { Button, type ButtonProps } from "dgz-ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "dgz-ui/popover";
import { Form, type Option } from "dgz-ui/form";
import { MyInput, MySelect } from "../form";
import { useFilter } from "../../hooks";

export interface FilterInterface {
  label?: ReactNode;
  placeholder?: string;
  value?: string | string[];
  name: string;
  isMulti?: boolean;
  options?: Option[];
}

export interface FilterWrapperProps extends ButtonProps {
  filters: FilterInterface[];
  params?: Record<string, unknown>;
  onFilter?: (filters: Record<string, unknown>) => void;
  onCancel?: () => void;
  onChange?: (filters: FieldValues) => void;
}

export const FilterWrapper = memo(function FilterWrapper({
  filters,
  params,
  onFilter,
  onChange,
  onCancel,
  ...btnProps
}: FilterWrapperProps) {
  const { t } = useTranslation();
  const [isFiltered, setIsFiltered] = useState(false);
  const [open, setOpen] = useState(false);
  const { form } = useFilter({ params });

  const { watch, getValues, handleSubmit, control, reset } = form;

  useEffect(() => {
    let hasFilter = false;
    filters.map((filter) => {
      const value = get(params, `${filter.name}`);
      if (Array.isArray(value) ? value.length > 0 : Boolean(value)) {
        hasFilter = true;
      }

      setIsFiltered(hasFilter);
    });
  }, [filters, params]);

  useEffect(() => {
    if (onChange) {
      onChange(getValues());
    }
  }, [watch()]);

  const handleFilter = useCallback(
    (data = {}) => {
      if (onFilter) {
        onFilter(data);
      }
      setOpen(false);
    },
    [onFilter],
  );

  const handleReset = useCallback(() => {
    reset();
    if (onFilter && params) {
      onFilter({
        ...params,
        ...Object.fromEntries(
          filters.map((filter) => [filter.name, undefined]),
        ),
      });
    }
    setOpen(false);
  }, [onFilter, reset, params, filters]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          asChild
          size={"sm"}
          variant="secondary"
          className={"ml-auto px-3"}
          {...btnProps}
        >
          <div className={"flex items-center"}>
            {isFiltered ? (
              <ListFilterPlusIcon size={20} />
            ) : (
              <ListFilterIcon size={20} />
            )}{" "}
            <span className={"hidden md:inline"}>{t("Filter")}</span>
            <ChevronDown />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent side={"bottom"} align={"end"} className={""}>
        <Form {...form}>
          <form onSubmit={handleSubmit(handleFilter)} className={"space-y-2"}>
            <div className={"h-full shrink overflow-y-auto p-1"}>
              {filters.map((filter) =>
                filter.options ? (
                  <MySelect
                    key={filter.name}
                    control={control}
                    name={filter.name}
                    placeholder={filter.placeholder}
                    isMulti={filter.isMulti}
                    options={filter.options}
                    label={filter.label}
                  />
                ) : (
                  <MyInput
                    key={filter.name}
                    control={control}
                    placeholder={filter.placeholder}
                    name={filter.name}
                    label={filter.label}
                  />
                ),
              )}
            </div>
            <div className={"flex shrink-0 justify-end gap-2"}>
              <Button
                variant={"destructive"}
                type="reset"
                size={"sm"}
                onClick={handleReset}
              >
                {t("Reset")}
              </Button>
              <Button type="submit" size={"sm"}>
                {t("Apply")}
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
});
