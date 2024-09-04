import { Table, Column, Model, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Orders } from './orders.model';
import { Products } from './products.model';

@Table
export class OrderedItem extends Model {
  @Column
  @ForeignKey(() => Orders)
  orderId: number

  @Column
  @ForeignKey(() => Products)
  productId: number

  @Column
  quantity: number

  @Column
  totalPrice: number

  // Relations
  @BelongsTo(() => Orders)
  order: Orders

  @HasMany(() => Products)
  products: Products[]
}