import { registerPlugin } from 'react-filepond';
import {
  FileUpload,
  type FileUploadProps,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
} from 'dgz-ui/form';
import type { FilePondFile } from 'filepond';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { get, isArray } from 'lodash';
import { cn } from 'dgz-ui';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize
);

type MyFilepondProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    FileUploadProps & {
      onChange?: (files: FilePondFile[]) => void;
      containerClassName?: string;
      beforeRemoveFile?: (file: unknown) => void;
    };

const MyFilepond = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  helperText,
  required,
  className,
  floatingError,
  maxFiles = 1,
  maxFileSize = '10MB',
  onChange,
  rules,
  beforeRemoveFile,
  ...props
}: MyFilepondProps<TFieldValues>) => {
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
            <FileUpload
              variant={get(formState.errors, `${name}`) ? 'failure' : 'default'}
              files={
                field.value
                  ? isArray(field.value)
                    ? field.value
                    : [field.value]
                  : []
              }
              name={field.name}
              {...props}
              className={twMerge(['mt-2 mb-0 rounded-xl', className])}
              onupdatefiles={(files = []) => {
                if (maxFiles && maxFiles > 1) {
                  field.onChange(
                    files.map((file) => get(file, 'source') as File | string)
                  );
                } else {
                  field.onChange(get(files, '[0].source', undefined));
                }
                if (onChange) {
                  onChange(files);
                }
              }}
              beforeRemoveFile={(item: FilePondFile) => {
                if (beforeRemoveFile) {
                  beforeRemoveFile(item.source);
                }
                return true;
              }}
              maxFiles={maxFiles}
              maxFileSize={maxFileSize}
              allowImagePreview
              allowFileTypeValidation
              allowFileSizeValidation
              {...props}
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
      <FileUpload
        {...props}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
        onupdatefiles={onChange}
        beforeRemoveFile={beforeRemoveFile}
        className={twMerge(['mt-2 mb-0 rounded-xl', className])}
      />
    </>
  );
};

export { registerPlugin, type MyFilepondProps, MyFilepond };
