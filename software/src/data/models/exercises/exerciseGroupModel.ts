import { ExerciseModel } from "./exerciseModel"

export class ExerciseGroupModel {
  nameDe: string = ""
  nameEn: string = ""
  groupNr: number = 0
  exercises: Array<ExerciseModel>
}