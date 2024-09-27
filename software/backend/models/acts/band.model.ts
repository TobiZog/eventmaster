import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Member } from "./member.model";
import { Genre } from "./genre.model";
import { Rating } from "./rating.model";
import { Tour } from "./tour.model";
import { BandGenre } from "./bandGenre.model";

@Table({ timestamps: false })
export class Band extends Model {
  @Column
  name: String

  @Column
  foundingYear: Number

  @Column
  descriptionEn: String

  @Column
  descriptionDe: String

  @Column({
    type: DataType.STRING,
    get(): Array<string> {
      return this.getDataValue('images').split(';')
    },
    set(value: Array<string>) {
      this.setDataValue('images', value.join(';'))
    }
  })
  images: Array<String>

  @Column
  logo: String


  // Relations

  @HasMany(() => Member)
  members: Member[]

  @HasMany(() => Rating)
  ratings: Rating[]

  @HasMany(() => Tour)
  tours: Tour[]

  @BelongsToMany(() => Genre, () => BandGenre)
  genres: Genre[]
}