import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStructure } from "../model/user";

export type State = {
  userLogged: Partial<UserStructure>;
  users: UserStructure[];
};

const initialState: State = {
  userLogged: {
    id: "",
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
  },
});

export const { register, login, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
