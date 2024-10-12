import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Band } from "./band.model";

@Table({ timestamps: false })
export class Member extends Model {
  @Column
  name: string

  @ForeignKey(() => Band)
  @Column
  bandId: number

  @Column
  image: string


  // Relations

  @BelongsTo(() => Band)
  bands: Band[]
}