import { Table, Column, Model, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { Categories } from './categories.model';
import { OrderedItem } from './orderedItem.model';

@Table
export class Products extends Model {
  @Column
  name: string

  @Column
  @ForeignKey(() => Categories)
  categoryId: number

  @Column
  @ForeignKey(() => OrderedItem)
  orderedItemId: number

  @Column
  price: number

  @Column
  discount: number
  
  // Relations
  @BelongsTo(() => OrderedItem)
  orderedItem: OrderedItem

  @HasOne(() => Categories)
  category: Categories
}