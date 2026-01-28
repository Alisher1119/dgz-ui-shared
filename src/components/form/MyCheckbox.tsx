import type { FieldPath, FieldValues } from 'react-hook-form';
import {
  Checkbox,
  type CheckboxProps,
  FormControl,
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
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the checkbox.
 * @param rules - The `react-hook-form` validation rules.
 * @param props - Checkbox and form item props.
 */
export const MyCheckbox = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
  ...props
}: MyCheckboxProps<TFieldValues>) => {
  return (
    (name && control && (
      <FormField<TFieldValues, FieldPath<TFieldValues>>
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <FormLabel className={'block'}>
            <FormItem className="flex flex-row items-start gap-3">
              <FormControl>
                <>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    {...props}
                  />
                  <div className="space-y-1 leading-none">
                    {label && <div>{label}</div>}
                  </div>
                </>
              </FormControl>
            </FormItem>
          </FormLabel>
        )}
      />
    )) ||
    null
  );
};
