/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import { Provider } from "react-redux";
import { ReservationStructure } from "../model/reservation";
import { ReservationsRepo } from "../services/reservation-repo";
import { store } from "../store/store";
import { useReservations } from "./use-reservations";

let mockPayload: ReservationStructure;
let mockReservationsRepo: ReservationsRepo;
let mockReservationErrorDelete: ReservationsRepo;

describe("Given the useReservations", () => {
  beforeEach(async () => {
    mockPayload = {
      username: "test",
      email: "test",
    } as unknown as ReservationStructure;

    mockReservationsRepo = {
      create: jest.fn(),
      delete: jest.fn(),
      getByUser: jest.fn(),
      getFilterMonth: jest.fn(),
      getAll: jest.fn(),
    } as unknown as ReservationsRepo;

    const TestReservationComponent = function () {
      const {
        reservationCreate,
        reservationDelete,
        reservationGetAll,
        reservationGetUser,
        reservationGetFilterMonth,
      } = useReservations(mockReservationsRepo);

      return (
        <>
          <button onClick={() => reservationCreate(mockPayload, "tokenTest")}>
            create
          </button>
          <button onClick={() => reservationDelete("1", "tokenTest")}>
            delete
          </button>
          <button onClick={() => reservationGetUser("tokenTest")}>
            getUser
          </button>
          <button onClick={() => reservationGetFilterMonth("2023-4", "12345")}>
            monthFilter
          </button>
          <button onClick={() => reservationGetAll()}>getAll</button>
        </>
      );
    };

    await act(async () =>
      render(
        <Provider store={store}>
          <TestReservationComponent></TestReservationComponent>
        </Provider>
      )
    );
  });
  describe("when render the TestComponent", () => {
    test("then all the buttons should be in the document", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements[0]).toBeInTheDocument();
      expect(elements[1]).toBeInTheDocument();
      expect(elements[2]).toBeInTheDocument();
      expect(elements[3]).toBeInTheDocument();
      expect(elements[4]).toBeInTheDocument();
    });
  });
  describe("when the reservationCeate is called", () => {
    test("then the create of the repo is called", async () => {
      const buttons = await screen.findAllByRole("button");
      await act(async () => userEvent.click(buttons[0]));
      expect(mockReservationsRepo.create).toHaveBeenCalled();
    });
  });
  describe("when the reservationDelete is called", () => {
    test("then the delete of the repo is called", async () => {
      const buttons = await screen.findAllByRole("button");
      await act(async () => userEvent.click(buttons[1]));
      expect(mockReservationsRepo.delete).toHaveBeenCalled();
    });
    test("then if you cant delete it should throw an error", async () => {
      mockReservationErrorDelete = {
        delete: jest.fn().mockImplementation(() => {
          throw new Error("Delete not possible");
        }),
      } as unknown as ReservationsRepo;

      const TestReservationDelete = function () {
        const { reservationDelete } = useReservations(
          mockReservationErrorDelete
        );

        return (
          <>
            <button onClick={() => reservationDelete("123", "tokenTest")}>
              delete
            </button>
          </>
        );
      };
      await act(async () =>
        render(
          <Provider store={store}>
            <TestReservationDelete></TestReservationDelete>
          </Provider>
        )
      );
      const buttons = await screen.findAllByRole("button");
      const spy = jest.spyOn(console, "error");

      await act(async () => userEvent.click(buttons[5]));
      expect(spy).toHaveBeenCalled();
    });
  });
  describe("when the reservationGetUser is called", () => {
    test("then the getUser of the repo is called", async () => {
      const buttons = await screen.findAllByRole("button");
      await act(async () => userEvent.click(buttons[2]));
      expect(mockReservationsRepo.getByUser).toHaveBeenCalled();
    });
  });
  describe("when the reservationGetFilterMonth is called", () => {
    test("then the getFilterMonth of the repo is called", async () => {
      const buttons = await screen.findAllByRole("button");
      await act(async () => userEvent.click(buttons[3]));
      expect(mockReservationsRepo.getFilterMonth).toHaveBeenCalled();
    });
  });
  describe("when the reservationGetAll is called", () => {
    test("then the getAll of the repo is called", async () => {
      const buttons = await screen.findAllByRole("button");
      await act(async () => userEvent.click(buttons[4]));
      expect(mockReservationsRepo.getAll).toHaveBeenCalled();
    });
  });
});
