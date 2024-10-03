import { BandModel } from "./bandModel"
import { ConcertModel } from "./concertModel"

export class EventModel {
  id: number
  name: string
  offered: boolean
  image: string
  band: BandModel = new BandModel()
  concerts: Array<ConcertModel> = [ new ConcertModel() ]
}