import { LocationApiModel } from "../locations/locationApiModel"
import { ConcertModel } from "./concertModel"
import { EventApiModel } from "./eventApiModel"

export class ConcertApiModel extends ConcertModel {
  location: LocationApiModel = new LocationApiModel()
  event: EventApiModel = new EventApiModel()
}