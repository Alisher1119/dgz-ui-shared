import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  Switch,
  type SwitchProps,
} from "dgz-ui/form";
import type { FieldPath, FieldValues } from "react-hook-form";
import { cn } from "dgz-ui";

export type MySwitchProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> & SwitchProps;

export const MySwitch = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  helperText,
  rules,
  ...props
}: MySwitchProps<TFieldValues>) => {
  return name && control ? (
    <FormField<TFieldValues, FieldPath<TFieldValues>>
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className="flex items-center gap-2">
          <FormControl>
            <Switch
              className={"m-0"}
              checked={field.value}
              onCheckedChange={field.onChange}
              {...props}
            />
          </FormControl>
          <div className="space-y-1 leading-none mb-1">
            {label && (
              <FormLabel
                className={cn("text-primary", props.disabled && "opacity-40")}
              >
                {label}
              </FormLabel>
            )}
            <FormDescription>{helperText}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  ) : (
    <div className="flex flex-row items-center space-x-3">
      <Switch {...props} />
      <div className="space-y-1 leading-none mb-1">
        {label && (
          <FormLabel
            className={cn("text-primary", props.disabled && "opacity-40")}
          >
            {label}
          </FormLabel>
        )}
        <FormDescription>{helperText}</FormDescription>
      </div>
    </div>
  );
};
