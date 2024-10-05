import { LocationModel } from "./../locations/locationModel"
import { BandModel } from "./bandModel"
import { EventModel } from "./eventModel"

export class ConcertModel {
  id: number = 0
  inStock: number = 0
  date: string = ""
  price: number = 0
  location: LocationModel = new LocationModel()
  event: {
    id: number
    name: string
    offered: boolean
    image: string
    band: BandModel
  } = {
    id: 0,
    name: "",
    offered: true,
    image: "",
    band: new BandModel()
  }
}