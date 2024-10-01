import { BelongsTo, Column, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Location } from "./location.model";
import { SeatRow } from "./seatRow.model";

@Table({ timestamps: false })
export class SeatGroup extends Model {
  @Column
  name: String

  @Column
  surcharge: Number

  @Column
  capacity: Number

  @Default(false)
  @Column
  standingArea: Boolean

  @ForeignKey(() => Location)
  @Column
  locationId: Number


  // Relations

  @BelongsTo(() => Location)
  location: Location

  @HasMany(() => SeatRow)
  seatRows: SeatRow[]
}