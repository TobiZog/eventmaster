import { LocationModel } from "./locationModel"

export class ConcertModel {
  id: number
  inStock: number
  date: string
  price: number
  location: LocationModel
}