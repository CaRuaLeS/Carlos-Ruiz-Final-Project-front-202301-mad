import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EscapeRoomStructure } from "../model/escaperoom";

export type EscaperoomState = {
  detailsRoom: EscapeRoomStructure;
  escapeRooms: EscapeRoomStructure[];
};
const initialState: EscaperoomState = {
  detailsRoom: {} as EscapeRoomStructure,
  escapeRooms: [],
};

export const escaperoomSlice = createSlice({
  name: "escaperoom",
  initialState,
  reducers: {
    getAllEscaperooms(state, action: PayloadAction<EscapeRoomStructure[]>) {
      state.escapeRooms = action.payload;
    },
    getByIdEscaperooms(state, action: PayloadAction<EscapeRoomStructure>) {
      state.detailsRoom = action.payload;
    },
    getByThemeEscaperooms(state, action: PayloadAction<EscapeRoomStructure>) {
      state.escapeRooms = [action.payload];
    },
    // Falta añadir si se selecciona 1 sola escaperoom
  },
});

export const { getAllEscaperooms, getByThemeEscaperooms } =
  escaperoomSlice.actions;

export const escaperoomReducer = escaperoomSlice.reducer;
