import { Sequelize } from "sequelize-typescript"

// Models
import { Categories } from "./models/categories.model"
import { OrderedItem } from "./models/orderedItem.model"
import { Orders } from "./models/orders.model"
import { Products } from "./models/products.model"
import { Users } from "./models/users.model"

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
  models: [ Categories, OrderedItem, Orders, Products, Users ]
})

export function startDatabase() {
  // Create database and tables
  sequelize.sync({ force: false })
    .then(() => {
      console.log(`Database & tables created!`)
    })
}
