/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen } from "@testing-library/react";
import { Calendar } from "./calendar";

describe("Given the Calendar component", () => {
  beforeEach(async () => {
    render(<Calendar monthOffset={0}></Calendar>);
  });

  describe("when the CALENDAR component renders", () => {
    test("then it should contain a table", () => {
      const element = screen.getByRole("table");
      expect(element).toBeInTheDocument();
    });
  });
  describe("when you clic in the BUTTON of a day", () => {
    test("then it should check that is in the document", () => {
      const buttons = screen.getAllByRole("button");
      expect(buttons[0]).toBeInTheDocument();
    });
    test("then it should check that is clicked", () => {
      const buttons = screen.getAllByRole("button");
      fireEvent.click(buttons[0]);
      expect(buttons[0]).toBeInTheDocument();
    });
  });
});
