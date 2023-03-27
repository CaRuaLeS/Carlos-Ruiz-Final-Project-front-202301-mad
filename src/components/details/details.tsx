import styles from "./details.module.scss";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useEscapeRooms } from "../../hooks/use-escaperooms";
import { EscaperoomsRepo } from "../../services/escaperoom-repo";
import { Calendar } from "../calendar/calendar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { updateActive } from "../../reducer/calendar-slice";

function Details() {
  const { escapeRoom } = useParams();
  const roomIdString = escapeRoom;

  const repoEscaperoom = useMemo(() => new EscaperoomsRepo(), []);
  const { escaperooms, escaperoomGetById } = useEscapeRooms(repoEscaperoom);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    escaperoomGetById(roomIdString!);
  }, [escaperoomGetById, roomIdString]);

  const [monthNum, setMoreNumber] = useState(0);

  function handlerButton(num: number) {
    setMoreNumber(monthNum + num);
    dispatch(updateActive(false));
  }

  return (
    <>
      <h2 className={styles.title}>{escaperooms.detailsRoom.name}</h2>
      <section className={styles.details}>
        <div className={styles.detailsInfo}>
          <img
            className={styles.detailsImage}
            src={escaperooms.detailsRoom.images?.[1]}
            alt={`Details ${escaperooms.detailsRoom.name}`}
          />
          <div className="details-info__specs">
            <div>{escaperooms.detailsRoom.players}</div>
            <div>{escaperooms.detailsRoom.theme}</div>
            <div>{escaperooms.detailsRoom.difficulty}</div>
          </div>
          <p className={styles.detailsDescription}>
            {escaperooms.detailsRoom.description}
          </p>
        </div>
        <div className={styles.calendar}>
          <button onClick={() => handlerButton(-1)} disabled={monthNum <= 0}>
            Prev
          </button>
          <button onClick={() => handlerButton(1)}>Next</button>
          <Calendar
            key={1}
            monthOffset={monthNum}
            roomId={roomIdString!}
          ></Calendar>
        </div>
      </section>
    </>
  );
}
export default Details;
