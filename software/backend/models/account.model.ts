import { Table, Column, Model, HasMany, Unique } from 'sequelize-typescript';
import { Order } from './order.model';

@Table
export class Account extends Model {
  @Unique
  @Column
  username: string

  @Column
  password: string

  @Column
  firstName: string

  @Column
  lastName: string

  @Column
  street: string

  @Column
  houseNumber: number

  @Column
  postalCode: number

  @Column
  city: string

  // Relations
  @HasMany(() => Order)
  orders: Order[]
}