import { Table, Column, Model, ForeignKey, BelongsTo, BelongsToMany, HasMany, DataType } from 'sequelize-typescript';
import { Category } from './category.model';
import { OrderItem } from './orderItem.model';
import { Brand } from './brand.model';

@Table({ timestamps: false })
export class Product extends Model {
  @Column
  @ForeignKey(() => Category)
  categoryId: number

  @ForeignKey(() => Brand)
  @Column
  brandId: number
  
  @Column
  name: string

  @Column
  description: string

  @Column
  price: number

  @Column
  discount: number

  @Column
  rating: number

  @Column
  inStock: number

  @Column
  offered: boolean

  @Column({
    type: DataType.STRING,
    get(): Array<string> {
      return this.getDataValue('specs').split(';')
    },
    set(value: Array<string>) {
      this.setDataValue('specs', value.join(';'))
    }
  })
  specs: Array<string>

  @Column({
    type: DataType.STRING,
    get(): Array<string> {
      return this.getDataValue('images').split(';')
    },
    set(value: Array<string>) {
      this.setDataValue('images', value.join(';'))
    }
  })
  images: Array<string>


  // Relations

  @BelongsTo(() => Category)
  category: Category

  @BelongsTo(() => Brand)
  brand: Brand

  @HasMany(() => OrderItem)
  orders: OrderItem[]
}