import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Location } from "./../locations/location.model";
import { Ticket } from "../ordering/ticket.model";
import { Band } from "./band.model";

@Table({ timestamps: false })
export class Concert extends Model {
  @Column
  date: string

  @Column
  name: string

  @Column
  price: number

  @Column
  image: string

  @Column
  inStock: number

  @Column
  offered: boolean

  @ForeignKey(() => Band)
  @Column
  bandId: number

  @ForeignKey(() => Location)
  @Column
  locationId: number
  

  // Relations

  @BelongsTo(() => Band)
  band: Band

  @BelongsTo(() => Location)
  location: Location

  @HasMany(() => Ticket)
  tickets: Ticket[]
}