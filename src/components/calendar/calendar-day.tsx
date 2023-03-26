import { useDispatch, useSelector } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { updateActive, updateDate } from "../../reducer/calendar-slice";
import { ReservationsRepo } from "../../services/reservation-repo";
import { AppDispatch } from "../../store/store";

interface CalendarDayProps {
  day: number | string;
  lastOfMonth: Date;
}

export function CalendarDay({ day, lastOfMonth }: CalendarDayProps) {
  const dispatch = useDispatch<AppDispatch>();

  const repoReservations = new ReservationsRepo();
  const { reservations } = useReservations(repoReservations);

  const numberMonth = reservations.reservations.map((item) => {
    const splitDate: string[] = item.reserveDate.split("-");
    return splitDate[2];
  });

  if (day < 1) day = "";
  if (day > lastOfMonth.getDate()) day = "";

  const yearMonthDate = `${lastOfMonth.getFullYear()}-${
    lastOfMonth.getMonth() + 1
  }-${day}`;

  const handlerDay = () => {
    dispatch(updateDate(yearMonthDate));
    dispatch(updateActive(true));
  };

  return (
    <td>
      <button
        disabled={numberMonth.includes(day.toString())}
        onClick={() => handlerDay()}
      >
        {day}
      </button>
    </td>
  );
}
