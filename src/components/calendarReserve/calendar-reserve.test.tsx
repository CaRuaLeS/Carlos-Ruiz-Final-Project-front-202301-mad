/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { store } from "../../store/store";
import { CalendarReserve } from "./calendar-reserve";

jest.mock("../../hooks/use-reservations");
// jest.mock("react-redux", () => ({
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
// }));

describe("Given the CalendarReserve", () => {
  const mockReservationCreate = jest.fn();
  let usersMock;
  let mockDispatch = jest.fn();

  beforeEach(async () => {
    (useReservations as jest.Mock).mockReturnValue({
      reservationCreate: mockReservationCreate,
    });

    usersMock = {
      extraInfo: {
        token: undefined,
      },
    };
    // (useSelector as jest.Mock).mockReturnValue(usersMock);
    // (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

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
