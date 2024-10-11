import { BandModel } from "./bandModel";
import { EventApiModel } from "./eventApiModel";
import { GenreModel } from "./genreModel"
import { MemberModel } from "./memberModel"
import { RatingModel } from "./ratingModel"

export class BandApiModel extends BandModel {
  ratings: Array<RatingModel> = []
  members: Array<MemberModel> = []
  genres: Array<GenreModel> = []
  events: Array<EventApiModel> = []
}