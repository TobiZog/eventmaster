import { ConcertModel } from "../acts/concertModel"
import { SeatModel } from "../locations/seatModel"

export class BasketItemModel {
  concert: ConcertModel = new ConcertModel()
  seats: Array<SeatModel> = []
  price: number

  constructor(concert: ConcertModel, seat: SeatModel, price: number) {
    this.concert = concert
    this.seats = [ seat ]
    this.price = price
  }
}