import styles from "./card.module.scss";

import { Link } from "react-router-dom";
import { EscapeRoomStructure } from "../../model/escaperoom";

type RoomProps = {
  room: Partial<EscapeRoomStructure>;
};

export function Card({ room }: RoomProps) {
  return (
    <li className={styles.card}>
      <Link to={`/details/${room.id}`} className={styles.link}>
        <img
          className={styles.image}
          src={room.images![0]}
          alt={`${room.name} card`}
        ></img>
        <div className={styles.name}>{room.name}</div>
      </Link>
      <div className={styles.details}>
        <div className={styles.content}>
          <img src="./images/group.svg" alt="number of player" />
          {room.players}
        </div>
        <div className={styles.content}>
          <img src="./images/theme.svg" alt="theme" /> {room.theme}
        </div>
        <div className={styles.content}>
          <img src="./images/difficulty.svg" alt="difficulty" />
          {room.difficulty}
        </div>
      </div>
    </li>
  );
}
