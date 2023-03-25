import { ReserveInfo } from "./calendar";
import { CalendarDay } from "./calendar-day";

interface CalendarWeekProps {
  week: number;
  offset: number;
  lastOfMonth: Date;
  reserveSet: React.Dispatch<React.SetStateAction<Partial<ReserveInfo>>>;
}

export function CalendarWeek({
  week,
  offset,
  lastOfMonth,
  reserveSet,
}: CalendarWeekProps) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(
      <CalendarDay
        day={week * 7 + i + offset + 1}
        lastOfMonth={lastOfMonth}
        reserveSet={reserveSet}
      />
      // CalendarDay(week * 7 + i + offset + 1, lastOfMonth)
    );
  }

  return <tr>{days}</tr>;
}
