import { EscapeRoomStructure } from "../../model/escaperoom";
import { ReservationStructure } from "../../model/reservation";

type ProfileProps = {
  reserves: any;
};

export function ProfileCard({ reserves }: ProfileProps) {
  return (
    <li className="reserves-card">
      <div>{reserves.escaperoom.name}</div>
      <div>{reserves.reserveDate}</div>
    </li>
  );
}
