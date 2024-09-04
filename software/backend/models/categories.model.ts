import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Products } from './products.model';

@Table
export class Categories extends Model {
  @Column
  name: string

  @ForeignKey(() => Products)
  productId: number

  @BelongsTo(() => Products)
  product: Products
}