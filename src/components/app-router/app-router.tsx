import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MenuOption } from "../app/app";

const Home = lazy(() => import("../home/home"));
const Profile = lazy(() => import("../profile/profile"));

type AppRouterProps = {
  menuOptions: MenuOption[];
};

export function AppRouter({ menuOptions }: AppRouterProps) {
  return (
    <Suspense>
      <Routes>
        <Route path={"/"} element={<Home></Home>}></Route>
        <Route path={menuOptions[0].path} element={<Home></Home>}></Route>
        <Route path={menuOptions[1].path} element={<Profile></Profile>}></Route>
        {/* No implementation (in progress)
        <Route
          path={"/details/:escapeRoom"}
          element={<Details></Details>}
        ></Route> */}
        {/* Ruta para la pagina de error */}
      </Routes>
    </Suspense>
  );
}
