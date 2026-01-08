import type { FieldPath, FieldValues } from 'react-hook-form';
import {
  Checkbox,
  type CheckboxProps,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
} from 'dgz-ui/form';

/**
 * Props for the MyCheckbox component.
 * @template TFieldValues - The type of the form values.
 */
export type MyCheckboxProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> & CheckboxProps;

/**
 * MyCheckbox is a checkbox component with optional react-hook-form integration.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control
 * @param name
 * @param label
 * @param rules
 * @param helperText
 * @param props - Checkbox and form item props.
 */
export const MyCheckbox = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
  helperText,
  ...props
}: MyCheckboxProps<TFieldValues>) => {
  return name && control ? (
    <FormField<TFieldValues, FieldPath<TFieldValues>>
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              {...props}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel>{label}</FormLabel>}
            {helperText && <FormDescription>{helperText}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  ) : (
    <div className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
      <Checkbox {...props} />
      <div className="space-y-1 leading-none">
        {label && <FormLabel>{label}</FormLabel>}
      </div>
    </div>
  );
};
