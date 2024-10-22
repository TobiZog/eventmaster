import { BandModel } from "./bandModel";
import { ConcertModel } from "./concertModel";
import { GenreModel } from "./genreModel"
import { MemberModel } from "./memberModel";

/**
 * Replica of the API endpoint /bands
 */
export class BandApiModel extends BandModel {
  members: Array<MemberModel>
  genres: Array<GenreModel> = []
  rating: number = 0
  concerts: Array<ConcertModel> = []
}