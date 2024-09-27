import { MemberModel } from "./memberModel"
import { RatingModel } from "./ratingModel"

export class GenreModel {
  id: number
  name: string
  bands: Array<
    {
      name: string
      foundingYear: number
      descriptionEn: string
      descriptionDe: string
      images: Array<string>
      logo: string
      ratings: Array<RatingModel>
      members: Array<MemberModel>
    }
  >
}