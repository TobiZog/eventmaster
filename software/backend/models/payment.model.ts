import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Account } from "./account.model";
import { Order } from "./order.model";

@Table({ timestamps: false })
export class Payment extends Model {
  @ForeignKey(() => Account)
  @Column
  accountId: number

  @Column
  bankName: string

  @Column
  iban: string


  // Relations
  
  @BelongsTo(() => Account)
  account: Account

  @HasMany(() => Order)
  orders: Order[]
}