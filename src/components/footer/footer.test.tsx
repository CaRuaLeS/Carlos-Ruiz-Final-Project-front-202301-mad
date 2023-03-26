import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Given the footer component", () => {
  render(<Footer></Footer>);
  describe("when we render it", () => {
    test("then it should have the heading", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
