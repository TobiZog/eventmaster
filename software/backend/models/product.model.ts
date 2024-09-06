import { Table, Column, Model, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { Category } from './category.model';
import { OrderedItem } from './orderedItem.model';
import { Order } from './order.model';

@Table
export class Product extends Model {
  @Column
  brand: string
  
  @Column
  name: string

  @Column
  @ForeignKey(() => Category)
  categoryId: number

  @Column
  price: number

  @Column
  discount: number

  @Column
  rating: number
  
  // Relations
  @BelongsTo(() => Category)
  category: Category

  @BelongsToMany(() => Order,() => OrderedItem)
  orderedItem: OrderedItem
}