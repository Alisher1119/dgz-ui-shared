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

export type MyCheckboxProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> & CheckboxProps;

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
            <FormDescription>{helperText}</FormDescription>
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
