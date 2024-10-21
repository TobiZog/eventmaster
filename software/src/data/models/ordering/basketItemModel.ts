import { BandModel } from "../acts/bandModel"
import { ConcertModel } from "../acts/concertModel"
import { SeatModel } from "../locations/seatModel"

export class BasketItemModel {
  concert: ConcertModel
  band: BandModel = new BandModel()
  seats: Array<SeatModel> = []
  price: number

  constructor(concert: ConcertModel, band: BandModel, seat: SeatModel, price: number) {
    this.concert = concert
    this.band = band
    this.seats = [ seat ]
    this.price = price
  }
}