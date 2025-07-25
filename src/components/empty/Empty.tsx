import { FolderOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

export interface EmptyProps {
  children?: ReactNode;
  icon?: ReactNode;
}

export const Empty = ({ children, icon }: EmptyProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-16 flex-col items-center justify-center text-center text-base">
      {icon || <FolderOpen size={48} strokeWidth={1} />}
      {children || t('No results')}
    </div>
  );
};
