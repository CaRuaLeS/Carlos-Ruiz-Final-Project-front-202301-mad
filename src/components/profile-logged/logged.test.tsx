/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, act, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { ReservationsState } from "../../reducer/reservations-slice";
import { store } from "../../store/store";
import { ProfileCard } from "../profile-card/profile-card";
import { LoggedAccount } from "./logged";

jest.mock("../../hooks/use-reservations");
jest.mock("../profile-card/profile-card");

describe("Given the LoggedAccount", () => {
  beforeEach(async () => {
    (useReservations as jest.Mock).mockReturnValue({
      reservations: {
        userReservations: [
          { id: "1", escaperoom: { name: "test name" } },
          { id: "2", escaperoom: { name: "test name 2" } },
        ],
      } as unknown as ReservationsState,

      reservationGetUser: jest.fn(),
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <LoggedAccount />
        </Provider>
      );
    });
  });
  describe("when we render it", () => {
    test("then the role <ul> have been called", () => {
      const element = screen.getByRole("list");
      expect(element).toBeInTheDocument();
    });
    test("then the component ProfileCard is called", () => {
      expect(ProfileCard).toHaveBeenCalled();
    });
  });
});
