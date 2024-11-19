import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Account } from "./account.model";

@Table({ timestamps: false })
export class AccountRole extends Model {
  @Column
  name: string

  @Column
  privilegeBuy: boolean

  @Column
  privilegeAdminPanel: boolean

  @Column
  privilegeFileAccess: boolean


  // Relations
  @HasMany(() => Account)
  accounts: Account[]
}