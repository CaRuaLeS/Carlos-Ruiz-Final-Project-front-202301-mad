import { useReservations } from "../../hooks/use-reservations";
import { ReservationsRepo } from "../../services/reservation-repo";
import { ReserveInfo } from "../calendar/calendar";

interface reservationCalendar {
  reservation: ReserveInfo;
}

export function CalendarReserve({ reservation }: reservationCalendar) {
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
          //reservationCreate(reserve)
          console.log(reservation);
        }}
      >
        Reservar
      </button>
    </>
  );
}
