import { Request, Response, NextFunction, Router } from 'express'
import { deleteAllTables, deleteExerciseProgressTables, prepopulateDatabase, prepopulateExerciseDatabase } from '../scripts/databaseHelper'

export const api = Router()

api.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send()
})

api.get("/resetdatabase", async (req: Request, res: Response, next: NextFunction) => {
  // Step 1: Delete all data tables
  deleteAllTables()

  // Step 2: Prepopulate with default values
  await prepopulateDatabase()

  // Step 3: Send status back
  res.status(200).send()
})

api.get("/resetExerciseProgress", async (req: Request, res: Response, next: NextFunction) => {
  deleteExerciseProgressTables()
  
  await prepopulateExerciseDatabase()
  
  res.status(200).send()
})