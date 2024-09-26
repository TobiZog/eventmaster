import { AccountModel } from "./accountModel"
import { BandModel } from "./bandModel"

export class RatingModel {
  id: Number
  account: AccountModel
  rating: Number
  band: BandModel
}