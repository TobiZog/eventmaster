import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Account } from "./account.model";
import { Order } from "./order.model";

@Table({ timestamps: false })
export class Address extends Model {
  @ForeignKey(() => Account)
  @Column
  accountId: number

  @Column
  street: string

  @Column
  houseNumber: number

  @Column
  postalCode: number

  @Column
  city: string


  // Relations
  
  @BelongsTo(() => Account)
  account: Account

  @HasMany(() => Order)
  orders: Order[]
}