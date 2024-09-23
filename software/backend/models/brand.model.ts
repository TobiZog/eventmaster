import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";

@Table({ timestamps: false })
export class Brand extends Model {
  @Column
  name: string


  // Relations

  @HasMany(() => Product)
  products: Product[]
}