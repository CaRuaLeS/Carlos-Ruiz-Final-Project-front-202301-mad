import { useEffect } from "react";
import { ReservationsRepo } from "../../services/reservation-repo";
import { useReservations } from "../../hooks/use-reservations";
import { UsersRepo } from "../../services/user-repo";
import { useUsers } from "../../hooks/use-users";

export function LoggedAccount() {
  const repoReservations = new ReservationsRepo();
  const repoUsers = new UsersRepo();
  const { reservations, reservationGetUser } =
    useReservations(repoReservations);
  const { users, userReadId } = useUsers(repoUsers);

  useEffect(() => {
    reservationGetUser(users.extraInfo.token!);
    userReadId(users.extraInfo.token!);
  }, []);

  return (
    <section className="list">
      <div>list account</div>
      <ul className="list__ul">{}</ul>
    </section>
  );
}
