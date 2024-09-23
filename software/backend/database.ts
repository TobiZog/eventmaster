import { Sequelize } from "sequelize-typescript"

// Models
import { Category } from "./models/category.model"
import { Order } from "./models/order.model"
import { OrderItem } from "./models/orderItem.model"
import { Product } from "./models/product.model"
import { Account } from "./models/account.model"
import { prepopulateDatabase } from "./scripts/databaseHelper"
import { Address } from "./models/address.model"
import { Payment } from "./models/payment.model"
import { AccountRole } from "./models/accountRole.model"
import { Brand } from "./models/brand.model"

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
  models: [ Address, Payment, AccountRole, Account, Category, Brand, Product, Order, OrderItem ]
})

export function startDatabase() {
  // Create database and tables
  sequelize.sync({ force: false })
    .then(() => {
      console.log("Database & tables created!")

      //prepopulateDatabase()
      console.log("Database prepopulated!")
    })
}
