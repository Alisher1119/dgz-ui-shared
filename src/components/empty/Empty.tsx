import { cn } from 'dgz-ui/utils';
import { FolderOpen } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
}

/**
 * Empty displays a simple empty state with an optional icon and message.
 *
 * @param props.children - Optional custom message/content.
 * @param props.icon - Optional custom icon. Defaults to a folder icon.
 */
export const Empty = ({ children, icon, className, ...props }: EmptyProps) => {
  const { t } = useTranslation();

  return (
    <div
      {...props}
      className={cn(
        'flex h-16 flex-col items-center justify-center text-center text-base',
        className
      )}
    >
      {icon || <FolderOpen size={48} strokeWidth={1} />}
      {children || t('No results')}
    </div>
  );
};
