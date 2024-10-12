import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Location } from "./../locations/location.model";
import { Ticket } from "../ordering/ticket.model";
import { Band } from "./band.model";

@Table({ timestamps: false })
export class Concert extends Model {
  @Column
  date: String

  @Column
  name: String

  @Column
  price: Number

  @Column
  image: String

  @Column
  inStock: Number

  @Column
  offered: Boolean

  @ForeignKey(() => Band)
  @Column
  bandId: Number

  @ForeignKey(() => Location)
  @Column
  locationId: Number
  

  // Relations

  @BelongsTo(() => Location)
  location: Location

  @HasMany(() => Ticket)
  tickets: Ticket[]
}