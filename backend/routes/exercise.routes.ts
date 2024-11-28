import { Op } from "sequelize";
import { Exercise } from "../models/exercises/exercise.model";
import { ExerciseGroup } from "../models/exercises/exerciseGroup.model";
import { Request, Response, Router } from "express";

export const exercises = Router()

/**
 * Get all Exercises grouped in ExerciseGroups
 */
exercises.get("/", (req: Request, res: Response) => {
  Exercise.findAll({
    include: [ ExerciseGroup ]
  })
    .then(result => {
      result.sort((a, b) => {
        return (a.dataValues.exerciseGroup.dataValues.groupNr * 10 + a.dataValues.exerciseNr) > (b.dataValues.exerciseGroup.dataValues.groupNr * 10 + b.dataValues.exerciseNr) ? 1 : -1
      })

      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).send()
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
  Exercise.findOne({
    where: {
      [Op.and] : [
        {
          exerciseNr: req.params.exerciseNr
        },
        {
          "$exerciseGroup.groupNr$": req.params.groupNr
        }
      ]
    },
    include: [ ExerciseGroup ]
  })
    .then(async exercise => {
      let changed = false

      if (exercise.dataValues.solved != (req.params.state == "1")) {
        await exercise.update({ solved: req.params.state  == "1" })
        changed = true
      }
      
      res.status(200).json({
          exercise: exercise,
          changed: changed
        })
    })
    .catch(error => {
      res.status(500).send()
    })
})