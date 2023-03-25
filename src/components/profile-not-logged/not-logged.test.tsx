/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen } from "@testing-library/react";
import { LogIn } from "../login/login";
import { Register } from "../register/register";
import NotLogged from "./not-logged";

jest.mock("../login/login");
jest.mock("../register/register");

beforeEach(() => {
  render(<NotLogged></NotLogged>);
});

describe("Given the NotLogged component", () => {
  describe("when we render it", () => {
    test("then register have been called", () => {
      expect(Register).toHaveBeenCalled();
    });
  });
  describe("when we check the buttons", () => {
    test("then they should be in the document", () => {
      const button = screen.getAllByRole("button");

      fireEvent.click(button[0]);
      fireEvent.click(button[1]);
      expect(button[0]).toBeInTheDocument();
      expect(button[1]).toBeInTheDocument();
    });
    test("then if pressed the first button, it should called the LogIn component", () => {
      const button = screen.getAllByRole("button");
      fireEvent.click(button[1]);
      expect(LogIn).toHaveBeenCalled();
    });
  });
});
