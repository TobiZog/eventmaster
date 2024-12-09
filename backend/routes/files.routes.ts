/**
 * @swagger
 * tags:
 *   name: Files
 *   description: API for handling static files
 */
import { Request, Response, NextFunction, Router } from 'express'
import fs from "fs"
import multer from "multer"
const upload = multer({ dest: './backend/images/' })
import licenses from "../data/licenses.json"
import path from 'path'

export const files = Router()

/**
 * @swagger
 * /files/folders:
 *   get:
 *     summary: Get all static folders
 *     tags: [Files]
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/folder'
 */
files.get("/folders", async (req: Request, res: Response) => {
  let dirNames = fs.readdirSync(path.resolve(__dirname, "../images"))
  let result = []

  dirNames.forEach(dir => {
    result.push({
      name: dir,
      nrOfItems: fs.readdirSync(path.resolve(__dirname, "../images/" + dir)).length
    })
  })

  res.status(200).json(result)
})


/**
 * @swagger
 * /files/{folder}:
 *   get:
 *     summary: Get all files in one folder
 *     tags: [Files]
 *     parameters:
 *        - in: path
 *          name: folder
 *          schema:
 *            type: string
 *          required: true
 *          description: Name of folder
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/file'
 */
files.get("/:folder", async (req: Request, res: Response) => {
  let result = []
  let fileNames = fs.readdirSync(path.resolve(__dirname, "../images/" + req.params.folder))

  try {
    fileNames.forEach(file => {
      let resData = ""
      let url = "http://localhost:3000/static/" + req.params.folder + "/" + file

      if (file.endsWith("html") || file.endsWith("js")) {
        resData = fs.readFileSync(path.resolve(__dirname, "../images/" + req.params.folder + "/" + file), "utf8")
      }

      result.push({
        name: file,
        size: fs.statSync(path.resolve(__dirname, "../images/" + req.params.folder + "/" + file)).size,
        content: resData,
        url: url,
        copyright: licenses.find(data => data.image == file)
      })
    })

    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error)
  }
})


/**
 * Upload a file
 */
files.post("/", upload.single("file"), function (req: Request, res: Response, next: NextFunction) {
  res.status(200).send()
})