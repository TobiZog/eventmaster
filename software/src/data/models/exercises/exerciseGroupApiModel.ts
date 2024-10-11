import { ExerciseModel } from "./exerciseModel";
import { ExerciseGroupModel } from "./exerciseGroupModel";

export class ExerciseGroupApiModel extends ExerciseGroupModel {
  exercises: Array<ExerciseModel>
}