import "./details.css";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useEscapeRooms } from "../../hooks/use-escaperooms";
import { EscaperoomsRepo } from "../../services/escaperoom-repo";
import { Calendar } from "../calendar/calendar";

function Details() {
  const { escapeRoom } = useParams();
  const roomIdString = escapeRoom;

  const repo = useMemo(() => new EscaperoomsRepo(), []);
  const { escaperooms, escaperoomGetById } = useEscapeRooms(repo);

  useEffect(() => {
    escaperoomGetById(roomIdString!);
  }, [escaperoomGetById, roomIdString]);

  const [monthNum, setMoreNumber] = useState(0);

  function handlerButton(num: number) {
    setMoreNumber(monthNum + num);
  }

  return (
    <>
      <h2 className="details-title">{escaperooms.detailsRoom.name}</h2>
      <section className="details">
        <div className="details-info">
          <img
            className="details-info__image"
            src={escaperooms.detailsRoom.images?.[1]}
            alt={`Details ${escaperooms.detailsRoom.name}`}
          />
          <div className="details-info__specs">
            <div>{escaperooms.detailsRoom.players}</div>
            <div>{escaperooms.detailsRoom.theme}</div>
            <div>{escaperooms.detailsRoom.difficulty}</div>
          </div>
          <p className="details-info__description">
            {escaperooms.detailsRoom.description}
          </p>
        </div>
        <div className="details-calendar">
          <button onClick={() => handlerButton(-1)}>Prev</button>
          <button onClick={() => handlerButton(1)}>Next</button>
          <Calendar monthOffset={monthNum}></Calendar>
        </div>
      </section>
    </>
  );
}
export default Details;
