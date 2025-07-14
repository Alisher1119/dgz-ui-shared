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
import { TIME, TimePicker, type TimePickerProps } from 'dgz-ui/calendar';
import { cn } from 'dgz-ui';

export type MyTimePickerProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    TimePickerProps & {
      required?: boolean;
      className?: string;
    };

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
            <TimePicker
              className={'mt-1'}
              value={field.value}
              onChange={(time) => {
                field.onChange(time.format(TIME));
              }}
              {...props}
            />
          </FormControl>
          <FormDescription>{helperText}</FormDescription>
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
