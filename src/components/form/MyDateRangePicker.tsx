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

export type MyDateRangePickerProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    ButtonProps &
    InputProps & {
      format?: string;
    };

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
    <>
      {name && control && (
        <FormField<TFieldValues, FieldPath<TFieldValues>>
          control={control}
          name={name}
          rules={rules}
          render={({ field, formState }) => (
            <FormItem className="relative flex flex-col">
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
              <FormDescription>{helperText}</FormDescription>
              <div className={'relative'}>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      )}
    </>
  );
};
