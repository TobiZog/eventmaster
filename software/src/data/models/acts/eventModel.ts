import { BandModel } from "./bandModel"
import { ConcertModel } from "./concertModel"

export class EventModel {
  id: number
  name: string
  offered: boolean
  image: string
  band: BandModel
  concerts: Array<ConcertModel>
}