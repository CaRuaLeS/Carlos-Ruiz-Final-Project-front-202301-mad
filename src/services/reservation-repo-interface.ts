import { ReservationStructure } from "../model/reservation";

export interface RepoReservation<T> {
  create(reservationInfo: Partial<ReservationStructure>): Promise<T>;
  delete(id: string): Promise<void>;
  getAll(): Promise<T>;
  getByUser(userId: string): Promise<T>; // HABRA QUE PASAR UN TOKEN
  getFilterMonth(yearMonth: string, roomId: string): Promise<T>;
}
