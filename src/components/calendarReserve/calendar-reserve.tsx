import { useSelector } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { ReservationsRepo } from "../../services/reservation-repo";
import { RootState } from "../../store/store";
import { ReserveInfo } from "../calendar/calendar";

interface reservationCalendar {
  reservation: ReserveInfo;
}

export function CalendarReserve({ reservation }: reservationCalendar) {
  const users = useSelector((state: RootState) => state.users);

  const repoReservations = new ReservationsRepo();
  const { reservationCreate } = useReservations(repoReservations);

  const reserve = {
    reserveDate: reservation.date,
    escaperoom: reservation.escaperoom,
    user: reservation.user,
  };

  return (
    <>
      <button
        onClick={() => {
          reservationCreate(reserve, users.extraInfo.token!);
          console.log(reservation);
        }}
      >
        Reservar
      </button>
    </>
  );
}
