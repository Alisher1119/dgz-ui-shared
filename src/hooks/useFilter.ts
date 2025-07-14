import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { entries } from 'lodash';

export interface UseFilterProps {
  params?: Record<string, unknown>;
}

export const useFilter = ({ params }: UseFilterProps) => {
  const form = useForm({ mode: 'onChange' });

  useEffect(() => {
    entries(params || {}).forEach(([key, value]) => {
      if (/[[\]]$/g.test(key) && !(value instanceof Array)) {
        form.setValue(key, [value]);
      } else {
        form.setValue(key, value);
      }
    });
  }, [params, form]);

  return {
    params,
    form,
  };
};
