/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { CalendarReserve } from "../calendarReserve/calendar-reserve";
import { Calendar } from "./calendar";
import { CalendarWeek } from "./calendar-week";

jest.mock("./calendar-week");
jest.mock("../../hooks/use-reservations");
jest.mock("../calendarReserve/calendar-reserve");
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Given the Calendar component", () => {
  const mockReservationGetFilterMonth = jest.fn();
  let mockDispatch = jest.fn();
  const mockReservation = {
    active: false,
    date: "",
  };
  beforeEach(async () => {
    (useReservations as jest.Mock).mockReturnValue({
      reservationGetFilterMonth: mockReservationGetFilterMonth,
    });
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    (useSelector as jest.Mock).mockReturnValue(mockReservation);

    await act(async () => {
      render(<Calendar monthOffset={0} roomId={"12345"}></Calendar>);
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
      const mockReservation = {
        active: true,
        date: "",
      };
      (useSelector as jest.Mock).mockReturnValue(mockReservation);
      (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
      render(<Calendar monthOffset={0} roomId={"12345"}></Calendar>);
    });
    test("then it should render the CalendarReserve component", () => {
      expect(CalendarReserve).toHaveBeenCalled();
    });
  });
});
