import { ConcertApiModel } from "../acts/concertApiModel"
import { CityModel } from "./cityModel"
import { LocationModel } from "./locationModel"
import { SeatGroupModel } from "./seatGroupModel"

/**
 * Replica of the API endpoint /locations/location/:name
 */
export class LocationDetailsApiModel extends LocationModel {
  city: CityModel = new CityModel()
  concerts: Array<ConcertApiModel> = []
  seatGroups: Array<SeatGroupModel> = []
}