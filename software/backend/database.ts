import { Sequelize } from "sequelize-typescript"

// Models
import { Order } from "./models/order.model"
import { OrderItem } from "./models/orderItem.model"
import { Account } from "./models/account.model"
import { prepopulateDatabase } from "./scripts/databaseHelper"
import { Address } from "./models/address.model"
import { Payment } from "./models/payment.model"
import { AccountRole } from "./models/accountRole.model"
import { Genre } from "./models/genre.model"
import { Location } from "./models/location.model"
import { Band } from "./models/band.model"
import { Show } from "./models/show.model"
import { Member } from "./models/member.model"
import { Rating } from "./models/rating.model"

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
  models: [ Genre, Location, AccountRole, Account, Payment, Address, Order, Band, Show, Member, Rating, OrderItem ]
})

export function startDatabase() {
  // Create database and tables
  sequelize.sync({ force: false })
    .then(() => {
      console.log("Database & tables created!")

      prepopulateDatabase()
      console.log("Database prepopulated!")
    })
}
