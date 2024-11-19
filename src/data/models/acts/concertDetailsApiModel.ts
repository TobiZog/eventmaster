import { LocationDetailsApiModel } from "../locations/locationDetailsApiModel";
import { BandModel } from "./bandModel";
import { ConcertModel } from "./concertModel";

export class ConcertDetailsApiModel extends ConcertModel {
  location: LocationDetailsApiModel = new LocationDetailsApiModel()
  band: BandModel = new BandModel()
}