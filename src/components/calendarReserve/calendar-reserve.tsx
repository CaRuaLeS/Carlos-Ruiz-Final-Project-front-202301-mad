import { ReserveInfo } from "../calendar/calendar";

interface reservationCalendar {
  reservation: ReserveInfo;
}

export function CalendarReserve({ reservation }: reservationCalendar) {
  // TEMP
  // const repoReservations = new ReservationsRepo();
  // // TEMP
  // const { reservationCreate } = useReservations(repoReservations);

  // TEMP
  // const reserve = {
  //   reserveDate: reservation.date,
  //   escaperoom: reservation.escaperoom,
  //   user: reservation.user,
  // };

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
