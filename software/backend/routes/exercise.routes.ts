import { Exercise } from "../models/exercises/exercise.model";
import { ExerciseGroup } from "../models/exercises/exerciseGroup.model";
import { Request, Response, Router } from "express";

export const exercises = Router()

exercises.get("/", (req: Request, res: Response) => {
  ExerciseGroup.findAll(
    {
      include: [
        {
          model: Exercise,
          separate: true,
          order: [
            [ 'id', 'ASC' ]
          ]
        }
      ]
    }
  ).then(result => {
    res.status(200).json(result)
  })
})