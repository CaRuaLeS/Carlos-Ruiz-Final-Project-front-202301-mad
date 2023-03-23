import {
  ReservationStructure,
  ServerTypeReservation,
} from "../model/reservation";
import { URL_MAZE_RESERVATIONS } from "../variables";
import { RepoReservation } from "./reservation-repo-interface";

export class ReservationsRepo
  implements RepoReservation<ServerTypeReservation>
{
  url: string;
  constructor() {
    this.url = URL_MAZE_RESERVATIONS;
  }

  async create(
    reservationInfo: Partial<ReservationStructure>
  ): Promise<ServerTypeReservation> {
    const url = this.url + "/create";

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(reservationInfo),
      headers: {
        // PONER TOKEN
        "Content-type": "application/json",
      },
    });
    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = await resp.json();

    return data;
  }

  async delete(id: string): Promise<void> {
    const url = this.url + "/delete/" + id;

    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        // PONER TOKEN "Content-type": "application/json",
        // Temp Authorization: 'Bearer ' + token,
      },
    });
    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = await resp.json();

    return data;
  }

  async getAll(): Promise<ServerTypeReservation> {
    const resp = await fetch(this.url);

    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = await resp.json();
    return data;
  }

  async getByUser(userId: string): Promise<ServerTypeReservation> {
    const url = this.url + "/user/" + userId;
    const resp = await fetch(url);

    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = await resp.json();
    return data;
  }

  async getFilterMonth(
    yearMonth: string,
    roomId: string
  ): Promise<ServerTypeReservation> {
    const url =
      this.url + `/filter?reserveDate=${yearMonth}&escaperoom=${roomId}`;
    const resp = await fetch(url);

    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = await resp.json();
    return data;
  }
}
