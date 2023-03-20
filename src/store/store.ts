import { configureStore } from "@reduxjs/toolkit";
import { escaperoomReducer } from "../reducer/escaperooms-slice";
import { userReducer } from "../reducer/users-slice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    escaperooms: escaperoomReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
