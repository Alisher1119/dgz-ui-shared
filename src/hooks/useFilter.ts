import { entries } from 'lodash';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

/**
 * Props for the useFilter hook.
 */
export interface UseFilterProps {
  /** Initial filter parameters. */
  params?: Record<string, unknown>;
}

/**
 * useFilter syncs URL parameters or object params with a react-hook-form instance.
 * Useful for initializing filter forms with data from URL or state.
 *
 * @param props.params - Key-value pairs to set as form values.
 * @returns Object containing the passed params and the form instance.
 */
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
