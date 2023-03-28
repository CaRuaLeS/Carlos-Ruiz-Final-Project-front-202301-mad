/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { store } from "../../store/store";
import { CalendarReserve } from "../calendarReserve/calendar-reserve";
import { Calendar } from "./calendar";
import { CalendarWeek } from "./calendar-week";

jest.mock("./calendar-week");
jest.mock("../../hooks/use-reservations");
jest.mock("../calendarReserve/calendar-reserve");

describe("Given the Calendar component", () => {
  const mockReservationGetFilterMonth = jest.fn();

  beforeEach(async () => {
    (useReservations as jest.Mock).mockReturnValue({
      reservationGetFilterMonth: mockReservationGetFilterMonth,
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <Calendar monthOffset={0} roomId={"12345"}></Calendar>
        </Provider>
      );
    });
  });

  describe("when you render the calendar", () => {
    test("then it should render the <table> element inside the component", () => {
      const element = screen.getByRole("table");
      expect(element).toBeInTheDocument();
    });
    test("then it should render the CalendarWeek component", () => {
      expect(CalendarWeek).toHaveBeenCalled();
    });
  });

  describe("when the CALENDAR component renders", () => {
    beforeEach(async () => {
      (useReservations as jest.Mock).mockReturnValue({
        reservationGetFilterMonth: mockReservationGetFilterMonth,
      });
    });
    test("then it should render the CalendarReserve component", async () => {
      store.dispatch({
        type: "calendar/updateActive",
        payload: { active: true },
      });
      await act(async () => {
        render(
          <Provider store={store}>
            <Calendar monthOffset={0} roomId={"12345"}></Calendar>
          </Provider>
        );
      });
      expect(CalendarReserve).toHaveBeenCalled();
    });
  });
});
