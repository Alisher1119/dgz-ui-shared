import type { FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
  type InputProps,
} from 'dgz-ui/form';
import { DATE } from 'dgz-ui/calendar';
import { DateRangePicker } from '../datepicker';
import { get } from 'lodash';
import type { ButtonProps } from 'dgz-ui/button';

/**
 * Props for the MyDateRangePicker component.
 * @template TFieldValues - The type of the form values.
 */
export type MyDateRangePickerProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    ButtonProps &
    InputProps & {
      /** Date format string for display. */
      format?: string;
    };

/**
 * MyDateRangePicker renders a date range selector integrated with react-hook-form.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the date range picker.
 * @param helperText - Helper text to display below the date range picker.
 * @param required - Whether the field is required.
 * @param rules - The `react-hook-form` validation rules.
 * @param format - The date format for display.
 * @param placeholder - The placeholder text when no date is selected.
 * @param props - DateRangePicker props and form item props.
 */
export const MyDateRangePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  helperText,
  required,
  rules,
  format = DATE,
  placeholder,
  ...props
}: MyDateRangePickerProps<TFieldValues>) => {
  const labelElm = label && (
    <FormLabel className={'text-body-xs-medium my-3'}>
      {label} {required && <span className={'text-red-600'}>*</span>}
    </FormLabel>
  );

  return (
    (name && control && (
      <FormField<TFieldValues, FieldPath<TFieldValues>>
        control={control}
        name={name}
        rules={rules}
        render={({ field, formState }) => (
          <FormItem>
            {labelElm}
            <FormControl>
              <DateRangePicker
                {...props}
                error={`${get(formState.errors, name, '')}`}
                selected={field.value}
                onRangeSelected={field.onChange}
                format={format}
                placeholder={placeholder}
              />
            </FormControl>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <div className={'relative'}>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    )) ||
    null
  );
};
