import { FolderOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";

export interface EmptyProps {
  children?: ReactNode;
  icon?: ReactNode;
}

export const Empty = ({ children, icon }: EmptyProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-16 text-center text-base">
      {icon || <FolderOpen size={48} strokeWidth={1} />}
      {children || t("No results")}
    </div>
  );
};
