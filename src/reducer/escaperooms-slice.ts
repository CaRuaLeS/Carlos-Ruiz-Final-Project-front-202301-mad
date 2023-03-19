import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EscapeRoom, EscapeRoomStructure } from "../model/escaperoom";

export type State = {
  detailsRoom: EscapeRoomStructure;
  escapeRooms: EscapeRoomStructure[];
};
const initialState: State = {
  detailsRoom: {} as EscapeRoomStructure,
  escapeRooms: [],
};

export const escaperoomSlice = createSlice({
  name: "escaperoom",
  initialState,
  reducers: {
    getAllEscaperooms(state, action: PayloadAction<EscapeRoomStructure>) {
      state.escapeRooms = [action.payload];
    },
    getByThemeEscaperooms(state, action: PayloadAction<EscapeRoomStructure>) {
      state.escapeRooms = [action.payload];
    },
    // Falta añadir si se selecciona 1 sola escaperoom
  },
});
