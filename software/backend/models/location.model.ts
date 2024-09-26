import { Column, Model, Table } from "sequelize-typescript";

@Table({ timestamps: false })
export class Location extends Model {
  @Column
  name: String

  @Column
  address: String

  @Column
  image: String
}