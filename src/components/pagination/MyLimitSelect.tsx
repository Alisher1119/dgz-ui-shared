import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "dgz-ui";

export const DEFAULT_LIMIT = 50;
export const DEFAULT_ITEMS_LIMIT = 12;

export interface MyLimitSelectProps {
  defaultValue?: number;
  onLimitChange: (limit: string) => void;
}

export const MyLimitSelect = ({
  defaultValue = DEFAULT_LIMIT,
  onLimitChange,
}: MyLimitSelectProps) => {
  const { t } = useTranslation();

  return (
    <div className={"flex gap-3 items-center"}>
      <span className={"font-semibold"}>{t("Rows per page")}:</span>
      <Select
        onValueChange={(limit) => onLimitChange(limit)}
        value={`${defaultValue}`}
      >
        <SelectTrigger className="w-17 h-8.5">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MyLimitSelect;
