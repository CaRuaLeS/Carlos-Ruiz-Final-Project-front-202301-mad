import styles from "./calendar.module.scss";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { updateEscaperoom } from "../../reducer/calendar-slice";
import { ReservationsRepo } from "../../services/reservation-repo";
import { AppDispatch, RootState } from "../../store/store";
import { CalendarReserve } from "../calendarReserve/calendar-reserve";
import { CalendarWeek } from "./calendar-week";

interface Props {
  monthOffset: number;
  roomId: string;
}

export function Calendar({ monthOffset, roomId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const calendarReserve = useSelector((state: RootState) => state.calendar);

  const repoReservations = useMemo(() => new ReservationsRepo(), []);
  const { reservationGetFilterMonth } = useReservations(repoReservations);

  // #region Calendar logic
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
    rows.push(
      <CalendarWeek
        key={i + 50}
        week={i}
        lastOfMonth={lastOfMonth}
        offset={offset}
      />
    );
  }
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // #endregion

  const yearMonth: string =
    lastOfMonth.getFullYear() + "-" + (firstOfMonth.getMonth() + 1);

  useEffect(() => {
    reservationGetFilterMonth(yearMonth, roomId);
    dispatch(updateEscaperoom(roomId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservationGetFilterMonth, yearMonth, dispatch]);

  return (
    <>
      <p>
        {month[lastOfMonth.getMonth()]} {lastOfMonth.getFullYear()}
      </p>
      <table className={styles.calendar}>
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
        <tbody>{rows}</tbody>
      </table>
      {calendarReserve.active ? <CalendarReserve></CalendarReserve> : undefined}
    </>
  );
}
