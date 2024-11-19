import { Table, Column, Model, BelongsTo, ForeignKey, HasMany, BelongsToMany, Default } from 'sequelize-typescript';
import { Account } from '../user/account.model';
import { Ticket } from './ticket.model';
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

  @ForeignKey(() => Address)
  @Column
  addressId: number

  @ForeignKey(() => Payment)
  @Column
  paymentId: number

  @Default(false)
  @Column
  shipped: boolean



  // Relations

  @BelongsTo(() => Account)
  account: Account

  @BelongsTo(() => Address)
  address: Address

  @BelongsTo(() => Payment)
  payment: Payment

  @HasMany(() => Ticket)
  tickets: Ticket[]
}
