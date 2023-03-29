import styles from "./calendar.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { updateActive, updateDate } from "../../reducer/calendar-slice";
import { ReservationsRepo } from "../../services/reservation-repo";
import { AppDispatch, RootState } from "../../store/store";
import { useState } from "react";

interface CalendarDayProps {
  day: number | string;
  lastOfMonth: Date;
}

export function CalendarDay({ day, lastOfMonth }: CalendarDayProps) {
  const [selected, setSelected] = useState("a");
  const dispatch = useDispatch<AppDispatch>();
  const calendarReserve = useSelector((state: RootState) => state.calendar);

  const repoReservations = new ReservationsRepo();
  const { reservations } = useReservations(repoReservations);

  const numberMonth = reservations.reservations.map((item) => {
    const splitDate: string[] = item.reserveDate.split("-");
    return splitDate[2];
  });

  if (day < 1) day = "";
  if (day > lastOfMonth.getDate()) day = "";

  const today = new Date();

  const disableCondition = () => {
    if (
      day < 1 ||
      day > lastOfMonth.getDate() ||
      numberMonth.includes(day.toString()) ||
      (lastOfMonth.getMonth() === today.getMonth() &&
        day < today.getDate() &&
        today.getFullYear() === lastOfMonth.getFullYear())
    )
      return true;
    return false;
  };

  const yearMonthDate = `${lastOfMonth.getFullYear()}-${
    lastOfMonth.getMonth() + 1
  }-${day}`;

  const handleClass = () => {
    setSelected(
      `${lastOfMonth.getFullYear()}-${lastOfMonth.getMonth() + 1}-${day}`
    );
  };

  const handlerDay = () => {
    dispatch(updateDate(yearMonthDate));
    dispatch(updateActive(true));
    handleClass();
  };

  return (
    <td>
      <button
        className={
          selected === calendarReserve.date.toString() && calendarReserve.active
            ? styles.selected
            : ""
        }
        disabled={disableCondition()}
        onClick={handlerDay}
      >
        {day}
      </button>
    </td>
  );
}
