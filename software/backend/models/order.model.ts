import { Table, Column, Model, BelongsTo, ForeignKey, HasMany, BelongsToMany, Default } from 'sequelize-typescript';
import { Account } from './account.model';
import { OrderItem } from './orderItem.model';

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


  // Relations
  @BelongsTo(() => Account)
  account: Account

  @HasMany(() => OrderItem)
  orderItems: OrderItem[]
}
