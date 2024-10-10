import { SeatGroupModel } from "./seatGroupModel"

/**
 * Replica of the API endpoint /locations
 */
export class LocationModel {
  id: number
  name: string
  address: string
  imageIndoor: string
  imageOutdoor: string
  seatSchema: string
  layout: number
  city: {
    name: string
    country: string
  } = { name: "", country: "" }
  concerts: Array<{
    id: number
    date: string
    price: number
    inStock: number
    location: string
    event: {
      name: string
      offered: boolean
      image: string
      bandName: string
    }
  }>
  seatGroups: Array<SeatGroupModel>
}