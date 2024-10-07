import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Exercise } from "./exercise.model";

@Table({ timestamps: false })
export class ExerciseGroup extends Model {
  @Column
  nameDe: String

  @Column
  nameEn: String

  @Column
  groupNr: Number


  // Relations

  @HasMany(() => Exercise)
  exercises: Exercise[]
}