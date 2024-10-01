import { LocationModel } from "./../locations/locationModel"

export class ConcertModel {
  id: number
  inStock: number
  date: string
  price: number
  location: LocationModel
}