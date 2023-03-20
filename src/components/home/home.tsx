import "./home.css";
import { useMemo } from "react";
import { useEscapeRooms } from "../../hooks/use-escaperooms";
import { EscaperoomsRepo } from "../../services/escaperoom-repo";
import { List } from "../list/list";

export function Home() {
  const repo = useMemo(() => new EscaperoomsRepo(), []);
  const { escaperoomGetAll, escaperoomGetByTheme } = useEscapeRooms(repo);

  return (
    <section className="home">
      <h2 className="home__title">Home</h2>
      <select
        onChange={async (element) => {
          const selectedTheme = element.target.value;
          selectedTheme === "All"
            ? escaperoomGetAll()
            : escaperoomGetByTheme(selectedTheme);
        }}
        className="home__select"
      >
        <option value="All" placeholder="Select a theme">
          All
        </option>
        <option value="Fantasy">Fantasy</option>
        <option value="Mistery">Mistery</option>
        <option value="Medieval">Medieval</option>
        <option value="Sci-fi">Sci-fi</option>
      </select>
      <List></List>
    </section>
  );
}

export default Home;
