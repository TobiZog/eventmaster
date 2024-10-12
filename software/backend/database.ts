import { Sequelize } from "sequelize-typescript"

// Models
import { Order } from "./models/ordering/order.model"
import { Ticket } from "./models/ordering/ticket.model"
import { Account } from "./models/user/account.model"
import { prepopulateDatabase } from "./scripts/databaseHelper"
import { Address } from "./models/user/address.model"
import { Payment } from "./models/user/payment.model"
import { AccountRole } from "./models/user/accountRole.model"
import { Genre } from "./models/acts/genre.model"
import { Location } from "./models/locations/location.model"
import { Band } from "./models/acts/band.model"
import { Concert } from "./models/acts/concert.model"
import { Member } from "./models/acts/member.model"
import { Rating } from "./models/acts/rating.model"
import { City } from "./models/locations/city.model"
import { BandGenre } from "./models/acts/bandGenre.model"
import { Seat } from "./models/locations/seat.model"
import { SeatGroup } from "./models/locations/seatGroup.model"
import { SeatRow } from "./models/locations/seatRow.model"
import { Exercise } from "./models/exercises/exercise.model"
import { ExerciseGroup } from "./models/exercises/exerciseGroup.model"

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
    City, Location, SeatGroup, SeatRow, Seat,
    Genre, Band, BandGenre, Rating, Member, Concert,
    Order, Ticket,
    Exercise, ExerciseGroup
  ]
})

export function startDatabase() {
  let recreateDb = true

  // Create database and tables
  sequelize.sync({ force: recreateDb })
    .then(() => {
      console.log("Database & tables created!")

      if (recreateDb) {
        prepopulateDatabase()
      }
      
      console.log("Database prepopulated!")
    })
}
