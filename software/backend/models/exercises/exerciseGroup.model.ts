import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Exercise } from "./exercise.model";

@Table({ timestamps: false })
export class ExerciseGroup extends Model {
  @Column
  nameDe: string

  @Column
  nameEn: string

  @Column
  groupNr: number


  // Relations

  @HasMany(() => Exercise)
  exercises: Exercise[]
}