/**
 * @swagger
 * tags:
 *   name: Api
 *   description: Main API access point for misc events
 */
import { Request, Response, NextFunction, Router } from 'express'
import { deleteAllTables, deleteExerciseProgressTables, prepopulateDatabase, prepopulateExerciseDatabase } from '../scripts/databaseHelper'

export const api = Router()

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Status check endpoint
 *     tags: [Api]
 *     responses:
 *       200:
 *         description: Server is up and running
 */
api.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send()
})

/**
 * @swagger
 * /api/resetdatabase:
 *   get:
 *     summary: Reset the database to factory state
 *     description: Doesn't effect ExerciseTable and ExerciseGroupTable
 *     tags: [Api]
 *     responses:
 *       200:
 *         description: Reset successful
 */
api.get("/resetdatabase", async (req: Request, res: Response, next: NextFunction) => {
  // Step 1: Delete all data tables
  deleteAllTables()

  // Step 2: Prepopulate with default values
  await prepopulateDatabase()

  // Step 3: Send status back
  res.status(200).send()
})

/**
 * @swagger
 * /api/resetExerciseProgress:
 *   get:
 *     summary: Reset exercises to factory state
 *     description: Reset ExerciseTable and ExerciseGroupTable to factory state
 *     tags: [Api]
 *     responses:
 *       200:
 *         description: Reset successful
 */
api.get("/resetExerciseProgress", async (req: Request, res: Response, next: NextFunction) => {
  deleteExerciseProgressTables()
  
  await prepopulateExerciseDatabase()
  
  res.status(200).send()
})