import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { routes } from './routes/routes'

const app = express()
const port = 3000

// Same origin access
app.use(cors())

// Process JSON parameter
app.use(bodyParser.json())

// Use the app routes
routes(app)

// Start server
app.listen(port, () => {
  console.log(`Server is running and listening to port ${port}`)
})
