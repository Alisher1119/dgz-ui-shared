import {
  FormControl,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
} from 'dgz-ui/form';
import { cn } from 'dgz-ui/utils';
import { get } from 'lodash';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { DateRangePicker, type DateRangePickerProps } from '../datepicker';

/**
 * Props for the MyDateRangePicker component.
 * @template TFieldValues - The type of the form values.
 */
export type MyDateRangePickerProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    Omit<DateRangePickerProps, 'required'> & {
      required?: boolean;
    };

/**
 * MyDateRangePicker renders a date range selector integrated with react-hook-form.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the date range picker.
 * @param required - Whether the field is required.
 * @param rules - The `react-hook-form` validation rules.
 * @param format - The date format for display.
 * @param placeholder - The placeholder text when no date is selected.
 * @param props - DateRangePicker props and form item props.
 * @returns A date range picker integrated with react-hook-form.
 */
export const MyDateRangePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required,
  rules,
  placeholder,
  floatingError,
  ...props
}: MyDateRangePickerProps<TFieldValues>) => {
  return (
    (name && control && (
      <FormField<TFieldValues, FieldPath<TFieldValues>>
        control={control}
        name={name}
        rules={rules}
        render={({ field, formState }) => (
          <FormItem>
            {label && (
              <FormLabel className={'block'}>
                {label} {required && <span className={'text-red-600'}>*</span>}
              </FormLabel>
            )}
            <FormControl>
              <DateRangePicker
                {...props}
                error={`${get(formState.errors, name, '')}`}
                selected={field.value}
                onRangeSelected={field.onChange}
                placeholder={placeholder}
              />
            </FormControl>
            <FormMessage
              className={cn(floatingError && 'absolute -bottom-5')}
            />
          </FormItem>
        )}
      />
    )) ||
    null
  );
};
