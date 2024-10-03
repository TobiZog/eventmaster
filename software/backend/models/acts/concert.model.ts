import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Location } from "./../locations/location.model";
import { Event } from "./event.model";
import { Ticket } from "../ordering/ticket.model";

@Table({ timestamps: false })
export class Concert extends Model {
  @Column
  date: String

  @Column
  price: Number

  @Column
  inStock: Number

  @ForeignKey(() => Location)
  @Column
  locationId: Number

  @ForeignKey(() => Event)
  @Column
  eventId: Number
  

  // Relations

  @BelongsTo(() => Event)
  event: Event

  @BelongsTo(() => Location)
  location: Location

  @HasMany(() => Ticket)
  tickets: Ticket[]
}