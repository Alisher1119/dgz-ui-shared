import { TimePicker, type TimePickerProps } from 'dgz-ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
} from 'dgz-ui/form';
import { cn } from 'dgz-ui/utils';
import type { FieldPath, FieldValues } from 'react-hook-form';

/**
 * Props for the MyTimePicker component.
 * @template TFieldValues - The type of the form values.
 */
export type MyTimePickerProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    TimePickerProps & {
      /** Whether the field is required. */
      required?: boolean;
      /** Custom CSS class name. */
      className?: string;
    };

/**
 * MyTimePicker is a time selection input with optional react-hook-form integration.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the time picker.
 * @param required - Whether the field is required.
 * @param className - Custom CSS class name.
 * @param rules - The `react-hook-form` validation rules.
 * @param floatingError - Whether to show the error message in a floating container.
 * @param props - TimePicker and form item props.
 */
export const MyTimePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required,
  className,
  rules,
  floatingError,
  ...props
}: MyTimePickerProps<TFieldValues>) => {
  return name && control ? (
    <FormField<TFieldValues, FieldPath<TFieldValues>>
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className={cn(floatingError && 'space-y-0')}>
          {label && (
            <FormLabel>
              {label} {required && <span className={'text-red-600'}>*</span>}
            </FormLabel>
          )}
          <FormControl>
            <TimePicker {...field} {...props} />
          </FormControl>
          <FormMessage className={cn(floatingError && 'absolute -bottom-5')} />
        </FormItem>
      )}
    />
  ) : (
    <TimePicker className={'mt-2'} {...props} />
  );
};
