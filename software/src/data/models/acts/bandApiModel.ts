import { BandModel } from "./bandModel";
import { ConcertModel } from "./concertModel";
import { GenreModel } from "./genreModel"

/**
 * Replica of the API endpoint /bands
 */
export class BandApiModel extends BandModel {
  genres: Array<GenreModel> = []
  rating: number = 0
  concerts: Array<ConcertModel> = []
}