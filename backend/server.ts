import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { api } from './routes/api.routes'
import { startDatabase } from './database'
import { order } from './routes/order.routes'
import { account } from './routes/account.routes'
import { concert } from './routes/concert.routes'
import { band } from './routes/band.routes'
import { genre } from './routes/genre.routes'
import { location } from './routes/location.routes'
import { city } from './routes/city.routes'
import { exercises } from './routes/exercise.routes'
import { files } from './routes/files.routes'

const app = express()
const port = 3000

// Same origin access
app.use(cors())

// Process JSON parameter
app.use(bodyParser.json())

// Create database and tables
startDatabase()

// Static files
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'images')))
app.use("/exercises", exercises)
app.use("/files", files)

// Add delay for more realistic response times
app.use((req, res, next) => {
  setTimeout(next, Math.floor((Math.random() * 1000) + 100))
})

// Routes
app.use("/api", api)
app.use("/bands", band)
app.use("/locations", location)
app.use("/genres", genre)
app.use("/orders", order)
app.use("/accounts", account)
app.use("/cities", city)
app.use("/concerts", concert)

// Start server
const server = app.listen(port, () => {
  console.log(`Server is running and listening to port ${port}`)
})

module.exports = server