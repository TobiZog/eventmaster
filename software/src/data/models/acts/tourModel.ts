import { BandModel } from "./bandModel"
import { ConcertModel } from "./concertModel"

/**
 * @deprecated Use EventModel!
 */
export class TourModel {
  id: number
  name: string
  offered: boolean
  band: BandModel
  image: string
  concerts: Array<ConcertModel>
}