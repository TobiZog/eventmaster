import { Sequelize } from "sequelize-typescript"

// Models
import { Order } from "./models/ordering/order.model"
import { OrderItem } from "./models/ordering/orderItem.model"
import { Account } from "./models/user/account.model"
import { prepopulateDatabase } from "./scripts/databaseHelper"
import { Address } from "./models/user/address.model"
import { Payment } from "./models/user/payment.model"
import { AccountRole } from "./models/user/accountRole.model"
import { Genre } from "./models/acts/genre.model"
import { Location } from "./models/acts/location.model"
import { Band } from "./models/acts/band.model"
import { Show } from "./models/acts/show.model"
import { Member } from "./models/acts/member.model"
import { Rating } from "./models/acts/rating.model"
import { Tour } from "./models/acts/tour.model"
import { City } from "./models/acts/city.model"

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
  models: [
    AccountRole, Account, Payment, Address,
    City, Location, Genre, Band, Rating, Member, Tour, Show,
    Order, OrderItem
  ]
})

export function startDatabase() {
  // Create database and tables
  sequelize.sync({ force: true })
    .then(() => {
      console.log("Database & tables created!")

      prepopulateDatabase()
      console.log("Database prepopulated!")
    })
}
