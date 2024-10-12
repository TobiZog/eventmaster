import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Location } from "./location.model";

@Table({ timestamps: false })
export class City extends Model {
  @Column
  name: string

  @Column
  country: string


  // Relations

  @HasMany(() => Location)
  locations: Location[]
}