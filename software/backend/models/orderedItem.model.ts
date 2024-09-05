import { Table, Column, Model, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Order } from './order.model';
import { Product } from './product.model';

@Table
export class OrderedItem extends Model {
  @Column
  @ForeignKey(() => Order)
  orderId: number

  @Column
  @ForeignKey(() => Product)
  productId: number

  @Column
  quantity: number

  @Column
  totalPrice: number
}