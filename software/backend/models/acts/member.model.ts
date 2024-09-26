import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Band } from "./band.model";

@Table({ timestamps: false })
export class Member extends Model {
  @Column
  name: String

  @ForeignKey(() => Band)
  @Column
  bandId: Number

  @Column
  image: String


  // Relations

  @BelongsTo(() => Band)
  bands: Band[]
}