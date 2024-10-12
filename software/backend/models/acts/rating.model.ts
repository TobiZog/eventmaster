import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Account } from "../user/account.model";
import { Band } from "./band.model";

@Table({ timestamps: false })
export class Rating extends Model {
  
  @ForeignKey(() => Account)
  @Column
  accountId: number
  
  @Column
  rating: number

  @ForeignKey(() => Band)
  @Column
  bandId: number


  // Relations

  @BelongsTo(() => Account)
  account: Account

  @BelongsTo(() => Band)
  band: Band
}