import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStructure } from "../model/user";

export type State = {
  userLogged: Partial<UserStructure>;
  users: UserStructure[];
};

const initialState: State = {
  userLogged: {
    username: "",
    avatar: "",
    token: localStorage.getItem("token"),
  } as Partial<UserStructure>,
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register(state, action: PayloadAction<UserStructure>) {
      state.users = [...state.users, action.payload];
    },
    login(state, action: PayloadAction<UserStructure>) {
      localStorage.setItem("token", action.payload.token!);
      state.userLogged = action.payload;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.userLogged.token = undefined;
    },
    updateUser(state, action: PayloadAction<UserStructure>) {
      state.userLogged = { ...state.userLogged, ...action.payload };
    },
    loadUser(state, action: PayloadAction<UserStructure>) {
      state.userLogged = action.payload;
    },
  },
});

export const { register, login, logout, updateUser, loadUser } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
