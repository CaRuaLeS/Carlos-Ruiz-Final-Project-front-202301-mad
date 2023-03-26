import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReservationStructure } from "../model/reservation";
import {
  create,
  deleteReservation,
  getAllReservations,
  getMonthReservations,
  getUserReservations,
} from "../reducer/reservations-slice";
import { ReservationsRepo } from "../services/reservation-repo";
import { AppDispatch, RootState } from "../store/store";

export function useReservations(repo: ReservationsRepo) {
  const reservations = useSelector((state: RootState) => state.reservations);
  const dispatch = useDispatch<AppDispatch>();

  const reservationCreate = async (
    info: Partial<ReservationStructure>,
    token: string
  ) => {
    try {
      const data = await repo.create(info, token);
      dispatch(create(data.results[0]));
    } catch (error) {
      console.error((error as Error).message);
    }
  };
  const reservationDelete = async (id: string, token: string) => {
    try {
      await repo.delete(id, token);
      dispatch(deleteReservation(id));
    } catch (error) {
      console.error((error as Error).message);
    }
  };
  const reservationGetAll = useCallback(async () => {
    try {
      const data = await repo.getAll();
      dispatch(getAllReservations(data.results));
    } catch (error) {
      console.error((error as Error).message);
    }
  }, [dispatch, repo]);
  const reservationGetUser = useCallback(
    async (token: string) => {
      try {
        const data = await repo.getByUser(token);
        dispatch(getUserReservations(data.results));
      } catch (error) {
        console.error((error as Error).message);
      }
    },
    [dispatch, repo]
  );
  const reservationGetFilterMonth = useCallback(
    async (dateYearMonth: string, escaperoomId: string) => {
      try {
        const data = await repo.getFilterMonth(dateYearMonth, escaperoomId);
        dispatch(getMonthReservations(data.results));
      } catch (error) {
        console.error((error as Error).message);
      }
    },
    [dispatch, repo]
  );

  return {
    reservations,
    reservationCreate,
    reservationDelete,
    reservationGetAll,
    reservationGetUser,
    reservationGetFilterMonth,
  };
}
