import { cn } from "dgz-ui";
import type { ComponentProps } from "react";

export const ScrollArea = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={cn(
        "scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-auto",
        className,
      )}
    />
  );
};
