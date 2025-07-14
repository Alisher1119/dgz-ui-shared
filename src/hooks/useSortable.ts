import { useCallback, useEffect, useState } from 'react';
import { SortOrder } from '../enums';

export interface UseSortableProps<TData> {
  sortField?: keyof TData;
  sortOrder?: SortOrder;
  onSortOrderChange?: (
    newSortOrder: Omit<UseSortableProps<TData>, 'onSortOrderChange'>
  ) => void;
}

export const useSortable = <TData>({
  sortField,
  sortOrder,
  onSortOrderChange,
}: UseSortableProps<TData>) => {
  const [sortObject, setSortObject] = useState<{
    sortField?: keyof TData;
    sortOrder?: SortOrder;
  }>();

  useEffect(() => {
    if (sortField) {
      setSortObject((prevState) =>
        prevState?.sortField === sortOrder && prevState?.sortOrder === sortOrder
          ? prevState
          : {
              sortField,
              sortOrder: sortOrder || undefined,
            }
      );
    }
  }, [sortField, sortOrder]);

  const handleSort = useCallback(
    (field: keyof TData) => {
      setSortObject((prev) => {
        const isSameField = prev?.sortField === field;
        const newSortOrder = isSameField
          ? prev?.sortOrder === SortOrder.ASC
            ? SortOrder.DESC
            : undefined
          : SortOrder.ASC;

        const newSortObject = {
          sortField: newSortOrder ? field : undefined,
          sortOrder: newSortOrder,
        };

        if (onSortOrderChange) {
          onSortOrderChange(newSortObject);
        }
        return newSortObject;
      });
    },
    [onSortOrderChange]
  );

  return {
    sortObject,
    handleSort,
  };
};
