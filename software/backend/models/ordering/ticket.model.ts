import { Model, BelongsTo, Column, ForeignKey, HasMany, HasOne, Table } from "sequelize-typescript";
import { Concert } from "../acts/concert.model";
import { Order } from "./order.model";
import { Seat } from "../locations/seat.model";

@Table({ timestamps: false })
export class Ticket extends Model {
  @Column
  @ForeignKey(() => Order)
  orderId: number

  @Column
  orderPrice: number

  @Column
  @ForeignKey(() => Concert)
  concertId: number

  @Column
  @ForeignKey(() => Seat)
  seatId: number


  // Relations
  @BelongsTo(() => Order)
  order: Order

  @BelongsTo(() => Concert)
  product: Concert

  @BelongsTo(() => Seat)
  seat: Seat
}
