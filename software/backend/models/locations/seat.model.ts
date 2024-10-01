import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { SeatRow } from "./seatRow.model";

@Table({ timestamps: false })
export class Seat extends Model {
  @Column
  seatNr: number

  @ForeignKey(() => SeatRow)
  @Column
  seatRowId: Number


  // Relations

  @BelongsTo(() => SeatRow)
  seatRow: SeatRow
}