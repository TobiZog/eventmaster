import { SeatRowModel } from "./seatRowModel"

export class SeatGroupModel {
  name: string
  surcharge: number
  standingArea: Boolean
  capacity: number
  occupied: number
  seatRows: Array<SeatRowModel>
}