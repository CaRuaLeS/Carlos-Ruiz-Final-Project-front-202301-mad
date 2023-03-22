export type ReservationStructure = {
  id: string;
  reserveDate: string;
  user: string;
  escaperoom: string;
};
export type ServerTypeReservation = {
  results: ReservationStructure[];
};

export class Reservation implements ReservationStructure {
  constructor(
    public id: string,
    public reserveDate: string,
    public user: string,
    public escaperoom: string
  ) {}
}
