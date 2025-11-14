import { cn } from 'dgz-ui/utils';
import type { ComponentProps } from 'react';

/**
 * ScrollArea is a simple styled scrollable container div.
 *
 * @param props - Native div props. className extends default scrollbar styles.
 */
export const ScrollArea = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      {...props}
      className={cn(
        'scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-auto',
        className
      )}
    />
  );
};
