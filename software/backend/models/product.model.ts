import { Table, Column, Model, ForeignKey, BelongsTo, BelongsToMany, HasMany, DataType } from 'sequelize-typescript';
import { Category } from './category.model';
import { OrderItem } from './orderItem.model';

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

  @Column({
    type: DataType.STRING,
    get(): Array<string> {
      return this.getDataValue('images').split(';')
    },
    set(value: Array<string>) {
      console.log(value)
      this.setDataValue('images', value.join(';'))
    }
  })
  images: Array<string>

  @Column
  description: string
  
  // Relations
  @BelongsTo(() => Category)
  category: Category

  @HasMany(() => OrderItem)
  order: OrderItem
}