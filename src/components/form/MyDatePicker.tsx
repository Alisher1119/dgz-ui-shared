import dayjs from 'dayjs';
import { Calendar, type CalendarProps, DATE } from 'dgz-ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
  Input,
  type InputProps,
} from 'dgz-ui/form';
import { Popover, PopoverContent, PopoverTrigger } from 'dgz-ui/popover';
import { cn } from 'dgz-ui/utils';
import { get } from 'lodash';
import { CalendarIcon } from 'lucide-react';
import type { FieldPath, FieldValues } from 'react-hook-form';

/**
 * Props for the MyDatePicker component.
 * @template TFieldValues - The type of the form values.
 */
export type MyDatePickerProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    Omit<CalendarProps, 'mode' | 'disabled'> & {
      /** Date format string for display. */
      format?: string;
      inputProps?: Omit<InputProps, 'onSelect'>;
      placeholder?: string;
      disabled?: boolean;
    };

/**
 * MyDatePicker shows a calendar popover to pick a single date, integrated with react-hook-form.
 * Can also be used standalone when no control/name are provided.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the date picker.
 * @param required - Whether the field is required.
 * @param rules - The `react-hook-form` validation rules.
 * @param format - The date format for display.
 * @param placeholder - The placeholder text when no date selected.
 * @param floatingError - Whether to show the error message in a floating container.
 * @param register - The `react-hook-form` register function.
 * @param disabled - Whether the date picker is disabled.
 * @param inputProps - Props passed to the underlying Input component.
 * @param props - Calendar, button and form item props.
 * @returns A date picker component integrated with react-hook-form.
 */
export const MyDatePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required,
  rules,
  format = DATE,
  floatingError,
  placeholder,
  disabled,
  register,
  className,
  inputProps,
  ...props
}: MyDatePickerProps<TFieldValues>) => {
  return (
    (name && control && (
      <FormField<TFieldValues, FieldPath<TFieldValues>>
        control={control}
        name={name}
        rules={rules}
        render={({ field, formState }) => (
          <FormItem className={cn(floatingError && 'space-y-0')}>
            {label && (
              <FormLabel className={'block'}>
                {label} {required && <span className={'text-red-600'}>*</span>}
              </FormLabel>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Input
                    {...inputProps}
                    variant={
                      get(formState.errors, `${name}.message`)
                        ? 'failure'
                        : 'default'
                    }
                    disabled={disabled}
                    {...field}
                    readOnly
                    placeholder={placeholder || 'Pick a date'}
                    value={dayjs(field.value).format(format)}
                    className={cn('m-0 text-start', className)}
                  />
                  <Input
                    {...inputProps}
                    readOnly
                    variant={
                      get(formState.errors, `${name}.message`)
                        ? 'failure'
                        : 'default'
                    }
                  >
                    {field.value
                      ? dayjs(field.value).format(format)
                      : placeholder
                        ? placeholder
                        : 'Pick a date'}
                    <CalendarIcon className="ml-auto size-4" />
                  </Input>
                </FormControl>
              </PopoverTrigger>
              {!disabled && (
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    {...props}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              )}
            </Popover>
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
