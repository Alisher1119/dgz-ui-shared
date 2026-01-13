import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
  Textarea,
  type TextareaProps,
} from 'dgz-ui/form';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { get } from 'lodash';
import { cn } from 'dgz-ui/utils';

/**
 * Props for the MyTextarea component.
 * @template TFieldValues - The type of the form values.
 */
export type MyTextareaProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> & TextareaProps;

/**
 * MyTextarea is a textarea component with optional react-hook-form integration.
 * Supports floating error message styling.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the textarea.
 * @param helperText - Helper text to display below the textarea.
 * @param required - Whether the field is required.
 * @param rules - The `react-hook-form` validation rules.
 * @param className - Custom CSS class name.
 * @param floatingError - Whether to show the error message in a floating container.
 * @param props - Textarea and form item props.
 */
export const MyTextarea = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  helperText,
  required,
  rules,
  className,
  floatingError,
  ...props
}: MyTextareaProps<TFieldValues>) => {
  const labelElm = label && (
    <FormLabel className={'text-body-xs-medium my-3'}>
      {label} {required && <span className={'text-red-600'}>*</span>}
    </FormLabel>
  );

  return (
    (name && control && (
      <FormField<TFieldValues, FieldPath<TFieldValues>>
        control={control}
        name={name}
        rules={rules}
        render={({ field, formState }) => (
          <FormItem>
            {labelElm}
            <FormControl>
              <Textarea
                variant={
                  get(formState.errors, `${name}`) ? 'failure' : 'default'
                }
                {...props}
                {...field}
                className={twMerge(['mt-2', className])}
              />
            </FormControl>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage className={cn(floatingError && 'absolute')} />
          </FormItem>
        )}
      />
    )) ||
    null
  );
};
