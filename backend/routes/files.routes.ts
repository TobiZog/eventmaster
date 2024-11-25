import { Request, Response, NextFunction, Router } from 'express'
import fs, { createReadStream } from "fs"
import multer from "multer"
const upload = multer({ dest: './backend/images/' })
import licenses from "../data/licenses.json"

export const files = Router()

/**
 * Get all folders
 */
files.get("/folders", async (req: Request, res: Response) => {
  let dirNames = fs.readdirSync("./backend/images")
  let result = []

  dirNames.forEach(dir => {
    result.push({
      name: dir,
      nrOfItems: fs.readdirSync("./backend/images/" + dir).length
    })
  })

  res.status(200).json(result)
})


/**
 * Get all uploaded file names by folder name
 * 
 * @param folder Name of folder on server
 */
files.get("/:folder", async (req: Request, res: Response) => {
  let result = []
  let fileNames = fs.readdirSync("./backend/images/" + req.params.folder + "/")

  fileNames.forEach(file => {
    let resData = ""
    let url = "http://localhost:3000/static/" + req.params.folder + "/" + file

    if (file.endsWith("html") || file.endsWith("js")) {
      resData = fs.readFileSync("./backend/images/" + req.params.folder + "/" + file, "utf8")
    }

    result.push({
      name: file,
      size: fs.statSync("./backend/images/" + req.params.folder + "/" + file).size,
      content: resData,
      url: url,
      copyright: licenses.find(data => data.image == file)
    })
  })

  res.status(200).json(result)
})


/**
 * Upload a file
 */
files.post("/", upload.single("file"), function (req: Request, res: Response, next: NextFunction) {
  console.log(req.file)

  res.status(200).send()
})