import { BandApiModel } from "../acts/bandApiModel"
import { BandModel } from "../acts/bandModel"
import { ConcertModel } from "../acts/concertModel"
import { EventModel } from "../acts/eventModel"
import { SeatModel } from "../locations/seatModel"

export class BasketItemModel {
  concert: ConcertModel
  event: EventModel
  band: BandModel = new BandModel()
  seats: Array<SeatModel> = []
  price: number

  constructor(concert: ConcertModel, event: EventModel, band: BandModel, seat: SeatModel, price: number) {
    this.concert = concert
    this.event = event
    this.band = band
    this.seats = [ seat ]
    this.price = price
  }
}