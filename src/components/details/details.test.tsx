/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { MemoryRouter as Router } from "react-router-dom";
import Details from "./details";
import { EscaperoomState } from "../../reducer/escaperooms-slice";
import { useEscapeRooms } from "../../hooks/use-escaperooms";
import { Calendar } from "../calendar/calendar";

// Trying to mock a component IN PROCESS
// interface mockProp {
//   mockMonthOffset: number;
// }
// const comp =
//   () =>
//   ({ mockMonthOffset }: mockProp) => {
//     return <div data-testid="calendar">{mockMonthOffset}</div>;
//   };

jest.mock("../../hooks/use-escaperooms");
jest.mock(
  "../calendar/calendar"
  // Part of the mock component
  //, () => comp
);

describe("Given Details component", () => {
  beforeEach(async () => {
    (useEscapeRooms as jest.Mock).mockReturnValue({
      escaperooms: {
        detailsRoom: {
          name: "name test",
          images: ["image 0", "image 1"],
          players: "players test",
          theme: "theme test",
          difficulty: "difficulty test",
          description: "description test",
        },
        escapeRooms: [],
      } as unknown as EscaperoomState,

      escaperoomGetById: jest.fn(),
    });
    render(
      <Provider store={store}>
        <Router>
          <Details></Details>
        </Router>
      </Provider>
    );
  });
  describe("when it renders elements", () => {
    test("then it should render the heading", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
  describe("when it renders", () => {
    test("then it should render the calendar component", () => {
      expect(Calendar).toHaveBeenCalled();
    });
  });
  describe("when the buttons are pressed", () => {
    test("then both buttons should be in the document and fired", () => {
      const button = screen.getAllByRole("button");
      fireEvent.click(button[0]);
      fireEvent.click(button[1]);
      expect(button[0]).toBeInTheDocument();
      expect(button[1]).toBeInTheDocument();
    });
  });
});
