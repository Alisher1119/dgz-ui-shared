import type { FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
  MaskInput,
  type MaskInputProps,
} from 'dgz-ui/form';
import { cn } from 'dgz-ui';

export type MyMaskInputProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    MaskInputProps & {
      required?: boolean;
    };

/**
 * MyMaskInput is an input component with masking support and optional react-hook-form integration.
 * Works in both controlled (with control/name) and uncontrolled modes. By default it uses a space as
 * thousands separator, underscores as placeholder characters, lazy formatting disabled, and returns
 * unmasked value on change.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control
 * @param name
 * @param label
 * @param rules
 * @param helperText
 * @param required
 * @param floatingError
 * @param props - MaskInput and form item props such as control, name, label, rules, helperText.
 * @returns React element rendering a masked input with label, helper text, and validation message.
 */
export const MyMaskInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
  helperText,
  required,
  floatingError,
  ...props
}: MyMaskInputProps<TFieldValues>) => {
  const labelElm = label && (
    <FormLabel className={'text-body-xs-medium my-3'}>
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
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage className={cn(floatingError && 'absolute')} />
        </FormItem>
      )}
    />
  ) : (
    <>
      {labelElm}
      <MaskInput
        thousandsSeparator={' '}
        lazy={false}
        placeholderChar="_"
        unmask
        {...props}
      />
      {helperText && <FormDescription>{helperText}</FormDescription>}
    </>
  );
};
