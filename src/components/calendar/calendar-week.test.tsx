/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import { useReservations } from "../../hooks/use-reservations";
import { CalendarWeek } from "./calendar-week";

jest.mock("../../hooks/use-reservations");

describe("Given the calendar week component", () => {
  const setState = jest.fn();

  beforeEach(async () => {
    (useReservations as jest.Mock).mockReturnValue({
      reservations: {
        reservations: [{ reserveDate: "2023-3-1" }],
      },
    });

    await act(async () => {
      render(
        <CalendarWeek
          week={1}
          offset={3}
          lastOfMonth={new Date(2023 - 3 - 31)}
        />
      );
    });
  });
  describe("when you render the week", () => {
    test("then <tr> should be in the document", () => {
      const element = screen.getByRole("row");
      expect(element).toBeInTheDocument();
    });
  });
});
