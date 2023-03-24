import { useEffect, useMemo, useState } from "react";
import { useReservations } from "../../hooks/use-reservations";
import { ReservationsRepo } from "../../services/reservation-repo";
import { CalendarReserve } from "../calendarReserve/calendar-reserve";
import { CalendarWeek } from "./calendar-week";

export type ReserveInfo = {
  active: boolean;
  date: string;
  escaperoom: string;
  user: string;
};
interface Props {
  monthOffset: number;
  roomId: string;
}

export function Calendar({ monthOffset, roomId }: Props) {
  const [reservation, setReservation] = useState({
    active: false,
    date: "",
    escaperoom: "",
    user: "",
  } as ReserveInfo);

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
        key={i + 10}
        week={i}
        lastOfMonth={lastOfMonth}
        offset={offset}
        reserveSet={
          setReservation as React.Dispatch<
            React.SetStateAction<Partial<ReserveInfo>>
          >
        }
      />
      //CalendarWeek(i, offset, lastOfMonth)
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

  const repoReservations = useMemo(() => new ReservationsRepo(), []);
  const { reservationGetFilterMonth } = useReservations(repoReservations);
  const yearMonth: string =
    lastOfMonth.getFullYear() + "-" + (firstOfMonth.getMonth() + 1);

  useEffect(() => {
    reservationGetFilterMonth(yearMonth, roomId);
    setReservation({ ...reservation, escaperoom: roomId, user: "12345" });
    console.log(roomId);
    console.log(reservation);
  }, [
    reservationGetFilterMonth,
    yearMonth,
    setReservation,
    reservation.escaperoom,
  ]);

  return (
    <>
      <p>
        {month[lastOfMonth.getMonth()]} {lastOfMonth.getFullYear()}
      </p>
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
        <tbody>{rows}</tbody>
      </table>
      {reservation.active ? (
        <CalendarReserve reservation={reservation}></CalendarReserve>
      ) : undefined}
    </>
  );
}
