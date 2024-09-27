export class LocationModel {
  id: number
  name: string
  address: string
  image: string
  city: {
    id: number
    name: string
    country: string
  }
}