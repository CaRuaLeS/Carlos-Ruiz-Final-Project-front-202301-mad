import styles from "./card.module.scss";

import { Link } from "react-router-dom";
import { EscapeRoomStructure } from "../../model/escaperoom";

type RoomProps = {
  room: Partial<EscapeRoomStructure>;
};

export function Card({ room }: RoomProps) {
  return (
    <li className={styles.card}>
      <Link to={`/details/${room.id}`}>
        <img
          className={styles.image}
          src={room.images![0]}
          alt={`${room.name} card`}
        ></img>
        <div className={styles.name}>{room.name}</div>
      </Link>
      <div className={styles.details}>
        <div>{room.players}</div>
        <div>Theme: {room.theme}</div>
        <div>Difficulty: {room.difficulty}</div>
      </div>
    </li>
  );
}
