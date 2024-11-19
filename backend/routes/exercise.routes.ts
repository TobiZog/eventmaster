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
  }).then(result => {
    result.sort((a, b) => {
      return (a.dataValues.exerciseGroup.dataValues.groupNr * 10 + a.dataValues.exerciseNr) > (b.dataValues.exerciseGroup.dataValues.groupNr * 10 + b.dataValues.exerciseNr) ? 1 : -1
    })

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


  // ExerciseGroup.findOne({
  //   where: { groupNr: req.params.groupNr }
  // })
  //   .then(group => {
  //     Exercise.findOne({
  //       where: {
  //         exerciseNr: req.params.exerciseNr,
  //         exerciseGroupId: group.id
  //       }
  //     })
  //       .then(exercise => {
  //         exercise.update({ solved: req.params.state == "1"})
  //         res.status(200).send()
  //       })
  //   })
})