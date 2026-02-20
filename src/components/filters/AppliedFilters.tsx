import { ButtonGroup } from 'dgz-ui';
import { Button } from 'dgz-ui/button';
import type { CardProps } from 'dgz-ui/card';
import { cn } from 'dgz-ui/utils';
import { isEmpty, omit } from 'lodash';
import { XIcon } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { FilterInterface } from './FilterWrapper.tsx';

/**
 * Props for the FilterWrapper component.
 */
export interface AppliedFiltersProps extends CardProps {
  /** Array of filter definitions to render. */
  filters?: FilterInterface[];
  /** Current active parameters/filters. */
  params?: Record<string, unknown>;
  /** Callback fired when filters are applied. */
  onFilter?: (filters: Record<string, unknown>) => void;
}

/**
 * FilterWrapper shows a popover with a dynamic list of field filters and emits selected filter values.
 *
 * @param props.filters - Array of filter definitions to render.
 * @param props.params - Current params used to detect active filters.
 * @param props.onFilter - Callback fired when user applies filters.
 * @param props.onCancel - Callback fired on cancel.
 * @param props.onChange - Callback fired whenever filter form values change.
 */
export const AppliedFilters = memo(function FilterWrapper({
  filters,
  params,
  onFilter,
  className,
  ...props
}: AppliedFiltersProps) {
  const { t } = useTranslation();

  const filterObject = useMemo(
    () =>
      Object.fromEntries(
        filters?.map((filter) => [
          filter.name,
          Object.fromEntries(
            filter.options?.map(({ label, value }) => [value, label]) || []
          ),
        ]) || []
      ),
    [filters]
  );

  const paramsArr = useMemo(
    () =>
      Object.entries(params || {}).filter(
        ([key, value]) => !!filterObject?.[key] && !isEmpty(value)
      ),
    [filterObject, params]
  );

  return (
    !isEmpty(paramsArr) && (
      <div {...props} className={cn('flex flex-wrap gap-2', className)}>
        {paramsArr.map(([key, value]) =>
          Array.isArray(value) ? (
            <ButtonGroup key={key}>
              {value
                .filter((val) => filterObject?.[key]?.[val] && val)
                .map((val, index) => (
                  <Button
                    size={'sm'}
                    key={index}
                    onClick={() => {
                      onFilter?.({
                        ...params,
                        [key]: value.filter((v) => v !== val),
                      });
                    }}
                  >
                    {t(String(filterObject?.[key]?.[val] || ''))} <XIcon />
                  </Button>
                ))}
            </ButtonGroup>
          ) : (
            <Button
              size={'sm'}
              onClick={() => {
                onFilter?.(omit(params, key));
              }}
            >
              {t(String(filterObject?.[key]?.[value as string] || ''))}{' '}
              <XIcon />
            </Button>
          )
        )}
      </div>
    )
  );
});
