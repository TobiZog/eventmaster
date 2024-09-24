import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { api } from './routes/api.routes'
import { startDatabase } from './database'
import { category } from './routes/category.routes'
import { product } from './routes/product.routes'
import { order } from './routes/order.routes'
import { account } from './routes/account.routes'

const app = express()
const port = 3000

// Same origin access
app.use(cors())

// Process JSON parameter
app.use(bodyParser.json())

// Create database and tables
startDatabase()

// Add delay for more realistic response times
app.use((req, res, next) => {
  console.log(123)
  setTimeout(next, Math.floor((Math.random () * 4000) + 100))
})

// Routes
app.use("/api", api)
app.use("/categories", category)
app.use("/products", product)
app.use("/orders", order)
app.use("/accounts", account)

// Static files
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'images')))

// Start server
app.listen(port, () => {
  console.log(`Server is running and listening to port ${port}`)
})
