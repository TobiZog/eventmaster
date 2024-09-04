import { Sequelize } from "sequelize-typescript"

// Models
import { Categories } from "./models/categories.model"

const dbName = "database"
const dbUser = "root"
const dbPassword = "123456"

// Definition of the database
export const sequelize = new Sequelize({
  database: dbName,
  dialect: "sqlite",
  username: dbUser,
  password: dbPassword,
  storage: "database.sqlite",
  models: [ Categories ]
})

export function startDatabase() {
  // Create database and tables
  sequelize.sync({ force: false })
    .then(() => {
      console.log(`Database & tables created!`)
    })
}
