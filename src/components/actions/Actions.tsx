import { RiArrowDownSLine, RiPlayList2Line } from '@remixicon/react';
import { Button } from 'dgz-ui/button';
import {
  type DropdownContainerProps,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'dgz-ui/dropdown';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

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
export interface ActionsProps extends DropdownContainerProps {
  /** Array of action items to be displayed in the dropdown. */
  actions: ActionInterface[];
  /** Title for the actions button. */
  title?: ReactNode;
}

/**
 * Actions renders a dropdown menu with a list of action items.
 *
 * @param props.actions - Array of actions with label and onClick handler.
 * @returns React element rendering the actions dropdown.
 */
export const Actions = ({
  actions,
  triggerProps,
  contentProps,
  title,
}: ActionsProps) => {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={'grow'} {...triggerProps}>
        <Button
          variant="secondary"
          size={'sm'}
          className={'ml-auto rounded-lg px-3'}
        >
          <RiPlayList2Line />{' '}
          <span className={'hidden md:inline!'}>{title || t('Actions')}</span>
          <RiArrowDownSLine />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" {...contentProps}>
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
