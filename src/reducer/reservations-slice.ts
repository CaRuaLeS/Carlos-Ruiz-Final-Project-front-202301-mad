import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationStructure } from "../model/reservation";

export type ReservationsState = {
  userReservations: ReservationStructure[];
  reservations: ReservationStructure[];
};
const initialState: ReservationsState = {
  userReservations: [],
  reservations: [],
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    create(state, action: PayloadAction<ReservationStructure>) {
      state.reservations = [...state.reservations, action.payload];
    },
    deleteReservation(
      state,
      action: PayloadAction<ReservationStructure["id"]>
    ) {
      state.reservations = [...state.reservations].filter(
        (item) => item.id !== action.payload
      );
    },
    getAllReservations(state, action: PayloadAction<ReservationStructure[]>) {
      state.reservations = action.payload;
    },
    getUserReservations(state, action: PayloadAction<ReservationStructure[]>) {
      state.userReservations = action.payload;
    },
    getMonthReservations(state, action: PayloadAction<ReservationStructure[]>) {
      state.reservations = action.payload;
    },
  },
});

export const {
  create,
  deleteReservation,
  getAllReservations,
  getUserReservations,
  getMonthReservations,
} = reservationSlice.actions;
export const reservationReducer = reservationSlice.reducer;
