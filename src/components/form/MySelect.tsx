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
import { cn } from 'dgz-ui/utils';

/**
 * Props for the MySelect component.
 * @template TFieldValues - The type of the form values.
 */
export type MySelectProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    ReactSelectProps & {
      /** Optional callback for change events. */
      onChange?: (value: unknown) => void;
    };

/**
 * MySelect wraps a ReactSelect with react-hook-form support.
 * Can also be used standalone when no control/name are provided.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the select.
 * @param helperText - Helper text to display below the select.
 * @param required - Whether the field is required.
 * @param className - Custom CSS class name.
 * @param rules - The `react-hook-form` validation rules.
 * @param options - The options to display in the select.
 * @param onChange - Optional callback for change events.
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
    <FormLabel>
      {label} {required && <span className={'text-red-600'}>*</span>}
    </FormLabel>
  );

  return (
    (name && control && (
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
              {helperText && <FormDescription>{helperText}</FormDescription>}
              <FormMessage />
            </FormItem>
          );
        }}
      />
    )) ||
    null
  );
};
