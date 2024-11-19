import { GenreModel } from "./genreModel";
import { BandModel } from "./bandModel"

export class GenreApiModel extends GenreModel {
  bands: Array<BandModel>
}