import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { SeatGroup } from "./seatGroup.model";
import { Seat } from "./seat.model";

@Table({ timestamps: false })
export class SeatRow extends Model {
  @Column
  row: number

  @ForeignKey(() => SeatGroup)
  @Column
  seatGroupId: number

  
  // Relations

  @BelongsTo(() => SeatGroup)
  seatGroup: SeatGroup

  @HasMany(() => Seat)
  seats: Seat[]
}