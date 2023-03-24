import { useReservations } from "../../hooks/use-reservations";
import { ReservationsRepo } from "../../services/reservation-repo";
import { ReserveInfo } from "./calendar";

interface CalendarDayProps {
  day: number | string;
  lastOfMonth: Date;
  reserveSet: React.Dispatch<React.SetStateAction<Partial<ReserveInfo>>>;
}

export function CalendarDay({
  day,
  lastOfMonth,
  reserveSet,
}: CalendarDayProps) {
  if (day < 1) day = "";
  if (day > lastOfMonth.getDate()) day = "";

  const repoReservations = new ReservationsRepo();
  const { reservations } = useReservations(repoReservations);

  const numberMonth = reservations.reservations.map((item) => {
    const splitDate: string[] = item.reserveDate.split("-");
    return splitDate[2];
  });

  const yearMonthDate = `${lastOfMonth.getFullYear()}-${
    lastOfMonth.getMonth() + 1
  }-${day}`;

  return (
    <td>
      <button
        disabled={numberMonth.includes(day.toString())}
        onClick={() => reserveSet({ date: yearMonthDate, active: true })}
      >
        {day}
      </button>
    </td>
  );
}
