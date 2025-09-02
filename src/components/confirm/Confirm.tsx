import { type ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'dgz-ui/alert-dialog';
import { useTranslation } from 'react-i18next';
import { type AlertDialogProps } from '@radix-ui/react-alert-dialog';

export type ConfirmProps = AlertDialogProps & {
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  onConfirm: () => void;
};

/**
 * Confirm renders a confirmation dialog and calls onConfirm when user confirms.
 *
 * @param props - Radix AlertDialog props plus content and onConfirm callback.
 */
export const Confirm = ({
  title,
  description,
  children,
  onConfirm,
  ...props
}: ConfirmProps) => {
  const { t } = useTranslation();

  return (
    <AlertDialog {...props}>
      {children && <AlertDialogTrigger>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || t('Are you absolutely sure?')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ||
              t(
                'This action cannot be undone. This will permanently delete your data from our servers.'
              )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={'mt-0'}>
            {t('Cancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {t('Confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
