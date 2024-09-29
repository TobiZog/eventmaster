/**
 * Replica of the API endpoint /cities
 */
export class CityModel {
  id: number
  name: string
  country: string
  image: string
  locations: Array<{
    id: number
    name: string
    address: string
    image: string
    nrOfConcerts: number
  }>
}