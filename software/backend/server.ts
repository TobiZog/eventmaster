import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { api } from './routes/api.routes'
import { categories } from './routes/categories.routes'
import { startDatabase } from './database'

const app = express()
const port = 3000

// Same origin access
app.use(cors())

// Process JSON parameter
app.use(bodyParser.json())

// Create database and tables
startDatabase()

// Routes
app.use("/api", api)
app.use("/categories", categories)

// Start server
app.listen(port, () => {
  console.log(`Server is running and listening to port ${port}`)
})
