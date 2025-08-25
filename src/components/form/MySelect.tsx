import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
  ReactSelect,
  type ReactSelectProps,
} from 'dgz-ui/form';
import { get } from 'lodash';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { cn } from 'dgz-ui';

export type MySelectProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    ReactSelectProps & {
      onChange?: (value: unknown) => void;
    };

/**
 * MySelect wraps a ReactSelect with react-hook-form support.
 * Can also be used standalone when no control/name are provided.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param props - Select and form item props.
 */
export const MySelect = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  helperText,
  required,
  className,
  rules,
  options = [],
  onChange,
  ...props
}: MySelectProps<TFieldValues>) => {
  const labelElm = label && (
    <FormLabel className={'my-3'}>
      {label} {required && <span className={'text-red-600'}>*</span>}
    </FormLabel>
  );

  if (!name || !control) {
    return (
      <>
        {labelElm}
        <ReactSelect
          className={cn('mt-2', className)}
          {...props}
          options={options}
        />
        <FormDescription>{helperText}</FormDescription>
      </>
    );
  }

  return (
    <FormField<TFieldValues, FieldPath<TFieldValues>>
      control={control}
      name={name}
      rules={rules}
      render={({ field, formState }) => {
        const handleChange = (value: unknown) => {
          field.onChange(value);
          if (onChange) {
            onChange(value);
          }
        };

        return (
          <FormItem>
            {labelElm}
            <FormControl>
              <ReactSelect
                className={cn('mt-2', className)}
                {...props}
                {...field}
                onChange={handleChange}
                options={options}
                error={!!get(formState.errors, `${name}`)}
              />
            </FormControl>
            <FormDescription>{helperText}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
