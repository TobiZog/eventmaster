import { ConcertModel } from "./concertModel"

export class OrderItemModel {
  orderId: number = -1
  quantity: number = 1
  orderPrice: number = 0
  product: ConcertModel
}