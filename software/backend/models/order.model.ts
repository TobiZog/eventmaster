import { Table, Column, Model, BelongsTo, ForeignKey, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Account } from './account.model';
import { OrderItem } from './orderItem.model';

@Table
export class Order extends Model {
  @Column
  @ForeignKey(() => Account)
  accountId: number

  @Column
  totalPrice: number

  @Column
  shippingProgress: number = 1


  // Relations
  @BelongsTo(() => Account)
  account: Account

  @HasMany(() => OrderItem)
  orderItem: OrderItem[]
}
