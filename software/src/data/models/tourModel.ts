import { BandModel } from "./bandModel"
import { ShowModel } from "./showModel"

export class TourModel {
  id: number
  name: string
  offered: boolean
  band: BandModel
  shows: Array<ShowModel>
}