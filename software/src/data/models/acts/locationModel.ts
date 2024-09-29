export class LocationModel {
  id: number
  name: string
  address: string
  image: string
  city: {
    name: string
    country: string
  }
}