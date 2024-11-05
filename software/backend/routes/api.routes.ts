import { Request, Response, NextFunction, Router } from 'express'
import { deleteAllTables, deleteExerciseProgressTables, prepopulateDatabase, prepopulateExerciseDatabase } from '../scripts/databaseHelper'
import fs from "fs"

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

/**
 * Get all uploaded file names
 */
api.get("/files", async (req: Request, res: Response) => {
  let dirNames = fs.readdirSync("./backend/images")
  let result = []

  dirNames.forEach(dir => {
    let fileNames = fs.readdirSync("./backend/images/" + dir)

    result.push({
      folder: dir,
      files: fileNames.map(file => {
        return {
          name: file,
          size: fs.statSync("./backend/images/" + dir + "/" + file).size,
          url: "http://localhost:3000/static/" + dir + "/" + file
        }
      })
    })
  })

  res.status(200).json(result)
})