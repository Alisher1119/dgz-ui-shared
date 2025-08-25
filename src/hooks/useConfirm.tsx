import { useCallback } from 'react';
import { toast } from 'react-toastify/unstyled';
import { uniqueId } from 'lodash';
import { Confirm, PasswordConfirm } from '../components';
import type { ConfirmPasswordDto } from '../schemas';

/**
 * useConfirm provides helpers to prompt the user for confirmation.
 * It renders toast-based dialogs for simple confirm and password-confirm.
 *
 * @returns confirm and confirmPassword functions.
 */
export const useConfirm = () => {
  const confirm = useCallback(({ onConfirm }: { onConfirm: () => void }) => {
    const toastId = uniqueId();
    toast.warning(<></>, {
      toastId: toastId,
      autoClose: false,
    });
    toast.update(toastId, {
      position: 'bottom-left',
      render: (
        <Confirm
          defaultOpen
          onConfirm={() => {
            onConfirm();
            toast.dismiss(toastId);
          }}
        />
      ),
    });
  }, []);

  const confirmPassword = useCallback(
    ({ onSubmit }: { onSubmit: (data: ConfirmPasswordDto) => void }) => {
      const toastId = uniqueId();
      toast.warning(<></>, {
        position: 'bottom-left',
        toastId: toastId,
        autoClose: false,
      });
      toast.update(toastId, {
        render: (
          <PasswordConfirm
            defaultOpen
            onSubmit={(data) => {
              onSubmit(data);
              toast.dismiss(toastId);
            }}
          />
        ),
      });
    },
    []
  );

  return {
    confirm,
    confirmPassword,
  };
};
