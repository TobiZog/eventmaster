import { Table, Column, Model, BelongsTo, ForeignKey, HasMany, BelongsToMany, Default } from 'sequelize-typescript';
import { Account } from '../user/account.model';
import { OrderItem } from './orderItem.model';
import { Address } from '../user/address.model';
import { Payment } from '../user/payment.model';

@Table({
  updatedAt: false,
  createdAt: 'orderedAt'
})
export class Order extends Model {
  @Column
  @ForeignKey(() => Account)
  accountId: number

  @Column
  orderedAt: Date

  @Default(1)
  @Column
  shippingProgress: number

  @ForeignKey(() => Address)
  @Column
  addressId: number

  @ForeignKey(() => Payment)
  @Column
  paymentId: number


  // Relations

  @BelongsTo(() => Account)
  account: Account

  @BelongsTo(() => Address)
  address: Address

  @BelongsTo(() => Payment)
  payment: Payment

  @HasMany(() => OrderItem)
  orderItems: OrderItem[]
}
