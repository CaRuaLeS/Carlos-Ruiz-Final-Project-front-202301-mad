import { useState } from "react";
import { List } from "../list/list";
import { Calendar } from "./calendar";

export function Home() {
  const [monthNum, setMoreNumber] = useState(0);

  function handlerButtom() {
    setMoreNumber(monthNum + 1);
  }

  return (
    <section className="home">
      <h2 className="home__title">Home</h2>
      <select className="home__select">
        <option value="All" placeholder="Select a theme"></option>
        <option value="Fantasy">Fantasy</option>
        <option value="Mistery">Mistery</option>
        <option value="Medieval">Medieval</option>
        <option value="Sci-fi">Sci-fi</option>
      </select>
      <List></List>
      <button onClick={() => handlerButtom()}></button>
      <Calendar monthOffset={monthNum}></Calendar>
    </section>
  );
}

export default Home;
