import styles from "../calendar/calendar.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { updateActive } from "../../reducer/calendar-slice";
import { ReservationsRepo } from "../../services/reservation-repo";
import { AppDispatch, RootState } from "../../store/store";

export function CalendarReserve() {
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector((state: RootState) => state.users);
  const calendarReserve = useSelector((state: RootState) => state.calendar);

  const repoReservations = new ReservationsRepo();
  const { reservationCreate } = useReservations(repoReservations);

  const reserve = {
    reserveDate: calendarReserve.date,
    escaperoom: calendarReserve.escaperoom,
    user: calendarReserve.user,
  };

  return (
    <>
      <button
        className={styles.reserve}
        onClick={() => {
          reservationCreate(reserve, users.extraInfo.token!);
          dispatch(updateActive(false));
        }}
      >
        Reservar
      </button>
    </>
  );
}
