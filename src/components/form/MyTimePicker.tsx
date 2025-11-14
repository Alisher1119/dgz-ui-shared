import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
} from 'dgz-ui/form';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { TimePicker, type TimePickerProps } from 'dgz-ui/calendar';
import { cn } from 'dgz-ui/utils';

export type MyTimePickerProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    TimePickerProps & {
      required?: boolean;
      className?: string;
    };

/**
 * MyTimePicker is a time selection input with optional react-hook-form integration.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control
 * @param name
 * @param label
 * @param helperText
 * @param required
 * @param className
 * @param rules
 * @param floatingError
 * @param props - TimePicker and form item props.
 */
export const MyTimePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  helperText,
  required,
  className,
  rules,
  floatingError,
  ...props
}: MyTimePickerProps<TFieldValues>) => {
  const labelElm = label && (
    <FormLabel className={'my-3'}>
      {label} {required && <span className={'text-red-600'}>*</span>}
    </FormLabel>
  );

  return name && control ? (
    <FormField<TFieldValues, FieldPath<TFieldValues>>
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          {labelElm}
          <FormControl>
            <TimePicker className={'mt-1'} {...field} {...props} />
          </FormControl>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage className={cn(floatingError && 'absolute')} />
        </FormItem>
      )}
    />
  ) : (
    <>
      {labelElm}
      <TimePicker className={'mt-1'} {...props} />
    </>
  );
};
