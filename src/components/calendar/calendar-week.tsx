import { CalendarDay } from "./calendar-day";

interface CalendarWeekProps {
  week: number;
  offset: number;
  lastOfMonth: Date;
}

export function CalendarWeek({ week, offset, lastOfMonth }: CalendarWeekProps) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(
      <CalendarDay day={week * 7 + i + offset + 1} lastOfMonth={lastOfMonth} />
    );
  }

  return <tr>{days}</tr>;
}
