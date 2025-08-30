import { ExerciseGroupModel } from "./exerciseGroupModel"

export class ExerciseModel {
  id: number = -1
  uuid: string = ""
  nameDe: string = ""
  nameEn: string = ""
  exerciseNr: number = 0
  descriptionDe: string = ""
  descriptionEn: string = ""
  solved: boolean = false
  exerciseGroup: ExerciseGroupModel
  available: boolean = true
}