import { OrderedItemModel } from "./orderedItemModel"

export class OrderModel {
  accountId: number
  totalPrice: number
  shippingProgress: number
  orderItem: Array<OrderedItemModel>
  createdAt: string
}