import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Band } from "./band.model";

@Table({ timestamps: false })
export class Genre extends Model {
  @Column
  name: String


  // Relations

  @HasMany(() => Band)
  bands: Band[]
}