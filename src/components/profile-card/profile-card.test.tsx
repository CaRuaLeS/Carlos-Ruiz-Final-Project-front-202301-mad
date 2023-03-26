/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { useReservations } from "../../hooks/use-reservations";
import { store } from "../../store/store";
import { ProfileCard } from "./profile-card";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));
jest.mock("../../hooks/use-reservations");

const mockReservationDelete = jest.fn();

const mockToken = {
  extraInfo: {
    token: "tokenTest",
  },
};
const mockReserve = {
  name: "name test",
  escaperoom: {
    name: "name test",
  },
};

describe("Given the card component", () => {
  beforeEach(async () => {
    (useSelector as jest.Mock).mockReturnValue(mockToken);

    (useReservations as jest.Mock).mockReturnValue({
      reservationDelete: mockReservationDelete,
    });

    await act(async () => {
      render(<ProfileCard reserves={mockReserve}></ProfileCard>);
    });
  });

  describe("when the CARD component is rendered", () => {
    test("then it should contain the list role", () => {
      const elements = screen.getAllByRole("listitem");
      expect(elements[0]).toBeInTheDocument();
    });
  });
  describe("when the we press the handlerDelete", () => {
    test("then it should call the resevationDelete", () => {
      const element = screen.getByRole("button");
      fireEvent.click(element);
      expect(mockReservationDelete).toHaveBeenCalled();
    });
  });
});
