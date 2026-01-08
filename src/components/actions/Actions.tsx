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

/**
 * Interface representing a single action item.
 */
export interface ActionInterface {
  /** The content to display for the action item. */
  label: ReactNode;
  /** Callback function to execute when the action is clicked. */
  onClick: () => void;
}

/**
 * Props for the Actions component.
 */
export interface ActionsProps {
  /** Array of action items to be displayed in the dropdown. */
  actions: ActionInterface[];
}

/**
 * Actions renders a dropdown menu with a list of action items.
 *
 * @param props.actions - Array of actions with label and onClick handler.
 * @returns React element rendering the actions dropdown.
 */
export const Actions = ({ actions }: ActionsProps) => {
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
            <DropdownMenuItem key={index} onClick={() => action.onClick()}>
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
