import { BandModel } from "./bandModel"
import { ShowModel } from "./showModel"

export class TourModel {
  id: Number
  name: String
  band: BandModel
  offered: Boolean
  shows: Array<ShowModel>
}