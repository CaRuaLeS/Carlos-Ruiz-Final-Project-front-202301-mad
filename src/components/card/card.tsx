import { Link } from "react-router-dom";
import { EscapeRoomStructure } from "../../model/escaperoom";

type RoomProps = {
  room: Partial<EscapeRoomStructure>;
};

export function Card({ room }: RoomProps) {
  return (
    <li>
      <Link to={`/details/${room.id}`}>
        <p>{room.name}</p>
      </Link>
    </li>
  );
}
