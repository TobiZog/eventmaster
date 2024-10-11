import { EventModel } from "./eventModel";
import { BandModel } from "./bandModel"
import { ConcertApiModel } from "./concertApiModel";

export class EventApiModel extends EventModel {
  concerts: Array<ConcertApiModel> = []
  band: BandModel = new BandModel()
}