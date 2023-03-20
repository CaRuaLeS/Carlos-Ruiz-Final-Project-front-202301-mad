/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, act, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { useEscapeRooms } from "../../hooks/use-escaperooms";
import { EscaperoomState } from "../../reducer/escaperooms-slice";
import { EscaperoomsRepo } from "../../services/escaperoom-repo";
import { store } from "../../store/store";
import { Card } from "../card/card";
import { List } from "./list";

jest.mock("../card/card");
jest.mock("../../hooks/use-escaperooms");

describe("Given the List compoment", () => {
  beforeEach(async () => {
    (useEscapeRooms as jest.Mock).mockReturnValue({
      escaperooms: {
        escapeRooms: [
          { id: "1", name: "name 1" },
          { id: "2", name: "name 2" },
        ],
      } as unknown as EscaperoomState,

      escaperoomGetAll: jest.fn(),
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <List></List>
        </Provider>
      );
    });
  });
  describe("when we render the component", () => {
    test("then it should render the card component that contains list role", () => {
      const element = screen.getByRole("list");
      expect(element).toBeInTheDocument();
    });
    test("then CARD component should be called the number of array elements (2)", () => {
      expect(Card).toHaveBeenCalledTimes(2);
    });
  });
});
