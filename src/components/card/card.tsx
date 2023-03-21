import "./card.css";
import { Link } from "react-router-dom";
import { EscapeRoomStructure } from "../../model/escaperoom";

type RoomProps = {
  room: Partial<EscapeRoomStructure>;
};

export function Card({ room }: RoomProps) {
  return (
    <li className="room-card">
      <Link to={`/details/${room.id}`}>
        <img
          className="room-card__image"
          src={room.images![0]}
          alt={`${room.name} card`}
        ></img>
        <div className="room-card__name">{room.name}</div>
      </Link>
      <div className="room-card__details">
        <div>{room.players}</div>
        <div>Theme: {room.theme}</div>
        <div>Difficulty: {room.difficulty}</div>
      </div>
    </li>
  );
}
