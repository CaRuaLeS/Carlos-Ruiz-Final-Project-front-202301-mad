import { useParams } from "react-router-dom";

function Details() {
  const { escapeRoom } = useParams();

  console.log(escapeRoom);
  return (
    <>
      <h2>Details</h2>
      <div>{escapeRoom}</div>
    </>
  );
}
export default Details;
