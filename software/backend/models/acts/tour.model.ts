import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Band } from "./band.model";
import { Concert } from "./concert.model";

@Table({ timestamps: false })
export class Tour extends Model {
  @Column
  name: String

  @ForeignKey(() => Band)
  bandId: Number

  @Column
  offered: Boolean

  @Column
  image: String


  // Relations

  @BelongsTo(() => Band)
  band: Band

  @HasMany(() => Concert)
  shows: Concert[]
}