import { Input } from 'dgz-ui/form';
import { useTranslation } from 'react-i18next';
import { Button } from 'dgz-ui/button';
import { SearchIcon } from 'lucide-react';
import type { FormEvent, HTMLAttributes } from 'react';
import { cn } from 'dgz-ui/utils';

export interface SearchProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'defaultValue' | 'name'> {
  name?: string;
  placeholder?: string;
  defaultValue?: FormDataEntryValue | null;
  onSearchChange: (search?: FormDataEntryValue) => void;
}

/**
 * Search input with submit button that emits value via onSearchChange on submit.
 *
 * @param props.name - Form field name for search input. Defaults to "search".
 * @param props.defaultValue - Default search value.
 * @param props.onSearchChange - Callback fired with submitted value.
 */
export const Search = ({
  name = 'search',
  defaultValue,
  onSearchChange,
  placeholder,
  className,
  ...props
}: SearchProps) => {
  const { t } = useTranslation();

  const handleSearch = (evt: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(evt.currentTarget);
    onSearchChange(formData.get(name) || undefined);
    evt.preventDefault();
    evt.stopPropagation();
  };

  return (
    <form
      className={cn('relative w-full max-w-64 min-w-40', className)}
      onSubmit={handleSearch}
    >
      <Input
        {...props}
        className={'h-8 rounded-lg'}
        name={name}
        placeholder={placeholder || t('Search...')}
        defaultValue={defaultValue ? `${defaultValue}` : ''}
      />
      <Button
        type={'submit'}
        variant={'ghost'}
        className={
          'text-foreground absolute top-0 right-0 cursor-pointer rounded-md !bg-transparent'
        }
        size={'sm'}
      >
        <SearchIcon />
      </Button>
    </form>
  );
};
