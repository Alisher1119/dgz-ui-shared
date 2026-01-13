import type { FieldPath, FieldValues } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { get } from 'lodash';
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
import { Popover, PopoverContent, PopoverTrigger } from 'dgz-ui/popover';
import { Button } from 'dgz-ui/button';
import { Calendar, type CalendarProps, DATE } from 'dgz-ui/calendar';
import dayjs from 'dayjs';
import { cn } from 'dgz-ui/utils';

/**
 * Props for the MyDatePicker component.
 * @template TFieldValues - The type of the form values.
 */
export type MyDatePickerProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    Omit<InputProps, 'onSelect'> &
    Omit<CalendarProps, 'mode'> & {
      /** Date format string for display. */
      format?: string;
    };

/**
 * MyDatePicker shows a calendar popover to pick a single date, integrated with react-hook-form.
 * Can also be used standalone when no control/name are provided.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the date picker.
 * @param helperText - Helper text to display below the date picker.
 * @param required - Whether the field is required.
 * @param rules - The `react-hook-form` validation rules.
 * @param format - The date format for display.
 * @param placeholder - The placeholder text when no date selected.
 * @param floatingError - Whether to show the error message in a floating container.
 * @param register - The `react-hook-form` register function.
 * @param props - Calendar, button and form item props.
 */
export const MyDatePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  helperText,
  required,
  rules,
  format = DATE,
  placeholder,
  floatingError,
  register,
  className,
  ...props
}: MyDatePickerProps<TFieldValues>) => {
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
        render={({ field, formState }) => (
          <FormItem>
            {labelElm}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'secondary'}
                    className={cn(
                      'text-secondary !text-body-sm-regular border-border-alpha-strong focus:ring-item-primary mt-2 flex w-full bg-transparent pl-3 text-left font-normal hover:bg-transparent',
                      get(formState.errors, `${name}`) &&
                        'focus:ring-item-destructive border-item-destructive bg-item-destructive-focus text-item-destructive hover:bg-item-destructive-focus dark:bg-transparent',
                      field.value && 'text-primary',
                      className
                    )}
                  >
                    {field.value
                      ? dayjs(field.value).format(format)
                      : placeholder
                        ? placeholder
                        : 'Pick a date'}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  {...props}
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                />
              </PopoverContent>
            </Popover>
            <FormDescription>{helperText}</FormDescription>
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
