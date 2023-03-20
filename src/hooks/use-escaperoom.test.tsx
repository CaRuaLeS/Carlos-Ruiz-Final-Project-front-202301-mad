/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import { Provider } from "react-redux";
import { EscaperoomsRepo } from "../services/escaperoom-repo";
import { store } from "../store/store";
import { useEscapeRooms } from "./use-escaperooms";

describe("Given the useEscaperooms hook", () => {
  let mockRoomsRepo: EscaperoomsRepo;

  beforeEach(async () => {
    mockRoomsRepo = {
      getByTheme: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
    } as unknown as EscaperoomsRepo;

    const TestERComponent = function () {
      const { escaperoomGetAll, escaperoomGetByTheme, escaperoomGetById } =
        useEscapeRooms(mockRoomsRepo);

      return (
        <>
          <button onClick={() => escaperoomGetAll()}>getAll</button>
          <button onClick={() => escaperoomGetByTheme("test")}>
            getByTheme
          </button>
          <button onClick={() => escaperoomGetById("1234")}>getById</button>
        </>
      );
    };

    await act(async () =>
      render(
        <Provider store={store}>
          <TestERComponent></TestERComponent>
        </Provider>
      )
    );
  });

  describe("when Testcomponent renders", () => {
    test("then buttons should be in the document", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements[1]).toBeInTheDocument();
      expect(elements[0]).toBeInTheDocument();
      expect(elements[2]).toBeInTheDocument();
    });
  });

  describe("when escaperoomGetAll of the test component is called", () => {
    test("then the getAll of the repo should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[0]));
      expect(mockRoomsRepo.getAll).toHaveBeenCalled();
    });
  });

  describe("when escaperoomGetById is called (testComponent)", () => {
    test("then getById if the repo shouldve been called", async () => {
      const mockButtons = await screen.findAllByRole("button");
      await act(async () => userEvent.click(mockButtons[2]));
      expect(mockRoomsRepo.getById).toHaveBeenCalled();
    });
  });

  describe("when escaperoomGetByTheme of the test component is called", () => {
    test("then the getByTheme of the repo should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[1]));
      expect(mockRoomsRepo.getByTheme).toHaveBeenCalled();
    });
  });
});
