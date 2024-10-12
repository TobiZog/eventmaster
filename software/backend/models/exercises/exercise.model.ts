import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { ExerciseGroup } from "./exerciseGroup.model";

@Table({ timestamps: false })
export class Exercise extends Model {
  @Column
  nameDe: string

  @Column
  nameEn: string

  @Column
  exerciseNr: number

  @Column
  descriptionDe: string

  @Column
  descriptionEn: string

  @Column
  solved: boolean

  @ForeignKey(() => ExerciseGroup)
  @Column
  exerciseGroupId: number


  // Relations

  @BelongsTo(() => ExerciseGroup)
  exerciseGroup: ExerciseGroup
}