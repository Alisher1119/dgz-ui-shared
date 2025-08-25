import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
  Input,
  type InputProps,
} from 'dgz-ui/form';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { get } from 'lodash';
import { cn } from 'dgz-ui';

export type MyInputProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> & InputProps;

/**
 * MyInput is a form-aware input field that integrates with react-hook-form.
 * Works in both controlled (with control/name) and uncontrolled modes.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param props - Input and form item props.
 */
export const MyInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  helperText,
  required,
  className,
  rules,
  floatingError,
  ...props
}: MyInputProps<TFieldValues>) => {
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
      render={({ field, formState }) => (
        <FormItem>
          {labelElm}
          <FormControl>
            <Input
              variant={
                get(formState.errors, `${name}.message`) ? 'failure' : 'default'
              }
              {...props}
              {...field}
              onChange={(event) => {
                const value = event.target.value;
                if (props.type === 'number') {
                  field.onChange(value ? Number(value) : undefined);
                } else {
                  field.onChange(value);
                }
              }}
              className={twMerge(['mt-2', className])}
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
      <Input {...props} className={twMerge(['mt-2', className])} />
      {helperText && <FormDescription>{helperText}</FormDescription>}
    </>
  );
};
