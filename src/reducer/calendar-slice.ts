import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CalendarState = {
  active: boolean;
  date: string;
  escaperoom: string;
  user: string;
};
const initialState: CalendarState = {
  active: false,
  date: "",
  escaperoom: "",
  user: "",
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    updateActive(state, action: PayloadAction<boolean>) {
      state.active = action.payload;
    },
    updateDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    updateEscaperoom(state, action: PayloadAction<string>) {
      state.escaperoom = action.payload;
    },
  },
});

export const { updateActive, updateDate, updateEscaperoom } =
  calendarSlice.actions;

export const calendarReducer = calendarSlice.reducer;
