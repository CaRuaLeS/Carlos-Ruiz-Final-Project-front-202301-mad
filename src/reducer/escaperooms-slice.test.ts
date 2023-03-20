import { PayloadAction } from "@reduxjs/toolkit";
import { EscapeRoomStructure } from "../model/escaperoom";
import { escaperoomReducer, EscaperoomState } from "./escaperooms-slice";

const mockEscapeRoom = {
  id: "id test",
  name: "name test",
  players: "player test",
  difficulty: "difficulty test" as EscapeRoomStructure["difficulty"],
  theme: "theme test",
};

const mockInitialState: EscaperoomState = {
  detailsRoom: {} as EscapeRoomStructure,
  escapeRooms: [],
};

describe("Given the escaperoomSlice", () => {
  describe("When the method GETALLESCAPEROOMS is called", () => {
    test("then it should return in escapeRooms, the mock given", () => {
      const mockgetAllAction: PayloadAction<EscapeRoomStructure> = {
        type: "escaperoom/getAllEscaperooms",
        payload: mockEscapeRoom,
      };
      const element = escaperoomReducer(mockInitialState, mockgetAllAction);
      expect(element.escapeRooms).toEqual(mockEscapeRoom);
    });
  });
  describe("when we call the GETBYIDESCAPEROOMS method", () => {
    test("then", () => {
      const mockGetIdAction: PayloadAction<EscapeRoomStructure> = {
        type: "escaperoom/getByIdEscaperooms",
        payload: mockEscapeRoom,
      };
      const element = escaperoomReducer(mockInitialState, mockGetIdAction);
      expect(element.detailsRoom).toEqual(mockEscapeRoom);
    });
  });
  describe("When the method GETBYTHEMEESCAPEROOMS is called", () => {
    test("then it should return in escapeRooms, the mock given", () => {
      const mockgetByThemeAction: PayloadAction<EscapeRoomStructure> = {
        type: "escaperoom/getByThemeEscaperooms",
        payload: mockEscapeRoom,
      };
      const element = escaperoomReducer(mockInitialState, mockgetByThemeAction);
      expect(element.escapeRooms).toEqual([mockEscapeRoom]);
    });
  });
});
