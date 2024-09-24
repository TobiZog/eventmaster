import { OrderItemModel } from "./orderItemModel"

export class OrderModel {
  id: number
  accountId: number
  shippingProgress: number
  orderItems: Array<OrderItemModel>
  orderedAt: string
}