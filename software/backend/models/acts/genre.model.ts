import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { Band } from "./band.model";
import { BandGenre } from "./bandGenre.model";

@Table({ timestamps: false })
export class Genre extends Model {
  @Column
  name: string


  // Relations

  @BelongsToMany(() => Band, () => BandGenre)
  bands: Band[]
}