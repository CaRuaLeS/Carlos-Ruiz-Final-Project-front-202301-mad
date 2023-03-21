/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { useEscapeRooms } from "../../hooks/use-escaperooms";
import { store } from "../../store/store";
import { List } from "../list/list";
import Home from "./home";

jest.mock("../list/list");
jest.mock("../../hooks/use-escaperooms");

describe("Given the Home component", () => {
  const mockGetAll = jest.fn();
  const mockGetByTheme = jest.fn();

  beforeEach(() => {
    (useEscapeRooms as jest.Mock).mockReturnValue({
      escaperoomGetAll: mockGetAll,
      escaperoomGetByTheme: mockGetByTheme,
    });
    render(
      <Provider store={store}>
        <Home></Home>
      </Provider>
    );
  });

  describe("when it renders", () => {
    test("then it renders List component", () => {
      expect(List).toHaveBeenCalled();
    });
  });
  describe("when it you select the dropdown", () => {
    test("then if you select ALL", () => {
      const select = screen.getByRole("combobox");
      fireEvent.change(select, { target: { value: "All" } });
      expect(mockGetAll).toHaveBeenCalled();
    });
    test("then if you select One Theme", () => {
      const select = screen.getByRole("combobox");
      fireEvent.change(select, { target: { value: "Fantasy" } });
      expect(mockGetByTheme).toHaveBeenCalled();
    });
  });
});
