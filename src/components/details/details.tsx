import { useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "../calendar/calendar";

function Details() {
  const { escapeRoom } = useParams();
  const [monthNum, setMoreNumber] = useState(0);

  function handlerButtom() {
    setMoreNumber(monthNum + 1);
  }

  console.log(escapeRoom);
  return (
    <>
      <h2>Details</h2>
      <div>{escapeRoom}</div>
      <button onClick={() => handlerButtom()}>Next</button>
      <Calendar monthOffset={monthNum}></Calendar>
    </>
  );
}
export default Details;
