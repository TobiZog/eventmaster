import { ConcertModel } from "../acts/concertModel"

export class BasketItemModel {
  id: number = -1
  quantity: number = 1
  concert: ConcertModel = new ConcertModel()

  constructor(quantity: number, concert: ConcertModel) {
    this.quantity = quantity
    this.concert = concert
  }
}