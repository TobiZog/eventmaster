import { CityModel } from "./cityModel"
import { LocationModel } from "./locationModel"

/**
 * Replica of the API endpoint /locations
 */
export class LocationApiModel extends LocationModel {
  city: CityModel = new CityModel()
  nrOfConcerts: number = 0
}