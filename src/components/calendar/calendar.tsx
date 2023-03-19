interface Props {
  monthOffset: number;
}

export function Calendar({ monthOffset }: Props) {
  const now = new Date();
  const yearOffset = monthOffset / 12;
  const normalizedMonthOffset = monthOffset % 12;
  const firstOfMonth = new Date(
    now.getFullYear() + yearOffset,
    now.getMonth() + normalizedMonthOffset,
    1
  );
  const lastOfMonth = new Date(
    now.getFullYear() + yearOffset,
    now.getMonth() + normalizedMonthOffset + 1,
    0
  );
  const firstWeekDayOfMonth = firstOfMonth.getDay();
  const offset = -firstWeekDayOfMonth;
  const rows = [];
  for (let i = 0; i < 6; i++) {
    rows.push(CalendarWeek(i, offset, lastOfMonth));
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      {rows}
    </table>
  );
}

export function CalendarWeek(week: number, offset: number, lastOfMonth: Date) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(CalendarDay(week * 7 + i + offset + 1, lastOfMonth));
  }

  return <tr>{days}</tr>;
}

export function CalendarDay(day: number | string, lastOfMonth: Date) {
  if (day < 1) day = "";
  if (day > lastOfMonth.getDate()) day = "";
  return (
    <td>
      <button
        onClick={() =>
          console.log(
            `${day}/${lastOfMonth.getMonth() + 1}/${lastOfMonth.getFullYear()}`
          )
        }
      >
        {day}
      </button>
    </td>
  );
}
