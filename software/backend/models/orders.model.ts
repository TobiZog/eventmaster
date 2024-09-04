import { Table, Column, Model, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Users } from './users.model';
import { OrderedItem } from './orderedItem.model';

@Table
export class Orders extends Model {
  @Column
  @ForeignKey(() => Users)
  userNameId: number

  @Column
  totalPrice: number

  // Relations
  @BelongsTo(() => Users)
  user: Users

  @HasMany(() => OrderedItem)
  orderedItems: OrderedItem
}