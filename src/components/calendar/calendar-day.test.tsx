/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { updateDate } from "../../reducer/calendar-slice";
import { store } from "../../store/store";
import { CalendarDay } from "./calendar-day";

jest.mock("../../hooks/use-reservations");

const handlerDay = jest.fn();

const groupMockElements = async (
  mockStateDate: string,
  mockDay: number,
  lastmonth: string
) => {
  (useReservations as jest.Mock).mockReturnValue({
    reservations: {
      reservations: [{ reserveDate: mockStateDate }],
    },
  });

  await act(async () => {
    render(
      <Provider store={store}>
        <CalendarDay day={mockDay} lastOfMonth={new Date(lastmonth)} />
      </Provider>
    );
  });
};

describe("Given the CalendarDay component", () => {
  describe("when the day is equal to the reserveDate", () => {
    beforeEach(async () => {
      groupMockElements("2023-3-1", 1, "2023-3-31");
    });
    test("then the button should be disabled", () => {
      const element = screen.getByRole("button");
      expect(element).toHaveAttribute("disabled");
    });
  });
  describe("when the day is not reserve and the button is pressed", () => {
    beforeEach(async () => {
      groupMockElements("2030-3-1", 30, "2025-3-31");
    });
    test("then it should call the handlerDay", async () => {
      const element = screen.getByRole("button");
      await fireEvent.click(element);
      expect(element).toBeInTheDocument();
    });
  });
  describe("when the day set is less than 1", () => {
    beforeEach(async () => {
      groupMockElements("2023-3-1", 0, "2023-3-31");
    });
    test("then it should display nothing", async () => {
      const element = screen.getByRole("button");
      expect(element).toHaveTextContent("");
    });
  });
  describe("when the day set is more than the last day of the month", () => {
    beforeEach(async () => {
      groupMockElements("2023-3-1", 32, "2023-3-31");
    });
    test("then it should display nothing", async () => {
      const element = screen.getByRole("button");
      expect(element).toHaveTextContent("");
    });
  });
  describe("when the day is a normal day without reserve", () => {
    beforeEach(async () => {
      groupMockElements("2025-7-15", 30, "2025-3-31");
    });
    test("then it should display the day", async () => {
      const element = screen.getByRole("button");
      expect(element).toHaveTextContent("30");
    });
  });
});
