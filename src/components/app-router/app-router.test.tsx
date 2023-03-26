import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../store/store";
import { MenuOption } from "../app/app";
import { AppRouter } from "./app-router";

describe("Given the app router component", () => {
  const mockOptions: MenuOption[] = [
    { label: "Home", path: "/home" },
    { label: "Profile", path: "/profile" },
  ];

  const mockRouterFunctions = (num: number) => {
    render(
      <Provider store={store}>
        <Router initialEntries={["/home", "/profile"]} initialIndex={num}>
          <AppRouter menuOptions={mockOptions}></AppRouter>
        </Router>
      </Provider>
    );
  };

  describe("when the route is HOME", () => {
    test("then it should go to /home and render it", async () => {
      await waitFor(async () => mockRouterFunctions(0));
      const element = await screen.findByRole("heading", {
        name: "Home",
      });
      expect(element).toBeInTheDocument();
    });
  });
  describe("when the route is PROFILE", () => {
    test("then it should go to /profile and render it", async () => {
      await waitFor(async () => mockRouterFunctions(1));
      const element = await screen.findByText(/LOG OUT/i);
      expect(element).toBeInTheDocument();
    });
  });
});
