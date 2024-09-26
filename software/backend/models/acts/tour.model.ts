import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Band } from "./band.model";
import { Show } from "./show.model";

@Table({ timestamps: false })
export class Tour extends Model {
  @Column
  name: String

  @ForeignKey(() => Band)
  bandId: Number

  @Column
  offered: Boolean


  // Relations

  @BelongsTo(() => Band)
  band: Band

  @HasMany(() => Show)
  shows: Show[]
}