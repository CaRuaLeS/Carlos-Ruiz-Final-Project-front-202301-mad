/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { UserStructure } from "../model/user";
import { UsersRepo } from "../services/user-repo";
import { store } from "../store/store";
import { useUsers } from "./use-users";

describe("Given the useUsers hook", () => {
  let mockPayload: UserStructure;
  let mockRepo: UsersRepo;
  let mockErrorRepo: UsersRepo;

  beforeEach(async () => {
    mockPayload = {
      username: "test",
      email: "test",
    } as unknown as UserStructure;

    mockRepo = {
      create: jest.fn(),
    } as unknown as UsersRepo;

    const TestComponent = function () {
      const { userRegister, userLogin } = useUsers(mockRepo);

      return (
        <>
          <button onClick={() => userRegister(mockPayload)}>register</button>
          <button onClick={() => userLogin(mockPayload)}>login</button>
        </>
      );
    };

    await act(async () =>
      render(
        <Provider store={store}>
          <TestComponent></TestComponent>
        </Provider>
      )
    );
  });

  describe("when the TestComponent is rendered", () => {
    test("then the buttons should be in the document", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements[0]).toBeInTheDocument();
      expect(elements[1]).toBeInTheDocument();
    });
  });
  describe("when the REGISTER button of TestComponent is called", () => {
    test("then the userRegister should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[0]));
      expect(mockRepo.create).toHaveBeenCalled();
    });
  });
  describe("when the LOGIN button of TestComponent is called", () => {
    test("then the userLogin should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[1]));
      expect(mockRepo.create).toHaveBeenCalled();
    });
  });
});
