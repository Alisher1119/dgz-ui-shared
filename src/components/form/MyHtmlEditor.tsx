import type { FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
  HtmlEditor,
  type HtmlEditorProps,
} from 'dgz-ui/form';
import { cn } from 'dgz-ui/utils';

export type MyHtmlEditorProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    HtmlEditorProps & {
      required?: boolean;
    };

/**
 * MyHtmlEditor is a rich-text HTML editor with optional react-hook-form integration.
 * Works in both controlled (with control/name) and uncontrolled modes.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control
 * @param name
 * @param label
 * @param rules
 * @param helperText
 * @param required
 * @param floatingError
 * @param props - HtmlEditor and form item props such as control, name, label, rules, helperText.
 * @returns React element rendering an HtmlEditor with label, helper text, and validation message.
 */
export const MyHtmlEditor = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
  helperText,
  required,
  floatingError,
  ...props
}: MyHtmlEditorProps<TFieldValues>) => {
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
            <HtmlEditor {...field} {...props} />
          </FormControl>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage className={cn(floatingError && 'absolute')} />
        </FormItem>
      )}
    />
  ) : (
    <HtmlEditor {...props} />
  );
};
