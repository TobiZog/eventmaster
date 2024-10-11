import { SeatRowModel } from "./seatRowModel"

export class SeatGroupModel {
  name: string = ""
  surcharge: number = 0
  standingArea: Boolean = false
  capacity: number = 0
  seatRows: Array<SeatRowModel>
}