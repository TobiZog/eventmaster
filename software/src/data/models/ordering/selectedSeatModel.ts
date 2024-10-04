import { SeatModel } from "../locations/seatModel";
import { SeatRowModel } from "../locations/seatRowModel";

export class SelectedSeatModel {
  seat: SeatModel
  seatRow: number
  seatGroupName: string

  constructor(seat: SeatModel, seatRow: number, seatGroupName: string) {
    this.seat = seat
    this.seatRow = seatRow
    this.seatGroupName = seatGroupName
  }
}