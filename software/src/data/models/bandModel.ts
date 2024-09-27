import { GenreModel } from "./genreModel"
import { MemberModel } from "./memberModel"
import { RatingModel } from "./ratingModel"

export class BandModel {
  id: number
  name: string
  foundingYear: number
  descriptionEn: string
  descriptionDe: string
  images: Array<string>
  logo: string
  genre: GenreModel
  ratings: Array<RatingModel>
  members: Array<MemberModel>
}