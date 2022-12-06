import { format, isWeekend } from "date-fns";

export type Range = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string | undefined;
};

export function customDayContent(day: Date) {
  if (isWeekend(day)) {
    return (
      <div className="w-full bg-red-200">
        <span>{format(day, "d")}</span>
      </div>
    );
  }
}

export const getDisabledDates = (_datesFromAPI: Date[]) => [];
