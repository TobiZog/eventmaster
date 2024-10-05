import { ConcertModel } from "../acts/concertModel";
import { SeatModel } from "../locations/seatModel";

export class SelectedSeatModel {
  seat: SeatModel
  seatRow: number
  seatGroupName: string
  concert: ConcertModel
  price: number

  constructor(seat: SeatModel, seatRow: number, seatGroupName: string, concert: ConcertModel) {
    this.seat = seat
    this.seatRow = seatRow
    this.seatGroupName = seatGroupName
    this.concert = concert
  }
}