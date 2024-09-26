import { GenreModel } from "./genreModel"
import { MemberModel } from "./memberModel"
import { RatingModel } from "./ratingModel"

export class BandModel {
  id: Number
  name: string
  foundingYear: Number
  descriptionEn: String
  descriptionDe: String
  images: Array<String>
  logo: String
  genre: GenreModel
  ratings: Array<RatingModel>
  members: Array<MemberModel>
}