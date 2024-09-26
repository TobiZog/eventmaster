import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Account } from "./account.model";
import { Band } from "./band.model";

@Table({ timestamps: false })
export class Rating extends Model {
  
  @ForeignKey(() => Account)
  @Column
  accountId: Number
  
  @Column
  rating: Number

  @ForeignKey(() => Band)
  @Column
  bandId: Number


  // Relations

  @BelongsTo(() => Account)
  account: Account

  @BelongsTo(() => Band)
  band: Band
}