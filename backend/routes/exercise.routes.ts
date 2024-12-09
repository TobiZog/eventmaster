/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: API to manage the exercise progress
 */
import { Op } from "sequelize";
import { Exercise } from "../models/exercises/exercise.model";
import { ExerciseGroup } from "../models/exercises/exerciseGroup.model";
import { Request, Response, Router } from "express";

export const exercises = Router()

/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Download all exercises
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: Array of all exercises
 *         type: array
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/exercise'
 *       500:
 *         description: Internal server error
 */
exercises.get("/", (req: Request, res: Response) => {
  Exercise.findAll({
    include: [ ExerciseGroup ],
    attributes: {
      exclude: [ "exerciseGroupId" ]
    }
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
 * @swagger
 * /exercises/{groupNr}/{exerciseNr}/{state}:
 *   post:
 *     summary: Update an exercise solved state
 *     tags: [Exercises]
 *     parameters:
 *        - in: path
 *          name: groupNr
 *          schema:
 *            type: number
 *          required: true
 *          description: Number of exercise group (not ID)
 *        - in: path
 *          name: exerciseNr
 *          schema:
 *            type: number
 *          required: true
 *          description: Number of exercise (not ID)
 *        - in: path
 *          name: state
 *          schema:
 *            type: number
 *          required: true
 *          description: 1 = Solved, 0 = Unsolved
 *     responses:
 *       200:
 *         description: Edited exercise
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/exercise'
 *       500:
 *         description: Internal server error
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
    include: [ ExerciseGroup ],
    attributes: {
      exclude: [ "exerciseGroupId" ]
    }
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