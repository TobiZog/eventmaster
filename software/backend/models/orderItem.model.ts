import { Model, BelongsTo, Column, ForeignKey, HasMany, HasOne, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { Order } from "./order.model";

@Table({ timestamps: false })
export class OrderItem extends Model {
  @Column
  @ForeignKey(() => Order)
  orderId: number

  @Column
  quantity: number
  
  @Column
  orderPrice: number

  @Column
  @ForeignKey(() => Product)
  productId: number


  // Relations
  @BelongsTo(() => Order)
  order: Order

  @BelongsTo(() => Product)
  product: Product
}
