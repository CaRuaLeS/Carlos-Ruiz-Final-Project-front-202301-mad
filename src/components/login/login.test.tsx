/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import userEvent from "@testing-library/user-event/";
import { Provider } from "react-redux";
import { render, screen, act } from "@testing-library/react";
import { useUsers } from "../../hooks/use-users";
import { UsersRepo } from "../../services/user-repo";
import { store } from "../../store/store";
import { LogIn } from "./login";

jest.mock("../../hooks/use-users");
const mockPasswd = "pass test";

jest.mock("../../hooks/use-users");

beforeEach(() => {
  act(() => {
    (useUsers as jest.Mock).mockReturnValue({ userLogin: jest.fn() });
  });
});

describe("Given the login function", () => {
  describe("when you render the component login", () => {
    test("then the email and passwd should be in the document", async () => {
      render(
        <Provider store={store}>
          <LogIn></LogIn>
        </Provider>
      );
      const elements = screen.getAllByRole("textbox");
      expect(elements[0]).toBeInTheDocument();
      expect(elements[1]).toBeInTheDocument();
    });
  });
  describe("when you you press the submit button", () => {
    test("then the email and passwd should be send", async () => {
      const mockRepo = {} as UsersRepo;
      render(
        <Provider store={store}>
          <LogIn></LogIn>
        </Provider>
      );
      const inputs = screen.getAllByRole("textbox");
      const fireButton = screen.getByRole("button");

      await userEvent.type(inputs[0], "test");
      await userEvent.type(inputs[1], "pass test");
      await userEvent.click(fireButton);
      expect(fireButton).toBeInTheDocument();
      expect(useUsers(mockRepo).userLogin).toBeCalledWith({
        email: "test",
        password: mockPasswd,
      });
    });
  });
});
