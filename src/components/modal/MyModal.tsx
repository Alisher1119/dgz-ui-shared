import type { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'dgz-ui/dialog';
import type { DialogProps } from '@radix-ui/react-dialog';
import { cn } from 'dgz-ui/utils';

export type MyModalProps = DialogProps & {
  header?: ReactNode;
  trigger?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
};

/**
 * MyModal is a convenience wrapper around Dialog with a header, content and optional footer.
 *
 * @param props.header - Header content.
 * @param props.trigger - Optional trigger element.
 * @param props.footer - Footer content.
 * @param props.size - Content max width size.
 */
export const MyModal = ({
  header,
  footer,
  trigger,
  children,
  size = 'lg',
  ...props
}: MyModalProps) => {
  return (
    <Dialog {...props}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(
          `data-[state=open]:animate-contentShowTop fixed top-4 bottom-auto max-h-[calc(100vh-2rem)] w-full max-w-lg translate-y-0 overflow-y-auto`,
          size === 'xl' && 'max-w-xl',
          size === '2xl' && 'max-w-2xl',
          size === '3xl' && 'max-w-3xl',
          size === '4xl' && 'max-w-5xl',
          size === '5xl' && 'max-w-5xl',
          size === '6xl' && 'max-w-6xl',
          size === '7xl' && 'max-w-7xl',
          size === 'full' && 'max-w-[95%]'
        )}
      >
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription className={'hidden'} />
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
