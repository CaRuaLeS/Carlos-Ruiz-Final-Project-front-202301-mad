import styles from "./app.module.scss";

import { AppRouter } from "../app-router/app-router";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import { Menu } from "../menu/menu";

export type MenuOption = {
  label: string;
  path: string;
  image?: string;
};
export const menuOptions: MenuOption[] = [
  { label: "Home", path: "/home", image: "./images/home_icon.svg" },
  { label: "Profile", path: "/profile", image: "./images/profile_icon.svg" },
];

export function App() {
  return (
    <>
      <Header>
        <Menu options={menuOptions}></Menu>
      </Header>
      <div className={styles.container}>
        <AppRouter menuOptions={menuOptions}></AppRouter>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
