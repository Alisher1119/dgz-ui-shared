import { Input } from 'dgz-ui/form';
import { useTranslation } from 'react-i18next';
import { Button } from 'dgz-ui/button';
import { SearchIcon } from 'lucide-react';
import type { FormEvent } from 'react';

export interface SearchProps {
  name?: string;
  defaultValue?: FormDataEntryValue | null;
  onSearchChange: (search?: FormDataEntryValue) => void;
}

export const Search = ({
  name = 'search',
  defaultValue,
  onSearchChange,
}: SearchProps) => {
  const { t } = useTranslation();

  const handleSearch = (evt: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(evt.currentTarget);
    onSearchChange(formData.get(name) || undefined);
    evt.preventDefault();
  };

  return (
    <form
      className={'relative w-full max-w-64 min-w-40'}
      onSubmit={handleSearch}
    >
      <Input
        className={'h-8 rounded-lg'}
        name={name}
        placeholder={t('Search...')}
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
