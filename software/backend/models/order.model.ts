import { Table, Column, Model, BelongsTo, ForeignKey, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Account } from './account.model';
import { OrderedItem } from './orderedItem.model';
import { Product } from './product.model';

@Table
export class Order extends Model {
  @Column
  @ForeignKey(() => Account)
  accountId: number

  @Column
  totalPrice: number

  // Relations
  @BelongsTo(() => Account)
  user: Account

  @BelongsToMany(() => Product, () => OrderedItem)
  orderedItems: OrderedItem
}