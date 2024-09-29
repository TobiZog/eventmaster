import { RatingModel } from "./ratingModel"
import { TourModel } from "./tourModel"

export class BandModel {
  id: number
  name: string
  foundingYear: number
  descriptionEn: string
  descriptionDe: string
  images: Array<string>
  imageMembers: string
  logo: string
  ratings: Array<RatingModel>
  members: Array<{
    name: string,
    image: string
  }>
  genres: Array<{
    name: string
  }>
  tours: Array<TourModel>
}