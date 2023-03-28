/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { LoggedAccount } from "../profile-logged/logged";
import NotLogged from "../profile-not-logged/not-logged";
import Profile from "./profile";

jest.mock("../profile-not-logged/not-logged");
jest.mock("../profile-logged/logged");
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Given the profile component", () => {
  let handlerLogout: any;
  let usersMock;

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(handlerLogout);

    usersMock = {
      extraInfo: {
        token: undefined,
      },
    };
    (useSelector as jest.Mock).mockReturnValue(usersMock);
  });
  afterEach(() => jest.clearAllMocks());

  describe("when there IS NO TOKEN in the state", () => {
    test("then the NotLogged component is rendered", () => {
      render(<Profile />);
      expect(NotLogged).toHaveBeenCalled();
    });
  });
  describe("when there IS TOKEN in the state", () => {
    beforeEach(() => {
      handlerLogout = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(handlerLogout);

      usersMock = {
        extraInfo: {
          token: "123456",
        },
      };
      (useSelector as jest.Mock).mockReturnValue(usersMock);
    });
    test("then the LoggedAccount component is rendered", () => {
      render(<Profile />);
      expect(LoggedAccount).toHaveBeenCalled();
    });
  });
  describe("when the logut button is clicked", () => {
    beforeEach(() => {
      handlerLogout = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(handlerLogout);

      usersMock = {
        extraInfo: {
          token: "123456",
        },
      };
      (useSelector as jest.Mock).mockReturnValue(usersMock);
    });
    test("then logout handler should be called", () => {
      render(<Profile />);
      const element = screen.getByRole("button");
      fireEvent.click(element);
      expect(handlerLogout).toHaveBeenCalled();
    });
  });
});
