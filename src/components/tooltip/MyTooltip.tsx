import { Tooltip, TooltipContent, TooltipTrigger } from "dgz-ui/tooltip";
import { type ReactNode } from "react";
import { type TooltipContentProps } from "@radix-ui/react-tooltip";

export type MyTooltipProps = Omit<TooltipContentProps, "content"> & {
  children: ReactNode;
  content: ReactNode;
  show?: boolean;
};

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
