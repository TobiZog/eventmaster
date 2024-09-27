import { AccountModel } from "./accountModel"
import { BandModel } from "./bandModel"

export class RatingModel {
  id: number
  rating: number
  band: BandModel
}