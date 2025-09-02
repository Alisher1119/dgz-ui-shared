import { Tooltip, TooltipContent, TooltipTrigger } from 'dgz-ui/tooltip';
import { type ReactNode } from 'react';
import { type TooltipContentProps } from '@radix-ui/react-tooltip';

export type MyTooltipProps = Omit<TooltipContentProps, 'content'> & {
  children: ReactNode;
  content: ReactNode;
  show?: boolean;
};

/**
 * MyTooltip wraps children with a tooltip that can be conditionally shown.
 *
 * @param props.content - Content shown inside the tooltip.
 * @param props.children - Element that triggers the tooltip.
 * @param props.show - Whether to render the tooltip; if false, renders children only.
 */
export const MyTooltip = ({
  content,
  children,
  show = true,
  ...props
}: MyTooltipProps) => {
  return show ? (
    <Tooltip>
      <TooltipContent {...props}>{content}</TooltipContent>
      <TooltipTrigger>{children}</TooltipTrigger>
    </Tooltip>
  ) : (
    children
  );
};
