import { PayloadAction } from "@reduxjs/toolkit";
import { UserStructure } from "../model/user";
import { userReducer, State } from "./users-slice";

const mockPasswd = "test";

const mockUser = {
  id: "3",
  username: "foo",
  email: "foo",
  password: mockPasswd,
};
const mockInitialState: State = {
  userLogged: {} as UserStructure,
  users: [],
};

describe("Given the userSlice", () => {
  describe("When the method REGISTER is called", () => {
    test("Then it should return in element.users the mock user on an array", () => {
      const mockRegisterAction: PayloadAction<UserStructure> = {
        type: "user/register",
        payload: mockUser,
      };
      const element = userReducer(mockInitialState, mockRegisterAction);
      expect(element.users).toEqual([mockUser]);
    });
  });
  describe("When the method LOGIN is called", () => {
    test("Then it should return in element.userLogged the mock user as an object", () => {
      const mockLoginAction: PayloadAction<UserStructure> = {
        type: "user/login",
        payload: mockUser,
      };
      const element = userReducer(mockInitialState, mockLoginAction);
      expect(element.userLogged).toBe(mockUser);
    });
  });
  describe("When the method LOGOUT is called", () => {
    test("Then it should return the state undefined", () => {
      const mockLogout = {
        type: "user/logout",
      };
      const element = userReducer(mockInitialState, mockLogout);
      expect(element.userLogged.token).toBe(undefined);
    });
  });
  describe("When the method UPDATEUSER is called", () => {
    const mockUpdateInitialState: State = {
      userLogged: {
        username: "foo",
        avatar: "12345",
      } as UserStructure,
      users: [],
    };
    const mockUpdate = {
      username: "pepe",
    } as UserStructure;
    test("Then it should return the state undefined", () => {
      const mockLoadUser: PayloadAction<UserStructure> = {
        type: "user/updateUser",
        payload: mockUpdate,
      };
      const element = userReducer(mockUpdateInitialState, mockLoadUser);
      expect(element.userLogged).toStrictEqual({
        username: "pepe",
        avatar: "12345",
      });
    });
  });
  describe("When the method LOADUSER is called", () => {
    test("Then it should return the state undefined", () => {
      const mockLoadUser: PayloadAction<UserStructure> = {
        type: "user/loadUser",
        payload: mockUser,
      };
      const element = userReducer(mockInitialState, mockLoadUser);
      expect(element.userLogged).toBe(mockUser);
    });
  });
});
