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

exercises.post("/:groupNr/:exerciseNr/:state", (req: Request, res: Response) => {
  console.log(req.params.groupNr)
  ExerciseGroup.findOne({
    where: { groupNr: req.params.groupNr }
  })
    .then(group => {
      Exercise.findOne({
        where: {
          exerciseNr: req.params.exerciseNr,
          exerciseGroupId: group.id
        }
      })
        .then(exercise => {
          exercise.update({ solved: req.params.state == "1"})
          res.status(200).send()
        })
    })
})