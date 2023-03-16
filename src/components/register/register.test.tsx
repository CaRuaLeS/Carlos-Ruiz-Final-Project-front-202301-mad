/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import { Provider } from "react-redux";
import { useUsers } from "../../hooks/use-users";
import { UsersRepo } from "../../services/user-repo";
import { store } from "../../store/store";
import { Register } from "./register";

jest.mock("../../hooks/use-users");

const mockPasswd = "pass test";

describe("Given the register function", () => {
  beforeEach(async () => {
    await act(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        userRegister: jest.fn(),
      });
      render(
        <Provider store={store}>
          <Register></Register>
        </Provider>
      );
    });
  });

  describe("when the regsiter component is rendered", () => {
    test("then it should get the texbox elements in the document(username, email, passwd)", () => {
      const element = screen.getAllByRole("textbox");
      expect(element[0]).toBeInTheDocument();
      expect(element[1]).toBeInTheDocument();
      expect(element[2]).toBeInTheDocument();
    });
  });

  describe("when you get the submit register button", () => {
    test("then it should called the register button", async () => {
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
    test("then if you fire the button it should receive the inputs and  they have been called", async () => {
      const mockRepo = {} as UsersRepo;

      const element = screen.getAllByRole("textbox");
      const button = screen.getByRole("button");

      await userEvent.type(element[0], "user test");
      await userEvent.type(element[1], "email test");
      await userEvent.type(element[2], "pass test");

      await fireEvent.click(button);

      expect(button).toBeInTheDocument();
      expect(useUsers(mockRepo).userRegister).toBeCalledWith({
        username: "user test",
        email: "email test",
        password: mockPasswd,
      });
    });
  });
});
