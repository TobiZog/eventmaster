import { LocationApiModel } from "./locationApiModel"

/**
 * Replica of the API endpoint /cities
 */
export class CityApiModel {
  id: number = -1
  name: string = ""
  country: string = ""
  image: string = ""
  locations: Array<LocationApiModel>
}