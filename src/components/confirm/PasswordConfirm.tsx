import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'dgz-ui/alert-dialog';
import { useTranslation } from 'react-i18next';
import { type ConfirmProps } from './Confirm';
import { Form } from 'dgz-ui/form';
import { MyInput } from '../form';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type ConfirmPasswordDto,
  createConfirmPasswordSchema,
} from '../../schemas';

export interface PasswordConfirmProps extends Omit<ConfirmProps, 'onConfirm'> {
  onSubmit: (data: ConfirmPasswordDto) => void;
}

/**
 * PasswordConfirm prompts the user to enter their password to confirm an action and submits via onSubmit.
 *
 * @param props - Dialog props with title/description/trigger and onSubmit handler.
 */
export const PasswordConfirm = ({
  title,
  description,
  children,
  onSubmit,
  ...props
}: PasswordConfirmProps) => {
  const { t } = useTranslation();
  const schema = useMemo(() => createConfirmPasswordSchema(t), [t]);
  const form = useForm<ConfirmPasswordDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
    },
  });

  return (
    <AlertDialog {...props}>
      {children && <AlertDialogTrigger>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-3'}>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {title || t('Confirm your password')}
              </AlertDialogTitle>
              <div className={'text-secondary text-body-sm-medium space-y-3'}>
                {description ||
                  t('Enter your account password to complete this action')}
                <MyInput<ConfirmPasswordDto>
                  required
                  type={'password'}
                  control={form.control}
                  name={'password'}
                  placeholder={t('Password')}
                />
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel type={'reset'} onClick={() => form.reset()}>
                {t('Cancel')}
              </AlertDialogCancel>
              <AlertDialogAction type={'submit'}>
                {t('Confirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
