import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Concert } from "./../acts/concert.model";
import { City } from "./city.model";
import { SeatGroup } from "./seatGroup.model";

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

  @Column
  logo: String


  // Relations

  @HasMany(() => Concert)
  concerts: Concert[]

  @HasMany(() => SeatGroup)
  seatGroups: SeatGroup[]

  @BelongsTo(() => City)
  city: City
}