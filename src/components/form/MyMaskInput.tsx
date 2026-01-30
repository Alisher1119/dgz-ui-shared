import {
  FormControl,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
  MaskInput,
  type MaskInputProps,
} from 'dgz-ui/form';
import { cn } from 'dgz-ui/utils';
import type { FieldPath, FieldValues } from 'react-hook-form';

/**
 * Props for the MyMaskInput component.
 * @template TFieldValues - The type of the form values.
 */
export type MyMaskInputProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    MaskInputProps & {
      /** Whether the field is required. */
      required?: boolean;
    };

/**
 * MyMaskInput is an input component with masking support and optional react-hook-form integration.
 * Works in both controlled (with control/name) and uncontrolled modes. By default it uses a space as
 * thousands separator, underscores as placeholder characters, lazy formatting disabled, and returns
 * unmasked value on change.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the mask input.
 * @param rules - The `react-hook-form` validation rules.
 * @param required - Whether the field is required.
 * @param floatingError - Whether to show the error message in a floating container.
 * @param props - MaskInput and form item props.
 * @returns React element rendering a masked input with label, helper text, and validation message.
 */
export const MyMaskInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
  required,
  floatingError,
  ...props
}: MyMaskInputProps<TFieldValues>) => {
  return (
    (name && control && (
      <FormField<TFieldValues, FieldPath<TFieldValues>>
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <FormItem className={cn(floatingError && 'space-y-0')}>
            {label && (
              <FormLabel className={'block'}>
                {label} {required && <span className={'text-red-600'}>*</span>}
              </FormLabel>
            )}
            <FormControl>
              <MaskInput
                thousandsSeparator={' '}
                lazy={false}
                placeholderChar="_"
                unmask
                {...field}
                {...props}
                onAccept={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage
              className={cn(floatingError && 'absolute -bottom-5')}
            />
          </FormItem>
        )}
      />
    )) ||
    null
  );
};
