import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isNil } from 'lodash';

type UseQueryParamsProps = {
  dateRangeKey?: string;
  excludeParams?: string[];
};

export const useQueryParams = (props?: UseQueryParamsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const excludeParams = useMemo(
    () => props?.excludeParams || [],
    [props?.excludeParams]
  );

  const params = useMemo(() => {
    const parsedParams: Record<string, string | string[]> = {};

    searchParams.forEach((value, key) => {
      if (!excludeParams.includes(key)) {
        const values = searchParams.getAll(key);
        parsedParams[key] = values.length > 1 ? values : value;
      }
    });

    return parsedParams;
  }, [searchParams, excludeParams]);

  const handleSetParams = useCallback(
    (data: Record<string, unknown>) => {
      const newParams = new URLSearchParams();

      Object.entries(data).forEach(([key, value]) => {
        if (isNil(value)) {
          newParams.delete(key);
        } else if (Array.isArray(value)) {
          value.forEach((v) => newParams.append(key, String(v)));
        } else {
          newParams.set(key, String(value));
        }
      });

      setSearchParams(newParams, { replace: true });
    },
    [setSearchParams]
  );

  return {
    params,
    handleSetParams,
  };
};
