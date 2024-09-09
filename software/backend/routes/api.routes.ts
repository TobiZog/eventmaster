import { Request, Response, NextFunction, Router } from 'express'
import { deleteAllTables, prepopulateDatabase } from '../scripts/databaseHelper'

export const api = Router()

api.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!")
})

api.get("/resetdatabase", (req: Request, res: Response, next: NextFunction) => {
  // Step 1: Delete all data tables
  deleteAllTables()

  // Step 2: Prepopulate with default values
  prepopulateDatabase()

  // Step 3: Send status back
  res.status(200).send()
})