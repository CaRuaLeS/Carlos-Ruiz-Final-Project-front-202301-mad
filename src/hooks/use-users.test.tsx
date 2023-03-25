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
  let mockUsersRepo: UsersRepo;

  beforeEach(async () => {
    mockPayload = {
      username: "test",
      email: "test",
    } as unknown as UserStructure;

    mockUsersRepo = {
      create: jest.fn(),
      update: jest.fn(),
      readId: jest.fn(),
    } as unknown as UsersRepo;

    const TestUserComponent = function () {
      const { userRegister, userLogin, userUpdate, userReadId } =
        useUsers(mockUsersRepo);

      return (
        <>
          <button onClick={() => userRegister(mockPayload)}>register</button>
          <button onClick={() => userLogin(mockPayload)}>login</button>
          <button onClick={() => userUpdate(mockPayload, "testToken")}>
            update
          </button>
          <button onClick={() => userReadId("testToken")}>readId</button>
        </>
      );
    };

    await act(async () =>
      render(
        <Provider store={store}>
          <TestUserComponent></TestUserComponent>
        </Provider>
      )
    );
  });

  describe("when the TestUserComponent is rendered", () => {
    test("then the buttons should be in the document", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements[0]).toBeInTheDocument();
      expect(elements[1]).toBeInTheDocument();
      expect(elements[2]).toBeInTheDocument();
      expect(elements[3]).toBeInTheDocument();
    });
  });
  describe("when the REGISTER button of TestUserComponent is called", () => {
    test("then the userRegister should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[0]));
      expect(mockUsersRepo.create).toHaveBeenCalled();
    });
  });
  describe("when the LOGIN button of TestUserComponent is called", () => {
    test("then the userLogin should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[1]));
      expect(mockUsersRepo.create).toHaveBeenCalled();
    });
  });
  describe("when the USERUPDATE button of TestUserComponent is called", () => {
    test("then the update of the repo should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[2]));
      expect(mockUsersRepo.update).toHaveBeenCalled();
    });
  });
  describe("when the USERREADID button of TestUserComponent is called", () => {
    test("then the readId of the repo should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[3]));
      expect(mockUsersRepo.readId).toHaveBeenCalled();
    });
  });
});
