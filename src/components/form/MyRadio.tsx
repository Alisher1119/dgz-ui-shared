import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  RadioGroupItem,
} from 'dgz-ui/form';
import type { FieldPath, FieldValues } from 'react-hook-form';
import React from 'react';

type RadioItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupItem>;

type MyRadioProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> & RadioItemProps;

const MyRadio = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
  helperText,
  value,
  ...props
}: MyRadioProps<TFieldValues>) => {
  return name && control ? (
    <FormField<TFieldValues, FieldPath<TFieldValues>>
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3">
          <FormControl>
            <RadioGroupItem
              value={value}
              checked={field.value === value}
              onClick={() => field.onChange(value)}
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
      <RadioGroupItem value={value} {...props} />
      <div className="space-y-1 leading-none">
        {label && <FormLabel>{label}</FormLabel>}
      </div>
    </div>
  );
};

export { MyRadio };
