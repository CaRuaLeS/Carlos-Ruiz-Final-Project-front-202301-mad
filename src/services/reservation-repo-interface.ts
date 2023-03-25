import { ReservationStructure } from "../model/reservation";

export interface RepoReservation<T> {
  create(
    reservationInfo: Partial<ReservationStructure>,
    token: string
  ): Promise<T>;
  delete(id: string, token: string): Promise<void>;
  getAll(): Promise<T>;
  getByUser(token: string): Promise<T>; // HABRA QUE PASAR UN TOKEN
  getFilterMonth(yearMonth: string, roomId: string): Promise<T>;
}
