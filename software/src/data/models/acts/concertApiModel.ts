import { LocationApiModel } from "../locations/locationApiModel"
import { BandModel } from "./bandModel"
import { ConcertModel } from "./concertModel"

export class ConcertApiModel extends ConcertModel {
  location: LocationApiModel = new LocationApiModel()
  band: BandModel = new BandModel()
}