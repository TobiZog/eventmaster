import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Location } from "./location.model";

@Table({ timestamps: false })
export class City extends Model {
  @Column
  name: String

  @Column
  country: String

  @Column
  image: String


  // Relations

  @HasMany(() => Location)
  locations: Location[]
}