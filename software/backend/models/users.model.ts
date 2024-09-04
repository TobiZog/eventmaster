import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Orders } from './orders.model';

@Table
export class Users extends Model {
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
  @HasMany(() => Orders)
  orders: Orders[]
}