import { BelongsTo, Column, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Location } from "./location.model";
import { SeatRow } from "./seatRow.model";

@Table({ timestamps: false })
export class SeatGroup extends Model {
  @Column
  name: string

  @Column
  surcharge: number

  @Column
  capacity: number

  @Default(false)
  @Column
  standingArea: boolean

  @ForeignKey(() => Location)
  @Column
  locationId: number


  // Relations

  @BelongsTo(() => Location)
  location: Location

  @HasMany(() => SeatRow)
  seatRows: SeatRow[]
}