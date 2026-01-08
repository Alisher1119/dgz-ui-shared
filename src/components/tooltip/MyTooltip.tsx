import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'dgz-ui/tooltip';
import { type ReactNode } from 'react';
import { type TooltipContentProps } from '@radix-ui/react-tooltip';

/**
 * Props for the MyTooltip component.
 */
export type MyTooltipProps = Omit<TooltipContentProps, 'content'> & {
  /** Element that triggers the tooltip. */
  children: ReactNode;
  /** Content shown inside the tooltip. */
  content: ReactNode;
  /** Whether to render the tooltip; if false, renders children only. */
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
    <TooltipProvider>
      <Tooltip>
        <TooltipContent {...props}>{content}</TooltipContent>
        <TooltipTrigger>{children}</TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  ) : (
    children
  );
};
