/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import { Provider } from "react-redux";
import { useUsers } from "../../hooks/use-users";
import { UsersRepo } from "../../services/user-repo";
import { store } from "../../store/store";
import { LogIn } from "./login";

jest.mock("../../hooks/use-users");

const mockPasswd = "pass test";

describe("Given the login function", () => {
  beforeEach(async () => {
    await act(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        userLogin: jest.fn(),
      });
      render(
        <Provider store={store}>
          <LogIn></LogIn>
        </Provider>
      );
    });
  });

  describe("when the component is rendered", () => {
    test("then it should get the texbox elements in the document", () => {
      const element = screen.getAllByRole("textbox");
      expect(element[0]).toBeInTheDocument();
      expect(element[1]).toBeInTheDocument();
    });
  });

  describe("when you get the submit button", () => {
    test("then it should be called", async () => {
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
    test("then it if you fire the button it should receive the inputs filed", async () => {
      const mockRepo = {} as UsersRepo;

      const element = screen.getAllByRole("textbox");
      const button = screen.getByRole("button");

      await userEvent.type(element[0], "email test");
      await userEvent.type(element[1], "pass test");

      await fireEvent.click(button);

      expect(button).toBeInTheDocument();
      expect(useUsers(mockRepo).userLogin).toBeCalledWith({
        email: "email test",
        password: mockPasswd,
      });
    });
  });
});
