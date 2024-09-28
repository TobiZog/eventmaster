import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Location } from "./location.model";
import { Tour } from "./tour.model";
import { OrderItem } from "../ordering/orderItem.model";

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

  @ForeignKey(() => Tour)
  tourId: Number
  

  // Relations

  @BelongsTo(() => Tour)
  tour: Tour

  @BelongsTo(() => Location)
  location: Location

  @HasMany(() => OrderItem)
  orderItems: OrderItem[]
}