import styles from "./profile-card.module.scss";

import { useSelector } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { ReservationsRepo } from "../../services/reservation-repo";
import { RootState } from "../../store/store";

type ProfileProps = {
  reserves: any;
};

export function ProfileCard({ reserves }: ProfileProps) {
  const users = useSelector((state: RootState) => state.users);

  const repo = new ReservationsRepo();
  const { reservationDelete } = useReservations(repo);

  const handleDelete = () => {
    reservationDelete(reserves.id, users.extraInfo.token!);
  };

  return (
    <li className={styles.card}>
      <div className={styles.name}>{reserves.escaperoom.name}</div>
      <div className={styles.date}>{reserves.reserveDate}</div>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}
