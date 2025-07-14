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
import { cn } from 'dgz-ui';

export type MyDatePickerProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    Omit<InputProps, 'onSelect'> &
    Omit<CalendarProps, 'mode'> & {
      format?: string;
    };

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
  ...props
}: MyDatePickerProps<TFieldValues>) => {
  const labelElm = label && (
    <FormLabel className={'text-body-xs-medium my-3'}>
      {label} {required && <span className={'text-red-600'}>*</span>}
    </FormLabel>
  );

  return (
    <>
      {name && control ? (
        <FormField<TFieldValues, FieldPath<TFieldValues>>
          control={control}
          name={name}
          rules={rules}
          render={({ field, formState }) => (
            <FormItem className="relative flex flex-col">
              {labelElm}
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'secondary'}
                      className={cn(
                        'text-secondary !text-body-sm-regular border-alpha-strong focus:ring-item-primary mb-0 bg-transparent pl-3 text-left font-normal hover:bg-transparent',
                        get(formState.errors, `${name}`) &&
                          'focus:ring-item-destructive border-item-destructive bg-item-destructive-focus text-item-destructive hover:bg-item-destructive-focus dark:bg-transparent',
                        field.value && 'text-primary'
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
      ) : (
        <div className="relative flex flex-col">
          {labelElm}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'secondary'}
                className={cn(
                  'text-secondary !text-body-sm-regular border-border-alpha-strong focus:ring-item-primary mb-0 bg-transparent pl-3 text-left font-normal hover:bg-transparent',
                  props.selected && 'text-primary'
                )}
              >
                {props.selected
                  ? dayjs(props.selected).format(format)
                  : placeholder
                    ? placeholder
                    : 'Pick a date'}
                <CalendarIcon className="ml-auto h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar {...props} mode="single" />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );
};
