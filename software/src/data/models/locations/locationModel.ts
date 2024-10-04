import { SeatGroupModel } from "./seatGroupModel"

/**
 * Replica of the API endpoint /locations
 */
export class LocationModel {
  id: number
  name: string
  address: string
  image: string
  seatSchema: string
  city: {
    name: string
    country: string
  } = { name: "", country: "" }
  concerts: Array<{
    id: number
    date: string
    price: number
    inStock: number
    event: {
      name: string
      offered: boolean
      image: string
      bandName: string
    }
  }>
  seatGroups: Array<SeatGroupModel>
}