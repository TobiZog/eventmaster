/**
 * Replica of the API endpoint /locations
 */
export class LocationModel {
  id: number
  name: string
  address: string
  image: string
  city: {
    name: string
    country: string
  }
  concerts: Array<{
    id: number
    date: string
    price: number
    inStock: number
    tour: {
      name: string
      offered: boolean
      image: string
      bandName: string
    }
  }>
}