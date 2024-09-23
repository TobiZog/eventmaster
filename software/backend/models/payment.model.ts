import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Account } from "./account.model";

@Table({ timestamps: false })
export class Payment extends Model {
  @ForeignKey(() => Account)
  @Column
  accountId: number

  @Column
  bankName: string

  @Column
  iban: string


  // Relations
  @BelongsTo(() => Account)
  account: Account
}