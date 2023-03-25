/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { store } from "../../store/store";
import { ReserveInfo } from "../calendar/calendar";
import { CalendarReserve } from "./calendar-reserve";

jest.mock("../../hooks/use-reservations");
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Given the CalendarReserve", () => {
  const mockReservationCreate = jest.fn();
  const mockReservation = {
    date: "1234",
    escaperoom: "234",
    user: "098",
  } as ReserveInfo;

  let usersMock;

  beforeEach(async () => {
    (useReservations as jest.Mock).mockReturnValue({
      reservationCreate: mockReservationCreate,
    });

    usersMock = {
      extraInfo: {
        token: undefined,
      },
    };
    (useSelector as jest.Mock).mockReturnValue(usersMock);

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
  describe("when you press the button", () => {
    test("then it should called the reservationCreate function", () => {
      const element = screen.getByRole("button");
      fireEvent.click(element);
      expect(mockReservationCreate).toHaveBeenCalled();
    });
  });
});
