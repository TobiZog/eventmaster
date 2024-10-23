import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Concert } from "./../acts/concert.model";
import { City } from "./city.model";
import { SeatGroup } from "./seatGroup.model";

@Table({ timestamps: false })
export class Location extends Model {
  @Column
  urlName: string

  @Column
  name: string

  @Column
  address: string

  @ForeignKey(() => City)
  @Column
  cityId: number

  @Column
  imageIndoor: string

  @Column
  imageOutdoor: string

  /**
   * Layout identifier of the location
   * 1 = Stage with simple stay area
   * 2 = Stage with front stay area and seat places around
   * 3 = Stage in the middle of the stay area, seat places all around
   */
  @Column
  layout: number

  @Column
  capacity: number


  // Relations

  @HasMany(() => Concert)
  concerts: Concert[]

  @HasMany(() => SeatGroup)
  seatGroups: SeatGroup[]

  @BelongsTo(() => City)
  city: City
}