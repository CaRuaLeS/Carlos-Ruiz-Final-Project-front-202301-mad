import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStructure } from "../model/user";

export type State = {
  extraInfo: Partial<UserStructure>;
  userLogged: Partial<UserStructure>;
  users: UserStructure[];
};

const initialState: State = {
  extraInfo: {
    token: localStorage.getItem("token"),
  },
  userLogged: {},
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
      state.extraInfo = action.payload;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.extraInfo.token = null;
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
