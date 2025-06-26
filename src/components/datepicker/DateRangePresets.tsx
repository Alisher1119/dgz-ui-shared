import { type ReactNode, useMemo } from "react";
import { type DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Button } from "dgz-ui/button";

/**
 * Type for date range preset with label
 */
type PresetType = DateRange & { label: ReactNode };

/**
 * Props for DateRangePresets component
 */
interface DateRangePresetsProps {
  /**
   * Callback function when a preset is selected
   */
  onPresetSelect: (range: DateRange) => void;
}

/**
 * Component for displaying date range presets
 */
export const DateRangePresets = ({ onPresetSelect }: DateRangePresetsProps) => {
  const { t } = useTranslation();

  const presets: PresetType[] = useMemo(() => {
    const today = dayjs().endOf("day");
    return [
      {
        from: today.startOf("week").toDate(),
        to: today.endOf("week").toDate(),
        label: t("This week"),
      },
      {
        from: today.startOf("month").toDate(),
        to: today.endOf("month").toDate(),
        label: t("This month"),
      },
      {
        from: today.startOf("year").toDate(),
        to: today.endOf("year").toDate(),
        label: t("This year"),
      },
      {
        from: today.subtract(7, "day").startOf("day").toDate(),
        to: today.toDate(),
        label: t("Last 7 days"),
      },
      {
        from: today.subtract(30, "day").startOf("day").toDate(),
        to: today.toDate(),
        label: t("Last 30 days"),
      },
      {
        from: today.subtract(3, "month").startOf("day").toDate(),
        to: today.toDate(),
        label: t("Last 3 months"),
      },
      {
        from: today.subtract(6, "month").startOf("day").toDate(),
        to: today.toDate(),
        label: t("Last 6 months"),
      },
      {
        from: today.subtract(12, "month").startOf("day").toDate(),
        to: today.toDate(),
        label: t("Last 12 months"),
      },
    ];
  }, [t]);

  return (
    <div
      className={
        "space-y-1 flex flex-col p-2 border-e border-border-alpha-light"
      }
    >
      {presets.map((preset, index) => (
        <Button
          size={"xs"}
          key={index}
          variant={"ghost"}
          className={"justify-start"}
          onClick={() => onPresetSelect(preset)}
        >
          {preset.label}
        </Button>
      ))}
    </div>
  );
};
