import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  Switch,
  type SwitchProps,
} from 'dgz-ui/form';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { cn } from 'dgz-ui/utils';

/**
 * Props for the MySwitch component.
 * @template TFieldValues - The type of the form values.
 */
export type MySwitchProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> & SwitchProps;

/**
 * MySwitch is a toggle switch with optional react-hook-form integration.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the switch.
 * @param helperText - Helper text to display below the switch.
 * @param rules - The `react-hook-form` validation rules.
 * @param props - Switch and form item props.
 */
export const MySwitch = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  helperText,
  rules,
  ...props
}: MySwitchProps<TFieldValues>) => {
  return (
    (name && control && (
      <FormField<TFieldValues, FieldPath<TFieldValues>>
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl>
              <Switch
                className={'m-0'}
                checked={field.value}
                onCheckedChange={field.onChange}
                {...props}
              />
            </FormControl>
            <div className="mb-1 space-y-1 leading-none">
              {label && (
                <FormLabel
                  className={cn('text-primary', props.disabled && 'opacity-40')}
                >
                  {label}
                </FormLabel>
              )}
              {helperText && <FormDescription>{helperText}</FormDescription>}
            </div>
          </FormItem>
        )}
      />
    )) ||
    null
  );
};
