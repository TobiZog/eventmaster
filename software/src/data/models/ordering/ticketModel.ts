import { ConcertModel } from "../acts/concertModel"
import { SeatModel } from "../locations/seatModel"

export class TicketModel {
  id: number
  orderId: number = -1
  orderPrice: number = 0
  concert: ConcertModel
  seat: {
    seatNr: number,
    seatRow: {
      row: number,
      seatGroup: {
        name: string,
        surcharge: number,
        standingArea: boolean
      }
    }
  }
}