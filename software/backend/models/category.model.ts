import { Table, Column, Model, BelongsTo, ForeignKey, HasMany, Unique } from 'sequelize-typescript';
import { Product } from './product.model';

@Table({ timestamps: false })
export class Category extends Model {
  @Unique
  @Column
  name: string

  @Column
  icon: string

  @HasMany(() => Product)
  product: Product
}