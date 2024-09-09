import { Sequelize } from "sequelize-typescript"

// Models
import { Category } from "./models/category.model"
import { OrderedItem } from "./models/orderedItem.model"
import { Order } from "./models/order.model"
import { Product } from "./models/product.model"
import { Account } from "./models/account.model"

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
  models: [ Category, Product, Account, Order, OrderedItem ]
})

export function startDatabase() {
  // Create database and tables
  sequelize.sync({ force: false })
    .then(() => {
      console.log(`Database & tables created!`)
    })
}
