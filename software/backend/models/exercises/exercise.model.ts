import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { ExerciseGroup } from "./exerciseGroup.model";

@Table({ timestamps: false })
export class Exercise extends Model {
  @Column
  nameDe: String

  @Column
  nameEn: String

  @Column
  exerciseNr: Number

  @Column
  descriptionDe: String

  @Column
  descriptionEn: String

  @Column
  solved: Boolean

  @ForeignKey(() => ExerciseGroup)
  @Column
  exerciseGroupId: Number


  // Relations

  @BelongsTo(() => ExerciseGroup)
  exerciseGroup: ExerciseGroup
}