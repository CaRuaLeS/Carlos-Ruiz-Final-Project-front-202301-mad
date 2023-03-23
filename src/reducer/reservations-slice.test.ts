import { PayloadAction } from "@reduxjs/toolkit";
import { ReservationStructure } from "../model/reservation";
import { reservationReducer, ReservationsState } from "./reservations-slice";

const mockReservation = {
  id: "123",
  reserveDate: "2023-05-07",
  user: "id user test",
  escaperoom: "escaperoom id test",
};

const mockInitialState: ReservationsState = {
  userReservations: [],
  reservations: [],
};

const mockInitialStateReservations: ReservationsState = {
  userReservations: [],
  reservations: [
    {
      id: "123",
      reserveDate: "2023-05-03",
      user: "id user test",
      escaperoom: "escaperoom id test",
    },
    {
      id: "1234",
      reserveDate: "2023-05-05",
      user: "id user test 1",
      escaperoom: "escaperoom id test 1",
    },
  ],
};

describe("Given the reservationsSlice", () => {
  describe("when the method CREATE is called", () => {
    test("then it should return  the .reservations with the mock added", () => {
      const mockCreate: PayloadAction<ReservationStructure> = {
        type: "reservation/create",
        payload: mockReservation,
      };
      const element = reservationReducer(mockInitialState, mockCreate);
      expect(element.reservations).toEqual([mockReservation]);
    });
  });
  describe("when the method DELETE is called", () => {
    const mockActionIdForelete = "123";
    test("then it should return  the .reservations with the id deleted", () => {
      const mockDelete: PayloadAction<ReservationStructure["id"]> = {
        type: "reservation/deleteReservation",
        payload: mockActionIdForelete,
      };
      const element = reservationReducer(
        mockInitialStateReservations,
        mockDelete
      );
      expect(element.reservations).toEqual([
        {
          id: "1234",
          reserveDate: "2023-05-05",
          user: "id user test 1",
          escaperoom: "escaperoom id test 1",
        },
      ]);
    });
  });
  describe("when the method GetAllReservations is called", () => {
    test("then it should return  the .reservations with the complete mock", () => {
      const mockDelete: PayloadAction<ReservationStructure> = {
        type: "reservation/getAllReservations",
        payload: mockReservation,
      };
      const element = reservationReducer(mockInitialState, mockDelete);
      expect(element.reservations).toEqual(mockReservation);
    });
  });
  describe("when the method getUserReservations is called", () => {
    test("then it should return  the .userReservations with the complete mock", () => {
      const mockDelete: PayloadAction<ReservationStructure> = {
        type: "reservation/getUserReservations",
        payload: mockReservation,
      };
      const element = reservationReducer(mockInitialState, mockDelete);
      expect(element.userReservations).toEqual(mockReservation);
    });
  });
  describe("when the method getMonthReservations is called", () => {
    test("then it should return  the .reservations with the complete mock", () => {
      const mockDelete: PayloadAction<ReservationStructure> = {
        type: "reservation/getMonthReservations",
        payload: mockReservation,
      };
      const element = reservationReducer(mockInitialState, mockDelete);
      expect(element.reservations).toEqual(mockReservation);
    });
  });
});
