import type { FieldPath, FieldValues } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { get } from "lodash";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
  type InputProps,
} from "dgz-ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "dgz-ui/popover";
import { Button } from "dgz-ui/button";
import { Calendar, DATE } from "dgz-ui/calendar";
import * as dayjs from "dayjs";
import { cn } from "dgz-ui";

export type MyDatePickerProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    InputProps & {
      format?: string;
    };

export const MyDatePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  helperText,
  required,
  rules,
  format = DATE,
  placeholder,
}: MyDatePickerProps<TFieldValues>) => {
  const labelElm = label && (
    <FormLabel className={"my-3 text-body-xs-medium"}>
      {label} {required && <span className={"text-red-600"}>*</span>}
    </FormLabel>
  );

  return (
    <>
      {name && control && (
        <FormField<TFieldValues, FieldPath<TFieldValues>>
          control={control}
          name={name}
          rules={rules}
          render={({ field, formState }) => (
            <FormItem className="flex flex-col relative">
              {labelElm}
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"secondary"}
                      className={cn(
                        "pl-3 mb-0 text-left text-secondary !text-body-sm-regular font-normal border-alpha-strong bg-transparent hover:bg-transparent focus:ring-item-primary",
                        get(formState.errors, `${name}`) &&
                          "focus:ring-item-destructive border-item-destructive bg-item-destructive-focus text-item-destructive hover:bg-item-destructive-focus dark:bg-transparent",
                        field.value && "text-primary",
                      )}
                    >
                      {field.value
                        ? dayjs(field.value).format(format)
                        : placeholder && placeholder}
                      <CalendarIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(value) =>
                      field.onChange(value ? new Date(value) : undefined)
                    }
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>{helperText}</FormDescription>
              <div className={"relative"}>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      )}
    </>
  );
};
