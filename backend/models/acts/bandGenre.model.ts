import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Genre } from "./genre.model";
import { Band } from "./band.model";

@Table({ timestamps: false })
export class BandGenre extends Model {
  @PrimaryKey
  @Column({autoIncrement: true})
  declare id: number

  @ForeignKey(() => Genre)
  genreId: number

  @ForeignKey(() => Band)
  bandId: number
}