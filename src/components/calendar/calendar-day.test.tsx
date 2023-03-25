/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useReservations } from "../../hooks/use-reservations";
import { CalendarDay } from "./calendar-day";

jest.mock("../../hooks/use-reservations");

const setState = jest.fn();
const groupMockElements = async (mockStateDate: string, mockDay: number) => {
  (useReservations as jest.Mock).mockReturnValue({
    reservations: {
      reservations: [{ reserveDate: mockStateDate }],
    },
  });

  await act(async () => {
    render(
      <CalendarDay
        day={mockDay}
        lastOfMonth={new Date(2023 - 3 - 31)}
        reserveSet={setState}
      />
    );
  });
};

describe("Given the CalendarDay component", () => {
  describe("when the day is equal to the reserveDate", () => {
    beforeEach(async () => {
      groupMockElements("2023-3-1", 1);
    });
    test("then the button should be disabled", () => {
      const element = screen.getByRole("button");
      // await fireEvent.click(element);
      expect(element).toHaveAttribute("disabled");
    });
  });
  describe("when the day is not reserve and the button is pressed", () => {
    beforeEach(async () => {
      groupMockElements("2023-3-1", 0);
    });
    test("then it should call the reserveSet(setState)", async () => {
      const element = screen.getByRole("button");
      await fireEvent.click(element);
      expect(setState).toHaveBeenCalled();
    });
  });
  describe("when the day set is less than 1", () => {
    beforeEach(async () => {
      groupMockElements("2023-3-1", 0);
    });
    test("then it should display nothing", async () => {
      const element = screen.getByRole("button");
      //await fireEvent.click(element);
      expect(element).toHaveTextContent("");
    });
  });
  describe("when the day set is more than the last day of the month", () => {
    beforeEach(async () => {
      groupMockElements("2023-3-1", 32);
    });
    test("then it should display nothing", async () => {
      const element = screen.getByRole("button");
      //await fireEvent.click(element);
      expect(element).toHaveTextContent("");
    });
  });
});
