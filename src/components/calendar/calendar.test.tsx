/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { useState as useStateMock } from "react";
import { useReservations } from "../../hooks/use-reservations";
import { CalendarReserve } from "../calendarReserve/calendar-reserve";
import { Calendar } from "./calendar";
import { CalendarWeek } from "./calendar-week";

jest.mock("./calendar-week");
jest.mock("../../hooks/use-reservations");
jest.mock("../calendarReserve/calendar-reserve");

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("Given the Calendar component", () => {
  const mockSetState = jest.fn();
  const mockReservationGetFilterMonth = jest.fn();
  const mockReservationState = {
    active: false,
    date: "",
    escaperoom: "",
    user: "",
  };

  beforeEach(async () => {
    (useReservations as jest.Mock).mockReturnValue({
      reservationGetFilterMonth: mockReservationGetFilterMonth,
    });
    (useStateMock as jest.Mock).mockImplementation(() => [
      mockReservationState,
      mockSetState,
    ]);

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
    const mockSetState = jest.fn();
    const mockReservationGetFilterMonth = jest.fn();
    const mockReservationState = {
      active: true,
      date: "",
      escaperoom: "",
      user: "",
    };
    beforeEach(async () => {
      (useReservations as jest.Mock).mockReturnValue({
        reservationGetFilterMonth: mockReservationGetFilterMonth,
      });
      (useStateMock as jest.Mock).mockImplementation(() => [
        mockReservationState,
        mockSetState,
      ]);
      render(<Calendar monthOffset={0} roomId={"12345"}></Calendar>);
    });
    test("then it should render the CalendarReserve component", () => {
      expect(CalendarReserve).toHaveBeenCalled();
    });
  });
});
