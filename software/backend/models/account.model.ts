import { Table, Column, Model, HasMany, Unique, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Order } from './order.model';
import { Address } from './address.model';
import { Payment } from './payment.model';
import { AccountRole } from './accountRole.model';
import { Rating } from './rating.model';

@Table({ timestamps: false })
export class Account extends Model {
  @Unique
  @Column
  username: string

  @Column
  password: string

  @Unique
  @Column
  email: string

  @Column
  firstName: string = ""

  @Column
  lastName: string = ""

  @ForeignKey(() => AccountRole)
  @Column
  accountRoleId: number


  // Relations
  @HasMany(() => Address)
  addresses: Address[]

  @HasMany(() => Payment)
  payments: Payment[]

  @HasMany(() => Order)
  orders: Order[]

  @HasMany(() => Rating)
  ratings: Rating[]

  @BelongsTo(() => AccountRole)
  accountRole: AccountRole
}