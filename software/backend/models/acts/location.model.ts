import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Concert } from "./concert.model";
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

  @HasMany(() => Concert)
  shows: Concert[]

  @BelongsTo(() => City)
  city: City
}