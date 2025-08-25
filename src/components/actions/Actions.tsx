import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'dgz-ui/dropdown';
import { Button } from 'dgz-ui/button';
import { RiArrowDownSLine, RiPlayList2Line } from '@remixicon/react';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

export interface ActionInterface {
  label: ReactNode;
  onClick: () => void;
}

export interface ActionsProps {
  actions: ActionInterface[];
}

/**
 * Actions renders a dropdown menu with a list of action items.
 *
 * @param props.actions - Array of actions with label and onClick handler.
 * @returns React element rendering the actions dropdown.
 */
export const Actions = ({ actions = [] }: ActionsProps) => {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size={'sm'}
          className={'ml-auto rounded-lg px-3'}
        >
          <RiPlayList2Line />{' '}
          <span className={'hidden lg:!inline'}>{t('Actions')}</span>
          <RiArrowDownSLine />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => {
          return (
            <DropdownMenuItem key={index} onClick={action.onClick}>
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
