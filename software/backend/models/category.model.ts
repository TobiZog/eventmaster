import { Table, Column, Model, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Product } from './product.model';

@Table
export class Category extends Model {
  @Column
  name: string

  @Column
  icon: string

  @HasMany(() => Product)
  product: Product
}