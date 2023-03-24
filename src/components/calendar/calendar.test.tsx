/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { useState } from "react";
import { useReservations } from "../../hooks/use-reservations";
import { Calendar } from "./calendar";
import { CalendarWeek } from "./calendar-week";

jest.mock("./calendar-week");
jest.mock("../../hooks/use-reservations");

describe("Given the Calendar component", () => {
  const mockReservationGetFilterMonth = jest.fn();
  beforeEach(async () => {
    (useReservations as jest.Mock).mockReturnValue({
      reservationGetFilterMonth: mockReservationGetFilterMonth,
    });

    await act(async () => {
      render(<Calendar monthOffset={0} roomId={"12345"}></Calendar>);
    });
  });

  describe("when the CALENDAR component renders", () => {
    test("then it should render the CalendarWeek component", () => {
      expect(CalendarWeek).toBeInTheDocument();
    });
  });
  describe("when you render the calendar", () => {
    test("then it should render the CalendarWeek component", () => {
      const element = screen.getByRole("table");
      expect(element).toBeInTheDocument();
    });
  });
});
