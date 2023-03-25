/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useReservations } from "../../hooks/use-reservations";
import { ReserveInfo } from "../calendar/calendar";
import { CalendarReserve } from "./calendar-reserve";

jest.mock("../../hooks/use-reservations");

describe("Given the CalendarReserve", () => {
  const mockReservationCreate = jest.fn();
  const mockReservation = {
    date: "1234",
    escaperoom: "234",
    user: "098",
  } as ReserveInfo;

  beforeEach(async () => {
    (useReservations as jest.Mock).mockReturnValue({
      reservationCreate: mockReservationCreate,
    });

    await act(async () => {
      render(<CalendarReserve reservation={mockReservation} />);
    });
  });
  describe("when you render the component", () => {
    test("then it should render the <table> element inside the component", () => {
      const spy = jest.spyOn(console, "log");
      const element = screen.getByRole("button");
      fireEvent.click(element);
      expect(spy).toHaveBeenCalled();
    });
  });
});
