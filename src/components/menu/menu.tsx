import { Link } from "react-router-dom";
import { MenuOption } from "../app/app";

type MenuProps = {
  options: MenuOption[];
};

export function Menu({ options }: MenuProps) {
  return (
    <nav>
      <ul>
        {options.map((item) => (
          <li key={item.label}>
            <Link to={item.path}>
              <img className="home__image" src={item.image} alt={item.label} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
