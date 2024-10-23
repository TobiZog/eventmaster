import { Exercise } from "../models/exercises/exercise.model";
import { ExerciseGroup } from "../models/exercises/exerciseGroup.model";
import { Request, Response, Router } from "express";

export const exercises = Router()

/**
 * Get all Exercises grouped in ExerciseGroups
 */
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

/**
 * Update state of an Exercise
 * 
 * @param groupNr Number of exercise group (not ID)
 * @param exerciseNr Number of exercise (not ID)
 * @param state New state boolean
 */
exercises.post("/:groupNr/:exerciseNr/:state", (req: Request, res: Response) => {
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