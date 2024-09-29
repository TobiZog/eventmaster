import { RatingModel } from "./ratingModel"

export class GenreModel {
  id: number
  name: string
  bands: Array<
    {
      name: string
      images: Array<string>
      logo: string
      ratings: Array<RatingModel>
    }
  >
}