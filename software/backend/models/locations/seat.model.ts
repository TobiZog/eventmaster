import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { SeatRow } from "./seatRow.model";
import { Ticket } from "../ordering/ticket.model";

@Table({ timestamps: false })
export class Seat extends Model {
  @Column
  seatNr: number

  @ForeignKey(() => SeatRow)
  @Column
  seatRowId: number


  // Relations

  @BelongsTo(() => SeatRow)
  seatRow: SeatRow

  @HasMany(() => Ticket)
  tickets: Ticket[]
}