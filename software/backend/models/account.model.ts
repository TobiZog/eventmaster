import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Order } from './order.model';

@Table
export class Account extends Model {
  @Column
  username: string

  @Column
  password: string

  @Column
  address: string

  @Column
  firstName: string

  @Column
  lastName: string

  // Relations
  @HasMany(() => Order)
  orders: Order[]
}