import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Band } from "./band.model";
import { Location } from "./location.model";

@Table({ timestamps: false })
export class Show extends Model {
  @Column
  name: String
  
  @ForeignKey(() => Band)
  bandId: Number

  @Column
  date: String

  @Column
  price: Number

  @Column
  inStock: Number

  @Column
  offered: Boolean

  @ForeignKey(() => Location)
  @Column
  locationId: Number
  

  // Relations

  @BelongsTo(() => Band)
  band: Band

  @BelongsTo(() => Location)
  location: Location
}