import type { CardProps } from 'dgz-ui/card';
import { useState } from 'react';
import { Input } from 'dgz-ui/form';
import { useTranslation } from 'react-i18next';
import { Button } from 'dgz-ui/button';
import { RiSearchLine } from '@remixicon/react';
import { get } from 'lodash';
import { Keyboard } from '../../enums';

type SearchWithCtrlProps = Omit<CardProps, 'title'> & {
  placeholder?: string;
  onSearchChange: (search?: string) => void;
};

export const SearchWithCtrl = ({
  placeholder,
  onSearchChange,
}: SearchWithCtrlProps) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  return (
    <div className={'relative my-2 w-full'}>
      <Input
        placeholder={
          placeholder ? placeholder : t('Type text and press CTRL + Enter')
        }
        onInput={(evt) => setSearch(get(evt, 'target.value', ''))}
        onKeyUp={(evt) => {
          if (evt.key === Keyboard.ENTER && evt.ctrlKey) {
            onSearchChange(search);
          }
          evt.stopPropagation();
          evt.preventDefault();
        }}
      />
      <Button
        type={'button'}
        variant={'ghost'}
        className={
          'text-foreground absolute top-0 right-0 cursor-pointer rounded-md !bg-transparent'
        }
        onClick={() => onSearchChange(search)}
      >
        <RiSearchLine />
      </Button>
    </div>
  );
};
