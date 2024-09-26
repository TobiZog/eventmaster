import { AccountModel } from "./accountModel"
import { BandModel } from "./bandModel"

export class RatingModel {
  id: Number
  rating: Number
  band: BandModel
}