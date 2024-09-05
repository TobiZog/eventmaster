import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { api } from './routes/api.routes'
import { startDatabase } from './database'
import { category } from './routes/category.routes'
import { product } from './routes/product.routes'
import { order } from './routes/order.routes'
import { orderedItem } from './routes/orderedItem.routes'
import { account } from './routes/account.routes'

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
app.use("/categories", category)
app.use("/products", product)
app.use("/orders", order)
app.use("/ordereditems", orderedItem)
app.use("/accounts", account)

// Start server
app.listen(port, () => {
  console.log(`Server is running and listening to port ${port}`)
})
