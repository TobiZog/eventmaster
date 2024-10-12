import { BandModel } from "./bandModel";
import { ConcertApiModel } from "./concertApiModel";
import { GenreModel } from "./genreModel"
import { MemberModel } from "./memberModel";
import { RatingModel } from "./ratingModel"

/**
 * Replica of the API endpoint /bands/band/:name
 */
export class BandDetailsApiModel extends BandModel {
  members: Array<MemberModel> = []
  ratingValues: Array<RatingModel> = []
  genres: Array<GenreModel> = []
  concerts: Array<ConcertApiModel> = []
}