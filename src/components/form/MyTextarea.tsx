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
import { cn } from 'dgz-ui';

export type MyTextareaProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> & TextareaProps;

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

  return name && control ? (
    <FormField<TFieldValues, FieldPath<TFieldValues>>
      control={control}
      name={name}
      rules={rules}
      render={({ field, formState }) => (
        <FormItem>
          {labelElm}
          <FormControl>
            <Textarea
              variant={get(formState.errors, `${name}`) ? 'failure' : 'default'}
              {...props}
              {...field}
              className={twMerge(['mt-2', className])}
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
      <Textarea {...props} className={twMerge(['mt-2', className])} />
    </>
  );
};
