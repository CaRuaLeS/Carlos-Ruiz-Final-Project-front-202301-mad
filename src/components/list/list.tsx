import { useEffect, useMemo } from "react";
import { useEscapeRooms } from "../../hooks/use-escaperooms";
import { EscapeRoomStructure } from "../../model/escaperoom";
import { EscaperoomsRepo } from "../../services/escaperoom-repo";
import { Card } from "../card/card";

export function List() {
  // Use effect with all the escaperooms\
  const repo = useMemo(() => new EscaperoomsRepo(), []);
  const { escaperooms, escaperoomGetAll } = useEscapeRooms(repo);

  useEffect(() => {
    escaperoomGetAll();
    console.log("object");
  }, []);

  return (
    <section className="list">
      <div>list</div>
      <ul className="list__ul">
        {
          /* { Map with each card } */
          escaperooms.escapeRooms.map((item: Partial<EscapeRoomStructure>) => (
            <Card key={item.id} room={item}></Card>
          ))
        }
      </ul>
    </section>
  );
}
