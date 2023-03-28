/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { store } from "../../store/store";
import { CalendarReserve } from "./calendar-reserve";

jest.mock("../../hooks/use-reservations");

describe("Given the CalendarReserve", () => {
  const mockReservationCreate = jest.fn();

  beforeEach(async () => {
    (useReservations as jest.Mock).mockReturnValue({
      reservationCreate: mockReservationCreate,
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <CalendarReserve />
        </Provider>
      );
    });
  });
  describe("when you render the component", () => {
    test("then it should render the button element inside the component", () => {
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
    });
  });
  describe("when you fire the button", () => {
    test("then it should call the reservationCreate and the dispatch", () => {
      const element = screen.getByRole("button");
      fireEvent.click(element);

      expect(mockReservationCreate).toHaveBeenCalled();

      const mockState = store.getState();

      expect(mockState.calendar.active).toEqual(false);
    });
  });
});
