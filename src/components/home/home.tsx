import { List } from "../list/list";

export function Home() {
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
    </section>
  );
}

export default Home;
