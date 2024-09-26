import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Show } from "./show.model";
import { City } from "./city.model";

@Table({ timestamps: false })
export class Location extends Model {
  @Column
  name: String

  @Column
  address: String

  @ForeignKey(() => City)
  @Column
  cityId: Number

  @Column
  image: String


  // Relations

  @HasMany(() => Show)
  shows: Show[]

  @BelongsTo(() => City)
  city: City
}